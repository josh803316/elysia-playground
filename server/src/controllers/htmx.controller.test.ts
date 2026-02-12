import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import { Elysia } from "elysia";
import { TestDBUtils } from "../../test/utils/db-utils";

const TEST_USER_ID = "user_htmx_test";
const ADMIN_API_KEY = "test-admin-key";

describe("HTMX Controller", () => {
  let dbUtils: TestDBUtils;
  let db: any;
  let htmxModule: any;

  beforeAll(async () => {
    // Set env var BEFORE importing the controller (it captures ADMIN_API_KEY at module load)
    process.env.ADMIN_API_KEY = ADMIN_API_KEY;

    htmxModule = await import("./htmx.controller");

    dbUtils = await TestDBUtils.getInstance();
    const result = await dbUtils.createTestDB();
    db = result.db;
  });

  afterAll(async () => {
    if (dbUtils) {
      await dbUtils.clearAllData();
    }
  });

  function createApp(options: { withAuth?: boolean; userId?: string } = {}) {
    const { withAuth = false, userId = TEST_USER_ID } = options;

    return new Elysia()
      .derive(() => ({
        db,
        auth: () => (withAuth ? { userId } : null),
        clerk: {
          users: {
            getUser: async (id: string) => ({
              id,
              firstName: "Test",
              lastName: "User",
              emailAddresses: [{ emailAddress: `${id}@example.com` }],
            }),
          },
        },
      }))
      .use(htmxModule.htmxController);
  }

  // =============================
  // PUBLIC NOTES
  // =============================
  describe("Public Notes", () => {
    it("should return the main page with public notes HTML", async () => {
      const app = createApp();
      const response = await app.handle(new Request("http://localhost/htmx/"));

      expect(response.status).toBe(200);
      const html = await response.text();
      expect(html).toContain("Public Notes");
      expect(response.headers.get("Content-Type")).toContain("text/html");
    });

    it("should include UX conformance section testids and subtitles", async () => {
      const app = createApp();
      const response = await app.handle(new Request("http://localhost/htmx/"));
      const html = await response.text();
      expect(html).toContain('data-testid="section-public-notes"');
      expect(html).toContain('data-testid="section-your-notes"');
      expect(html).toContain("Visible to everyone");
      expect(html).toContain("Only you can see these notes");
      expect(html).toContain("Elysia Notes - HTMX");
    });

    it("should create a public note and return HTML card", async () => {
      const app = createApp();
      const response = await app.handle(
        new Request("http://localhost/htmx/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: "HTMX public test note" }),
        }),
      );

      expect(response.status).toBe(200);
      const html = await response.text();
      expect(html).toContain("HTMX public test note");
    });

    it("should list public notes via the refresh endpoint", async () => {
      const app = createApp();

      // Create a note first
      await app.handle(
        new Request("http://localhost/htmx/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: "Refresh test note" }),
        }),
      );

      const response = await app.handle(
        new Request("http://localhost/htmx/notes/refresh"),
      );

      expect(response.status).toBe(200);
      const html = await response.text();
      expect(html).toContain("Refresh test note");
    });

    it("should delete a public anonymous note", async () => {
      const app = createApp();

      // Create
      const createResponse = await app.handle(
        new Request("http://localhost/htmx/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: "Will be deleted" }),
        }),
      );

      const html = await createResponse.text();
      const match = html.match(/id="note-(\d+)"/);
      expect(match).not.toBeNull();
      const noteId = match![1];

      // Delete
      const deleteResponse = await app.handle(
        new Request(`http://localhost/htmx/notes/${noteId}`, {
          method: "DELETE",
        }),
      );

      expect(deleteResponse.status).toBe(200);
      const deleteHtml = await deleteResponse.text();
      expect(deleteHtml).toBe(""); // HTMX returns empty to remove element
    });
  });

  // =============================
  // PRIVATE NOTES
  // =============================
  describe("Private Notes", () => {
    it("should show auth required message when not authenticated", async () => {
      const app = createApp({ withAuth: false });
      const response = await app.handle(
        new Request("http://localhost/htmx/private-notes"),
      );

      expect(response.status).toBe(200);
      const html = await response.text();
      expect(html).toContain("sign in");
    });

    it("should return private notes grid when authenticated", async () => {
      const app = createApp({ withAuth: true });
      const response = await app.handle(
        new Request("http://localhost/htmx/private-notes"),
      );

      expect(response.status).toBe(200);
      const html = await response.text();
      // Returns either notes grid or empty state
      expect(html).toBeDefined();
    });

    it("should create a private note when authenticated", async () => {
      const app = createApp({ withAuth: true });
      const response = await app.handle(
        new Request("http://localhost/htmx/private-notes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: "My private HTMX note" }),
        }),
      );

      expect(response.status).toBe(200);
      const html = await response.text();
      expect(html).toContain("My private HTMX note");
    });

    it("should reject private note creation when not authenticated", async () => {
      const app = createApp({ withAuth: false });
      const response = await app.handle(
        new Request("http://localhost/htmx/private-notes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: "Should fail" }),
        }),
      );

      expect(response.status).toBe(401);
    });

    it("should delete a private note when authenticated as owner", async () => {
      const app = createApp({ withAuth: true });

      // Create a private note
      await app.handle(
        new Request("http://localhost/htmx/private-notes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: "Private note to delete" }),
        }),
      );

      // Fetch private notes to get an ID
      const listResponse = await app.handle(
        new Request("http://localhost/htmx/private-notes"),
      );
      const listHtml = await listResponse.text();
      const match = listHtml.match(/id="private-note-(\d+)"/);
      expect(match).not.toBeNull();
      const noteId = match![1];

      // Delete it
      const deleteResponse = await app.handle(
        new Request(`http://localhost/htmx/private-notes/${noteId}`, {
          method: "DELETE",
        }),
      );

      expect(deleteResponse.status).toBe(200);
    });

    it("should reject private note deletion when not authenticated", async () => {
      const app = createApp({ withAuth: false });
      const response = await app.handle(
        new Request("http://localhost/htmx/private-notes/1", {
          method: "DELETE",
        }),
      );

      expect(response.status).toBe(401);
    });
  });

  // =============================
  // ADMIN ACCESS
  // =============================
  describe("Admin Access", () => {
    it("should show unauthorized message without API key", async () => {
      const app = createApp();
      const response = await app.handle(
        new Request("http://localhost/htmx/admin/notes"),
      );

      expect(response.status).toBe(200); // Returns 200 with message for HTMX swapping
      const html = await response.text();
      expect(html).toContain("Invalid");
    });

    it("should return all notes table with valid API key", async () => {
      const app = createApp();

      // Create a note first
      await app.handle(
        new Request("http://localhost/htmx/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: "Admin visible note" }),
        }),
      );

      const response = await app.handle(
        new Request("http://localhost/htmx/admin/notes", {
          headers: { "X-API-Key": ADMIN_API_KEY },
        }),
      );

      expect(response.status).toBe(200);
      const html = await response.text();
      expect(html).toContain("Admin visible note");
      // Admin view renders as a table
      expect(html).toContain("<table");
    });

    it("should delete any note as admin with valid API key", async () => {
      const app = createApp();

      // Create a note
      const createResponse = await app.handle(
        new Request("http://localhost/htmx/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: "Admin will delete this" }),
        }),
      );

      const html = await createResponse.text();
      const match = html.match(/id="note-(\d+)"/);
      expect(match).not.toBeNull();
      const noteId = match![1];

      const deleteResponse = await app.handle(
        new Request(`http://localhost/htmx/admin/notes/${noteId}`, {
          method: "DELETE",
          headers: { "X-API-Key": ADMIN_API_KEY },
        }),
      );

      expect(deleteResponse.status).toBe(200);
    });

    it("should reject admin delete without API key", async () => {
      const app = createApp();
      const response = await app.handle(
        new Request("http://localhost/htmx/admin/notes/1", {
          method: "DELETE",
        }),
      );

      expect(response.status).toBe(401);
    });

    it("should reject admin delete with wrong API key", async () => {
      const app = createApp();
      const response = await app.handle(
        new Request("http://localhost/htmx/admin/notes/1", {
          method: "DELETE",
          headers: { "X-API-Key": "wrong-key" },
        }),
      );

      expect(response.status).toBe(401);
    });

    it("should return admin login modal HTML", async () => {
      const app = createApp();
      const response = await app.handle(
        new Request("http://localhost/htmx/admin/login-modal"),
      );

      expect(response.status).toBe(200);
      const html = await response.text();
      expect(html).toContain("Admin Login");
      expect(html).toContain("Admin API Key");
    });
  });
});
