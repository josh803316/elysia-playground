# UX Specification — Notes App (React, Svelte, HTMX)

This document is the single source of truth for layout, copy, and behavior across the three frontends. Only **colors** and **page title** (framework name) differ per framework.

## 1. Routes

- **Home**: `/` (or `/react/`, `/svelte/`, `/htmx/` with base path).
- **Notes**: `/notes` (or base-prefixed). For signed-in user: list of "your" notes (or empty state). For admin (secret passkey): single "All Notes (Admin View)" table. Non-admin, not signed in: "Sign in to view your notes" or redirect.

## 2. Home page section order

1. **When admin**: **All Notes (Admin View)** (single table, same columns as below) at top.
2. **Public Notes** — subtitle: "Visible to everyone" — primary action: "+ Create Public Note" (green).
3. **Your Notes** — subtitle: "Only you can see these notes" — primary action: "+ Create Private Note" (violet/purple), only when signed in.

## 3. Admin table

- **Location**: On home when admin; also on Notes page when admin.
- **Columns** (order): **Title** | **Content Preview** | **Status** | **Author** | **Created** | **Updated** | **Actions**.
- **Content Preview**: First 50 characters of content; if longer, append "...".
- **Status**: Badge "Public" or "Private".
- **Date format**: `MM/DD/YYYY, HH:MM AM/PM` (e.g. via `toLocaleDateString()` + `toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })`).
- **Actions**: View (optional), Edit, Delete. Delete confirmation: "Are you sure you want to delete this note?" (admin variant may say "Delete this note as admin?" where appropriate).
- **Empty state**: "No notes found in the system" or "No notes in the system."

## 4. Copy

- **Nav**: "Home", "My Notes" (or "All Notes" when admin if desired).
- **Page title**: "Elysia Notes – React" | "Elysia Notes – Svelte" | "Elysia Notes – HTMX".
- **Buttons**: "Create Public Note", "Create Private Note", "Admin Login", "Admin Logout", "Sign In", "Sign Out".
- **Section subtitles**: "Visible to everyone" (Public Notes), "Only you can see these notes" (Your Notes), "View and manage all notes in the system" (All Notes Admin View).
- **Empty states**:
  - Public Notes: "No public notes yet. Be the first to create one!" or equivalent.
  - Your Notes: "No notes yet. Create your first note using the button above!" or equivalent.
  - Admin table: "No notes found in the system."

## 5. Layout tokens (shared; non-color)

- **Header height**: 60px.
- **Container max-width**: 1320px.
- **Main padding**: 2rem vertical, 1rem horizontal (or match React).
- **Section card**: White background, border-radius 8px, padding 1.5rem, shadow sm.
- **Note cards grid**: 3 columns large, 2 medium, 1 small; gap 1.5rem.

## 6. Framework-specific (only these differ)

- **Colors**: React = indigo/sky; Svelte = orange; HTMX = teal or neutral.
- **Page title**: Include framework name as above.
- **CSS stack**: Mantine (React) vs Flowbite/Tailwind (Svelte) vs Tailwind (HTMX); same structure and tokens, different classes/variables.
