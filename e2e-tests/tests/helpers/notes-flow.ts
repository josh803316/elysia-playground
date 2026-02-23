import { Page } from '@playwright/test';
import type { AppName } from './apps.js';

const E2E_PREFIX = 'e2e-';

export function publicNoteContent(appName: AppName): string {
  return `${E2E_PREFIX}public-${appName}-${Date.now()}`;
}

export function privateNoteContent(appName: AppName): string {
  return `${E2E_PREFIX}private-${appName}-${Date.now()}`;
}

/** Unique content so we can find and cleanup our notes in admin view */
export function e2eNotePattern(): RegExp {
  return new RegExp(E2E_PREFIX);
}

/** Scope to the open modal/dialog so we don't hit header buttons or overlays. */
function withinModal(page: Page) {
  return page.getByRole('dialog').or(page.locator('.modal-box, .modal, [class*="Modal"]')).first();
}

/**
 * Open "Create Public Note" modal and submit. Uses shared button text across apps.
 */
export async function createPublicNote(
  page: Page,
  _appPath: string,
  content: string,
  title?: string
): Promise<void> {
  const section = page.getByTestId('section-public-notes').or(
    page.locator('section', { has: page.getByRole('heading', { name: /public notes/i }) })
  ).first();
  await section.getByRole('button', { name: /create public note/i }).click();
  const modal = withinModal(page);
  const contentField = modal.getByRole('textbox', { name: /content/i }).or(
    modal.getByPlaceholder(/write|content|note|public/i)
  ).first();
  await contentField.waitFor({ state: 'visible', timeout: 5000 });
  await contentField.fill(content);
  if (title !== undefined) {
    const titleField = modal.getByRole('textbox', { name: /title/i }).or(
      modal.getByPlaceholder(/title/i)
    ).first();
    if (await titleField.isVisible().catch(() => false)) {
      await titleField.fill(title);
    }
  }
  await modal.getByRole('button', { name: /create|post note|save|post/i }).first().click({ force: true });
  await page.waitForTimeout(800);
}

/**
 * Create private note (must be signed in). Button is in "Your Notes" / section-your-notes.
 */
export async function createPrivateNote(
  page: Page,
  content: string
): Promise<void> {
  const section = page.getByTestId('section-your-notes').or(
    page.locator('section', { has: page.getByRole('heading', { name: /your notes/i }) })
  ).first();
  await section.getByRole('button', { name: /create private note/i }).click();
  const modal = withinModal(page);
  const contentField = modal.getByRole('textbox', { name: /content/i }).or(
    modal.getByPlaceholder(/write|content|private/i)
  ).first();
  await contentField.waitFor({ state: 'visible', timeout: 5000 });
  await contentField.fill(content);
  await modal.getByRole('button', { name: /create private note|create|save/i }).first().click({ force: true });
  await page.waitForTimeout(500);
}

/** Locator for one note row/card that contains the given text (table row or card div). */
function noteCardLocator(page: Page, contentSnippet: string) {
  return page.locator(
    'tr, [class*="note-card"], [class*="noteCard"], .notes-grid > div, div[style*="grid"] > div, [data-testid*="note"]'
  ).filter({ hasText: contentSnippet }).first();
}

/**
 * Find a note card by content text and click Edit, then save (optional new content).
 */
export async function editNoteByContent(
  page: Page,
  contentSnippet: string,
  newContent?: string
): Promise<void> {
  const card = noteCardLocator(page, contentSnippet);
  await card.getByRole('button', { name: /edit/i }).first().click();
  // Wait for the edit dialog to be visible (may be in DOM but hidden until opened)
  const modal = page.getByRole('dialog').filter({ hasText: /edit note|content|save changes/i }).first();
  await modal.waitFor({ state: 'visible', timeout: 5000 });
  if (newContent !== undefined) {
    const field = modal.getByRole('textbox', { name: /content/i }).or(
      modal.getByPlaceholder(/content|write|note/i)
    ).first();
    await field.waitFor({ state: 'visible', timeout: 5000 });
    await field.fill(newContent);
  }
  await modal.getByRole('button', { name: /save|update|save changes/i }).first().click({ force: true });
  await page.waitForTimeout(1500); // allow list refetch after save
}

/**
 * Find a note card by content and delete (with confirm dialog).
 */
export async function deleteNoteByContent(page: Page, contentSnippet: string): Promise<void> {
  const card = noteCardLocator(page, contentSnippet);
  page.once('dialog', (d) => d.accept());
  await card.getByRole('button', { name: /delete/i }).first().click();
  await page.waitForTimeout(500);
}

/**
 * Open Admin Login modal, fill API key, submit.
 */
export async function loginAsAdmin(page: Page, adminApiKey: string): Promise<void> {
  await page.getByRole('button', { name: /admin login/i }).first().click();
  const modal = withinModal(page);
  await modal.getByPlaceholder(/api key|admin/i).or(
    modal.getByRole('textbox', { name: /api key|admin/i })
  ).first().fill(adminApiKey);
  await modal.getByRole('button', { name: /log in as admin|submit|login/i }).first().click({ force: true });
  await page.waitForTimeout(800);
}

const MAX_ADMIN_DELETE_ITERATIONS = 100;

/**
 * In admin table, delete every row that contains the e2e pattern (our test notes).
 * Capped at MAX_ADMIN_DELETE_ITERATIONS to avoid infinite loop if DOM doesn't update.
 */
export async function adminDeleteE2ENotes(page: Page): Promise<void> {
  const section = page.getByTestId('section-admin-table').or(
    page.locator('section, div', { has: page.getByRole('heading', { name: /all notes|admin/i }) })
  ).first();
  const table = section.locator('table');
  const pattern = e2eNotePattern();
  page.on('dialog', (d) => d.accept());
  for (let i = 0; i < MAX_ADMIN_DELETE_ITERATIONS; i++) {
    const row = table.locator('tbody tr').filter({ hasText: pattern }).first();
    if (!(await row.isVisible().catch(() => false))) break;
    await row.getByRole('button', { name: /delete/i }).click();
    await page.waitForTimeout(500);
  }
}
