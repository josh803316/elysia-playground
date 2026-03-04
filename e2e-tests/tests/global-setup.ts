/**
 * Playwright global setup: obtain Clerk Testing Token and sign in once.
 * Saves storage state (cookies + localStorage) to playwright/.auth/user.json
 * so all test workers can restore the authenticated session without signing in.
 *
 * Required env: CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, CLERK_TEST_EMAIL,
 * E2E_BASE_URL (see .env.example).
 *
 * Note: Playwright runs global setup in a Node subprocess, so Bun's .env auto-load
 * does not apply. We load e2e-tests/.env here when the Clerk keys are missing.
 */
import {readFileSync, existsSync, writeFileSync, mkdirSync} from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import {chromium} from '@playwright/test';
import {clerk, clerkSetup, setupClerkTestingToken} from '@clerk/testing/playwright';
import {requireEnvVars} from './helpers/env.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const authDir = join(__dirname, '../playwright/.auth');
const clerkEnvPath = join(authDir, 'clerk-env.json');
const storageStatePath = join(authDir, 'user.json');

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
  requireEnvVars(
    ['CLERK_PUBLISHABLE_KEY', 'CLERK_SECRET_KEY', 'CLERK_TEST_EMAIL', 'E2E_BASE_URL'],
    'global-setup (Clerk keys + auth)',
  );
  await clerkSetup();
  mkdirSync(authDir, {recursive: true});
  writeFileSync(
    clerkEnvPath,
    JSON.stringify({
      CLERK_FAPI: process.env.CLERK_FAPI ?? '',
      CLERK_TESTING_TOKEN: process.env.CLERK_TESTING_TOKEN ?? '',
    }),
    'utf8',
  );

  const baseUrl = process.env.E2E_BASE_URL!;
  const email = process.env.CLERK_TEST_EMAIL!;

  console.log('[global-setup] Signing in once to create shared storage state...');
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await setupClerkTestingToken({page});
  await page.goto(`${baseUrl}/react`, {waitUntil: 'domcontentloaded', timeout: 30_000});
  await page.waitForLoadState('load');

  await clerk.signIn({
    page,
    signInParams: {strategy: 'email_code', identifier: email},
  });

  await context.storageState({path: storageStatePath});
  await browser.close();
  console.log(`[global-setup] Storage state saved to ${storageStatePath}`);
}
