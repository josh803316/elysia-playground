/**
 * Cron keepalive "test": posts a weekly public note (anonymous) and a weekly
 * private/system note (via admin API key) using Playwright's request API.
 *
 * Run via Playwright CLI: `bunx playwright test tests/cron-keepalive.spec.ts`
 *
 * Intended to be triggered by a scheduled GitHub Action (weekly) against the
 * production E2E_BASE_URL (which talks to the live Supabase-backed DB). This
 * generates consistent DB write activity so the Supabase project does not
 * trigger inactivity/pause warnings.
 *
 * The notes include "playwright cli" in their content/body for traceability.
 */

import {test, expect} from '@playwright/test';
import {existsSync, readFileSync} from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvIfNeeded() {
  // In CI the envs are provided directly. For local manual runs, load e2e-tests/.env
  if (process.env.E2E_BASE_URL && process.env.E2E_ADMIN_API_KEY) return;
  const envPath = join(__dirname, '../.env');
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    const value = m[2].replace(/^["']|["']$/g, '').trim();
    if (process.env[m[1]] == null) process.env[m[1]] = value;
  }
}

test.describe('weekly keepalive via playwright cli', () => {
  test('posts public and private keepalive notes (playwright cli cron)', async ({request}) => {
    loadEnvIfNeeded();

    const baseUrl = (process.env.E2E_BASE_URL ?? 'http://localhost:3500').replace(/\/+$/, '');
    const adminApiKey = process.env.E2E_ADMIN_API_KEY ?? '';

    if (!adminApiKey) {
      test.skip(true, 'E2E_ADMIN_API_KEY not set; skipping keepalive note posting');
    }

    const timestamp = new Date().toISOString();
    const commonContent = `Automated weekly keepalive note posted using Playwright CLI (bunx playwright test) via GitHub Actions scheduled cron. Purpose: generate Supabase/Postgres write activity to prevent project pause warnings on the free tier due to inactivity. Timestamp: ${timestamp}`;

    // 1. Public note - no auth needed
    const publicTitle = `Weekly Public Keepalive Note - Playwright CLI - ${timestamp}`;
    const publicRes = await request.post(`${baseUrl}/api/public-notes`, {
      data: {
        title: publicTitle,
        content: commonContent,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(publicRes.ok(), `public note create failed: ${publicRes.status()}`).toBe(true);
    const publicNote = await publicRes.json();
    console.log('[cron-keepalive] created public note id=', publicNote?.id, 'title=', publicNote?.title);

    // 2. "Private" (system) note via the admin create endpoint (isPublic=false, userId=null)
    const privateTitle = `Weekly Private Keepalive Note - Playwright CLI - ${timestamp}`;
    const privateRes = await request.post(`${baseUrl}/api/notes/admin/create`, {
      data: {
        title: privateTitle,
        content: commonContent,
        isPublic: false,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': adminApiKey,
      },
    });

    expect(privateRes.ok(), `admin private note create failed: ${privateRes.status()}`).toBe(true);
    const privateNote = await privateRes.json();
    console.log(
      '[cron-keepalive] created admin/system note id=',
      privateNote?.id,
      'isPublic=',
      privateNote?.isPublic,
      'title=',
      privateNote?.title,
    );

    // Basic sanity: both writes succeeded and returned ids
    expect(publicNote?.id).toBeTruthy();
    expect(privateNote?.id).toBeTruthy();
  });
});
