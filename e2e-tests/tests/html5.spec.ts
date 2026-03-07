/**
 * E2E: HTML5 Showcase (/html5/)
 *
 * The HTML5 page is a showcase of 9 native browser features — dialog modals,
 * form validation, details/summary, date inputs, autocomplete, templates,
 * drag & drop, progress bars, and semantic accessibility.
 *
 * Each section includes a </> Code toggle that reveals the HTML5 markup.
 *
 * Tests focus on page structure, interactive demos, and code expanders.
 */
import {test, expect} from '@playwright/test';

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:3500';

test.describe('HTML5 Showcase', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(`${BASE_URL}/html5/`);
    await page.waitForLoadState('networkidle');
  });

  // ── Page structure ──────────────────────────────────────────────────────────

  test('page has correct title', async ({page}) => {
    await expect(page).toHaveTitle(/Elysia Notes - HTML5/);
  });

  test('nav shows Elysia Notes - HTML5 branding', async ({page}) => {
    await expect(page.getByRole('link', {name: 'Elysia Notes - HTML5'})).toBeVisible();
  });

  test('hero section is visible with correct heading', async ({page}) => {
    const hero = page.locator('[data-testid="hero"]');
    await expect(hero).toBeVisible();
    await expect(hero.getByText('HTML5')).toBeVisible();
    await expect(hero.getByText('Features That Replace JavaScript')).toBeVisible();
  });

  test('all 9 demo sections are rendered', async ({page}) => {
    const demos = page.locator('[data-testid="demos-container"] > section');
    await expect(demos).toHaveCount(9);
  });

  test('footer is visible with versions button', async ({page}) => {
    await expect(page.locator('#versions-btn')).toBeVisible();
  });

  test('Playground Home link navigates to root', async ({page}) => {
    const link = page.getByRole('link', {name: /Playground Home/});
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/');
  });

  // ── Code expanders ──────────────────────────────────────────────────────────

  test('nine code-expander toggles are present', async ({page}) => {
    const toggles = page.locator('.html5-code-toggle');
    await expect(toggles).toHaveCount(9);
  });

  test('code panels are hidden by default', async ({page}) => {
    const panels = page.locator('.html5-code-panel');
    for (let i = 0; i < (await panels.count()); i++) {
      await expect(panels.nth(i)).toBeHidden();
    }
  });

  test('clicking a code-toggle expands the panel', async ({page}) => {
    const firstToggle = page.locator('.html5-code-toggle').first();
    const firstPanel = page.locator('.html5-code-panel').first();
    await expect(firstPanel).toBeHidden();
    await firstToggle.click();
    await expect(firstPanel).toBeVisible();
  });

  test('clicking the toggle again collapses the panel', async ({page}) => {
    const toggle = page.locator('.html5-code-toggle').first();
    const panel = page.locator('.html5-code-panel').first();
    await toggle.click();
    await expect(panel).toBeVisible();
    await toggle.click();
    await expect(panel).toBeHidden();
  });

  test('expanded code panels contain language-markup blocks', async ({page}) => {
    for (const toggle of await page.locator('.html5-code-toggle').all()) {
      await toggle.click();
    }
    const codeBlocks = page.locator('.html5-code-panel code.language-markup');
    await expect(codeBlocks).toHaveCount(9);
  });

  // ── Dialog demo ─────────────────────────────────────────────────────────────

  test('dialog demo: Open Modal button shows the dialog', async ({page}) => {
    const demo = page.locator('[data-testid="demo-dialog"]');
    await demo.getByRole('button', {name: 'Open Modal'}).click();
    const dialog = page.locator('#confirmDialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Delete this record?')).toBeVisible();
  });

  test('dialog demo: Cancel closes the dialog', async ({page}) => {
    const demo = page.locator('[data-testid="demo-dialog"]');
    await demo.getByRole('button', {name: 'Open Modal'}).click();
    const dialog = page.locator('#confirmDialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', {name: 'Cancel'}).click();
    await expect(dialog).not.toBeVisible();
  });

  test('dialog demo: Confirm closes dialog and shows result', async ({page}) => {
    const demo = page.locator('[data-testid="demo-dialog"]');
    await demo.getByRole('button', {name: 'Open Modal'}).click();
    await page.locator('#confirmDialog').getByRole('button', {name: 'Confirm'}).click();
    await expect(page.locator('#dialog-result')).toHaveText('Deleted!');
  });

  // ── Form validation demo ────────────────────────────────────────────────────

  test('form validation demo: submit with valid data shows success', async ({page}) => {
    const demo = page.locator('[data-testid="demo-validation"]');
    await demo.locator('input[type="number"]').fill('25');
    await demo.locator('input[type="password"]').fill('securepass');
    await demo.locator('input[type="email"]').fill('test@example.com');
    await demo.getByRole('button', {name: 'Submit'}).click();
    await expect(page.locator('#form-result')).toHaveText('Valid! Form submitted.');
  });

  // ── Details/summary demo ────────────────────────────────────────────────────

  test('details demo: summary click reveals checkboxes', async ({page}) => {
    const demo = page.locator('[data-testid="demo-details"]');
    const details = demo.locator('details');
    await expect(details.getByText('Show archived notes')).not.toBeVisible();
    await details.locator('summary').click();
    await expect(details.getByText('Show archived notes')).toBeVisible();
  });

  // ── Template demo ───────────────────────────────────────────────────────────

  test('template demo: clicking Add Status Card creates cards', async ({page}) => {
    const demo = page.locator('[data-testid="demo-template"]');
    const output = page.locator('#template-output');
    await expect(output.locator('> div')).toHaveCount(0);
    await demo.getByRole('button', {name: 'Add Status Card'}).click();
    await expect(output.locator('> div')).toHaveCount(1);
    await expect(output.getByText('Server Status')).toBeVisible();
    await demo.getByRole('button', {name: 'Add Status Card'}).click();
    await expect(output.locator('> div')).toHaveCount(2);
  });

  // ── Progress demo ───────────────────────────────────────────────────────────

  test('progress demo: Start Job button begins animation', async ({page}) => {
    const demo = page.locator('[data-testid="demo-progress"]');
    const progressBar = page.locator('#jobProgress');
    await expect(progressBar).toHaveAttribute('value', '0');
    await demo.getByRole('button', {name: 'Start Job'}).click();
    // Wait for progress to advance past 0
    await expect(async () => {
      const val = await progressBar.getAttribute('value');
      expect(Number(val)).toBeGreaterThan(0);
    }).toPass({timeout: 3000});
  });

  // ── Individual demo sections exist ──────────────────────────────────────────

  test('all 9 demo sections have correct data-testid attributes', async ({page}) => {
    const expectedIds = [
      'demo-dialog',
      'demo-validation',
      'demo-details',
      'demo-datetime',
      'demo-autocomplete',
      'demo-template',
      'demo-dragdrop',
      'demo-progress',
      'demo-semantic',
    ];
    for (const id of expectedIds) {
      await expect(page.locator(`[data-testid="${id}"]`)).toBeVisible();
    }
  });
});
