import {Elysia} from 'elysia';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_ROOT = path.resolve(__dirname, '../..');
const MONOREPO_ROOT = path.resolve(SERVER_ROOT, '..');

function readPackageJson(dir: string): Record<string, unknown> | null {
  const p = path.join(dir, 'package.json');
  try {
    if (!fs.existsSync(p)) return null;
    return JSON.parse(fs.readFileSync(p, 'utf-8')) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function pickDeps(pkg: Record<string, unknown>, keys: string[]): Record<string, string> {
  const deps = {...(pkg.dependencies as Record<string, string>), ...(pkg.devDependencies as Record<string, string>)};
  const out: Record<string, string> = {};
  for (const k of keys) {
    if (deps && typeof deps[k] === 'string') out[k] = deps[k];
  }
  return out;
}

function stringRecord(val: unknown): Record<string, string> {
  if (!val || typeof val !== 'object' || Array.isArray(val)) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(val)) {
    if (typeof v === 'string') out[k] = v;
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
    serverPkg?.dependencies && typeof (serverPkg.dependencies as Record<string, string>).elysia === 'string'
      ? (serverPkg.dependencies as Record<string, string>).elysia
      : null;

  const frameworks: Record<string, {name: string; version: string; dependencies: Record<string, string>}> = {};
  for (const name of ['react', 'svelte', 'vue', 'angular']) {
    const pkg = readPackageJson(path.join(MONOREPO_ROOT, name));
    if (!pkg) continue;
    const depKeys =
      name === 'react'
        ? ['react', 'react-dom']
        : name === 'svelte'
          ? ['svelte', '@sveltejs/kit']
          : name === 'vue'
            ? ['vue', 'vue-router']
            : ['@angular/core', '@angular/cli'];
    frameworks[name] = {
      name: (pkg.name as string) ?? name,
      version: (pkg.version as string) ?? '—',
      dependencies: pickDeps(pkg, depKeys),
    };
  }

  const workspaceNames = (rootPkg?.workspaces as string[] | undefined) ?? [];
  const workspaces: Record<
    string,
    {name: string; version: string; dependencies: Record<string, string>; devDependencies: Record<string, string>}
  > = {};
  for (const name of workspaceNames) {
    const dir = name.replace(/^\.\//, '').split('/')[0];
    const pkg = readPackageJson(path.join(MONOREPO_ROOT, dir));
    if (!pkg) continue;
    workspaces[dir] = {
      name: (pkg.name as string) ?? dir,
      version: (pkg.version as string) ?? '—',
      dependencies: stringRecord(pkg.dependencies),
      devDependencies: stringRecord(pkg.devDependencies),
    };
  }

  return {
    version: (rootPkg?.version as string) ?? (serverPkg?.version as string) ?? '—',
    name: (rootPkg?.name as string) ?? (serverPkg?.name as string) ?? 'elysia-playground',
    environment: process.env.NODE_ENV || 'production',
    commitSha: getCommitSha(),
    timestamp: new Date().toISOString(),
    elysia: elysiaVersion,
    frameworks,
    config: {
      packageManager: (rootPkg?.packageManager as string) ?? undefined,
      engines: stringRecord(rootPkg?.engines),
      overrides: stringRecord(rootPkg?.overrides),
    },
    rootDependencies: {
      dependencies: stringRecord(rootPkg?.dependencies),
      devDependencies: stringRecord(rootPkg?.devDependencies),
    },
    workspaces,
  };
}

export const versionsController = new Elysia({prefix: '/versions'}).get('/', () => getVersionsPayload());
