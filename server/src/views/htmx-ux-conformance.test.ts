import { describe, expect, it } from "bun:test";
import {
  baseLayout,
  notesPage,
  notesTablePage,
  adminNotesGrid,
  type Note,
} from "./htmx-templates";

/**
 * UX conformance tests for HTMX templates.
 * Asserts structure and copy match docs/UX-SPEC.md (section order, table columns, titles).
 */
describe("HTMX templates UX conformance", () => {
  const requiredPageTitle = "Elysia Notes - HTMX";
  const requiredSectionTitles = [
    "Public Notes",
    "Visible to everyone",
    "Your Notes",
    "Only you can see these notes",
    "All Notes (Admin View)",
    "View and manage all notes in the system",
  ];
  const requiredAdminTableHeaders = [
    "Title",
    "Content Preview",
    "Status",
    "Author",
    "Created",
    "Updated",
    "Actions",
  ];

  it("baseLayout includes page title with framework name", () => {
    const html = baseLayout("<p>test</p>", requiredPageTitle);
    expect(html).toContain(`<title>${requiredPageTitle}</title>`);
  });

  it("notes page includes section data-testids and subtitles", () => {
    const html = notesPage([], undefined);
    expect(html).toContain('data-testid="section-public-notes"');
    expect(html).toContain('data-testid="section-your-notes"');
    expect(html).toContain("Visible to everyone");
    expect(html).toContain("Only you can see these notes");
  });

  it("notes page when admin includes admin section testid", () => {
    const html = notesPage([], undefined);
    expect(html).toContain('data-testid="section-admin-table"');
  });

  it("admin notes grid includes all required table column headers", () => {
    const notes: Note[] = [
      {
        id: 1,
        title: "T",
        content: "C",
        isPublic: "true",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: null,
      },
    ];
    const html = adminNotesGrid(notes);
    for (const header of requiredAdminTableHeaders) {
      expect(html).toContain(header);
    }
  });

  it("admin notes grid empty state matches spec", () => {
    const html = adminNotesGrid([]);
    expect(html).toContain("No notes found in the system");
  });

  it("admin notes grid has data-testid for table container", () => {
    const notes: Note[] = [
      {
        id: 1,
        title: "T",
        content: "C",
        isPublic: "true",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: null,
      },
    ];
    const html = adminNotesGrid(notes);
    expect(html).toContain('data-testid="admin-notes-table"');
  });

  it("notes table page includes Back to Notes home and All Notes", () => {
    const html = notesTablePage(undefined);
    expect(html).toContain("All Notes");
    expect(html).toContain("Back to Notes home");
  });
});
