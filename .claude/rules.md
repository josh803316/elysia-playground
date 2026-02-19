# Coding Rules

## General

- Use **TypeScript** everywhere. Avoid `any` unless bridging Elysia context types where generics are impractical; always cast with a typed alias (`const typedCtx = ctx as unknown as MyContext`).
- Do not change formatting style in files you didn't author. Follow the existing indentation and spacing.
- Use `console.error` for errors and `console.warn` for warnings. Never leave bare `console.log` in production paths unless it's intentional debug output that already exists.
- Keep functions small and focused. Prefer composition over long handler bodies.
- Use named exports. Avoid default exports except where a framework requires it (e.g., SvelteKit `+page.svelte`).

## Server (Elysia + Bun)

- New route groups belong in a controller class that extends `BaseApiController`.
- Export a singleton instance at the bottom of each controller file: `export const fooController = new FooController().init();`
- Data access goes in a model class, not directly in controllers. Controllers call models; models call Drizzle.
- Guards (`authGuard`, `apiKeyGuard`) must be applied via `.guard({ beforeHandle: [...] })` or the `beforeHandle` route option — never inline inside a handler.
- Use the Drizzle schema (`server/src/db/schema.ts`) as the single source of truth for table/column names. Do not hardcode SQL strings.
- Environment config is read from `process.env`. Never hardcode secrets, API keys, or connection strings.
- Use `USE_PGLITE=true` in the test environment. Do not hit a real database in tests.

## Tests (Bun test runner)

- Every new controller or model must have a corresponding `.test.ts` file alongside it.
- Use `bun:test` (`describe`, `it`, `expect`, `beforeAll`, `afterAll`). Do not use Jest or Vitest in the server workspace.
- Use `TestDBUtils` and `createTestApp` helpers from `server/test/utils/` to set up in-memory PGlite databases. Do not call real external services.
- Tests are organized in three `describe` blocks: **Not signed in**, **Signed in**, **Admin (API key)**.
- Always clean up after tests (`afterAll` → `dbUtils.clearAllData()`).
- Frontend tests (React/Svelte) use Vitest. Keep them isolated with mocked API calls.

## Security

- Never include secrets or tokens in source code or test fixtures. Use `process.env` or placeholders like `<ADMIN_API_KEY>`.
- Admin endpoints must validate `X-API-Key` against `process.env.ADMIN_API_KEY`. Reject with `401` on mismatch.
- User-scoped endpoints must validate the Clerk JWT via `authGuard` and enforce ownership with `ownershipGuard`.
- Do not expose internal error details in HTTP responses. Log the full error server-side; return a generic message to the client.

## Frontends

- All five frontends share the same API base URL. Use the `VITE_API_URL` env variable; do not hardcode ports.
- Clerk keys in Vanilla JS must be read from the `/vanilla-js/env.js` server-side helper — never embedded in static assets.
- Tailwind CSS is used in Svelte and React. Follow existing class ordering conventions.

## Style

- Prefer `async/await` over raw Promise chains.
- Prefer early returns over deeply nested `if` blocks.
- Do not add comments unless the logic is genuinely non-obvious.
- Do not add docstrings, extra type annotations, or refactors to code you aren't directly modifying.
