import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { publicNotesController } from "./public-notes.controller";
import { TestDBUtils } from "../../test/utils/db-utils";
import { createTestApp } from "../../test/utils/app-utils";

describe("Public Notes Controller", () => {
  let dbUtils: TestDBUtils;

  // Setup test database before all tests
  beforeAll(async () => {
    // Initialize test database
    dbUtils = await TestDBUtils.getInstance();
    await dbUtils.createTestDB();

    // Create an initial public note
    await dbUtils.createPublicAnonymousNote();
  });

  // Cleanup after tests
  afterAll(async () => {
    if (dbUtils) {
      await dbUtils.clearAllData();
    }
  });

  it("should get all public notes", async () => {
    const { app } = await createTestApp({
      controller: publicNotesController,
      dbUtils,
      withAuth: false,
    });

    const client = treaty(app) as any;

    const response = await client.api["public-notes"].index.get();

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThanOrEqual(1);

    // Verify the notes are public
    response.data.forEach((note: any) => {
      expect(note.isPublic).toBe("true");
    });
  });

  it("should create a new public note anonymously", async () => {
    const { app } = await createTestApp({
      controller: publicNotesController,
      dbUtils,
      withAuth: false,
    });

    const client = treaty(app) as any;

    const noteData = {
      content: "This is a new public note",
    };

    const response = await client.api["public-notes"].index.post(noteData);

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data).toHaveProperty("title", "Public Note");
    expect(response.data).toHaveProperty(
      "content",
      "This is a new public note"
    );
    expect(response.data).toHaveProperty("isPublic", "true");
    expect(response.data).toHaveProperty("userId", null);

    // Save for later test
    const noteId = response.data.id;

    // Verify we can get it back
    const getAllResponse = await client.api["public-notes"].index.get();
    const noteExists = getAllResponse.data.some(
      (note: any) => note.id === noteId
    );
    expect(noteExists).toBe(true);

    return noteId;
  });

  it("should delete a public note", async () => {
    const { app } = await createTestApp({
      controller: publicNotesController,
      dbUtils,
      withAuth: false,
    });

    const client = treaty(app) as any;

    // First create a public note
    const noteData = {
      content: "This public note will be deleted",
    };

    const createResponse = await client.api["public-notes"].index.post(
      noteData
    );
    const noteId = createResponse.data.id;

    // Now delete it
    const deleteResponse = await app.handle(
      new Request(`http://localhost/api/public-notes/${noteId}`, {
        method: "DELETE",
      })
    );

    expect(deleteResponse.status).toBe(200);
    const data = await deleteResponse.json();
    expect(data).toHaveProperty("success", true);

    // Verify it's gone
    const getAllResponse = await client.api["public-notes"].index.get();
    const noteExists = getAllResponse.data.some(
      (note: any) => note.id === noteId
    );
    expect(noteExists).toBe(false);
  });

  it("should handle invalid note ID when deleting", async () => {
    const { app } = await createTestApp({
      controller: publicNotesController,
      dbUtils,
      withAuth: false,
    });

    const deleteResponse = await app.handle(
      new Request("http://localhost/api/public-notes/9999", {
        method: "DELETE",
      })
    );

    expect(deleteResponse.status).toBe(404);
  });
});
