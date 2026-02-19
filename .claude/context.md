# Project Context

This is a **monorepo playground** that compares five UI paradigms against one shared backend, built to demonstrate how different frontend frameworks interact with the same API and data model.

## What It Does

Users can create, read, update, and delete notes. Notes can be public (anonymous) or private (authenticated). An admin API key unlocks additional management endpoints.

## Workspace Layout

```
elysia-playground/
├── server/         # Elysia + Bun API (source of truth for all frontends)
├── react/          # React + Vite client
├── svelte/         # SvelteKit client
├── angular/        # Angular client
├── htmx/           # HTMX frontend (HTML templates served by the server)
└── vanilla-js/     # Vanilla JS (static ES modules, served by the server)
```

## Server Architecture (`server/src/`)

```
controllers/   # Route handlers; each controller extends BaseApiController
models/        # Data-access layer (Drizzle ORM queries)
db/            # Schema, migrations, seed, PGlite test helper
guards/        # authGuard (Clerk JWT) and apiKeyGuard (admin X-API-Key)
middleware/    # Logger middleware (Pino)
config/        # CORS origins, route-protection rules
views/         # Server-rendered HTML (HTMX views)
utils/         # Shared helpers
```

## Runtime & Tooling

- **Runtime**: Bun (not Node)
- **Framework**: Elysia v1.4
- **Database**: PostgreSQL via Supabase in production; `@electric-sql/pglite` (in-memory) for tests
- **ORM**: Drizzle ORM
- **Auth**: Clerk (JWT for users, `X-API-Key` header for admins)
- **Monorepo**: Turborepo (`turbo.json` orchestrates build/test/dev tasks)
- **Type checking**: `tsc --noEmit` (no separate build step for the server)
- **API client in tests**: `@elysiajs/eden` treaty

## Key Environment Variables

```
# Server
CLERK_SECRET_KEY
CLERK_PUBLISHABLE_KEY
CLERK_FRONTEND_API
ADMIN_API_KEY
DATABASE_URL

# Frontends (React/Svelte/Angular)
VITE_CLERK_PUBLISHABLE_KEY
VITE_API_URL
```

## Common Commands

```bash
bun run install:all       # Install root + all workspace deps
bun run dev               # Start React + Svelte + server concurrently
bun run dev:react         # React + server only
bun run dev:svelte        # Svelte + server only
bun run dev:angular       # Angular + server only
bun run dev:htmx          # HTMX + server only
bun run dev:vanilla-js    # Vanilla JS + server only
bun run test              # Run all workspace tests via Turbo
bun run test:server       # Run server tests only
bun run build             # Build all workspaces
bun run lint              # Run ESLint across workspaces
```

## API Surface (all prefixed `/api`)

| Method | Path | Auth |
|--------|------|------|
| GET | `/public-notes` | None |
| POST | `/public-notes` | None |
| GET | `/notes` | Clerk JWT |
| POST | `/notes` | Clerk JWT |
| GET/PUT/DELETE | `/notes/:id` | Clerk JWT + ownership |
| PUT | `/private-notes` | Clerk JWT |
| GET | `/private-notes` | Clerk JWT |
| GET | `/notes/all` | `X-API-Key` |
| DELETE | `/notes/all/admin` | `X-API-Key` |
| DELETE | `/notes/:id/admin` | `X-API-Key` |
