/**
 * E2E: Global search across React, Vue, Svelte, Angular.
 * - Search input is visible and accepts input
 * - Typing triggers search request and shows results or "No notes found"
 * - After creating a public note, searching for its content shows the note (or filters the list)
 *
 * Playwright best practices: use getByRole/getByPlaceholder, wait for network/visibility,
 * one assertion per concept, stable selectors (aria-label, placeholder).
 */
import {readFileSync, existsSync} from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import {test, expect} from '@playwright/test';
import {setupClerkTestingToken} from '@clerk/testing/playwright';
import {APP_PATHS} from './helpers/apps.js';
import {requireEnvVars} from './helpers/env.js';
import {publicNoteTitle, publicNoteContent, createPublicNote} from './helpers/notes-flow.js';
import {resetTimer, timed, logStep, attachApiLogger} from './helpers/timing.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadClerkEnvFromFile() {
  const path = join(__dirname, '../playwright/.auth/clerk-env.json');
  if (!existsSync(path)) return;
  const data = JSON.parse(readFileSync(path, 'utf8'));
  if (data.CLERK_FAPI) process.env.CLERK_FAPI = data.CLERK_FAPI;
  if (data.CLERK_TESTING_TOKEN) process.env.CLERK_TESTING_TOKEN = data.CLERK_TESTING_TOKEN;
}

requireEnvVars(['E2E_BASE_URL', 'CLERK_PUBLISHABLE_KEY', 'CLERK_SECRET_KEY', 'CLERK_TEST_EMAIL'], 'global-search.spec');

/** Apps that have the global search input in the header */
const APPS_WITH_GLOBAL_SEARCH = ['react', 'vue', 'svelte', 'angular'] as const;

test.describe('Global search', () => {
  for (const appDef of APP_PATHS) {
    const {name: appName, path: appPath} = appDef;
    if (!APPS_WITH_GLOBAL_SEARCH.includes(appName as (typeof APPS_WITH_GLOBAL_SEARCH)[number])) continue;

    test.describe(`${appName} app`, () => {
      test.beforeEach(async ({page}) => {
        resetTimer();
        // Clear any admin state left in localStorage from prior sessions
        await page.addInitScript(() => {
          localStorage.removeItem('adminApiKey');
        });
        logStep(`beforeEach: ${appName} (global-search) — start`);
        attachApiLogger(page);
        loadClerkEnvFromFile();
        await timed('setupClerkTestingToken', () => setupClerkTestingToken({page}));
        await timed(`page.goto ${appPath}`, () => page.goto(appPath, {waitUntil: 'domcontentloaded', timeout: 20_000}));
        await timed('waitForLoadState load', () => page.waitForLoadState('load'));
        // Page ready: public notes section or heading (preferred), or searchbox/nav as fallback (production may hydrate slowly)
        const pageReady = page
          .getByTestId('section-public-notes')
          .or(page.getByRole('heading', {name: /public notes/i}))
          .or(page.getByRole('searchbox', {name: /search notes/i}))
          .or(page.getByTestId('global-search-input'))
          .or(page.getByRole('button', {name: /sign in/i}))
          .or(page.getByRole('link', {name: /home/i}))
          .first();
        await timed('wait for page ready', () => expect(pageReady).toBeVisible({timeout: 25_000}));
        // Ensure search input is visible for global-search tests.
        // Svelte: ClerkProvider initializing from session cookies can take up to 20s.
        await timed('wait for search input', () =>
          expect(
            page
              .getByRole('searchbox', {name: /search notes/i})
              .or(page.getByTestId('global-search-input'))
              .or(page.getByPlaceholder(/search notes/i))
              .first(),
          ).toBeVisible({timeout: 30_000}),
        );
        logStep(`beforeEach: ${appName} (global-search) — done`);
      });

      test('search input is visible and triggers search request', async ({page}) => {
        const searchbox = page
          .getByRole('searchbox', {name: /search notes/i})
          .or(page.getByTestId('global-search-input'))
          .or(page.getByPlaceholder(/search notes/i))
          .or(page.locator('input[type="search"]').first())
          .first();
        await expect(searchbox).toBeVisible({timeout: 10_000});

        const searchTerm = `e2e-search-${Date.now()}`;
        const responsePromise = page.waitForResponse(
          (res) => res.url().includes('/api/notes/search') && res.request().method() === 'GET' && res.status() === 200,
          {timeout: 15_000},
        );

        await searchbox.fill(searchTerm);
        await responsePromise;

        await expect(
          page
            .getByText(/no notes found/i)
            .or(page.locator('a[href*="/notes/"], button.search-result, [class*="search-result"]').first()),
        ).toBeVisible({timeout: 5_000});
      });

      test('after creating a public note, search finds it or list shows it', async ({page}) => {
        const appNameTyped = appName as 'react' | 'vue' | 'svelte' | 'angular';
        const title = publicNoteTitle(appNameTyped);
        const content = publicNoteContent(appNameTyped);

        await createPublicNote(page, appPath, content, title);
        await expect(page.getByText(title).or(page.getByText(content)).first()).toBeVisible({timeout: 10_000});

        const searchbox = page
          .getByRole('searchbox', {name: /search notes/i})
          .or(page.getByTestId('global-search-input'))
          .or(page.getByPlaceholder(/search notes/i))
          .or(page.locator('input[type="search"]').first())
          .first();
        await expect(searchbox).toBeVisible({timeout: 10_000});

        const uniquePart = content.slice(0, 30);
        const responsePromise = page.waitForResponse(
          (res) => res.url().includes('/api/notes/search') && res.status() === 200,
          {timeout: 15_000},
        );

        await searchbox.fill(uniquePart);
        await responsePromise;

        await expect(page.getByText(uniquePart).or(page.getByText(title)).first()).toBeVisible({timeout: 10_000});
      });
    });
  }
});
