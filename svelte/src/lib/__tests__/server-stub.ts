/**
 * Stub for server/src/index used only when running Svelte tests.
 * Prevents loading the real server (which runs initDB and requires DATABASE_URL etc.)
 * when the API client's `import type { App }` is resolved by the test runner.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type App = {};
