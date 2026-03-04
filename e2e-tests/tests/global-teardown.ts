/**
 * Playwright global teardown: delete all e2e test notes via admin API.
 * Runs AFTER all tests complete (unlike the in-test admin cleanup which ran
 * in parallel with other tests and could delete notes mid-test).
 *
 * Falls back silently if the admin API key is not set.
 */
import {existsSync, readFileSync} from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvIfNeeded() {
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

export default async function globalTeardown() {
  loadEnvIfNeeded();
  const adminApiKey = process.env.E2E_ADMIN_API_KEY;
  const baseUrl = process.env.E2E_BASE_URL ?? 'http://localhost:3500';
  if (!adminApiKey) return;

  const url = `${baseUrl.replace(/\/+$/, '')}/api/notes/admin/delete-by-regex`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'X-API-Key': adminApiKey},
      body: JSON.stringify({contentRegex: 'e2e-'}),
    });
    if (res.ok) {
      const data = (await res.json()) as {deletedCount?: number};
      console.log(`[teardown] Deleted ${data.deletedCount ?? 0} e2e test notes`);
    } else {
      console.warn(`[teardown] Admin cleanup failed: ${res.status}`);
    }
  } catch (err) {
    console.warn(`[teardown] Admin cleanup error: ${err}`);
  }
}
