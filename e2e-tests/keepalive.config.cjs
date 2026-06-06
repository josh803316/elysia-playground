/**
 * Lightweight Playwright config for the weekly keepalive cron.
 * Disables globalSetup (Clerk browser sign-in) because this job only needs
 * unauthenticated public-notes POST + admin-key protected admin create.
 * Much faster and fewer moving parts than the full e2e config.
 */
module.exports = {
  testDir: './tests',
  globalSetup: undefined,
  globalTeardown: undefined,
  fullyParallel: false,
  workers: 1,
  retries: 1,
  reporter: 'line',
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3500',
  },
  projects: [
    {
      name: 'api-only',
      use: {},
    },
  ],
};
