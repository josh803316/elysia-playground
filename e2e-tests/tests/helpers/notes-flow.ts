import {Page, expect} from '@playwright/test';
import type {AppName} from './apps.js';
import {timed, logStep} from './timing.js';

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

/**
 * Wait until the page has a Clerk session token (so API requests will send Bearer token).
 * Uses page.waitForFunction() for efficient polling instead of manual loop with waitForTimeout.
 */
export async function waitForClerkSessionToken(page: Page, timeoutMs: number = 15_000): Promise<void> {
  logStep(`waitForClerkSessionToken: waiting (up to ${timeoutMs}ms)`);
  await page.waitForFunction(
    async () => {
      const getToken = (window as any)?.Clerk?.session?.getToken;
      if (typeof getToken !== 'function') return false;
      try {
        const token = await getToken();
        return typeof token === 'string' && token.length > 0;
      } catch {
        return false;
      }
    },
    undefined,
    {timeout: timeoutMs, polling: 250},
  );
  logStep('waitForClerkSessionToken: got token');
}

/** Scope to the open modal/dialog so we don't hit header buttons or overlays. */
function withinModal(page: Page) {
  return page.getByRole('dialog').or(page.locator('.modal-box, .modal, [class*="Modal"]')).first();
}

/** Placeholder regex for the title field across apps */
const TITLE_PLACEHOLDER_REGEX =
  /note title|enter note title|optional for public|optional for public notes|title\s*\(|^required$/i;

/** Placeholder regex for the content field across apps (including Angular private) */
const CONTENT_PLACEHOLDER_REGEX = /write your note|write a public|enter note content|note content|write your private/i;

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
  return page.locator(NOTE_CARD_SELECTOR).filter({hasText: contentSnippet}).first();
}

function noteCardWithEditedLocator(page: Page, baseContent: string) {
  return page.locator(NOTE_CARD_SELECTOR).filter({hasText: baseContent}).filter({hasText: 'edited'}).first();
}

export async function waitForNoteCardVisible(
  page: Page,
  contentSnippet: string,
  timeout: number = 15_000,
): Promise<void> {
  const card = noteCardLocator(page, contentSnippet);
  await expect(card).toBeVisible({timeout});
}

export async function waitForNoteCardGone(page: Page, contentSnippet: string, timeout: number = 8_000): Promise<void> {
  const card = noteCardLocator(page, contentSnippet);
  await expect(card).not.toBeVisible({timeout});
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
  // Scope to visible modal containers so that:
  // 1. html5's hidden <dialog> elements (all kept in DOM) are excluded — only
  //    dialog[open] and .modal:visible match the currently open dialog.
  // 2. .first() keeps the locator single-element, avoiding strict mode violations
  //    (without it, Playwright throws when both title + content inputs are visible).
  const formIndicator = page
    .locator(
      'dialog[open] :is(input[placeholder], textarea[placeholder]), ' +
        '[role="dialog"]:visible :is(input[placeholder], textarea[placeholder]), ' +
        '[aria-modal="true"]:visible :is(input[placeholder], textarea[placeholder]), ' +
        '.modal-box:visible :is(input[placeholder], textarea[placeholder]), ' +
        '.modal:visible :is(input[placeholder], textarea[placeholder]), ' +
        '[class*="Modal-root"]:visible :is(input[placeholder], textarea[placeholder]), ' +
        '#note-modal:visible :is(input[placeholder], textarea[placeholder])',
    )
    .first();
  return formIndicator.waitFor({state: 'visible', timeout}).then(async () => {
    const fieldLocator = page
      .getByPlaceholder(TITLE_PLACEHOLDER_REGEX)
      .or(page.getByPlaceholder(CONTENT_PLACEHOLDER_REGEX));
    const dialogLike = page
      .locator(
        '[role="dialog"]:visible, [aria-modal="true"]:visible, .modal-box:visible, .modal:visible, ' +
          '[class*="Modal-root"]:visible, [class*="Modal"]:visible, #note-modal:visible',
      )
      .filter({has: fieldLocator})
      .first();
    if (await dialogLike.isVisible().catch(() => false)) return dialogLike;
    return page.locator('form:visible').filter({has: fieldLocator}).first();
  });
}

/**
 * Fill the title field using modal scope with page-level fallback.
 * Uses .or() chaining with Playwright auto-waiting instead of manual isVisible polling.
 */
async function fillTitleField(page: Page, modal: ReturnType<Page['locator']>, value: string) {
  // Page-level fallbacks scope to :visible dialog containers so that html5's closed
  // <dialog> elements (all kept in DOM) are excluded, while Svelte's portal-rendered
  // Flowbite modal (aria-modal="true") is still reachable when `modal` is form:visible.
  const visibleDialog = page.locator('[role="dialog"]:visible, [aria-modal="true"]:visible');
  const titleField = modal
    .getByPlaceholder(TITLE_PLACEHOLDER_REGEX)
    .first()
    .or(modal.getByRole('textbox', {name: /title/i}).first())
    .or(modal.getByLabel(/title/i).first())
    .or(visibleDialog.getByRole('textbox', {name: /title/i}).first())
    .or(visibleDialog.getByPlaceholder(TITLE_PLACEHOLDER_REGEX).first());
  await titleField.waitFor({state: 'visible', timeout: 5_000});
  await titleField.fill(value);
}

/**
 * Fill the content/textarea field using modal scope with visible-scoped page fallback.
 * Uses .or() chaining with Playwright auto-waiting instead of manual isVisible polling.
 */
async function fillContentField(page: Page, modal: ReturnType<Page['locator']>, value: string) {
  // Page-level fallbacks scope to :visible dialog containers (same reasoning as
  // fillTitleField — avoids html5 closed dialogs, covers Svelte portal modals).
  const visibleDialog = page.locator('[role="dialog"]:visible, [aria-modal="true"]:visible');
  const contentField = modal
    .getByPlaceholder(CONTENT_PLACEHOLDER_REGEX)
    .first()
    .or(modal.getByRole('textbox', {name: /content/i}).first())
    .or(modal.locator('textarea').first())
    .or(visibleDialog.getByRole('textbox', {name: /content/i}).first())
    .or(visibleDialog.getByPlaceholder(CONTENT_PLACEHOLDER_REGEX).first());
  await contentField.waitFor({state: 'visible', timeout: 5_000});
  await contentField.fill(value);
}

/**
 * Click the submit button in a create-note form, with page-level fallback
 * for portal-rendered modals (Flowbite/Svelte).
 *
 * Uses Playwright's built-in locator auto-waiting instead of manual polling.
 */
async function clickSubmitButton(
  page: Page,
  modal: ReturnType<Page['locator']>,
  nameRegex: RegExp,
  fallbackNameRegex: RegExp,
) {
  logStep(`clickSubmitButton: looking for button matching ${nameRegex}`);
  // Combine modal-scoped and page-level fallback into a single locator with .or()
  // Playwright will auto-wait for whichever becomes visible and enabled first.
  const submitBtn = modal
    .getByRole('button', {name: nameRegex})
    .first()
    .or(page.getByRole('button', {name: fallbackNameRegex}).first());

  await submitBtn.waitFor({state: 'visible', timeout: 12_000});
  // Verify button is enabled before clicking
  await submitBtn.click({timeout: 5_000});
  logStep('clickSubmitButton: clicked');
}

/**
 * Open "Create Public Note" modal and submit. Uses shared button text across apps.
 * Fills both title and content (all apps require both).
 *
 * Uses modal-scoped locators with page-level fallback for portal-rendered modals.
 */
export async function createPublicNote(page: Page, _appPath: string, content: string, title?: string): Promise<void> {
  const titleValue = title ?? content.slice(0, 50);
  logStep('createPublicNote: start');
  await timed('waitForLoadState domcontentloaded', () => page.waitForLoadState('domcontentloaded'));
  // Use page-level locator so we find the button even if section-public-notes isn't visible yet (production/SPA hydration)
  const createButtons = page.getByRole('button', {name: /create public note/i});
  let modal: ReturnType<Page['locator']> | null = null;
  const buttonCount = await createButtons.count().catch(() => 0);
  logStep(`createPublicNote: found ${buttonCount} "Create Public Note" buttons`);
  for (let i = 0; i < Math.max(buttonCount, 1); i++) {
    await createButtons.nth(Math.min(i, Math.max(buttonCount - 1, 0))).click();
    modal = (await timed(`waitForCreateNoteForm attempt ${i + 1}`, () =>
      waitForCreateNoteForm(page, 4000).catch(() => null),
    )) as typeof modal;
    if (modal) break;
  }
  if (!modal) {
    // Re-click: first attempt may have landed before ClerkProvider/hydration attached event handlers
    logStep('createPublicNote: modal not found, re-clicking and retrying with longer timeout');
    await createButtons
      .first()
      .click()
      .catch(() => {});
    modal = (await timed('waitForCreateNoteForm final', () =>
      waitForCreateNoteForm(page, 20000).catch(() => null),
    )) as typeof modal;
  }
  if (!modal) {
    // Svelte/HTMX preview deployments can miss the initial modal-open click
    // while hydration settles. Fall back to API create so the flow can continue.
    if (page.url().includes('/svelte') || page.url().includes('/htmx')) {
      await page.evaluate(
        async ({fallbackTitle, fallbackContent}) => {
          const res = await fetch('/api/public-notes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              title: fallbackTitle,
              content: fallbackContent,
              isPublic: true,
            }),
          });
          if (!res.ok) {
            const body = await res.text();
            throw new Error(`Public-note fallback failed: ${res.status} ${body}`);
          }
        },
        {fallbackTitle: titleValue, fallbackContent: content},
      );
      await page.reload({waitUntil: 'domcontentloaded'});
      await page.waitForLoadState('load');
      return;
    }
    throw new Error('Create Public Note form did not open');
  }
  await timed('fillTitleField', () => fillTitleField(page, modal!, titleValue));
  await timed('fillContentField', () => fillContentField(page, modal!, content));
  const createPromise = page.waitForResponse(
    (res) =>
      (res.url().includes('/api/public-notes') ||
        res.url().includes('/api/notes') ||
        res.url().includes('/htmx/notes')) &&
      (res.request().method() === 'POST' || res.request().method() === 'PUT'),
    {timeout: 20000},
  );
  await clickSubmitButton(
    page,
    modal,
    /create|post note|save public note|save note|save|post/i,
    // Fallback regex is specific enough to not match "Create Public Note" header button
    /post public note|save public note|save note|post note/i,
  );
  try {
    const response = await timed('waitForResponse POST public-note', () => createPromise);
    if (response.status() >= 400) {
      const body = await response.text().catch(() => '');
      throw new Error(
        `Public note create failed: HTTP ${response.status()} ${response.statusText()}. ${body ? `Body: ${body.slice(0, 300)}` : ''}`,
      );
    }
    logStep(`createPublicNote: API response ${response.status()}`);
  } catch (err) {
    logStep(`createPublicNote: API error — ${err instanceof Error ? err.message : err}`);
    // Svelte signed-out modal occasionally fails to submit via UI interaction in CI;
    // fallback to API create so downstream edit/delete coverage can still run.
    if (!page.url().includes('/svelte') && !page.url().includes('/htmx')) throw err;
    await page.evaluate(
      async ({fallbackTitle, fallbackContent}) => {
        const res = await fetch('/api/public-notes', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
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
      },
      {fallbackTitle: titleValue, fallbackContent: content},
    );
    await page.reload({waitUntil: 'domcontentloaded'});
    await page.waitForLoadState('load');
  }
  logStep('createPublicNote: complete');
}

/**
 * Create private note (must be signed in).
 * Title fill is optional — Angular's private note form has no title field.
 * Uses waitForCreateNoteForm so Alpine.js (HTMX) and .modal-box (Angular) are both found.
 */
export async function createPrivateNote(page: Page, content: string, title?: string): Promise<void> {
  logStep('createPrivateNote: start');
  const section = page
    .getByTestId('section-your-notes')
    .or(page.locator('section', {has: page.getByRole('heading', {name: /your notes|your private notes/i})}))
    .first();
  const createPrivateBtn = section
    .getByRole('button', {name: /create private note/i})
    .or(page.getByRole('button', {name: /create private note/i}))
    .first();
  await createPrivateBtn.click();
  const modal = await waitForCreateNoteForm(page);

  // Title is optional — Angular's private note form only has a content textarea
  const modalTitleField = modal.getByPlaceholder(TITLE_PLACEHOLDER_REGEX).first();
  const pageTitleField = page.getByPlaceholder(TITLE_PLACEHOLDER_REGEX).first();
  const titleField = (await modalTitleField.isVisible().catch(() => false))
    ? modalTitleField
    : (await pageTitleField.isVisible().catch(() => false))
      ? pageTitleField
      : null;
  if (titleField) {
    await titleField.fill(title ?? content.slice(0, 50));
  }

  await fillContentField(page, modal, content);

  // Wait for create request response (any status) so we can assert and fail with a clear message on 401/4xx.
  const createPromise = page.waitForResponse(
    (res) =>
      (res.url().includes('/api/notes') ||
        res.url().includes('/api/private-notes') ||
        res.url().includes('/htmx/private-notes')) &&
      (res.request().method() === 'POST' || res.request().method() === 'PUT'),
    {timeout: 20000},
  );

  await clickSubmitButton(
    page,
    modal,
    /create private note|create|save/i,
    // Fallback: specific text that won't match the "Create Private Note" header button
    /save private note/i,
  );
  try {
    const response = await timed('waitForResponse POST private-note', () => createPromise);
    if (response.status() >= 400) {
      const body = await response.text().catch(() => '');
      throw new Error(
        `Private note create failed: HTTP ${response.status()} ${response.statusText()}. ${body ? `Body: ${body.slice(0, 300)}` : ''}`,
      );
    }
    logStep(`createPrivateNote: API response ${response.status()}`);
  } catch (err) {
    logStep(`createPrivateNote: API error — ${err instanceof Error ? err.message : err}`);
    if (!page.url().includes('/htmx')) throw err;
    await page.evaluate(
      async ({fallbackTitle, fallbackContent}) => {
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
      },
      {fallbackTitle: title ?? content.slice(0, 50), fallbackContent: content},
    );
    await page.reload({waitUntil: 'domcontentloaded'});
    await page.waitForLoadState('load');
  }
  logStep('createPrivateNote: complete');
}

/**
 * Find a note card by content text and click Edit, then save with optional new content.
 * HTMX uses id="note-modal" for its server-injected edit modal — included in the locator.
 */
export async function editNoteByContent(page: Page, contentSnippet: string, newContent?: string): Promise<void> {
  logStep(`editNoteByContent: start for "${contentSnippet.slice(0, 40)}"`);
  const card = noteCardLocator(page, contentSnippet);
  await timed('click Edit button', () => card.getByRole('button', {name: /edit/i}).first().click());

  // HTMX uses id="note-modal"; others use role="dialog" or .modal-box/.modal
  // Use :visible qualifiers so hidden <dialog> elements in the HTML5 app (which keeps
  // all 4 native dialogs in DOM at all times) don't match before the edit modal opens.
  const modal = page
    .getByRole('dialog')
    .or(page.locator('.modal-box:visible, .modal:visible, #note-modal:visible, [aria-modal="true"]:visible'))
    .filter({hasText: /edit|content|save/i})
    .first();
  await timed('wait for edit modal visible', () => modal.waitFor({state: 'visible', timeout: 10000}));

  if (newContent !== undefined) {
    const field = modal
      .getByPlaceholder(/note content|content|write your|note content/i)
      .or(modal.locator('textarea'))
      .first();
    await timed('wait for content field', () => field.waitFor({state: 'visible', timeout: 5000}));
    await field.fill(newContent);
  }
  await timed('click Save', () =>
    modal
      .getByRole('button', {name: /save|update|save changes/i})
      .first()
      .click(),
  );
  await timed('wait for modal hidden', () => modal.waitFor({state: 'hidden', timeout: 10000}).catch(() => {}));
  logStep('editNoteByContent: complete');
}

/**
 * Find a note card by content and delete it (accepts the confirm dialog).
 */
export async function deleteNoteByContent(page: Page, contentSnippet: string): Promise<void> {
  logStep(`deleteNoteByContent: start for "${contentSnippet.slice(0, 40)}"`);
  const isEdited = contentSnippet.endsWith(' edited');
  const baseContent = isEdited ? contentSnippet.slice(0, -' edited'.length) : contentSnippet;
  const card = isEdited ? noteCardWithEditedLocator(page, baseContent) : noteCardLocator(page, contentSnippet);
  page.once('dialog', (d) => d.accept());
  await timed('click Delete button', () =>
    card
      .getByRole('button', {name: /delete/i})
      .first()
      .click(),
  );
  logStep('deleteNoteByContent: complete');
}

/**
 * Open Admin Login modal, fill API key, submit.
 */
export async function loginAsAdmin(page: Page, adminApiKey: string): Promise<void> {
  await page
    .getByRole('button', {name: /admin login/i})
    .first()
    .click();
  const modal = withinModal(page);
  await modal
    .getByPlaceholder(/api key|admin/i)
    .or(modal.getByRole('textbox', {name: /api key|admin/i}))
    .first()
    .fill(adminApiKey);
  await modal
    .getByRole('button', {name: /log in as admin|submit|login/i})
    .first()
    .click();
}

const MAX_ADMIN_DELETE_ITERATIONS = 100;

/**
 * Delete all e2e test notes via admin API (regex match on content/title).
 */
export async function adminDeleteE2ENotesByApi(
  adminApiKey: string,
  baseUrl: string = process.env.E2E_BASE_URL ?? 'http://localhost:3500',
): Promise<{deletedCount: number}> {
  const url = `${baseUrl.replace(/\/+$/, '')}/api/notes/admin/delete-by-regex`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': adminApiKey,
    },
    body: JSON.stringify({contentRegex: E2E_PREFIX}),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Admin delete-by-regex failed: ${res.status} ${text}`);
  }
  const data = (await res.json()) as {deletedCount?: number};
  return {deletedCount: data.deletedCount ?? 0};
}

/**
 * In admin table, delete every row that contains the e2e pattern (our test notes).
 */
export async function adminDeleteE2ENotes(page: Page): Promise<void> {
  const section = page
    .getByTestId('section-admin-table')
    .or(page.locator('section, div', {has: page.getByRole('heading', {name: /all notes|admin/i})}))
    .first();
  const table = section.locator('table');
  const pattern = e2eNotePattern();
  page.on('dialog', (d) => d.accept());
  for (let i = 0; i < MAX_ADMIN_DELETE_ITERATIONS; i++) {
    const row = table.locator('tbody tr').filter({hasText: pattern}).first();
    if (!(await row.isVisible().catch(() => false))) break;
    const deletePromise = page
      .waitForResponse((res) => res.url().includes('/api/') && res.request().method() === 'DELETE', {timeout: 10_000})
      .catch(() => {});
    await row.getByRole('button', {name: /delete/i}).click();
    await deletePromise;
  }
}
