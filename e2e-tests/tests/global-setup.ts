/**
 * Playwright global setup: obtain Clerk Testing Token once before any test runs.
 * This runs in Node (no browser), sets the token so Clerk Frontend API requests
 * from tests are not treated as bot traffic. Required env: CLERK_PUBLISHABLE_KEY,
 * CLERK_SECRET_KEY (see .env.example).
 *
 * Note: Playwright runs global setup in a Node subprocess, so Bun's .env auto-load
 * does not apply. We load e2e-tests/.env here when the Clerk keys are missing.
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { clerkSetup } from '@clerk/testing/playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvIfNeeded() {
  if (process.env.CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY) return;
  const envPath = join(__dirname, '../.env');
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    const value = m[2].replace(/^["']|["']$/g, '').trim();
    if (process.env[m[1]] == null) process.env[m[1]] = value;
  }
}

export default async function globalSetup() {
  loadEnvIfNeeded();
  if (!process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    throw new Error(
      'Set CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in e2e-tests/.env (use the same keys as your server/Dashboard)'
    );
  }
  await clerkSetup();
}
