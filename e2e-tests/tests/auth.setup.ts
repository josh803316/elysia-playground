/**
 * Auth setup for E2E: sign in with Clerk's programmatic helper so automated tests
 * bypass bot detection and avoid UI/OTP. clerkSetup() runs in global-setup.ts (no browser).
 *
 * clerk.signIn() signs in with password strategy (no form fill), so no email/OTP
 * is triggered for the sign-in step. Required env: E2E_BASE_URL, CLERK_TEST_EMAIL,
 * CLERK_TEST_PASSWORD. See .env.example and README for Clerk Dashboard (e.g. test
 * email +clerk_test to avoid real "new device" emails).
 */
import { test as setup } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { clerk } from '@clerk/testing/playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate with Clerk', async ({ page }) => {
  const baseURL = process.env.E2E_BASE_URL ?? 'http://localhost:3000';
  const email = process.env.CLERK_TEST_EMAIL;
  const password = process.env.CLERK_TEST_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Set CLERK_TEST_EMAIL and CLERK_TEST_PASSWORD in e2e-tests/.env (see .env.example)'
    );
  }

  const dir = path.dirname(authFile);
  fs.mkdirSync(dir, { recursive: true });

  // Must navigate to an unprotected page that loads Clerk first (per Clerk docs)
  await page.goto(`${baseURL}/react`, { waitUntil: 'domcontentloaded', timeout: 15_000 });
  await page.waitForLoadState('load');

  // Programmatic sign-in with password strategy; uses testing token internally.
  // Avoids UI interaction and bot detection; does not trigger email/OTP for sign-in.
  await clerk.signIn({
    page,
    signInParams: {
      strategy: 'password',
      identifier: email,
      password,
    },
  });

  // Wait for Clerk to finish and app to reflect signed-in state
  await page.waitForURL(/\/(react|vue|angular|svelte|vanilla-js|htmx)?(\/|$)/, { timeout: 15_000 });

  await page.context().storageState({ path: authFile });
});
