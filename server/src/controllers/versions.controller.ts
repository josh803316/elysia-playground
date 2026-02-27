import { Elysia } from "elysia";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_ROOT = path.resolve(__dirname, "../..");
const MONOREPO_ROOT = path.resolve(SERVER_ROOT, "..");

function readPackageJson(dir: string): Record<string, unknown> | null {
  const p = path.join(dir, "package.json");
  try {
    if (!fs.existsSync(p)) return null;
    return JSON.parse(fs.readFileSync(p, "utf-8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function pickDeps(pkg: Record<string, unknown>, keys: string[]): Record<string, string> {
  const deps = { ...(pkg.dependencies as Record<string, string>), ...(pkg.devDependencies as Record<string, string>) };
  const out: Record<string, string> = {};
  for (const k of keys) {
    if (deps && typeof deps[k] === "string") out[k] = deps[k];
  }
  return out;
}

/** Git commit SHA of the running deployment (Vercel sets VERCEL_GIT_COMMIT_SHA). Used by E2E to confirm the new deploy is live. */
function getCommitSha(): string | null {
  return process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GIT_COMMIT_SHA ?? null;
}

function getVersionsPayload() {
  const rootPkg = readPackageJson(MONOREPO_ROOT);
  const serverPkg = readPackageJson(SERVER_ROOT);
  const elysiaVersion =
    serverPkg?.dependencies && typeof (serverPkg.dependencies as Record<string, string>).elysia === "string"
      ? (serverPkg.dependencies as Record<string, string>).elysia
      : null;

  const frameworks: Record<string, { name: string; version: string; dependencies: Record<string, string> }> = {};
  for (const name of ["react", "svelte", "vue", "angular"]) {
    const pkg = readPackageJson(path.join(MONOREPO_ROOT, name));
    if (!pkg) continue;
    const depKeys =
      name === "react"
        ? ["react", "react-dom"]
        : name === "svelte"
          ? ["svelte", "@sveltejs/kit"]
          : name === "vue"
            ? ["vue", "vue-router"]
            : ["@angular/core", "@angular/cli"];
    frameworks[name] = {
      name: (pkg.name as string) ?? name,
      version: (pkg.version as string) ?? "—",
      dependencies: pickDeps(pkg, depKeys),
    };
  }

  return {
    version: (rootPkg?.version as string) ?? (serverPkg?.version as string) ?? "—",
    name: (rootPkg?.name as string) ?? (serverPkg?.name as string) ?? "elysia-playground",
    environment: process.env.NODE_ENV || "production",
    commitSha: getCommitSha(),
    timestamp: new Date().toISOString(),
    elysia: elysiaVersion,
    frameworks,
  };
}

export const versionsController = new Elysia({ prefix: "/versions" }).get(
  "/",
  () => getVersionsPayload()
);
