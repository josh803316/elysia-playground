import {defineConfig, devices} from '@playwright/test';

// Bun auto-loads .env; no dotenv needed when running with bun/bunx
const baseURL = process.env.E2E_BASE_URL ?? 'http://localhost:3500';

export default defineConfig({
  testDir: './tests',
  globalSetup: './tests/global-setup.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: process.env.CI ? 'list' : 'html',
  timeout: 60_000,
  expect: {timeout: 10_000},
  use: {
    baseURL,
    channel: 'chrome', // use system Chrome so no playwright install needed
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 15_000,
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
