/**
 * Short Playwright/E2E code snippets shown in the app next to each section's app code.
 * Full tests: e2e-tests/tests/notes.spec.ts, global-search.spec.ts
 */

export const NAV_AUTH_TEST_SNIPPET = `// e2e-tests/tests/notes.spec.ts, global-search.spec.ts
// Nav/auth: session restored in beforeEach via setupClerkTestingToken; page ready
// uses getByTestId('section-public-notes') or getByRole('heading', { name: /public notes/i })

test.beforeEach(async ({ page }) => {
  await setupClerkTestingToken({ page });
});

test('page ready', async ({ page }) => {
  await page.goto(appPath, { waitUntil: 'domcontentloaded' });
  const pageReady = page
    .getByTestId('section-public-notes')
    .or(page.getByRole('heading', { name: /public notes/i }))
    .or(page.getByRole('button', { name: /sign in|create public note/i }));
  await expect(pageReady).toBeVisible({ timeout: 25_000 });
});`;

export const PUBLIC_NOTES_TEST_SNIPPET = `// e2e-tests/tests/notes.spec.ts — public note: create, edit, delete
// Helpers: createPublicNote, editNoteByContent, deleteNoteByContent, waitForNoteCardVisible

test('public note: create, edit, delete', async ({ page }) => {
  await page.goto(appPath, { waitUntil: 'domcontentloaded' });
  await expect(page.getByTestId('section-public-notes').or(
    page.getByRole('heading', { name: /public notes/i })
  )).toBeVisible({ timeout: 25_000 });

  await createPublicNote(page, appPath, content, title);
  await waitForNoteCardVisible(page, content, 15_000);

  await editNoteByContent(page, content, content + ' edited');
  await waitForNoteCardVisible(page, content + ' edited', 20_000);

  await deleteNoteByContent(page, content + ' edited');
  await waitForNoteCardGone(page, content + ' edited', 10_000);
});`;

export const PRIVATE_NOTES_TEST_SNIPPET = `// e2e-tests/tests/notes.spec.ts — private notes (signed in)
// Auth from storageState; Create Private Note button visible after load

test('private note create, edit, delete', async ({ page }) => {
  await page.goto(appPath, { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('button', { name: /create private note/i }))
    .toBeVisible({ timeout: 25_000 });

  const yourNotes = page.getByTestId('section-your-notes')
    .or(page.locator('section', { has: page.getByRole('heading', { name: /your notes/i }) }));
  await expect(yourNotes).toBeVisible({ timeout: 10_000 });

  await waitForClerkSessionToken(page, 15_000);
  await createPrivateNote(page, content, title);
  await expect(page.getByText(title).or(page.getByText(content)).first())
    .toBeVisible({ timeout: 10_000 });
  // ... edit (if supported), delete
});`;

export const ADMIN_TEST_SNIPPET = `// Admin: cleanup in globalTeardown (e2e-tests/tests/notes.spec.ts)
// Notes flow uses createPublicNote/createPrivateNote; admin view tested via
// globalTeardown which deletes notes matching e2eNotePattern()

// In notes.spec.ts:
// "Admin cleanup is handled by globalTeardown (playwright.config.ts)
//  which runs after ALL tests complete."`;

export const GLOBAL_SEARCH_TEST_SNIPPET = `// e2e-tests/tests/global-search.spec.ts — React, Vue, Svelte, Angular
// Search input visible; typing triggers GET /api/notes/search; results or "No notes found"

test('search input is visible and triggers search request', async ({ page }) => {
  const searchbox = page
    .getByRole('searchbox', { name: /search notes/i })
    .or(page.getByTestId('global-search-input'))
    .or(page.getByPlaceholder(/search notes/i))
    .first();
  await expect(searchbox).toBeVisible({ timeout: 10_000 });

  const responsePromise = page.waitForResponse(
    (res) => res.url().includes('/api/notes/search') && res.request().method() === 'GET',
    { timeout: 15_000 }
  );
  await searchbox.fill(searchTerm);
  await responsePromise;
});`;
