import {
  describe,
  expect,
  it,
  beforeEach,
  beforeAll,
  afterAll,
} from "bun:test";
import { treaty } from "@elysiajs/eden";
import { notesController } from "./notes.controller";
import { TestDBUtils } from "../../test/utils/db-utils";
import { createTestApp } from "../../test/utils/app-utils";

// Define test user ID
const TEST_USER_ID = "user_test123";

// Define interfaces for the response types
interface Note {
  id: number;
  title: string;
  content: string;
  isPublic: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}

describe("Notes Controller", () => {
  let dbUtils: TestDBUtils;
  const ADMIN_API_KEY = "test-admin-key"; // Add a consistent admin API key for tests

  // Setup test database before all tests
  beforeAll(async () => {
    // Initialize test database
    dbUtils = await TestDBUtils.getInstance();
    await dbUtils.createTestDB();

    // Set the admin API key for tests
    process.env.ADMIN_API_KEY = ADMIN_API_KEY;
  });

  // Cleanup after tests
  afterAll(async () => {
    if (dbUtils) {
      await dbUtils.clearAllData();
    }
    // Clean up environment variables
    delete process.env.ADMIN_API_KEY;
  });

  it("should get user notes when authenticated", async () => {
    const { app, token } = await createTestApp({
      controller: notesController,
      dbUtils,
      userId: TEST_USER_ID,
    });

    if (!app) throw new Error("App not initialized");
    const api = treaty(app) as any;

    const { data, error } = await api.api.notes.get({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
  });

  it("should return unauthorized when not authenticated", async () => {
    const { app } = await createTestApp({
      controller: notesController,
      dbUtils,
      withAuth: false,
    });

    if (!app) throw new Error("App not initialized");
    const api = treaty(app) as any;

    const { data, error } = await api.api.notes.get();

    expect(error).toBeDefined();
    expect(error.status).toBe(401);
    expect(data).toBeNull();
  });

  it("should create a new note", async () => {
    const { app, token } = await createTestApp({
      controller: notesController,
      dbUtils,
      userId: TEST_USER_ID,
    });

    if (!app) throw new Error("App not initialized");
    const api = treaty(app) as any;

    const noteData = {
      title: "Test Note",
      content: "This is a test note",
      isPublic: false,
    };

    const { data, error } = await api.api.notes.post(noteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data).toHaveProperty("title", "Test Note");
    expect(data).toHaveProperty("content", "This is a test note");
    expect(data).toHaveProperty("isPublic", "false");

    // Save the ID for later tests
    const noteId = data.id;

    // Verify we can get it back in the list of notes
    const { data: getNotes } = await api.api.notes.get({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const noteExists = getNotes.some((note: any) => note.id === noteId);
    expect(noteExists).toBe(true);
  });

  it("should get a specific note by ID", async () => {
    const { app, token } = await createTestApp({
      controller: notesController,
      dbUtils,
      userId: TEST_USER_ID,
    });

    if (!app) throw new Error("App not initialized");
    const api = treaty(app) as any;

    // First create a note
    const noteData = {
      title: "Get Note Test",
      content: "This is a note we'll get by ID",
      isPublic: false,
    };

    const { data: createdNote, error: createError } = await api.api.notes.post(noteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(createError).toBeNull();
    expect(createdNote).toBeDefined();
    const noteId = createdNote.id;

    // Now get it by ID
    const { data, error } = await api.api.notes[noteId].get({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.id).toBe(noteId);
    expect(data.title).toBe("Get Note Test");
    expect(data.content).toBe("This is a note we'll get by ID");
  });

  it("should update a note", async () => {
    const { app, token } = await createTestApp({
      controller: notesController,
      dbUtils,
      userId: TEST_USER_ID,
    });

    if (!app) throw new Error("App not initialized");
    const api = treaty(app) as any;

    // First create a note
    const noteData = {
      title: "Update Note Test",
      content: "This note will be updated",
      isPublic: false,
    };

    const { data: createdNote, error: createError } = await api.api.notes.post(noteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(createError).toBeNull();
    expect(createdNote).toBeDefined();
    const noteId = createdNote.id;

    // Now update it
    const updatedData = {
      title: "Updated Note",
      content: "This note has been updated",
      isPublic: true,
    };

    const { data, error } = await api.api.notes[noteId].put(updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.title).toBe("Updated Note");
    expect(data.content).toBe("This note has been updated");
    expect(data.isPublic).toBe("true");
  });

  it("should delete a note", async () => {
    const { app, token } = await createTestApp({
      controller: notesController,
      dbUtils,
      userId: TEST_USER_ID,
    });

    if (!app) throw new Error("App not initialized");
    const api = treaty(app) as any;

    // First create a note
    const noteData = {
      title: "Delete Note Test",
      content: "This note will be deleted",
      isPublic: false,
    };

    const { data: createdNote, error: createError } = await api.api.notes.post(noteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(createError).toBeNull();
    expect(createdNote).toBeDefined();
    const noteId = createdNote.id;

    // Now delete it
    const { data, error } = await api.api.notes[noteId].delete({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data).toHaveProperty("success", true);

    // Verify the note is deleted
    const { error: getError } = await api.api.notes[noteId].get({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(getError).toBeDefined();
    expect([403, 404]).toContain(getError.status);
  });

  it("should get all notes with admin API key", async () => {
    // First create a note as a regular user
    const { app: userApp, token } = await createTestApp({
      controller: notesController,
      dbUtils,
      userId: TEST_USER_ID,
    });

    if (!userApp) throw new Error("User app not initialized");
    const userApi = treaty(userApp) as any;

    await userApi.api.notes.post(
      {
        title: "Admin View Test",
        content: "This note should be visible to admin",
        isPublic: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Now use an app with API key
    const { app: adminApp } = await createTestApp({
      controller: notesController,
      dbUtils,
      userId: TEST_USER_ID,
      withApiKey: true,
      apiKey: ADMIN_API_KEY, // Pass the admin API key
    });

    if (!adminApp) throw new Error("Admin app not initialized");
    const adminApi = treaty(adminApp) as any;

    const { data, error } = await adminApi.api.notes.all.get({
      headers: {
        "X-API-Key": ADMIN_API_KEY, // Include API key in headers
      },
    });

    console.log("Admin get all notes response:", { data, error });

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it("should delete a note with admin API key", async () => {
    // First create a note as a regular user
    const { app: userApp, token } = await createTestApp({
      controller: notesController,
      dbUtils,
      userId: TEST_USER_ID,
    });

    if (!userApp) throw new Error("User app not initialized");
    const userApi = treaty(userApp) as any;

    const noteData = {
      title: "Admin Delete Test",
      content: "This note will be deleted by admin",
      isPublic: false,
    };

    const { data: createdNote, error: createError } = await userApi.api.notes.post(noteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(createError).toBeNull();
    expect(createdNote).toBeDefined();
    const noteId = createdNote.id;

    // Now use an app with API key
    const { app: adminApp } = await createTestApp({
      controller: notesController,
      dbUtils,
      userId: TEST_USER_ID,
      withApiKey: true,
      apiKey: ADMIN_API_KEY, // Pass the admin API key
    });

    if (!adminApp) throw new Error("Admin app not initialized");
    const adminApi = treaty(adminApp) as any;

    const { data, error } = await adminApi.api.notes[noteId].admin.delete({
      headers: {
        "X-API-Key": ADMIN_API_KEY, // Include API key in headers
      },
    });

    console.log("Admin delete note response:", { data, error });

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data).toHaveProperty("success", true);
    expect(data.message).toContain("admin");
  });
});
