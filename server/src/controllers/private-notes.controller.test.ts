import {
  describe,
  expect,
  it,
  beforeEach,
  beforeAll,
  afterAll,
} from "bun:test";
import { treaty } from "@elysiajs/eden";
import { privateNotesController } from "./private-notes.controller";
import { TestDBUtils } from "../../test/utils/db-utils";
import { createTestApp } from "../../test/utils/app-utils";

interface Note {
  id: number;
  title: string;
  content: string;
  isPublic: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}

interface PrivateNoteAPI {
  "private-notes": {
    put: (
      body: { data: string },
      options?: { headers?: Record<string, string> }
    ) => Promise<
      | { data: Note; error?: never }
      | { data?: never; error: { status: number; value: { message: string } } }
    >;
    (params: { id: string }): {
      delete: (options?: { headers?: Record<string, string> }) => Promise<
        | { data: DeleteResponse; error?: never }
        | {
            data?: never;
            error: { status: number; value: { message: string } };
          }
      >;
    };
  };
}

// Define test user IDs and emails
const TEST_USER_ID = "user_test123";
const TEST_USER_EMAIL = "test1@example.com";
const TEST_USER2_ID = "user_test456";
const TEST_USER2_EMAIL = "test2@example.com";

describe("Private Notes Controller", () => {
  let dbUtils: TestDBUtils;

  // Initialize DB once before all tests
  beforeAll(async () => {
    // Initialize test database
    dbUtils = await TestDBUtils.getInstance();
    await dbUtils.createTestDB();
  });

  // Clean up after all tests
  afterAll(async () => {
    if (dbUtils) {
      await dbUtils.clearAllData();
    }
  });

  describe("Not signed in", () => {
  it("should not allow unauthorized access", async () => {
    // Create app with auth function that returns null userId
    const { app } = await createTestApp({
      controller: privateNotesController,
      dbUtils,
      withAuth: false,
    });

    if (!app) throw new Error("App not initialized");
    const api = treaty(app) as any;

    // Try to create a note - should get 401 since auth() returns userId: null
    const { data, error } = await api.api["private-notes"].put({
      data: "This is a test private note",
    });

    console.log({ data, error });

    expect(error).toBeDefined();
    expect(error?.status).toBe(401);
    expect(data).toBeNull();
  });
  });

  describe("Signed in", () => {
  it("should create a new private note", async () => {
    const { app, token } = await createTestApp({
      controller: privateNotesController,
      dbUtils,
      userId: TEST_USER_ID,
    });

    if (!app) throw new Error("App not initialized");
    const api = treaty(app) as any;

    const { data, error } = await api.api["private-notes"].put(
      {
        data: "This is a test private note",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log({ data, error });

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data).toHaveProperty("title", "Private Note");
    expect(data).toHaveProperty("content", "This is a test private note");
    expect(data).toHaveProperty("isPublic", "false");
  });

  it("should get all private notes for a user", async () => {
    const { app, token } = await createTestApp({
      controller: privateNotesController,
      dbUtils,
      userId: TEST_USER_ID,
    });

    if (!app) throw new Error("App not initialized");
    const api = treaty(app) as any;

    // First create a note
    await api.api["private-notes"].put(
      {
        data: "This is a test private note",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Get all notes
    const { data, error } = await api.api["private-notes"].get({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log({ data, error });

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("title", "Private Note");
  });

  it("should delete a private note", async () => {
    const { app, token } = await createTestApp({
      controller: privateNotesController,
      dbUtils,
      userId: TEST_USER_ID,
    });

    if (!app) throw new Error("App not initialized");
    const api = treaty(app) as any;

    // First create a note
    const createResponse = await api.api["private-notes"].put(
      {
        data: "This is a test private note",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log({ createResponse });

    const createdNote = createResponse.data as Note;

    // Then delete it using Eden Treaty
    const { data, error } = await api.api["private-notes"][
      createdNote.id
    ].delete({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log({ data, error });

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data).toHaveProperty("success", true);

    // Verify the note is deleted
    const { error: getError } = await api.api["private-notes"][
      createdNote.id
    ].delete({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log({ getError });

    expect(getError).toBeDefined();
    expect(getError?.status).toBe(404);
  });

  it("should not allow access to other users' notes", async () => {
    // Create first user context
    const { app: app1, token: token1 } = await createTestApp({
      controller: privateNotesController,
      dbUtils,
      userId: TEST_USER_ID,
      email: TEST_USER_EMAIL,
    });

    if (!app1) throw new Error("App not initialized");
    const api1 = treaty(app1) as any;

    // Create second user context with different user
    const { app: app2, token: token2 } = await createTestApp({
      controller: privateNotesController,
      dbUtils,
      userId: TEST_USER2_ID,
      email: TEST_USER2_EMAIL,
    });

    if (!app2) throw new Error("App not initialized");
    const api2 = treaty(app2) as any;

    // First user creates a note
    const createResponse = await api1.api["private-notes"].put(
      {
        data: "This is a test private note",
      },
      {
        headers: {
          Authorization: `Bearer ${token1}`,
        },
      }
    );

    const createdNote = createResponse.data as Note;

    // Second user tries to delete the note
    const { error } = await api2.api["private-notes"][createdNote.id].delete({
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    });

    console.log({ error });

    expect(error).toBeDefined();
    expect(error?.status).toBe(403); // Should be 403 Forbidden
  });
  });
});
