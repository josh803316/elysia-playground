/**
 * E2E: jQuery Notes app (/jquery/)
 *
 * The jQuery page is structurally identical to the HTMX notes app — same
 * sections (Public Notes, Your Notes, Admin), same Clerk auth flow — but all
 * DOM interactions are driven by jQuery calling the JSON REST API.
 *
 * Each section includes a </>  Code ▼ expander that reveals the jQuery code
 * running for that section.
 *
 * Tests here focus on the public (unauthenticated) flows and the code expanders,
 * since auth flows are already covered by the shared notes.spec.ts suite.
 */
import {test, expect} from '@playwright/test';

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:3500';

test.describe('jQuery Notes app', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(`${BASE_URL}/jquery/`);
    await page.waitForLoadState('networkidle');
  });

  // ── Page structure ──────────────────────────────────────────────────────────

  test('page has correct title', async ({page}) => {
    await expect(page).toHaveTitle(/Elysia Notes - jQuery/);
  });

  test('nav shows Elysia Notes - jQuery branding', async ({page}) => {
    await expect(page.getByRole('link', {name: 'Elysia Notes - jQuery'})).toBeVisible();
  });

  test('Public Notes section is visible with correct subtitle', async ({page}) => {
    await expect(page.locator('[data-testid="section-public-notes"]')).toBeVisible();
    await expect(page.getByText('Visible to everyone')).toBeVisible();
  });

  test('Your Notes section is hidden for unauthenticated users', async ({page}) => {
    // Section exists in DOM but is hidden by clerk-signed-out class
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

  // ── Public notes CRUD ───────────────────────────────────────────────────────

  test('Create Public Note button opens a modal', async ({page}) => {
    await page.locator('#create-public-note-btn').click();
    await expect(page.locator('#note-modal')).toBeVisible();
    await expect(page.getByText('Create New Note')).toBeVisible();
  });

  test('modal can be closed with the × button', async ({page}) => {
    await page.locator('#create-public-note-btn').click();
    await expect(page.locator('#note-modal')).toBeVisible();
    await page.locator('#modal-close-btn').click();
    await expect(page.locator('#note-modal')).not.toBeAttached();
  });

  test('creating a public note appends a card to the grid', async ({page}) => {
    const title = `e2e-jq-${Date.now()}`;
    await page.locator('#create-public-note-btn').click();
    await page.locator('#note-modal [name="title"]').fill(title);
    await page.locator('#note-modal [name="content"]').fill('jQuery e2e test content');
    await page.locator('#create-note-submit').click();
    await expect(page.locator('#note-modal')).not.toBeAttached();
    await expect(page.locator('#notes-grid').getByText(title)).toBeVisible();
  });

  test('deleting a public note removes it from the grid', async ({page}) => {
    const title = `e2e-jq-del-${Date.now()}`;
    // Create
    await page.locator('#create-public-note-btn').click();
    await page.locator('#note-modal [name="title"]').fill(title);
    await page.locator('#note-modal [name="content"]').fill('to be deleted');
    await page.locator('#create-note-submit').click();
    await expect(page.locator('#notes-grid').getByText(title)).toBeVisible();

    // Delete (accept the confirm dialog)
    page.on('dialog', (d) => d.accept());
    const card = page.locator('#notes-grid').filter({hasText: title});
    await card.locator('.delete-note-btn').click();
    await expect(page.locator('#notes-grid').getByText(title)).not.toBeVisible({timeout: 5000});
  });

  test('editing a public note updates its card in place', async ({page}) => {
    const title = `e2e-jq-edit-${Date.now()}`;
    const updatedTitle = `${title}-updated`;
    // Create
    await page.locator('#create-public-note-btn').click();
    await page.locator('#note-modal [name="title"]').fill(title);
    await page.locator('#note-modal [name="content"]').fill('original content');
    await page.locator('#create-note-submit').click();
    await expect(page.locator('#notes-grid').getByText(title)).toBeVisible();

    // Edit
    const card = page.locator('#notes-grid').filter({hasText: title});
    await card.locator('.edit-note-btn').click();
    await expect(page.locator('#note-modal')).toBeVisible();
    await page.locator('#edit-note-form [name="title"]').fill(updatedTitle);
    await page.locator('#edit-note-submit').click();
    await expect(page.locator('#notes-grid').getByText(updatedTitle)).toBeVisible({timeout: 5000});
  });

  // ── Code expanders ──────────────────────────────────────────────────────────

  test('three code-expander toggles are present', async ({page}) => {
    const toggles = page.locator('.jq-code-toggle');
    await expect(toggles).toHaveCount(3);
  });

  test('code panels are hidden by default', async ({page}) => {
    const panels = page.locator('.jq-code-panel');
    for (let i = 0; i < (await panels.count()); i++) {
      await expect(panels.nth(i)).toBeHidden();
    }
  });

  test('clicking a code-toggle expands the panel', async ({page}) => {
    const firstToggle = page.locator('.jq-code-toggle').first();
    const firstPanel = page.locator('.jq-code-panel').first();
    await expect(firstPanel).toBeHidden();
    await firstToggle.click();
    await expect(firstPanel).toBeVisible();
  });

  test('clicking the toggle again collapses the panel', async ({page}) => {
    const toggle = page.locator('.jq-code-toggle').first();
    const panel = page.locator('.jq-code-panel').first();
    await toggle.click();
    await expect(panel).toBeVisible();
    await toggle.click();
    await expect(panel).toBeHidden();
  });

  test('expanded code panels contain language-javascript blocks', async ({page}) => {
    // Open all three
    for (const toggle of await page.locator('.jq-code-toggle').all()) {
      await toggle.click();
    }
    const codeBlocks = page.locator('.jq-code-panel code.language-javascript');
    await expect(codeBlocks).toHaveCount(3);
  });

  test('Public Notes code expander shows $.get and $.ajax calls', async ({page}) => {
    // The public-code expander is the second toggle (admin section is first in DOM but hidden)
    // Find the toggle inside the public section
    const publicSection = page.locator('[data-testid="section-public-notes"]');
    const toggle = publicSection.locator('.jq-code-toggle');
    await toggle.click();
    const codeText = await publicSection.locator('.jq-code-panel').textContent();
    expect(codeText).toContain('/api/public-notes');
  });
});
