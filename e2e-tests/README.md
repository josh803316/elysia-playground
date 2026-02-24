# E2E Tests (Playwright)

End-to-end tests that validate each app (React, Vue, Angular, Svelte, Vanilla JS, HTMX): sign in with a Clerk test user, create/edit/delete public and private notes, then admin cleanup.

We follow **Clerk's recommended Playwright testing approach**:
1. `clerkSetup()` runs once in `global-setup.ts` to obtain a Testing Token (bypasses Clerk bot detection)
2. Each test calls `setupClerkTestingToken({ page })` before any navigation
3. Private note tests call `clerk.signIn()` programmatically — no UI, no OTP
4. No storageState/pre-saved auth: every test starts unauthenticated, so `clerk.signIn()` never hits an "already signed in" error

## Prerequisites

1. **Server and frontends running**
   From repo root:
   ```bash
   bun run build:frontends
   bun run dev:server
   ```
   The server must use the same Clerk keys as `e2e-tests/.env` so the testing token is valid.
   Quick way to ensure this:
   ```bash
   export $(grep -v '^#' e2e-tests/.env | xargs) && bun run build:frontends && bun run dev:server
   ```

2. **Clerk test user**
   Create a user in [Clerk Dashboard](https://dashboard.clerk.com). Use a `+clerk_test` email address (e.g. `you+clerk_test@example.com`) so Clerk does not send real emails and the fixed code **`424242`** works for any verification step.
   See [Clerk: Test emails and phones](https://clerk.com/docs/testing/test-emails-and-phones).

3. **Admin API key**
   Same key used in the app's "Admin Login" modal — only needed for the cleanup step.

## Setup

```bash
cd e2e-tests
bun install
bunx playwright install chromium
cp .env.example .env
# Fill in: E2E_BASE_URL, CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, CLERK_TEST_EMAIL, E2E_ADMIN_API_KEY
```

## Run tests

```bash
bun run e2e
```

Other commands:

- `bun run e2e:ui` – Playwright UI mode
- `bun run e2e:headed` – headed browser
- `bun run e2e:debug` – debug mode

## What's tested

For **each app** (React, Vue, Angular, Svelte, Vanilla JS, HTMX):

- **Public note:** create → edit → delete (no auth required)
- **Private note:** sign in → create → edit → delete

Then:

- **Admin cleanup:** delete any remaining notes matching the `e2e-` pattern, via API (or UI fallback).

## Env vars

| Variable | Description |
|----------|-------------|
| `E2E_BASE_URL` | App base URL (e.g. `http://localhost:3500`) |
| `CLERK_PUBLISHABLE_KEY` | Clerk Publishable Key (same as server/frontend) |
| `CLERK_SECRET_KEY` | Clerk Secret Key (required for Testing Token; keep secure) |
| `CLERK_TEST_EMAIL` | Clerk test user email — use a `+clerk_test` address |
| `E2E_ADMIN_API_KEY` | Admin API key for the cleanup step |
