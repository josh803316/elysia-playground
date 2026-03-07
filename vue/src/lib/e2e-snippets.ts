/**
 * E2E/Playwright test snippets. Source: e2e-tests/snippets.ts
 */
export const NAV_AUTH_TEST_SNIPPET = `// e2e-tests/tests/notes.spec.ts, global-search.spec.ts
test.beforeEach(async ({ page }) => {
  await setupClerkTestingToken({ page });
});
test('page ready', async ({ page }) => {
  await page.goto(appPath, { waitUntil: 'domcontentloaded' });
  const pageReady = page.getByTestId('section-public-notes')
    .or(page.getByRole('heading', { name: /public notes/i }))
    .or(page.getByRole('button', { name: /sign in|create public note/i }));
  await expect(pageReady).toBeVisible({ timeout: 25_000 });
});`;

export const PUBLIC_NOTES_TEST_SNIPPET = `// e2e-tests/tests/notes.spec.ts — public note: create, edit, delete
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
});`;

export const ADMIN_TEST_SNIPPET = `// e2e-tests/tests/notes.spec.ts — Admin cleanup in globalTeardown
// globalTeardown deletes notes matching e2eNotePattern() after all tests complete.`;

export const GLOBAL_SEARCH_TEST_SNIPPET = `// e2e-tests/tests/global-search.spec.ts
test('search input triggers search request', async ({ page }) => {
  const searchbox = page.getByRole('searchbox', { name: /search notes/i })
    .or(page.getByTestId('global-search-input')).first();
  await expect(searchbox).toBeVisible({ timeout: 10_000 });
  const responsePromise = page.waitForResponse(
    (res) => res.url().includes('/api/notes/search') && res.request().method() === 'GET',
    { timeout: 15_000 }
  );
  await searchbox.fill(searchTerm);
  await responsePromise;
});`;
