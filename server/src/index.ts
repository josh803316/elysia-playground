import { Elysia, NotFoundError } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { opentelemetry } from "@elysiajs/opentelemetry";
import { clerkPlugin } from "elysia-clerk";
import { cors } from "@elysiajs/cors";
import { promises as fs } from "fs";
import { join, resolve } from "path";

import { privateNotesController } from "./controllers/private-notes.controller.js";
import { notesController } from "./controllers/notes.controller.js";
import { publicNotesController } from "./controllers/public-notes.controller.js";
import { versionsController } from "./controllers/versions.controller.js";
import { htmxController } from "./controllers/htmx.controller.js";
import { getDB, initDB } from "./db/index.js";
import { apiKeyGuard } from "./guards/api-key-guard.js";
import { authGuard } from "./guards/auth-guard.js";
import { useLogger } from "./middleware/logger.middleware.js";
import { getAllowedOrigins } from "./config/origins.js";
import { isProtectedRoute } from "./config/route-protection.js";

// Helper to safely get error message
const getErrorMessage = (error: any): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "message" in error)
    return String(error.message);
  return String(error);
};

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#bg)"/>
  <path d="M16 20h26a8 8 0 0 1 0 16H30v8h-8v-24h-6z" fill="#fff"/>
  <circle cx="46" cy="44" r="6" fill="#fff" opacity=".9"/>
</svg>`;

// Initialize/seed DB once per cold start. Do not hard-exit on failure in serverless.
const dbSetupPromise = initDB({ seed: true }).catch((error) => {
  console.error("Database setup failed during startup:", error);
  return null;
});

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
const vanillaJsAssetsPath = resolve(new URL("../../vanilla-js", import.meta.url).pathname);

const contentTypeByExt: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const getContentType = (filePath: string): string =>
  contentTypeByExt[filePath.slice(filePath.lastIndexOf("."))] ??
  "application/octet-stream";

// Helper: create an Elysia plugin that serves a pre-built SPA from disk.
// Uses fs APIs so it works on Node and Bun runtimes.
const serveSPA = (assetsDir: string, prefix: string) => {
  const indexPath = join(assetsDir, "index.html");

  const serveIndex = async () => {
    const html = await fs.readFile(indexPath);
    return new Response(new Uint8Array(html), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  };

  return new Elysia()
    // Redirect bare prefix to trailing-slash so relative paths in HTML resolve correctly
    // e.g. /svelte -> /svelte/  (without this, "./_app/foo.css" resolves to "/_app/foo.css")
    .get(prefix, async ({ request }) => {
      const url = new URL(request.url);
      if (!url.pathname.endsWith("/")) {
        const redirectUrl = new URL(`${url.pathname}/`, url.origin);
        return Response.redirect(redirectUrl.toString(), 302);
      }
      return await serveIndex();
    })
    .group(prefix, (app) =>
      app
        .get("/", async () => await serveIndex())
        .get("/*", async ({ params }) => {
          const reqPath = params["*"] ?? "";
          const filePath = resolve(assetsDir, reqPath);

          // Prevent path traversal
          if (!filePath.startsWith(assetsDir + "/") && filePath !== assetsDir) {
            throw new NotFoundError();
          }

          try {
            const stat = await fs.stat(filePath);
            if (stat.isFile()) {
              const file = await fs.readFile(filePath);
              return new Response(new Uint8Array(file), {
                headers: { "content-type": getContentType(filePath) },
              });
            }
          } catch {
            // Ignore fs errors and fall back to index for SPA routes.
          }

          // SPA fallback — serve index.html for client-side routing
          return await serveIndex();
        })
    );
};

// Create the main app
const app = new Elysia();
const allowedOrigins = getAllowedOrigins();

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
      // Allow auth from local dev and deployed frontend origins.
      authorizedParties: allowedOrigins,
      // Skip authentication for public paths
      // Using type assertion since runtime may support this even if types don't
      protectedRoutes: (path: string) => {
        return isProtectedRoute(path);
      },
    } as any)
  )
  .use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  )
  // Add request tracking for debugging
  .onRequest(({ request }) => {
    const url = new URL(request.url);
    console.log(`[REQUEST] ${request.method} ${url.pathname}`);
  })
  .derive(async () => {
    await dbSetupPromise;
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
  // Expose a tiny JS payload for the Vanilla JS frontend with only
  // public configuration derived from server environment variables.
  // This avoids hard‑coding Clerk keys into the static assets.
  .get("/vanilla-js/env.js", () => {
    const payload = {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY ?? "",
      // Frontend API host for the instance, e.g. "ample-garfish-72.clerk.accounts.dev"
      clerkFrontendApi: process.env.CLERK_FRONTEND_API ?? "",
    };

    const body = `window.__VANILLA_ENV__ = ${JSON.stringify(payload)};`;

    return new Response(body, {
      headers: { "content-type": "application/javascript; charset=utf-8" },
    });
  })
  .get("/favicon.svg", () =>
    new Response(faviconSvg, {
      headers: { "content-type": "image/svg+xml" },
    })
  )
  .get("/favicon.ico", () =>
    new Response(faviconSvg, {
      headers: { "content-type": "image/svg+xml" },
    })
  )
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
          "  <link rel='icon' href='/favicon.svg' type='image/svg+xml' />",
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
          "      gap: 10px;",
          "      margin-bottom: 4px;",
          "      position: relative;",
          "      z-index: 1;",
          "    }",
          "    .card-main {",
          "      display: flex;",
          "      align-items: flex-start;",
          "      gap: 10px;",
          "    }",
          "    .logo {",
          "      flex-shrink: 0;",
          "      width: 32px;",
          "      height: 32px;",
          "      border-radius: 999px;",
          "      display: inline-flex;",
          "      align-items: center;",
          "      justify-content: center;",
          "      background: radial-gradient(circle at 30% 0, #020617, #0b1120);",
          "      box-shadow: 0 0 0 1px rgba(15,23,42,0.9), 0 0 18px rgba(15,23,42,0.9);",
          "    }",
          "    .logo svg { width: 22px; height: 22px; display: block; }",
          "    .logo-react svg {",
          "      filter: drop-shadow(0 0 6px rgba(56,189,248,0.9));",
          "    }",
          "    .logo-svelte svg {",
          "      filter: drop-shadow(0 0 6px rgba(248,113,113,0.95));",
          "    }",
          "    .logo-htmx span {",
          "      font-size: 0.7rem;",
          "      letter-spacing: 0.12em;",
          "      text-transform: uppercase;",
          "      color: #e5e7eb;",
          "    }",
          "    .logo-vanilla span {",
          "      font-size: 0.72rem;",
          "      font-weight: 700;",
          "      color: #fbbf24;",
          "      text-shadow: 0 0 8px rgba(251,191,36,0.6);",
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
          "            Compare four different UI approaches that all talk to the same Elysia/Bun",
          "            API – great for learning and architectural discussions.",
          "          </p>",
          "        </div>",
          "      </div>",
          "    </header>",
          "    <main>",
          "      <section class='card-grid'>",
          "        <article class='card'>",
          "          <div class='card-header'>",
          "            <div class='card-main'>",
          "              <div class='logo logo-react' aria-hidden='true'>",
          "                <svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'>",
          "                  <g fill='none' stroke='#38bdf8' stroke-width='12'>",
          "                    <ellipse rx='48' ry='112' transform='translate(128 128) rotate(60)'/>",
          "                    <ellipse rx='48' ry='112' transform='translate(128 128) rotate(120)'/>",
          "                    <ellipse rx='48' ry='112' transform='translate(128 128) rotate(0)'/>",
          "                  </g>",
          "                  <circle cx='128' cy='128' r='18' fill='#38bdf8'/>",
          "                </svg>",
          "              </div>",
          "              <div>",
          "                <div class='title'>React SPA <span>· Mantine UI</span></div>",
          "                <p class='desc'>Classic React single‑page app using Mantine, Clerk, and client‑side routing.</p>",
          "              </div>",
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
          "            <div class='card-main'>",
          "              <div class='logo logo-svelte' aria-hidden='true'>",
          "                <svg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'>",
          "                  <path d='M88 16c-7-4-15-4-22 0L41 28c-7 4-11 11-11 19c0 3 1 6 2 9c-2 3-3 7-3 11c0 8 4 15 11 19l25 14c7 4 15 4 22 0c7-4 11-11 11-19c0-3-1-6-2-9c2-3 3-7 3-11c0-8-4-15-11-19z' fill='#f97316'/>",
          "                  <path d='M73 30L52 42c-4 2-6 5-6 9c0 1 0 3 1 4l11-6c4-2 9-2 13 0l12 7c0-1 1-3 1-4c0-4-2-7-6-9z' fill='#fed7aa'/>",
          "                </svg>",
          "              </div>",
          "              <div>",
          "                <div class='title'>SvelteKit app <span>· file‑based routing</span></div>",
          "                <p class='desc'>SvelteKit front‑end with server‑side rendering and island hydration.</p>",
          "              </div>",
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
          "            <div class='card-main'>",
          "              <div class='logo logo-htmx' aria-hidden='true'>",
          "                <span>HTMX</span>",
          "              </div>",
          "              <div>",
          "                <div class='title'>HTMX pages <span>· progressive enhancement</span></div>",
          "                <p class='desc'>Server‑rendered HTML with HTMX for interactive, hypermedia‑driven UX.</p>",
          "              </div>",
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
          "        <article class='card'>",
          "          <div class='card-header'>",
          "            <div class='card-main'>",
          "              <div class='logo logo-vanilla' aria-hidden='true'>",
          "                <span>JS</span>",
          "              </div>",
          "              <div>",
          "                <div class='title'>Vanilla JS <span>· zero frameworks</span></div>",
          "                <p class='desc'>Pure HTML, CSS &amp; JavaScript – no build step, no dependencies beyond Clerk.</p>",
          "              </div>",
          "            </div>",
          "            <div class='badge'>",
          "              <span class='badge-dot'></span>",
          "              No‑framework",
          "            </div>",
          "          </div>",
          "          <div class='meta'>",
          "            <span class='pill'><strong>Stack</strong> HTML · CSS · ES modules</span>",
          "            <span class='pill'><strong>Model</strong> client‑side fetch, zero build</span>",
          "          </div>",
          "          <a href='/vanilla-js' class='link-btn'>",
          "            <span>Open Vanilla JS demo</span>",
          "            <span class='icon'>↗</span>",
          "          </a>",
          "        </article>",
          "      </section>",
          "      <aside class='notes'>",
          "        <h2>How this is wired</h2>",
          "        <ul>",
          "          <li>All four UIs talk to the same Elysia API under <code>/api</code>.</li>",
          "          <li>The React and Svelte apps are pre‑built assets served by Bun/Elysia.</li>",
          "          <li>The HTMX views are rendered directly from the Bun server.</li>",
          "          <li>The Vanilla JS app uses plain ES modules – zero build step.</li>",
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
  .use(serveSPA(svelteAssetsPath, "/svelte"))
  // Serve Vanilla JS app at /vanilla-js
  .use(serveSPA(vanillaJsAssetsPath, "/vanilla-js"));

// Only start a local HTTP server when not running on Vercel.
if (process.env.VERCEL !== "1") {
  app.listen(3000);
  console.log("🦊 Server is running at http://localhost:3000");
}

export type App = typeof app;
export default app;
