import { Elysia, NotFoundError } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { opentelemetry } from "@elysiajs/opentelemetry";
import { clerkPlugin } from "elysia-clerk";
import { sql } from "drizzle-orm";
import { cors } from "@elysiajs/cors";
import { join, resolve } from "path";

import { privateNotesController } from "./controllers/private-notes.controller";
import { notesController } from "./controllers/notes.controller";
import { publicNotesController } from "./controllers/public-notes.controller";
import { versionsController } from "./controllers/versions.controller";
import { htmxController } from "./controllers/htmx.controller";
import { initDB, getDB } from "./db";
import { apiKeyGuard } from "./guards/api-key-guard";
import { authGuard } from "./guards/auth-guard";
import { useLogger } from "./middleware/logger.middleware";

// Define public paths that don't require auth
export const publicPaths = [
  "/",
  "/health",
  "/docs",
  "/docs/json",
  "/webhooks",
  "/versions",
  "/api/public-notes",
  "/htmx",
  "/react",
  "/svelte",
];

// Initialize and configure the database with seeding
const setupDatabase = async () => {
  try {
    console.log("Setting up database with seeding...");
    // Initialize DB and seed with data
    const db = await initDB({ seed: true });

    // Log the database contents
    const usersCount = await db.execute(sql`SELECT COUNT(*) FROM users`);
    const notesCount = await db.execute(sql`SELECT COUNT(*) FROM notes`);

    // console.log("Database setup complete:");
    // console.log("- Users:", usersCount);
    // console.log("- Notes:", notesCount);

    return db;
  } catch (err) {
    console.error("Database initialization failed:", err);
    process.exit(1);
  }
};

// Initialize the database
setupDatabase().catch((err) => {
  console.error("Database setup failed:", err);
  process.exit(1);
});

// Helper to safely get error message
const getErrorMessage = (error: any): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "message" in error)
    return String(error.message);
  return String(error);
};

// Create API routes with /api prefix
const api = new Elysia({ prefix: "/api" })
  .use(privateNotesController) // /api/private-notes
  .use(notesController) // /api/notes
  .use(publicNotesController) // /api/public-notes
  .get(
    "/api-key-example",
    async (ctx) => {
      return {
        success: true,
        message: "API Key authentication successful",
        timestamp: new Date().toISOString(),
        isAdmin: true,
      };
    },
    {
      beforeHandle: apiKeyGuard,
    }
  )
  .onError(({ error, code, request }) => {
    const url = new URL(request.url);
    const errorMsg = getErrorMessage(error);
    console.error(
      `[API ERROR] ${request.method} ${url.pathname} - ${code} - ${errorMsg}`
    );

    if (code === "NOT_FOUND") {
      return { error: "Route not found", path: url.pathname };
    }

    return { error: errorMsg || "Unknown error" };
  });

// Resolve static asset directories relative to this file
const reactAssetsPath = resolve(new URL("../../react/dist", import.meta.url).pathname);
const svelteAssetsPath = resolve(new URL("../../svelte/build", import.meta.url).pathname);

// Helper: create an Elysia plugin that serves a pre-built SPA from disk.
// Uses Bun.file() directly to avoid Bun's HTML bundler (which rewrites
// already-built Vite / SvelteKit output and breaks asset paths).
const serveSPA = (assetsDir: string, prefix: string) => {
  const indexFile = Bun.file(join(assetsDir, "index.html"));

  const serveIndex = () => new Response(indexFile.slice(), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });

  return new Elysia()
    // Redirect bare prefix to trailing-slash so relative paths in HTML resolve correctly
    // e.g. /svelte -> /svelte/  (without this, "./_app/foo.css" resolves to "/_app/foo.css")
    .get(prefix, ({ request }) => {
      const url = new URL(request.url);
      if (!url.pathname.endsWith("/")) {
        return Response.redirect(`${url.pathname}/`, 302);
      }
      return serveIndex();
    })
    .group(prefix, (app) =>
      app
        .get("/", serveIndex)
        .get("/*", async ({ params }) => {
          const reqPath = params["*"];
          const filePath = join(assetsDir, reqPath);

          // Prevent path traversal
          if (!filePath.startsWith(assetsDir)) {
            throw new NotFoundError();
          }

          const file = Bun.file(filePath);
          if (await file.exists() && !(await file.stat()).isDirectory()) {
            return new Response(file, {
              headers: file.type ? { "content-type": file.type } : undefined,
            });
          }

          // SPA fallback — serve index.html for client-side routing
          return serveIndex();
        })
    );
};

// Create the main app
const app = new Elysia();

// Add custom logger middleware
useLogger(app);

// Continue with other middleware and routes
app
  .use(opentelemetry())
  .use(swagger())
  // Add Clerk plugin with path exclusions
  .use(
    clerkPlugin({
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
      // Allow tokens from dev origins (Clerk validates request origin; proxy sends Origin from browser)
      authorizedParties: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:6173",
      ],
      // Skip authentication for public paths
      protectedRoutes: (path) => {
        return !publicPaths.some((publicPath) => path.startsWith(publicPath));
      },
    })
  )
  .use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:6173", "http://localhost:3000"],
      credentials: true,
    })
  )
  // Add request tracking for debugging
  .onRequest(({ request }) => {
    const url = new URL(request.url);
    console.log(`[REQUEST] ${request.method} ${url.pathname}`);
  })
  .derive(async () => {
    // Attach database to context
    const db = await getDB();
    return { db };
  })
  .onError(({ error, code, request }) => {
    const url = new URL(request.url);
    const errorMsg = getErrorMessage(error);
    console.error(
      `[ERROR] ${request.method} ${url.pathname} - ${code} - ${errorMsg}`
    );

    if (code === "NOT_FOUND") {
      return { error: "Route not found", path: url.pathname };
    }

    return { error: errorMsg || "Unknown error" };
  })
  .head("/", () => "")
  .get(
    "/",
    () =>
      new Response(
        [
          "<!doctype html>",
          "<html lang='en'>",
          "<head>",
          "  <meta charset='utf-8' />",
          "  <meta name='viewport' content='width=device-width, initial-scale=1' />",
          "  <title>Elysia Playground – Frontend Demos</title>",
          "  <style>",
          "    :root {",
          "      color-scheme: dark;",
          "      --bg: #050816;",
          "      --bg-alt: #0b1020;",
          "      --card: #111827;",
          "      --accent: #38bdf8;",
          "      --accent-soft: rgba(56,189,248,0.12);",
          "      --text: #e5e7eb;",
          "      --muted: #9ca3af;",
          "      --border: rgba(148,163,184,0.35);",
          "      --shadow: 0 18px 45px rgba(15,23,42,0.9);",
          "    }",
          "    * { box-sizing: border-box; margin: 0; padding: 0; }",
          "    body {",
          "      min-height: 100vh;",
          "      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text',",
          "        'Inter', sans-serif;",
          "      background: radial-gradient(circle at top, #1e293b 0, #020617 45%, #000 100%);",
          "      color: var(--text);",
          "      display: flex;",
          "      align-items: center;",
          "      justify-content: center;",
          "      padding: 32px 16px;",
          "    }",
          "    .shell {",
          "      width: 100%;",
          "      max-width: 1040px;",
          "      background: radial-gradient(circle at top left, #0b1120, #020617);",
          "      border-radius: 24px;",
          "      border: 1px solid rgba(148,163,184,0.35);",
          "      box-shadow: var(--shadow);",
          "      padding: 24px 24px 28px;",
          "      position: relative;",
          "      overflow: hidden;",
          "    }",
          "    .shell::before {",
          "      content: '';",
          "      position: absolute;",
          "      inset: -120px;",
          "      background:",
          "        radial-gradient(circle at 0 0, rgba(59,130,246,0.18), transparent 55%),",
          "        radial-gradient(circle at 100% 20%, rgba(236,72,153,0.17), transparent 55%),",
          "        radial-gradient(circle at 0 100%, rgba(56,189,248,0.16), transparent 50%);",
          "      opacity: 0.9;",
          "      pointer-events: none;",
          "      z-index: -1;",
          "    }",
          "    header {",
          "      display: flex;",
          "      align-items: center;",
          "      justify-content: space-between;",
          "      gap: 16px;",
          "      margin-bottom: 20px;",
          "    }",
          "    .brand { display: flex; align-items: center; gap: 12px; }",
          "    .dot {",
          "      width: 36px;",
          "      height: 36px;",
          "      border-radius: 999px;",
          "      background: radial-gradient(circle at 30% 0, #e5e7eb, #38bdf8 38%, #0ea5e9 72%, #0369a1 100%);",
          "      box-shadow: 0 0 0 1px rgba(15,23,42,0.9), 0 0 40px rgba(56,189,248,0.7);",
          "      position: relative;",
          "      overflow: hidden;",
          "    }",
          "    .dot::after {",
          "      content: '';",
          "      position: absolute;",
          "      inset: 26%;",
          "      border-radius: inherit;",
          "      background: radial-gradient(circle at 30% 0, rgba(248,250,252,0.9), transparent 60%);",
          "      opacity: 0.8;",
          "    }",
          "    h1 { font-size: 1.5rem; letter-spacing: -0.03em; }",
          "    .tag {",
          "      display: inline-flex;",
          "      align-items: center;",
          "      gap: 6px;",
          "      border-radius: 999px;",
          "      padding: 4px 10px;",
          "      font-size: 0.72rem;",
          "      text-transform: uppercase;",
          "      letter-spacing: 0.12em;",
          "      background: linear-gradient(90deg, rgba(15,23,42,0.95), rgba(15,23,42,0.4));",
          "      border: 1px solid rgba(148,163,184,0.55);",
          "      color: var(--muted);",
          "    }",
          "    .pill-dot { width: 6px; height: 6px; border-radius: 999px; background: #22c55e; box-shadow: 0 0 0 4px rgba(34,197,94,0.2); }",
          "    .summary {",
          "      margin-top: 6px;",
          "      font-size: 0.9rem;",
          "      color: var(--muted);",
          "      max-width: 620px;",
          "    }",
          "    main {",
          "      margin-top: 16px;",
          "      display: grid;",
          "      grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);",
          "      gap: 18px;",
          "    }",
          "    @media (max-width: 840px) {",
          "      main { grid-template-columns: minmax(0, 1fr); }",
          "      .shell { padding: 20px 18px 22px; }",
          "    }",
          "    .card-grid {",
          "      display: grid;",
          "      gap: 12px;",
          "    }",
          "    .card {",
          "      position: relative;",
          "      border-radius: 18px;",
          "      border: 1px solid rgba(148,163,184,0.5);",
          "      background: radial-gradient(circle at top left, rgba(15,23,42,0.95), rgba(15,23,42,0.86));",
          "      padding: 14px 14px 14px;",
          "      overflow: hidden;",
          "    }",
          "    .card::before {",
          "      content: '';",
          "      position: absolute;",
          "      inset: -60px;",
          "      background: radial-gradient(circle at top right, rgba(56,189,248,0.18), transparent 55%);",
          "      opacity: 0.65;",
          "      pointer-events: none;",
          "    }",
          "    .card-header {",
          "      display: flex;",
          "      align-items: center;",
          "      justify-content: space-between;",
          "      gap: 8px;",
          "      margin-bottom: 4px;",
          "      position: relative;",
          "      z-index: 1;",
          "    }",
          "    .badge {",
          "      display: inline-flex;",
          "      align-items: center;",
          "      gap: 6px;",
          "      padding: 3px 9px;",
          "      border-radius: 999px;",
          "      border: 1px solid rgba(148,163,184,0.6);",
          "      font-size: 0.72rem;",
          "      color: var(--muted);",
          "      background: linear-gradient(90deg, rgba(15,23,42,0.96), rgba(15,23,42,0.7));",
          "    }",
          "    .badge-dot {",
          "      width: 7px;",
          "      height: 7px;",
          "      border-radius: 999px;",
          "      background: var(--accent);",
          "      box-shadow: 0 0 0 4px rgba(56,189,248,0.2);",
          "    }",
          "    .title { font-size: 0.98rem; font-weight: 600; letter-spacing: -0.02em; }",
          "    .title span { opacity: 0.7; font-weight: 500; font-size: 0.88rem; }",
          "    .desc {",
          "      position: relative;",
          "      z-index: 1;",
          "      margin: 2px 0 8px;",
          "      font-size: 0.83rem;",
          "      color: var(--muted);",
          "    }",
          "    .meta {",
          "      display: flex;",
          "      flex-wrap: wrap;",
          "      gap: 6px;",
          "      margin-bottom: 10px;",
          "      position: relative;",
          "      z-index: 1;",
          "    }",
          "    .pill {",
          "      border-radius: 999px;",
          "      border: 1px solid rgba(148,163,184,0.45);",
          "      font-size: 0.7rem;",
          "      padding: 3px 9px;",
          "      color: var(--muted);",
          "      background: rgba(15,23,42,0.9);",
          "      display: inline-flex;",
          "      align-items: center;",
          "      gap: 5px;",
          "      white-space: nowrap;",
          "    }",
          "    .pill strong { color: #e5e7eb; font-weight: 500; }",
          "    .link-btn {",
          "      position: relative;",
          "      z-index: 1;",
          "      display: inline-flex;",
          "      align-items: center;",
          "      justify-content: center;",
          "      gap: 6px;",
          "      padding: 8px 14px;",
          "      border-radius: 999px;",
          "      border: 1px solid rgba(56,189,248,0.8);",
          "      background: radial-gradient(circle at top left, rgba(56,189,248,0.2), rgba(8,47,73,0.95));",
          "      color: #e0f2fe;",
          "      font-size: 0.86rem;",
          "      font-weight: 500;",
          "      text-decoration: none;",
          "      cursor: pointer;",
          "      box-shadow: 0 10px 35px rgba(8,47,73,0.9);",
          "      transition: transform 0.18s ease-out, box-shadow 0.18s ease-out, border-color 0.18s ease-out, background 0.18s ease-out;",
          "    }",
          "    .link-btn span.icon {",
          "      display: inline-flex;",
          "      align-items: center;",
          "      justify-content: center;",
          "      width: 18px;",
          "      height: 18px;",
          "      border-radius: 999px;",
          "      background: rgba(15,23,42,0.9);",
          "      box-shadow: 0 0 0 1px rgba(15,23,42,1);",
          "      font-size: 0.75rem;",
          "    }",
          "    .link-btn:hover {",
          "      transform: translateY(-1px) scale(1.01);",
          "      box-shadow: 0 14px 40px rgba(8,47,73,0.95);",
          "      border-color: rgba(56,189,248,1);",
          "      background: radial-gradient(circle at top left, rgba(56,189,248,0.26), rgba(7,36,60,0.98));",
          "    }",
          "    .link-btn:active {",
          "      transform: translateY(0);",
          "      box-shadow: 0 8px 24px rgba(8,47,73,0.9);",
          "    }",
          "    .notes {",
          "      border-radius: 18px;",
          "      border: 1px solid rgba(148,163,184,0.5);",
          "      background: radial-gradient(circle at top right, rgba(17,24,39,0.98), rgba(2,6,23,0.96));",
          "      padding: 14px 14px 13px;",
          "      font-size: 0.83rem;",
          "      color: var(--muted);",
          "      position: relative;",
          "      overflow: hidden;",
          "    }",
          "    .notes::before {",
          "      content: '';",
          "      position: absolute;",
          "      inset: -80px;",
          "      background: radial-gradient(circle at 20% 0, rgba(56,189,248,0.16), transparent 50%);",
          "      opacity: 0.7;",
          "      pointer-events: none;",
          "    }",
          "    .notes h2 {",
          "      font-size: 0.9rem;",
          "      font-weight: 600;",
          "      margin-bottom: 6px;",
          "      letter-spacing: -0.01em;",
          "      color: #e5e7eb;",
          "      position: relative;",
          "      z-index: 1;",
          "    }",
          "    .notes ul {",
          "      padding-left: 1.05rem;",
          "      display: grid;",
          "      gap: 4px;",
          "      position: relative;",
          "      z-index: 1;",
          "    }",
          "    .notes li { margin-left: 2px; }",
          "    .notes code {",
          "      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;",
          "      font-size: 0.78rem;",
          "      background: rgba(15,23,42,0.9);",
          "      border-radius: 999px;",
          "      padding: 1px 6px;",
          "      border: 1px solid rgba(75,85,99,0.9);",
          "      color: #e5e7eb;",
          "    }",
          "    footer {",
          "      margin-top: 14px;",
          "      display: flex;",
          "      align-items: center;",
          "      justify-content: space-between;",
          "      gap: 12px;",
          "      font-size: 0.77rem;",
          "      color: var(--muted);",
          "    }",
          "    .stack { display: inline-flex; gap: 8px; align-items: center; }",
          "    .stack-pill {",
          "      border-radius: 999px;",
          "      padding: 3px 8px;",
          "      border: 1px solid rgba(148,163,184,0.5);",
          "      background: rgba(15,23,42,0.85);",
          "    }",
          "  </style>",
          "</head>",
          "<body>",
          "  <div class='shell'>",
          "    <header>",
          "      <div class='brand'>",
          "        <div class='dot'></div>",
          "        <div>",
          "          <span class='tag'>",
          "            <span class='pill-dot'></span>",
          "            Elysia + Bun API",
          "          </span>",
          "          <h1>Frontend playground</h1>",
          "          <p class='summary'>",
          "            Compare three different UI approaches that all talk to the same Elysia/Bun",
          "            API – great for learning and architectural discussions.",
          "          </p>",
          "        </div>",
          "      </div>",
          "    </header>",
          "    <main>",
          "      <section class='card-grid'>",
          "        <article class='card'>",
          "          <div class='card-header'>",
          "            <div>",
          "              <div class='title'>React SPA <span>· Mantine UI</span></div>",
          "              <p class='desc'>Classic React single‑page app using Mantine, Clerk, and client‑side routing.</p>",
          "            </div>",
          "            <div class='badge'>",
          "              <span class='badge-dot'></span>",
          "              SPA",
          "            </div>",
          "          </div>",
          "          <div class='meta'>",
          "            <span class='pill'><strong>Stack</strong> React · Vite · Mantine</span>",
          "            <span class='pill'><strong>UX</strong> Dashboard‑style, rich components</span>",
          "          </div>",
          "          <a href='/react' class='link-btn'>",
          "            <span>Open React demo</span>",
          "            <span class='icon'>↗</span>",
          "          </a>",
          "        </article>",
          "        <article class='card'>",
          "          <div class='card-header'>",
          "            <div>",
          "              <div class='title'>SvelteKit app <span>· file‑based routing</span></div>",
          "              <p class='desc'>SvelteKit front‑end with server‑side rendering and island hydration.</p>",
          "            </div>",
          "            <div class='badge'>",
          "              <span class='badge-dot'></span>",
          "              SSR",
          "            </div>",
          "          </div>",
          "          <div class='meta'>",
          "            <span class='pill'><strong>Stack</strong> Svelte · SvelteKit</span>",
          "            <span class='pill'><strong>Routing</strong> File‑based, server + client</span>",
          "          </div>",
          "          <a href='/svelte' class='link-btn'>",
          "            <span>Open Svelte demo</span>",
          "            <span class='icon'>↗</span>",
          "          </a>",
          "        </article>",
          "        <article class='card'>",
          "          <div class='card-header'>",
          "            <div>",
          "              <div class='title'>HTMX pages <span>· progressive enhancement</span></div>",
          "              <p class='desc'>Server‑rendered HTML with HTMX for interactive, hypermedia‑driven UX.</p>",
          "            </div>",
          "            <div class='badge'>",
          "              <span class='badge-dot'></span>",
          "              HTML‑first",
          "            </div>",
          "          </div>",
          "          <div class='meta'>",
          "            <span class='pill'><strong>Stack</strong> HTMX · Tailwind (or utility CSS)</span>",
          "            <span class='pill'><strong>Model</strong> server‑rendered, small sprinkle of JS</span>",
          "          </div>",
          "          <a href='/htmx' class='link-btn'>",
          "            <span>Open HTMX demo</span>",
          "            <span class='icon'>↗</span>",
          "          </a>",
          "        </article>",
          "      </section>",
          "      <aside class='notes'>",
          "        <h2>How this is wired</h2>",
          "        <ul>",
          "          <li>All three UIs talk to the same Elysia API under <code>/api</code>.</li>",
          "          <li>The React and Svelte apps are pre‑built assets served by Bun/Elysia.</li>",
          "          <li>The HTMX views are rendered directly from the Bun server.</li>",
          "          <li>Great for workshops, demos, and architectural explorations.</li>",
          "        </ul>",
          "      </aside>",
          "    </main>",
          "    <footer>",
          "      <span>Pick a UI style above and compare trade‑offs against the same backend.</span>",
          "      <span class='stack'>",
          "        <span class='stack-pill'>Bun · Elysia · Postgres (PGlite)</span>",
          "      </span>",
          "    </footer>",
          "  </div>",
          "</body>",
          "</html>",
        ].join("\n"),
        {
          headers: { "content-type": "text/html; charset=utf-8" },
        }
      )
  )
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  .get("/auth-example", () => "This route requires authentication", {
    beforeHandle: authGuard,
  })
  .use(versionsController) // Add versions controller at the app level
  .use(htmxController) // Add HTMX controller
  .use(api) // Use the API router with prefix
  // Serve built React app at /react
  .use(serveSPA(reactAssetsPath, "/react"))
  // Serve built Svelte app at /svelte
  .use(serveSPA(svelteAssetsPath, "/svelte"));

// Only start a local HTTP server when not running on Vercel.
if (process.env.VERCEL !== "1") {
  app.listen(3000);
  console.log("🦊 Server is running at http://localhost:3000");
}

export type App = typeof app;
export default app;
