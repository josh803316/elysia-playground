/**
 * E2E: For each app (React, Vue, Angular, Svelte, Vanilla JS, HTMX), validate:
 * - Create public note, edit it, delete it
 * - Create private note (signed in), edit it (if supported), delete it
 * Then admin cleanup via API.
 *
 * Auth strategy: each test starts unauthenticated. Private note tests call
 * clerk.signIn() directly — no storageState, no conditional sign-in checks.
 *
 * supportsPrivateNoteEdit: Angular, Vanilla JS, and HTMX private note cards
 * render only a Delete button, so the edit step is skipped for those apps.
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';
import { clerk, setupClerkTestingToken } from '@clerk/testing/playwright';
import { APP_PATHS, type AppName } from './helpers/apps.js';
import { requireEnvVars } from './helpers/env.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadClerkEnvFromFile() {
  const path = join(__dirname, '../playwright/.auth/clerk-env.json');
  if (!existsSync(path)) return;
  const data = JSON.parse(readFileSync(path, 'utf8'));
  if (data.CLERK_FAPI) process.env.CLERK_FAPI = data.CLERK_FAPI;
  if (data.CLERK_TESTING_TOKEN) process.env.CLERK_TESTING_TOKEN = data.CLERK_TESTING_TOKEN;
}

requireEnvVars(
  ['E2E_BASE_URL', 'CLERK_PUBLISHABLE_KEY', 'CLERK_SECRET_KEY', 'CLERK_TEST_EMAIL'],
  'notes.spec (E2E flows)'
);

import {
  publicNoteContent,
  publicNoteTitle,
  privateNoteContent,
  privateNoteTitle,
  createPublicNote,
  createPrivateNote,
  editNoteByContent,
  deleteNoteByContent,
  loginAsAdmin,
  adminDeleteE2ENotes,
  adminDeleteE2ENotesByApi,
} from './helpers/notes-flow.js';

const adminApiKey = process.env.E2E_ADMIN_API_KEY ?? '';

for (const appDef of APP_PATHS) {
  const { name: appName, path: appPath, supportsPrivateNoteEdit } = appDef;

  test.describe(`${appName} app`, () => {
    // Each test starts unauthenticated. setupClerkTestingToken must be called
    // before any navigation so Clerk FAPI requests are not blocked as bots.
    test.beforeEach(async ({ page }) => {
      loadClerkEnvFromFile();
      await setupClerkTestingToken({ page });
      await page.goto(appPath, { waitUntil: 'domcontentloaded', timeout: 15_000 });
      await page.waitForLoadState('load');
      await expect(
        page.getByTestId('section-public-notes').or(
          page.getByRole('heading', { name: /public notes/i })
        ).first()
      ).toBeVisible({ timeout: 15000 });
    });

    test('public note: create, edit, delete', async ({ page }) => {
      if (appName === 'htmx') test.slow();
      const appNameTyped = appName as AppName;
      const content = publicNoteContent(appNameTyped);
      const title = publicNoteTitle(appNameTyped);
      await createPublicNote(page, appPath, content, title);
      await expect(
        page.getByText(title).or(page.getByText(content)).first()
      ).toBeVisible({ timeout: 10000 });

      // Wait for list refetch after edit
      const refetchPromise = page.waitForResponse(
        (res) => res.url().includes('/api/public-notes') && res.request().method() === 'GET' && res.status() === 200,
        { timeout: 20000 }
      ).catch(() => {});
      await editNoteByContent(page, content, content + ' edited');
      await refetchPromise;
      await page.waitForTimeout(800);

      const editedContent = content + ' edited';
      await expect(
        page.getByText(editedContent).first()
      ).toBeVisible({ timeout: 15_000 });

      // Wait for DELETE response then verify note is gone
      const deletePromise = page.waitForResponse(
        (res) => (res.url().includes('/api/public-notes') || res.url().includes('/api/notes')) &&
          res.request().method() === 'DELETE' &&
          res.status() < 400,
        { timeout: 15000 }
      ).catch(() => {});
      await deleteNoteByContent(page, editedContent);
      await deletePromise;
      await expect(page.getByText(editedContent)).not.toBeVisible({ timeout: 8000 });
    });

    test('private note: create, edit, delete', async ({ page }) => {
      if (appName === 'htmx') test.slow();
      const appNameTyped = appName as AppName;
      const content = privateNoteContent(appNameTyped);
      const title = privateNoteTitle(appNameTyped);
      const email = process.env.CLERK_TEST_EMAIL;
      if (!email) throw new Error('CLERK_TEST_EMAIL required');

      // Sign in fresh — page is always unauthenticated here (no storageState),
      // so clerk.signIn() never encounters an "already signed in" error.
      await clerk.signIn({
        page,
        signInParams: { strategy: 'email_code', identifier: email },
      });

      await expect(
        page.getByRole('button', { name: /create private note/i })
      ).toBeVisible({ timeout: 25_000 });

      const yourNotes = page.getByTestId('section-your-notes').or(
        page.locator('section', { has: page.getByRole('heading', { name: /your notes|your private notes/i }) })
      ).first();
      await expect(yourNotes).toBeVisible({ timeout: 10_000 });

      await createPrivateNote(page, content, title);
      await expect(
        page.getByText(title).or(page.getByText(content)).first()
      ).toBeVisible({ timeout: 10000 });

      if (supportsPrivateNoteEdit) {
        await editNoteByContent(page, content, content + ' edited');
        const editedContent = content + ' edited';
        await expect(
          page.getByText(editedContent).first()
        ).toBeVisible({ timeout: 20_000 });

        // Wait for DELETE response then verify note is gone
        const deletePromise = page.waitForResponse(
          (res) => res.url().includes('/api/') && res.request().method() === 'DELETE' && res.status() < 400,
          { timeout: 15000 }
        ).catch(() => {});
        await deleteNoteByContent(page, editedContent);
        await deletePromise;
        await expect(page.getByText(editedContent)).not.toBeVisible({ timeout: 8000 });
      } else {
        // App doesn't support private note editing — just delete the original
        const deletePromise = page.waitForResponse(
          (res) => res.url().includes('/api/') && res.request().method() === 'DELETE' && res.status() < 400,
          { timeout: 15000 }
        ).catch(() => {});
        await deleteNoteByContent(page, content);
        await deletePromise;
        // Some HTMX/vanilla flows need a hard refresh to reflect deletion.
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('load');
        await expect(page.getByText(content)).not.toBeVisible({ timeout: 8000 });
      }
    });
  });
}

test.describe('admin cleanup', () => {
  test('admin login and delete all e2e test notes', async ({ page }) => {
    if (!adminApiKey) {
      test.skip();
      return;
    }
    const baseUrl = process.env.E2E_BASE_URL ?? 'http://localhost:3500';
    try {
      await adminDeleteE2ENotesByApi(adminApiKey, baseUrl);
      return;
    } catch {
      // Fallback: use UI if API not available
    }
    loadClerkEnvFromFile();
    await setupClerkTestingToken({ page });
    await page.goto('/react', { waitUntil: 'domcontentloaded', timeout: 15_000 });
    await page.waitForLoadState('load');
    await loginAsAdmin(page, adminApiKey);
    await page.getByTestId('section-admin-table').or(
      page.locator('section, div', { has: page.getByRole('heading', { name: /all notes|admin/i }) })
    ).first().waitFor({ state: 'visible', timeout: 10000 });
    await adminDeleteE2ENotes(page);
  });
});
