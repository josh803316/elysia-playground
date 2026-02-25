import { defineConfig, devices } from '@playwright/test';

// Bun auto-loads .env; no dotenv needed when running with bun/bunx
const baseURL = process.env.E2E_BASE_URL ?? 'http://localhost:3500';

const isCI = !!process.env.CI;
export default defineConfig({
  testDir: './tests',
  globalSetup: './tests/global-setup.ts',
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: process.env.PLAYWRIGHT_WORKERS ? parseInt(process.env.PLAYWRIGHT_WORKERS, 10) : isCI ? 2 : 1,
  reporter: isCI ? 'list' : 'html',
  timeout: 60_000,
  expect: { timeout: isCI ? 8_000 : 10_000 },
  use: {
    baseURL,
    channel: 'chrome', // use system Chrome so no playwright install needed
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: isCI ? 12_000 : 15_000,
    navigationTimeout: isCI ? 12_000 : 15_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  outputDir: 'test-results',
});
