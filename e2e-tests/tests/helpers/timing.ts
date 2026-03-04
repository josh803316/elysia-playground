/**
 * Timing helpers for e2e test performance debugging.
 * Wraps operations with console.log output showing elapsed ms.
 */

let _testStart = Date.now();

export function resetTimer() {
  _testStart = Date.now();
}

export function elapsed(): number {
  return Date.now() - _testStart;
}

/** Log a step with elapsed time since test start */
export function logStep(label: string, extraMs?: number) {
  const e = elapsed();
  const extra = extraMs !== undefined ? ` [+${extraMs}ms]` : '';
  console.log(`[T+${e}ms] ${label}${extra}`);
}

/**
 * Wrap an async operation with timing logs.
 * Returns the result and logs start/end with elapsed time.
 */
export async function timed<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const start = Date.now();
  logStep(`START: ${label}`);
  try {
    const result = await fn();
    const took = Date.now() - start;
    logStep(`END: ${label}`, took);
    return result;
  } catch (err) {
    const took = Date.now() - start;
    logStep(`FAIL: ${label} (after ${took}ms) — ${err instanceof Error ? err.message : err}`);
    throw err;
  }
}

/**
 * Attach a request/response listener to the page that logs all API calls.
 * Call once per page (e.g. in beforeEach).
 */
import {Page} from '@playwright/test';

export function attachApiLogger(page: Page) {
  const isApiUrl = (url: string) => url.includes('/api/') || url.includes('/htmx/');

  page.on('request', (req) => {
    if (isApiUrl(req.url())) {
      logStep(`REQ: ${req.method()} ${req.url().replace(/^https?:\/\/[^/]+/, '')}`);
    }
  });

  page.on('response', (res) => {
    if (isApiUrl(res.url())) {
      const status = res.status();
      const flag = status >= 400 ? ' ❌' : '';
      logStep(`RES: ${status}${flag} ${res.request().method()} ${res.url().replace(/^https?:\/\/[^/]+/, '')}`);
    }
  });

  page.on('requestfailed', (req) => {
    if (isApiUrl(req.url())) {
      logStep(`FAIL: ${req.method()} ${req.url()} — ${req.failure()?.errorText}`);
    }
  });
}
