import { Elysia } from "elysia";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { apiKeyGuard } from "../guards/api-key-guard.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json directly since dynamic imports can be troublesome
const packageJsonPath = path.resolve(__dirname, "../../package.json");
const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
const packageJson = JSON.parse(packageJsonContent);

/** Git commit SHA of the running deployment (Vercel sets VERCEL_GIT_COMMIT_SHA). Used by E2E to confirm the new deploy is live. */
function getCommitSha(): string | null {
  return process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GIT_COMMIT_SHA ?? null;
}

export const versionsController = new Elysia({ prefix: "/versions" }).get(
  "/",
  () => ({
    version: packageJson.version,
    name: packageJson.name,
    environment: process.env.NODE_ENV || "production",
    /** Commit SHA of this deployment; E2E polls until this matches the expected SHA. */
    commitSha: getCommitSha(),
    timestamp: new Date().toISOString(),
  }),
  { beforeHandle: apiKeyGuard }
);
