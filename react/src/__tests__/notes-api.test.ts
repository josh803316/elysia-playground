import { describe, it, expect, vi, beforeEach } from "vitest";

// Use vi.hoisted() so mock fns are available inside the vi.mock factory (which is hoisted)
const {
  mockNotesGet,
  mockNotesPost,
  mockNoteByIdGet,
  mockNoteByIdPut,
  mockNoteByIdDelete,
  mockPrivateNotesGet,
  mockPrivateNotesPut,
  mockPrivateNoteByIdGet,
  mockPrivateNoteByIdPut,
  mockPrivateNoteByIdDelete,
  mockPublicNotesGet,
  mockPublicNoteByIdGet,
  mockAuthExampleGet,
} = vi.hoisted(() => ({
  mockNotesGet: vi.fn().mockResolvedValue({ data: [], error: null }),
  mockNotesPost: vi.fn().mockResolvedValue({ data: { id: 1, title: "Test" }, error: null }),
  mockNoteByIdGet: vi.fn().mockResolvedValue({ data: { id: 1 }, error: null }),
  mockNoteByIdPut: vi.fn().mockResolvedValue({ data: { id: 1 }, error: null }),
  mockNoteByIdDelete: vi.fn().mockResolvedValue({ data: { success: true }, error: null }),
  mockPrivateNotesGet: vi.fn().mockResolvedValue({ data: [], error: null }),
  mockPrivateNotesPut: vi.fn().mockResolvedValue({ data: { id: 1 }, error: null }),
  mockPrivateNoteByIdGet: vi.fn().mockResolvedValue({ data: { id: 1 }, error: null }),
  mockPrivateNoteByIdPut: vi.fn().mockResolvedValue({ data: { id: 1 }, error: null }),
  mockPrivateNoteByIdDelete: vi.fn().mockResolvedValue({ data: { success: true }, error: null }),
  mockPublicNotesGet: vi.fn().mockResolvedValue({ data: [], error: null }),
  mockPublicNoteByIdGet: vi.fn().mockResolvedValue({ data: { id: 1 }, error: null }),
  mockAuthExampleGet: vi.fn().mockResolvedValue({ data: {}, error: null }),
}));

vi.mock("@elysiajs/eden", () => ({
  treaty: () => {
    const noteByIdProxy = () => ({
      get: mockNoteByIdGet,
      put: mockNoteByIdPut,
      delete: mockNoteByIdDelete,
    });

    const privateNoteByIdProxy = () => ({
      get: mockPrivateNoteByIdGet,
      put: mockPrivateNoteByIdPut,
      delete: mockPrivateNoteByIdDelete,
    });

    const publicNoteByIdProxy = () => ({
      get: mockPublicNoteByIdGet,
    });

    return {
      api: {
        notes: new Proxy(
          { get: mockNotesGet, post: mockNotesPost },
          {
            get(target, prop) {
              if (prop in target) return (target as Record<string, unknown>)[prop];
              if (typeof prop === "string" && !isNaN(Number(prop))) {
                return noteByIdProxy();
              }
              return undefined;
            },
          },
        ),
        "private-notes": new Proxy(
          { get: mockPrivateNotesGet, put: mockPrivateNotesPut },
          {
            get(target, prop) {
              if (prop in target) return (target as Record<string, unknown>)[prop];
              if (typeof prop === "string" && !isNaN(Number(prop))) {
                return privateNoteByIdProxy();
              }
              return undefined;
            },
          },
        ),
        "public-notes": new Proxy(
          { get: mockPublicNotesGet },
          {
            get(target, prop) {
              if (prop in target) return (target as Record<string, unknown>)[prop];
              if (typeof prop === "string" && !isNaN(Number(prop))) {
                return publicNoteByIdProxy();
              }
              return undefined;
            },
          },
        ),
      },
      "auth-example": {
        get: mockAuthExampleGet,
      },
    };
  },
}));

// Import after mock setup
import { apiClient } from "../api/client";

describe("React Notes API Client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Public Notes", () => {
    it("should fetch all public notes without authentication", async () => {
      await apiClient.publicNotes.getAll();
      expect(mockPublicNotesGet).toHaveBeenCalledOnce();
      // No auth headers passed
      expect(mockPublicNotesGet).toHaveBeenCalledWith();
    });

    it("should fetch a specific public note by ID without authentication", async () => {
      await apiClient.publicNotes.getById(42);
      expect(mockPublicNoteByIdGet).toHaveBeenCalledOnce();
    });
  });

  describe("Private Notes (Authentication Required)", () => {
    it("should include auth token when fetching private notes", async () => {
      const token = "test-jwt-token";
      await apiClient.privateNotes.getAll(token);
      expect(mockPrivateNotesGet).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer test-jwt-token" },
      });
    });

    it("should pass undefined headers when no token provided", async () => {
      await apiClient.privateNotes.getAll();
      expect(mockPrivateNotesGet).toHaveBeenCalledWith({
        headers: undefined,
      });
    });

    it("should include auth token when creating a private note", async () => {
      const token = "test-jwt-token";
      const note = { title: "Secret", content: "Private content" };
      await apiClient.privateNotes.create(note, token);
      expect(mockPrivateNotesPut).toHaveBeenCalledWith(note, {
        headers: { Authorization: "Bearer test-jwt-token" },
      });
    });

    it("should include auth token when deleting a private note", async () => {
      const token = "test-jwt-token";
      await apiClient.privateNotes.delete(5, token);
      expect(mockPrivateNoteByIdDelete).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer test-jwt-token" },
      });
    });
  });

  describe("User Notes (Authentication Required)", () => {
    it("should include auth token when fetching user notes", async () => {
      const token = "test-jwt-token";
      await apiClient.notes.getAll(token);
      expect(mockNotesGet).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer test-jwt-token" },
      });
    });

    it("should convert string isPublic 'true' to boolean true when creating", async () => {
      const token = "test-jwt-token";
      await apiClient.notes.create(
        { title: "Test", content: "Content", isPublic: "true" },
        token,
      );
      expect(mockNotesPost).toHaveBeenCalledWith(
        { title: "Test", content: "Content", isPublic: true },
        { headers: { Authorization: "Bearer test-jwt-token" } },
      );
    });

    it("should convert string isPublic 'false' to boolean false when creating", async () => {
      const token = "test-jwt-token";
      await apiClient.notes.create(
        { title: "Test", content: "Content", isPublic: "false" },
        token,
      );
      expect(mockNotesPost).toHaveBeenCalledWith(
        { title: "Test", content: "Content", isPublic: false },
        { headers: { Authorization: "Bearer test-jwt-token" } },
      );
    });

    it("should default isPublic to false when not provided", async () => {
      const token = "test-jwt-token";
      await apiClient.notes.create({ title: "Test", content: "Content" }, token);
      expect(mockNotesPost).toHaveBeenCalledWith(
        { title: "Test", content: "Content", isPublic: false },
        { headers: { Authorization: "Bearer test-jwt-token" } },
      );
    });

    it("should preserve boolean isPublic when creating", async () => {
      const token = "test-jwt-token";
      await apiClient.notes.create(
        { title: "Test", content: "Content", isPublic: true },
        token,
      );
      expect(mockNotesPost).toHaveBeenCalledWith(
        { title: "Test", content: "Content", isPublic: true },
        { headers: { Authorization: "Bearer test-jwt-token" } },
      );
    });

    it("should convert isPublic correctly when updating a note", async () => {
      const token = "test-jwt-token";
      await apiClient.notes.update(
        1,
        { title: "Updated", content: "New content", isPublic: "true" },
        token,
      );
      expect(mockNoteByIdPut).toHaveBeenCalledWith(
        { title: "Updated", content: "New content", isPublic: true },
        { headers: { Authorization: "Bearer test-jwt-token" } },
      );
    });

    it("should include auth token when deleting a note", async () => {
      const token = "test-jwt-token";
      await apiClient.notes.delete(3, token);
      expect(mockNoteByIdDelete).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer test-jwt-token" },
      });
    });

    it("should re-throw formatted errors from note creation", async () => {
      mockNotesPost.mockRejectedValueOnce({
        error: "Bad request",
        details: "Title required",
      });
      await expect(
        apiClient.notes.create({ title: "", content: "" }, "token"),
      ).rejects.toThrow("Bad request");
    });
  });
});
