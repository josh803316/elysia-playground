# Reusable Prompts

Copy-paste these into the chat when you need them. Fill in the placeholders in `<angle brackets>`.

---

## Add a new API controller

Create a new Elysia controller for `<resource name>` following the existing pattern:

1. Create `server/src/controllers/<resource>.controller.ts` — extend `BaseApiController`, export a singleton at the bottom.
2. Create `server/src/models/<resource>.model.ts` — add Drizzle query methods, no raw SQL.
3. Add the resource table to `server/src/db/schema.ts` using the existing column conventions (`serial` PK, `timestamp` created/updated).
4. Register the controller in `server/src/index.ts`.
5. Add guards: use `authGuard` for user routes, `apiKeyGuard` for admin routes.
6. Write `server/src/controllers/<resource>.controller.test.ts` with three `describe` blocks: **Not signed in**, **Signed in**, **Admin (API key)**. Use `TestDBUtils` and `createTestApp` helpers.

---

## Add a feature to an existing controller

Add `<feature description>` to the `<ControllerName>` controller. Make sure to:

- Keep the route inside the appropriate `.group()` or `.guard()` block.
- Put any new data-access logic in the corresponding model file, not in the controller.
- Add a test case for the new route in the existing `.controller.test.ts` file.
- Do not change routes or logic unrelated to this feature.

---

## Add the same feature to all five frontends

Implement `<feature description>` across all frontend workspaces so they stay in sync:

- `react/src/` — React + hooks pattern
- `svelte/src/` — Svelte stores/reactive pattern
- `angular/src/` — Angular services/components
- `htmx/` + `server/src/views/` — HTMX fragments served server-side
- `vanilla-js/` — plain ES module, no framework

Each implementation should hit the same API endpoint and produce the same UX result.

---

## Write tests for an untested file

Write `bun:test` tests for `<file path>`. Follow the project test conventions:

- Import `TestDBUtils` and `createTestApp` from `server/test/utils/`.
- Use PGlite (in-memory) — no real database or network calls.
- Structure with `describe` → **Not signed in**, **Signed in**, **Admin (API key)**.
- Cover happy path and key error cases (401 unauthorized, 404 not found, 400 bad input).
- Clean up with `afterAll(() => dbUtils.clearAllData())`.

---

## Debug a failing test

A test in `<file path>` is failing. The error is:

```
<paste error here>
```

Investigate:
1. Check the `createTestApp` setup and whether auth mocks are correct.
2. Check if `USE_PGLITE=true` is set and the in-memory DB is initialized before assertions.
3. Check if the controller is registered at the expected path prefix.
4. Propose a fix with a clear explanation of the root cause.

---

## Review a controller for security issues

Review `<file path>` for security problems. Check:

- Are all user-facing routes protected by `authGuard` or `ownershipGuard`?
- Are admin routes validating `X-API-Key` against `process.env.ADMIN_API_KEY`?
- Are error responses leaking internal details (stack traces, DB errors)?
- Are any secrets, tokens, or keys hardcoded?
- Are IDs properly validated (parsed as integers, checked for `NaN`) before DB queries?

List each issue with file + line, severity (low/medium/high), and a suggested fix.

---

## Sync a frontend with the current API

The `<frontend name>` frontend may be out of sync with the server API. Compare the frontend's API calls against the current API surface in `server/src/index.ts` and the relevant controllers:

- Identify any missing endpoints or changed routes.
- Identify any request/response shape mismatches.
- Propose minimal changes to align the frontend without breaking other frontends.

---

## Add a new environment variable

Add a new environment variable `<VAR_NAME>` to the project:

1. Add it to `server/.env.example` (or create one if missing) with a placeholder value.
2. Add it to the `env` array in `turbo.json` under the relevant task(s).
3. Read it in code via `process.env.<VAR_NAME>`. Never hardcode the value.
4. Document it in `README.md` under the Prerequisites/Setup section.
