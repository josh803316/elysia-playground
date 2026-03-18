/**
 * E2E: HTML5 Notes app (/html5/)
 *
 * The HTML5 page is a full SPA notes app that uses native HTML5 features:
 * - <dialog> elements for modals (showModal() / close())
 * - <template> elements for note card rendering
 * - <details>/<summary> for code expanders
 * - Native form validation (required attributes)
 *
 * Tests focus on page structure, unauthenticated flows, native dialog usage,
 * and code expanders. Auth-gated flows are covered by shared notes.spec.ts.
 */
import {test, expect} from '@playwright/test';

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:3500';
const appPath = `${BASE_URL}/html5/`;

test.describe('HTML5 Notes app', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(appPath, {waitUntil: 'domcontentloaded'});
    // Wait for the load event so app.js module has run and event listeners are attached.
    // (Module scripts execute before load; Clerk CDN script loads after — so this keeps
    // the page in signed-out state while ensuring buttons are interactive.)
    await page.waitForLoadState('load');
    const pageReady = page
      .getByTestId('section-public-notes')
      .or(page.getByRole('heading', {name: /public notes/i}))
      .or(page.getByRole('button', {name: /sign in|create public note/i}))
      .first();
    await expect(pageReady).toBeVisible({timeout: 25_000});
  });

  // ── Page structure ──────────────────────────────────────────────────────────

  test('page has correct title', async ({page}) => {
    await expect(page).toHaveTitle(/Elysia Notes - HTML5/);
  });

  test('nav shows Elysia Notes - HTML5 branding', async ({page}) => {
    await expect(page.getByRole('link', {name: 'Elysia Notes - HTML5'})).toBeVisible();
  });

  test('Public Notes section is visible with correct subtitle', async ({page}) => {
    await expect(page.locator('[data-testid="section-public-notes"]')).toBeVisible();
    await expect(page.getByText('Visible to everyone')).toBeVisible();
  });

  test('Your Notes section is hidden for unauthenticated users', async ({page}) => {
    const section = page.locator('[data-testid="section-your-notes"]');
    await expect(section).toBeAttached();
    await expect(section).toBeHidden();
  });

  test('Admin section is hidden by default', async ({page}) => {
    await expect(page.locator('[data-testid="section-admin-table"]')).toBeHidden();
  });

  test('sign-in prompt is visible when signed out', async ({page}) => {
    await expect(page.getByText('Sign In to Get Started')).toBeVisible();
  });

  test('footer is visible with versions button', async ({page}) => {
    await expect(page.locator('#versions-btn')).toBeVisible();
  });

  // ── Native <dialog> modals ──────────────────────────────────────────────────

  test('Create Public Note button opens native dialog', async ({page}) => {
    await page.locator('#btn-create-public').click();
    await expect(page.locator('#dialog-create-public')).toBeVisible();
    await expect(page.getByText('Create Public Note').first()).toBeVisible();
  });

  test('native dialog can be closed with Cancel button', async ({page}) => {
    await page.locator('#btn-create-public').click();
    await expect(page.locator('#dialog-create-public')).toBeVisible();
    await page.locator('#dialog-create-public-cancel').click();
    await expect(page.locator('#dialog-create-public')).not.toBeVisible();
  });

  test('native dialog can be closed with × button', async ({page}) => {
    await page.locator('#btn-create-public').click();
    await expect(page.locator('#dialog-create-public')).toBeVisible();
    await page.locator('#dialog-create-public-close').click();
    await expect(page.locator('#dialog-create-public')).not.toBeVisible();
  });

  // ── Code expanders use <details>/<summary> ──────────────────────────────────

  test('code expanders use native <details> elements', async ({page}) => {
    const detailsCount = await page.locator('details.vjs-code-expander').count();
    expect(detailsCount).toBeGreaterThan(0);
  });

  test('<details> code expander is closed by default', async ({page}) => {
    const first = page.locator('details.vjs-code-expander').first();
    await expect(first).not.toHaveAttribute('open');
  });

  test('clicking <summary> opens the code expander', async ({page}) => {
    const first = page.locator('details.vjs-code-expander').first();
    const summary = first.locator('summary');
    await summary.click();
    await expect(first).toHaveAttribute('open', '');
  });

  test('clicking <summary> again closes the code expander', async ({page}) => {
    const first = page.locator('details.vjs-code-expander').first();
    const summary = first.locator('summary');
    await summary.click();
    await expect(first).toHaveAttribute('open', '');
    await summary.click();
    await expect(first).not.toHaveAttribute('open');
  });

  // ── Public notes grid ───────────────────────────────────────────────────────

  test('public notes grid is present', async ({page}) => {
    await expect(page.locator('#public-notes-grid')).toBeVisible();
  });

  test('private notes grid exists in DOM', async ({page}) => {
    await expect(page.locator('#private-notes-grid')).toBeAttached();
  });
});
