# Elysia Playground

Monorepo playground for comparing **four UI approaches** against one shared API:

- **React** app at `/react`
- **Svelte** app at `/svelte`
- **HTMX** app at `/htmx`
- **Vanilla JS** app at `/vanilla-js`

All four frontends talk to the same **Elysia + Bun** backend and Notes data model.

## What This Repo Demonstrates

- Shared backend/API for multiple frontend paradigms
- Clerk authentication for user/private-note flows
- Public/anonymous notes and authenticated private notes
- Admin views/actions via API key-protected routes

## Workspace Structure

- `server/` - Elysia API, data access, auth/guards, HTMX routes
- `react/` - React + Vite client
- `svelte/` - SvelteKit client
- `htmx/` - HTMX frontend assets/templates (served by server)
- `vanilla-js/` - Vanilla JS frontend (static HTML/CSS/ES modules, served by server)

## Entry Points

When running locally, the backend serves a root landing page at `/` linking to:

- `/react`
- `/svelte`
- `/htmx`
- `/vanilla-js`

## Prerequisites

- [Bun](https://bun.sh/)
- Clerk app/keys for authenticated flows

## Setup

```bash
# Install root + workspace dependencies
bun run install:all
```

Create env files and fill values:

- `server/.env`
- `react/.env` (if needed for local overrides)
- `svelte/.env` (if needed for local overrides)

Typical required **server** values:

- `CLERK_SECRET_KEY`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_FRONTEND_API` (e.g. `ample-garfish-72.clerk.accounts.dev`)
- `ADMIN_API_KEY`

For **frontend** Clerk usage:

- `VITE_CLERK_PUBLISHABLE_KEY` (React/Svelte as needed)
- The Vanilla JS app reads `CLERK_PUBLISHABLE_KEY` and `CLERK_FRONTEND_API` indirectly from `server/.env` via a small `/vanilla-js/env.js` helper and does **not** hardcode any keys in the static assets.

## Development

```bash
# Run multiple apps (default)
bun run dev

# Targeted combinations
bun run dev:react
bun run dev:svelte
bun run dev:htmx
bun run dev:server
```

## Testing

```bash
# Run all workspace tests
bun run test

# Run server-only tests
bun run test:server
```

## Build

```bash
# Build all workspaces
bun run build

# Build specific workspaces
bun run build:react
bun run build:svelte
bun run build:server
```

## API Snapshot

- `GET /api/public-notes` - list public notes
- `POST /api/public-notes` - create anonymous public note
- `GET /api/notes` - list signed-in user notes
- `POST /api/notes` - create user note
- `PUT /api/private-notes` - create private note
- `GET /api/private-notes` - list private notes for signed-in user
- `GET /api/notes/all` - admin list all notes (`X-API-Key`)

## License

MIT
