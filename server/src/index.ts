import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { opentelemetry } from "@elysiajs/opentelemetry";
import { clerkPlugin } from "elysia-clerk";
import { sql } from "drizzle-orm";
import { cors } from "@elysiajs/cors";

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
  "/health",
  "/docs",
  "/docs/json",
  "/webhooks",
  "/versions",
  "/api/public-notes",
  "/htmx",
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
  .get("/", () => "Hello World")
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  .get("/auth-example", () => "This route requires authentication", {
    beforeHandle: authGuard,
  })
  .use(versionsController) // Add versions controller at the app level
  .use(htmxController) // Add HTMX controller
  .use(api) // Use the API router with prefix
  .listen(3000);

export type App = typeof app;

console.log("🦊 Server is running at http://localhost:3000");
