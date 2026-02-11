import app from "../server/src/index";

// Re-export the Elysia app so Vercel can auto-detect the entrypoint.
// Vercel searches for src/index.{js,ts} by default for Elysia backends.
export default app;

