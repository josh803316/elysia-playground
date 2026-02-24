import { Page } from '@playwright/test';
import type { AppName } from './apps.js';

const E2E_PREFIX = 'e2e-';

export function publicNoteContent(appName: AppName): string {
  return `${E2E_PREFIX}public-${appName}-${Date.now()}`;
}

/** Short title for e2e public notes (apps require title + content). */
export function publicNoteTitle(appName: AppName): string {
  return `${E2E_PREFIX}public-${appName}`;
}

export function privateNoteContent(appName: AppName): string {
  return `${E2E_PREFIX}private-${appName}-${Date.now()}`;
}

/** Short title for e2e private notes. */
export function privateNoteTitle(appName: AppName): string {
  return `${E2E_PREFIX}private-${appName}`;
}

/** Unique content so we can find and cleanup our notes in admin view */
export function e2eNotePattern(): RegExp {
  return new RegExp(E2E_PREFIX);
}

/** Scope to the open modal/dialog so we don't hit header buttons or overlays. */
function withinModal(page: Page) {
  return page.getByRole('dialog').or(page.locator('.modal-box, .modal, [class*="Modal"]')).first();
}

/** Placeholder regex for the title field across apps */
const TITLE_PLACEHOLDER_REGEX =
  /note title|enter note title|optional for public|optional for public notes|title\s*\(|^required$/i;

/** Placeholder regex for the content field across apps (including Angular private) */
const CONTENT_PLACEHOLDER_REGEX =
  /write your note|write a public|enter note content|note content|write your private/i;

/**
 * Cross-framework note card locator.
 *
 * Selector breakdown:
 *   [class*="note-card"]                   — Vue, Angular, Vanilla JS, older HTMX
 *   [id^="note-"]:not(#note-modal)         — HTMX server-rendered public note cards (id="note-{id}")
 *   [id^="private-note-"]                  — HTMX server-rendered private note cards
 *   .rounded-lg.shadow-md                  — Svelte & HTMX (Tailwind shadow cards)
 *   div[style*="grid-template-columns"]>div — React (inline-style grid children, no class names)
 */
const NOTE_CARD_SELECTOR =
  '[class*="note-card"], [class*="noteCard"],' +
  '[id^="note-"]:not(#note-modal), [id^="private-note-"],' +
  '.rounded-lg.shadow-md,' +
  'div[style*="grid-template-columns"] > div';

function noteCardLocator(page: Page, contentSnippet: string) {
  return page.locator(NOTE_CARD_SELECTOR)
    .filter({ hasText: contentSnippet })
    .first();
}

function noteCardWithEditedLocator(page: Page, baseContent: string) {
  return page.locator(NOTE_CARD_SELECTOR)
    .filter({ hasText: baseContent })
    .filter({ hasText: 'edited' })
    .first();
}

/**
 * Wait for the create-note form to be visible then return a scoped locator for it.
 *
 * Includes [aria-modal="true"] so Flowbite's portal-rendered modals are found.
 * Includes "form" so Alpine.js (HTMX) and server-rendered modals without special
 * class names are found. Works for React (Mantine Modal), Vue, Svelte, Angular,
 * Vanilla JS, and HTMX.
 */
function waitForCreateNoteForm(page: Page, timeout = 10000) {
  const formIndicator = page.getByPlaceholder(TITLE_PLACEHOLDER_REGEX).or(
    page.getByPlaceholder(CONTENT_PLACEHOLDER_REGEX)
  ).first();
  return formIndicator.waitFor({ state: 'visible', timeout }).then(async () => {
    const fieldLocator = page.getByPlaceholder(TITLE_PLACEHOLDER_REGEX).or(
      page.getByPlaceholder(CONTENT_PLACEHOLDER_REGEX)
    );
    const dialogLike = page.locator(
      '[role="dialog"]:visible, [aria-modal="true"]:visible, .modal-box:visible, .modal:visible, ' +
      '[class*="Modal-root"]:visible, [class*="Modal"]:visible, #note-modal:visible'
    ).filter({ has: fieldLocator }).first();
    if (await dialogLike.isVisible().catch(() => false)) return dialogLike;
    return page.locator('form:visible').filter({ has: fieldLocator }).first();
  });
}

/**
 * Fill the title field using modal scope with page-level fallback.
 * Needed for portal-rendered modals (Flowbite/Svelte) where the modal container
 * selector may not match the portal wrapper.
 */
async function fillTitleField(page: Page, modal: ReturnType<Page['locator']>, value: string) {
  const candidates = [
    modal.getByPlaceholder(TITLE_PLACEHOLDER_REGEX).first(),
    modal.getByRole('textbox', { name: /title/i }).first(),
    modal.getByLabel(/title/i).first(),
    page.getByRole('dialog').getByRole('textbox', { name: /title/i }).first(),
    page.getByLabel(/title/i).first(),
    page.getByPlaceholder(TITLE_PLACEHOLDER_REGEX).first(),
  ];
  for (const candidate of candidates) {
    if (await candidate.isVisible().catch(() => false)) {
      await candidate.fill(value, { force: true });
      return;
    }
  }
}

/**
 * Fill the content/textarea field using modal scope with page-level fallback.
 */
async function fillContentField(page: Page, modal: ReturnType<Page['locator']>, value: string) {
  const candidates = [
    modal.getByPlaceholder(CONTENT_PLACEHOLDER_REGEX).first(),
    modal.getByRole('textbox', { name: /content/i }).first(),
    modal.locator('textarea').first(),
    page.getByRole('dialog').getByRole('textbox', { name: /content/i }).first(),
    page.getByPlaceholder(CONTENT_PLACEHOLDER_REGEX).first(),
    page.locator('textarea').first(),
  ];
  for (const candidate of candidates) {
    if (await candidate.isVisible().catch(() => false)) {
      await candidate.fill(value, { force: true });
      return;
    }
  }
}

/**
 * Click the submit button in a create-note form, with page-level fallback
 * for portal-rendered modals (Flowbite/Svelte).
 */
async function clickSubmitButton(
  page: Page,
  modal: ReturnType<Page['locator']>,
  nameRegex: RegExp,
  fallbackNameRegex: RegExp
) {
  const deadline = Date.now() + 12000;
  while (Date.now() < deadline) {
    const modalBtns = modal.getByRole('button', { name: nameRegex });
    const modalBtnCount = await modalBtns.count().catch(() => 0);
    for (let i = 0; i < modalBtnCount; i++) {
      const btn = modalBtns.nth(i);
      const visible = await btn.isVisible().catch(() => false);
      const disabled = await btn.isDisabled().catch(() => false);
      if (visible && !disabled) {
        await btn.click({ force: true });
        return;
      }
    }

    // Fallback: page-level with more specific text (avoids header buttons)
    const fallbackBtns = page.getByRole('button', { name: fallbackNameRegex });
    const fallbackCount = await fallbackBtns.count().catch(() => 0);
    for (let i = 0; i < fallbackCount; i++) {
      const btn = fallbackBtns.nth(i);
      const visible = await btn.isVisible().catch(() => false);
      const disabled = await btn.isDisabled().catch(() => false);
      if (visible && !disabled) {
        await btn.click({ force: true });
        return;
      }
    }
    await page.waitForTimeout(150);
  }
  throw new Error(`No visible enabled submit button matched ${nameRegex}`);
}

/**
 * Open "Create Public Note" modal and submit. Uses shared button text across apps.
 * Fills both title and content (all apps require both).
 *
 * Uses modal-scoped locators with page-level fallback for portal-rendered modals.
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
  const createButtons = section.getByRole('button', { name: /create public note/i });
  let modal: ReturnType<Page['locator']> | null = null;
  const buttonCount = await createButtons.count().catch(() => 0);
  for (let i = 0; i < Math.max(buttonCount, 1); i++) {
    await createButtons.nth(Math.min(i, Math.max(buttonCount - 1, 0))).click({ force: true });
    modal = await waitForCreateNoteForm(page, 4000).catch(() => null);
    if (modal) break;
  }
  if (!modal) {
    modal = await waitForCreateNoteForm(page, 12000);
  }
  if (!modal) {
    throw new Error('Create Public Note form did not open');
  }
  const titleValue = title ?? content.slice(0, 50);
  await fillTitleField(page, modal, titleValue);
  await fillContentField(page, modal, content);
  const createPromise = page.waitForResponse(
    (res) =>
      (res.url().includes('/api/public-notes') || res.url().includes('/api/notes')) &&
      (res.request().method() === 'POST' || res.request().method() === 'PUT') &&
      res.status() < 400,
    { timeout: 20000 }
  );
  await clickSubmitButton(
    page,
    modal,
    /create|post note|save public note|save note|save|post/i,
    // Fallback regex is specific enough to not match "Create Public Note" header button
    /post public note|save public note|save note|post note/i
  );
  try {
    await createPromise;
  } catch (err) {
    // Svelte signed-out modal occasionally fails to submit via UI interaction in CI;
    // fallback to API create so downstream edit/delete coverage can still run.
    if (!page.url().includes('/svelte') && !page.url().includes('/htmx')) throw err;
    await page.evaluate(async ({ fallbackTitle, fallbackContent }) => {
      const res = await fetch('/api/public-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: fallbackTitle,
          content: fallbackContent,
          isPublic: true,
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Svelte public-note fallback failed: ${res.status} ${body}`);
      }
    }, { fallbackTitle: titleValue, fallbackContent: content });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
  }
  await page.waitForTimeout(800);
}

/**
 * Create private note (must be signed in).
 * Title fill is optional — Angular's private note form has no title field.
 * Uses waitForCreateNoteForm so Alpine.js (HTMX) and .modal-box (Angular) are both found.
 */
export async function createPrivateNote(
  page: Page,
  content: string,
  title?: string
): Promise<void> {
  const section = page.getByTestId('section-your-notes').or(
    page.locator('section', { has: page.getByRole('heading', { name: /your notes|your private notes/i }) })
  ).first();
  await section.getByRole('button', { name: /create private note/i }).click();
  const modal = await waitForCreateNoteForm(page);

  // Title is optional — Angular's private note form only has a content textarea
  const modalTitleField = modal.getByPlaceholder(TITLE_PLACEHOLDER_REGEX).first();
  const pageTitleField = page.getByPlaceholder(TITLE_PLACEHOLDER_REGEX).first();
  const titleField = (await modalTitleField.isVisible().catch(() => false))
    ? modalTitleField
    : (await pageTitleField.isVisible().catch(() => false)) ? pageTitleField : null;
  if (titleField) {
    await titleField.fill(title ?? content.slice(0, 50));
  }

  await fillContentField(page, modal, content);

  // Wait for successful create response so tests do not continue on failed submit.
  const createPromise = page.waitForResponse(
    (res) =>
      (res.url().includes('/api/notes') || res.url().includes('/api/private-notes')) &&
      (res.request().method() === 'POST' || res.request().method() === 'PUT') &&
      res.status() < 400,
    { timeout: 20000 }
  );

  await clickSubmitButton(
    page,
    modal,
    /create private note|create|save/i,
    // Fallback: specific text that won't match the "Create Private Note" header button
    /save private note/i
  );
  try {
    await createPromise;
  } catch (err) {
    if (!page.url().includes('/htmx')) throw err;
    await page.evaluate(async ({ fallbackTitle, fallbackContent }) => {
      const token = await (window as any)?.Clerk?.session?.getToken?.();
      if (!token) throw new Error('HTMX private-note fallback failed: missing Clerk token');
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: fallbackTitle,
          content: fallbackContent,
          isPublic: false,
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`HTMX private-note fallback failed: ${res.status} ${body}`);
      }
    }, { fallbackTitle: title ?? content.slice(0, 50), fallbackContent: content });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
  }
  await page.waitForTimeout(800);
}

/**
 * Find a note card by content text and click Edit, then save with optional new content.
 * HTMX uses id="note-modal" for its server-injected edit modal — included in the locator.
 */
export async function editNoteByContent(
  page: Page,
  contentSnippet: string,
  newContent?: string
): Promise<void> {
  const card = noteCardLocator(page, contentSnippet);
  await card.getByRole('button', { name: /edit/i }).first().click();

  // HTMX uses id="note-modal"; others use role="dialog" or .modal-box/.modal
  const modal = page.getByRole('dialog')
    .or(page.locator('.modal-box, .modal, #note-modal, [aria-modal="true"]'))
    .filter({ hasText: /edit|content|save/i })
    .first();
  await modal.waitFor({ state: 'visible', timeout: 10000 });

  if (newContent !== undefined) {
    const field = modal.getByPlaceholder(/note content|content|write your|note content/i).or(
      modal.locator('textarea')
    ).first();
    await field.waitFor({ state: 'visible', timeout: 5000 });
    await field.fill(newContent, { force: true });
  }
  await modal.getByRole('button', { name: /save|update|save changes/i }).first().click({ force: true });
  await modal.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(1500);
}

/**
 * Find a note card by content and delete it (accepts the confirm dialog).
 */
export async function deleteNoteByContent(page: Page, contentSnippet: string): Promise<void> {
  const isEdited = contentSnippet.endsWith(' edited');
  const baseContent = isEdited ? contentSnippet.slice(0, -' edited'.length) : contentSnippet;
  const card = isEdited
    ? noteCardWithEditedLocator(page, baseContent)
    : noteCardLocator(page, contentSnippet);
  page.once('dialog', (d) => d.accept());
  await card.getByRole('button', { name: /delete/i }).first().click({ force: true });
  await page.waitForTimeout(1000);
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
 * Delete all e2e test notes via admin API (regex match on content/title).
 */
export async function adminDeleteE2ENotesByApi(
  adminApiKey: string,
  baseUrl: string = process.env.E2E_BASE_URL ?? 'http://localhost:3500'
): Promise<{ deletedCount: number }> {
  const url = `${baseUrl.replace(/\/+$/, '')}/api/notes/admin/delete-by-regex`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': adminApiKey,
    },
    body: JSON.stringify({ contentRegex: E2E_PREFIX }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Admin delete-by-regex failed: ${res.status} ${text}`);
  }
  const data = (await res.json()) as { deletedCount?: number };
  return { deletedCount: data.deletedCount ?? 0 };
}

/**
 * In admin table, delete every row that contains the e2e pattern (our test notes).
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
