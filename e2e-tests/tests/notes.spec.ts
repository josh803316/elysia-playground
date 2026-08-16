/**
 * E2E: For each app (React, Vue, Angular, Svelte, Vanilla JS, HTMX), validate:
 * - Create public note, edit it, delete it (per-app, unauthenticated)
 * - Create private note (signed in), edit it (if supported), delete it
 *
 * Auth strategy: globalSetup signs in once and saves storage state to
 * playwright/.auth/user.json. All tests (public + private) run with that
 * session pre-loaded — no per-test clerk.signIn() overhead.
 *
 * supportsPrivateNoteEdit: Angular, Vanilla JS, and HTMX private note cards
 * render only a Delete button, so the edit step is skipped for those apps.
 */
import {readFileSync, existsSync} from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import {test, expect} from '@playwright/test';
import {clerk, setupClerkTestingToken} from '@clerk/testing/playwright';
import {APP_PATHS, type AppName} from './helpers/apps.js';
import {requireEnvVars} from './helpers/env.js';

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
  'notes.spec (E2E flows)',
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
  waitForNoteCardVisible,
  waitForNoteCardGone,
  waitForClerkSessionToken,
} from './helpers/notes-flow.js';
import {resetTimer, timed, logStep, attachApiLogger} from './helpers/timing.js';

/* ── Shared beforeEach: restore Clerk testing token ── */

function sharedBeforeEach(appName: string) {
  return async ({page}: {page: import('@playwright/test').Page}) => {
    resetTimer();
    // Clear any admin state left in localStorage (e.g. from prior browser sessions with channel:'chrome')
    await page.addInitScript(() => {
      localStorage.removeItem('adminApiKey');
    });
    logStep(`beforeEach: ${appName} — start`);
    attachApiLogger(page);
    loadClerkEnvFromFile();
    await timed('setupClerkTestingToken', () => setupClerkTestingToken({page}));
    logStep(`beforeEach: ${appName} — done`);
  };
}

/* ── Public note tests: one per app ── */

for (const appDef of APP_PATHS) {
  const {name: appName, path: appPath} = appDef;

  test.describe(`${appName} app`, () => {
    test.beforeEach(sharedBeforeEach(appName));

    test('public note: create, edit, delete', async ({page}) => {
      if (appName === 'htmx') test.slow();
      const appNameTyped = appName as AppName;
      const content = publicNoteContent(appNameTyped);
      const title = publicNoteTitle(appNameTyped);
      logStep(`TEST public note: create, edit, delete — ${appName}`);

      await timed(`page.goto ${appPath}`, () => page.goto(appPath, {waitUntil: 'domcontentloaded', timeout: 20_000}));
      await timed('waitForLoadState load', () => page.waitForLoadState('load'));
      const pageReady = page
        .getByTestId('section-public-notes')
        .or(page.getByRole('heading', {name: /public notes/i}))
        .or(page.getByRole('button', {name: /sign in|create public note/i}))
        .or(page.getByRole('link', {name: /home|my notes/i}))
        .first();
      await timed('wait for page ready', () => expect(pageReady).toBeVisible({timeout: 25_000}));

      // Svelte: ClerkProvider blocks full render until Clerk initializes from session cookies.
      // Wait for an element only present after client-side hydration (GlobalSearch or sign-in button).
      if (appName === 'svelte') {
        await timed('wait for svelte hydration', () =>
          page
            .getByTestId('global-search-input')
            .or(page.getByRole('button', {name: /sign in|sign out/i}).first())
            .first()
            .waitFor({state: 'visible', timeout: 30_000})
            .catch(() => {}),
        );
      }

      await timed('createPublicNote', () => createPublicNote(page, appPath, content, title));
      await timed('wait for note visible after create', () => waitForNoteCardVisible(page, content, 15_000));

      const refetchPromise = page
        .waitForResponse(
          (res) =>
            (res.url().includes('/api/public-notes') || res.url().includes('/htmx/notes')) &&
            res.request().method() === 'GET' &&
            res.status() === 200,
          {timeout: 20000},
        )
        .catch(() => {});
      await timed('editNoteByContent', () => editNoteByContent(page, content, content + ' edited'));
      await timed('wait for refetch after edit', () => refetchPromise);

      const editedContent = content + ' edited';
      await timed('wait for edited content visible', () => waitForNoteCardVisible(page, editedContent, 20_000));

      const deletePromise = page
        .waitForResponse(
          (res) =>
            (res.url().includes('/api/public-notes') ||
              res.url().includes('/api/notes') ||
              res.url().includes('/htmx/notes')) &&
            res.request().method() === 'DELETE' &&
            res.status() < 400,
          {timeout: 15000},
        )
        .catch(() => {});
      await timed('deleteNoteByContent', () => deleteNoteByContent(page, editedContent));
      await timed('wait for delete response', () => deletePromise);
      await timed('wait for note gone', () => waitForNoteCardGone(page, editedContent, 10_000));
      logStep(`TEST public note DONE — ${appName}`);
    });
  });
}

/* ── Private note tests: auth from storageState, no per-test signIn ── */

test.describe('private notes (signed in)', () => {
  // Serial so tests don't compete for private note visibility across apps
  test.describe.configure({mode: 'serial'});

  test.beforeEach(async ({page}) => {
    resetTimer();
    await page.addInitScript(() => {
      localStorage.removeItem('adminApiKey');
    });
    attachApiLogger(page);
    loadClerkEnvFromFile();
    await timed('setupClerkTestingToken', () => setupClerkTestingToken({page}));
  });

  for (const appDef of APP_PATHS) {
    const {name: appName, path: appPath, supportsPrivateNoteEdit} = appDef;

    test(`${appName}: private note create, edit, delete`, async ({page}) => {
      if (appName === 'htmx') test.slow();
      const appNameTyped = appName as AppName;
      const content = privateNoteContent(appNameTyped);
      const title = privateNoteTitle(appNameTyped);
      logStep(`TEST private note: create, edit, delete — ${appName}`);

      // HTMX uses Clerk's browser bundle directly and cannot refresh the
      // short-lived storageState JWT the way the framework SDKs do. Renew its
      // session immediately before exercising the authenticated HTMX page.
      if (appName === 'htmx') {
        await timed('refresh Clerk session for HTMX', async () => {
          await page.goto('/react', {waitUntil: 'domcontentloaded', timeout: 20_000});
          await page.waitForLoadState('load');
          await clerk
            .signIn({
              page,
              signInParams: {strategy: 'email_code', identifier: process.env.CLERK_TEST_EMAIL!},
            })
            .catch((error: unknown) => {
              if (!(error instanceof Error) || !error.message.includes("You're already signed in")) throw error;
            });
        });
      }

      // Navigate to app — storage state provides auth session automatically.
      await timed(`page.goto ${appPath}`, () => page.goto(appPath, {waitUntil: 'domcontentloaded', timeout: 20_000}));
      await timed('waitForLoadState load', () => page.waitForLoadState('load'));

      await timed('wait for Create Private Note button', () =>
        expect(page.getByRole('button', {name: /create private note/i})).toBeVisible({timeout: 25_000}),
      );

      const yourNotes = page
        .getByTestId('section-your-notes')
        .or(page.locator('section', {has: page.getByRole('heading', {name: /your notes|your private notes/i})}))
        .first();
      await timed('wait for your notes section', () => expect(yourNotes).toBeVisible({timeout: 10_000}));

      await timed('waitForClerkSessionToken', () => waitForClerkSessionToken(page, 15_000));
      await timed('createPrivateNote', () => createPrivateNote(page, content, title));
      await timed('wait for note visible after create', () =>
        expect(page.getByText(title).or(page.getByText(content)).first()).toBeVisible({timeout: 10000}),
      );

      if (supportsPrivateNoteEdit) {
        await timed('editNoteByContent (private)', () => editNoteByContent(page, content, content + ' edited'));
        const editedContent = content + ' edited';
        await timed('wait for edited content visible', () =>
          expect(page.getByText(editedContent).first()).toBeVisible({timeout: 20_000}),
        );

        const deletePromise = page
          .waitForResponse(
            (res) =>
              (res.url().includes('/api/') || res.url().includes('/htmx/')) &&
              res.request().method() === 'DELETE' &&
              res.status() < 400,
            {timeout: 15000},
          )
          .catch(() => {});
        await timed('deleteNoteByContent (private, edited)', () => deleteNoteByContent(page, editedContent));
        await timed('wait for delete response', () => deletePromise);
        await timed('wait for note gone', () => expect(page.getByText(editedContent)).not.toBeVisible({timeout: 8000}));
      } else {
        const deletePromise = page
          .waitForResponse(
            (res) =>
              (res.url().includes('/api/') || res.url().includes('/htmx/')) &&
              res.request().method() === 'DELETE' &&
              res.status() < 400,
            {timeout: 15000},
          )
          .catch(() => {});
        await timed('deleteNoteByContent (private, no edit)', () => deleteNoteByContent(page, content));
        await timed('wait for delete response', () => deletePromise);
        await page.reload({waitUntil: 'domcontentloaded'});
        await page.waitForLoadState('load');
        await timed('wait for note gone', () => expect(page.getByText(content)).not.toBeVisible({timeout: 8000}));
      }
      logStep(`TEST private note DONE — ${appName}`);
    });
  }
});

// Admin cleanup is handled by globalTeardown (playwright.config.ts) which runs
// after ALL tests complete, avoiding race conditions with parallel test execution.
