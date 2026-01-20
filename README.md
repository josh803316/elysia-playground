# Elysia Fullstack Application

This is a monorepo containing both the client and server components of our Elysia-based application.

## Project Structure

- `client/` - React frontend built with Vite
- `server/` - Elysia backend using Bun runtime

## Setup

1. Install dependencies:

```bash
# Install all dependencies (root + workspaces)
bun run install:all
```

2. Setup environment variables:

```bash
# In the server directory
cp .env.example .env
# Fill in your environment variables

# In the client directory
cp .env.example .env
# Fill in your environment variables
```

3. Initialize the database:

```bash
# In the server directory
bun run db:migrate
bun run db:seed
```

## Development

To run both the client and server in development mode:

```bash
bun run dev
```

To run just the client or server:

```bash
bun run dev:client
# or
bun run dev:server
```

## Testing

To run all tests:

```bash
bun run test
```

Or run server tests only:

```bash
bun run test:server
```

## Building

To build all workspaces:

```bash
bun run build
```

Or build specific workspaces:

```bash
bun run build:client
# or
bun run build:server
```

## Turborepo

This project uses [Turborepo](https://turbo.build/repo) to manage the monorepo. Key features:

- Incremental builds - Turborepo will only rebuild what's changed
- Smart caching - Speeds up build times by caching previous builds
- Task orchestration - Dependencies between tasks across workspaces are automatically managed

### Useful Turborepo Commands

```bash
# Run with verbose logging
bunx turbo dev --verbose

# Run without cache
bunx turbo dev --no-cache

# Generate a dependency graph
bunx turbo run build --graph=dependency-graph.png

# Prune the cache
bunx turbo prune
```

## License

MIT

## Features

- **Authentication** with Clerk
- **Private Notes** for logged-in users
- **Public Notes** that anyone can post and view
- **React frontend** with modern UI
- **Elysia backend** with PostgreSQL database

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) for both server and client
- [Clerk Account](https://clerk.dev/) for authentication

### Clerk Setup

1. Sign up for a Clerk account
2. Create a new application in the Clerk Dashboard
3. Get your API keys from the Clerk Dashboard
4. Add the following environment variables:
   - In `server/.env`:
     ```
     CLERK_SECRET_KEY=your_clerk_secret_key
     ```
   - In `client/.env`:
     ```
     VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     ```

## API Endpoints

The server exposes the following API endpoints:

- `GET /api/notes` - Get all public notes
- `POST /api/notes` - Create a public note (anonymous)
- `PUT /api/private-notes` - Create a private note (requires authentication)
- `GET /api/private-notes` - Get all private notes for the authenticated user

# API Server Documentation

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. For development with auto-restart:
   ```
   npm run dev
   ```

The server runs on port 3000 by default.

## API Endpoints

### Version Information
- `GET /versions` - Retrieve version information about the API

### Notes API
- `GET /api/notes/user` - Retrieve notes for the authenticated user
- `GET /api/notes/admin` - Retrieve all notes (admin access required)
- `POST /api/notes` - Create a new note
  - Body: `{ "title": "Note Title", "content": "Note content", "isPublic": false }`
- `PUT /api/notes/:id` - Update an existing note
- `DELETE /api/notes/:id` - Delete a note

### Public Notes
- `GET /api/public-notes` - Retrieve all public notes (no authentication required)
- `POST /api/public-notes` - Create a new anonymous public note
  - Body: `{ "content": "Note content" }`
- `PUT /api/public-notes/:id` - Update an existing public note

### Private Notes
- `GET /api/private-notes` - Retrieve private notes for the authenticated user
- `PUT /api/private-notes` - Create a new private note
  - Body: `{ "data": "Private note content" }`
- `DELETE /api/private-notes/:id` - Delete a private note

### Admin Validation
- `GET /api-key-example` - Validate admin API key

## Authentication

Authentication is handled via Clerk integration. Admin operations require the `x-api-key` header with the correct admin API key.

## Example Requests

### Get Public Notes
```
GET http://localhost:3000/api/public-notes
```

### Create a Note (Authenticated)
```
POST http://localhost:3000/api/notes
Content-Type: application/json

{
  "title": "My Note",
  "content": "This is my note content",
  "isPublic": false
}
```

### Delete a Note (Admin)
```
DELETE http://localhost:3000/api/notes/123
x-api-key: your-admin-api-key
```
