/**
 * E2E: For each app (React, Vue, Angular, Svelte, Vanilla JS, HTMX), validate:
 * - Create public note, edit it, delete it
 * - Create private note, edit it, delete it
 * Then log in as admin and delete any remaining e2e test notes (cleanup).
 *
 * Requires auth.setup to have run (Clerk test user); uses E2E_ADMIN_API_KEY for admin cleanup.
 */
import { test, expect } from '@playwright/test';
import { APP_PATHS, type AppName } from './helpers/apps.js';
import {
  publicNoteContent,
  privateNoteContent,
  createPublicNote,
  createPrivateNote,
  editNoteByContent,
  deleteNoteByContent,
  loginAsAdmin,
  adminDeleteE2ENotes,
  adminDeleteE2ENotesByApi,
  e2eNotePattern,
} from './helpers/notes-flow.js';

const adminApiKey = process.env.E2E_ADMIN_API_KEY ?? '';

for (const { name: appName, path: appPath } of APP_PATHS) {
  test.describe(`${appName} app`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(appPath, { waitUntil: 'domcontentloaded', timeout: 15_000 });
      await page.waitForLoadState('load');
      await expect(
        page.getByTestId('section-public-notes').or(
          page.getByRole('heading', { name: /public notes/i })
        ).first()
      ).toBeVisible({ timeout: 15000 });
    });

    test('public note: create, edit, delete', async ({ page }) => {
      const content = publicNoteContent(appName as AppName);
      await createPublicNote(page, appPath, content);
      await expect(page.getByText(content)).toBeVisible({ timeout: 10000 });

      await editNoteByContent(page, content, content + ' edited');
      const editedContent = content + ' edited';
      await expect(page.locator('tr, div').filter({ hasText: content }).filter({ hasText: 'edited' }).first()).toBeVisible({ timeout: 10_000 });

      await deleteNoteByContent(page, editedContent);
      await expect(page.locator('tr, div').filter({ hasText: content }).filter({ hasText: 'edited' }).first()).not.toBeVisible({ timeout: 5000 });
    });

    test('private note: create, edit, delete', async ({ page }) => {
      const content = privateNoteContent(appName as AppName);
      const yourNotes = page.getByTestId('section-your-notes').or(
        page.locator('section', { has: page.getByRole('heading', { name: /your notes/i }) })
      ).first();
      await expect(yourNotes).toBeVisible({ timeout: 10000 });

      await createPrivateNote(page, content);
      await expect(page.getByText(content)).toBeVisible({ timeout: 10000 });

      await editNoteByContent(page, content, content + ' edited');
      const editedContent = content + ' edited';
      await expect(page.locator('tr, div').filter({ hasText: content }).filter({ hasText: 'edited' }).first()).toBeVisible({ timeout: 10_000 });

      await deleteNoteByContent(page, editedContent);
      await expect(page.locator('tr, div').filter({ hasText: content }).filter({ hasText: 'edited' }).first()).not.toBeVisible({ timeout: 5000 });
    });
  });
}

test.describe('admin cleanup', () => {
  test('admin login and delete all e2e test notes', async ({ page }) => {
    if (!adminApiKey) {
      test.skip();
      return;
    }
    const baseUrl = process.env.E2E_BASE_URL ?? 'http://localhost:3000';
    try {
      await adminDeleteE2ENotesByApi(adminApiKey, baseUrl);
      return;
    } catch {
      // Fallback: use UI if API not available (e.g. different origin)
    }
    await page.goto('/react', { waitUntil: 'domcontentloaded', timeout: 15_000 });
    await page.waitForLoadState('load');
    await loginAsAdmin(page, adminApiKey);
    await page.getByTestId('section-admin-table').or(
      page.locator('section, div', { has: page.getByRole('heading', { name: /all notes|admin/i }) })
    ).first().waitFor({ state: 'visible', timeout: 10000 });
    await adminDeleteE2ENotes(page);
  });
});
