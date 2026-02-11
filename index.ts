// Vercel Elysia integration entrypoint.
// Keeping this at repo root avoids cross-directory entry resolution issues.
import { Elysia } from "elysia";
import app from "./server/src/index";

export default app;

