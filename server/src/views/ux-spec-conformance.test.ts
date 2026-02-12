import { describe, expect, it } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Ensures docs/UX-SPEC.md exists and contains the key copy and structure
 * so the spec remains the single source of truth for all three UIs.
 */
describe("UX spec document conformance", () => {
  const specPath = join(import.meta.dir, "../../../docs/UX-SPEC.md");

  it("UX spec file exists", () => {
    const content = readFileSync(specPath, "utf-8");
    expect(content.length).toBeGreaterThan(100);
  });

  it("UX spec contains required section order and copy", () => {
    const content = readFileSync(specPath, "utf-8");
    const required = [
      "All Notes (Admin View)",
      "Public Notes",
      "Visible to everyone",
      "Your Notes",
      "Only you can see these notes",
      "View and manage all notes in the system",
      "Title",
      "Content Preview",
      "Status",
      "Author",
      "Created",
      "Updated",
      "Actions",
      "No notes found in the system",
      "Elysia Notes – React",
      "Elysia Notes – Svelte",
      "Elysia Notes – HTMX",
      "1320px",
      "60px",
    ];
    for (const phrase of required) {
      expect(content).toContain(phrase);
    }
  });
});
