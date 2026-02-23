# E2E Tests (Playwright)

End-to-end tests that validate each app (React, Vue, Angular, Svelte, Vanilla JS, HTMX): sign in with a Clerk test user, create/edit/delete public and private notes, then admin cleanup.

We follow **Clerk’s recommended testing approach**: Testing Token + programmatic sign-in so automated runs bypass bot detection and avoid UI-based OTP flows.

## Prerequisites

1. **Server and frontends running**  
   From repo root:
   ```bash
   bun run build:frontends
   bun run dev:server
   ```
   Or run dev for a single frontend (e.g. `bun run dev:react`).

2. **Clerk test user**  
   Create a user in [Clerk Dashboard](https://dashboard.clerk.com) with **Email + Password** sign-in enabled. Use that email and password in `e2e-tests/.env`.

3. **Admin API key**  
   Use the same key you use in the app’s “Admin Login” for the cleanup step.

## Clerk configuration (avoid “new device” email code)

E2E uses Clerk’s **Testing Token** and **programmatic sign-in** (no UI fill), so the normal sign-in step does not trigger an email/OTP. If your instance still shows “Sign in from new device” or similar verification:

1. **Use a test email (recommended)**  
   In the Clerk Dashboard, create your E2E user with an email that includes the `+clerk_test` subaddress, for example:
   - `e2e+clerk_test@yourdomain.com`  
   No real email is sent for these addresses, and you can complete any verification step with the fixed code **`424242`**.  
   See [Test emails and phones](https://clerk.com/docs/guides/development/testing/test-emails-and-phones).

2. **Optional: adjust “Sign in from new device”**  
   In Dashboard: **Configure → Emails → “Sign in from new device”**. You can disable this template or restrict it so it doesn’t apply in development. Test mode and test emails (above) are usually enough.

3. **Enable Email + Password**  
   In Dashboard: **Configure → Email, Phone, Username** (or **Authentication strategies**). Ensure **Email address** and **Password** are enabled so the test user can sign in with `strategy: 'password'`.

## Setup

```bash
cd e2e-tests
bun install
bunx playwright install chromium
cp .env.example .env
# Edit .env: E2E_BASE_URL, CLERK_* keys, CLERK_TEST_EMAIL, CLERK_TEST_PASSWORD, E2E_ADMIN_API_KEY
```

## Run tests

```bash
bun run e2e
```

- **Setup** runs first: `clerkSetup()` obtains a Testing Token (bypasses bot detection), then `clerk.signIn()` signs in programmatically with the test user and saves storage state.
- **Chromium** project then runs the note flows for each app and the admin cleanup.

Other commands:

- `bun run e2e:ui` – Playwright UI
- `bun run e2e:headed` – headed browser
- `bun run e2e:debug` – debug mode

## What’s tested

For **each app** (React, Vue, Angular, Svelte, Vanilla JS, HTMX):

- **Public note:** create → edit → delete
- **Private note:** create → edit → delete (requires signed-in user from auth setup)

Then:

- **Admin cleanup:** sign in as admin and delete any remaining notes whose content matches the e2e test pattern (`e2e-...`).

## Env vars

| Variable | Description |
|----------|-------------|
| `E2E_BASE_URL` | App base URL (e.g. `http://localhost:3000`) |
| `CLERK_PUBLISHABLE_KEY` | Clerk Publishable Key (same as server / frontend) |
| `CLERK_SECRET_KEY` | Clerk Secret Key (required for Testing Token; keep secure) |
| `CLERK_TEST_EMAIL` | Clerk test user email (use `+clerk_test` to avoid real “new device” emails) |
| `CLERK_TEST_PASSWORD` | Clerk test user password |
| `E2E_ADMIN_API_KEY` | Admin API key for cleanup step |
