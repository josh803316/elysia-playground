import { treaty } from "@elysiajs/eden";
// Import the App type from the server
import type { App } from "../../../../server/src/index";

// Get the API URL from environment variables.
// In production (Vercel), default to same-origin calls.
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "" : "http://localhost:3000");

// Define error types
interface ApiError extends Error {
  details?: string;
  status?: number;
  technicalDetails?: string;
}

interface ApiResponseError {
  error: string;
  details?: string;
  technicalDetails?: string;
  status?: number;
}

// Define the expected shape of the client
interface ExpectedClient {
  api: {
    notes: {
      index: {
        get: (options?: {
          headers?: Record<string, string>;
        }) => Promise<unknown>;
      };
      get: (options?: { headers?: Record<string, string> }) => Promise<unknown>;
      post: (
        data: unknown,
        options?: { headers?: Record<string, string> }
      ) => Promise<unknown>;
      [key: number]: {
        get: (options?: {
          headers?: Record<string, string>;
        }) => Promise<unknown>;
        put: (
          data: unknown,
          options?: { headers?: Record<string, string> }
        ) => Promise<unknown>;
        delete: (options?: {
          headers?: Record<string, string>;
        }) => Promise<unknown>;
      };
    };
    "private-notes": {
      get: (options?: { headers?: Record<string, string> }) => Promise<unknown>;
      post: (
        data: unknown,
        options?: { headers?: Record<string, string> }
      ) => Promise<unknown>;
      [key: number]: {
        get: (options?: {
          headers?: Record<string, string>;
        }) => Promise<unknown>;
        put: (
          data: unknown,
          options?: { headers?: Record<string, string> }
        ) => Promise<unknown>;
        delete: (options?: {
          headers?: Record<string, string>;
        }) => Promise<unknown>;
      };
    };
    "public-notes": {
      index: { get: () => Promise<unknown> };
      post: (data: unknown) => Promise<unknown>;
      [key: number]: { get: () => Promise<unknown> };
    };
  };
  versions: {
    get: () => Promise<{ data: { version: string } }>;
  };
}

// Create and export the base Eden Treaty client, asserting its shape
export const client = treaty<App>(API_URL) as ExpectedClient;

// Helper functions for common API operations using the exported client
export const apiClient = {
  // Notes API (mounted under /api)
  notes: {
    getAll: async (token?: string) => {
      return client.api.notes.index.get({
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    },
    getUserNotes: async (token?: string) => {
      return client.api.notes.get({
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    },
    getById: async (id: number, token?: string) => {
      return client.api.notes[id].get({
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    },
    create: async (
      note: { title: string; content: string; isPublic?: string | boolean },
      token?: string
    ) => {
      // Convert isPublic to boolean if it's a string
      const noteData = {
        ...note,
        isPublic:
          typeof note.isPublic === "string"
            ? note.isPublic === "true"
            : note.isPublic ?? false,
      };

      try {
        const response = await client.api.notes.post(noteData, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        return response;
      } catch (error: unknown) {
        // Format the error with more details
        const apiError = new Error(
          (error as ApiResponseError).error || "Failed to create note"
        ) as ApiError;
        apiError.details =
          (error as ApiResponseError).details || "Unknown error";
        apiError.technicalDetails = (
          error as ApiResponseError
        ).technicalDetails;
        apiError.status = (error as ApiResponseError).status;
        throw apiError;
      }
    },
    update: async (
      id: number,
      note: { title?: string; content?: string; isPublic?: string | boolean },
      token?: string
    ) => {
      // Convert isPublic to boolean if it's a string
      const noteData = {
        ...note,
        isPublic:
          typeof note.isPublic === "string"
            ? note.isPublic === "true"
            : note.isPublic ?? false,
      };

      return client.api.notes[id].put(noteData, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    },
    delete: async (id: number, token?: string) => {
      return client.api.notes[id].delete({
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    },
  },

  // Private Notes API (mounted under /api)
  privateNotes: {
    getAll: async (token?: string) => {
      return client.api["private-notes"].get({
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    },
    getById: async (id: number, token?: string) => {
      return client.api["private-notes"][id].get({
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    },
    create: async (
      note: { title: string; content: string },
      token?: string
    ) => {
      return client.api["private-notes"].post(note, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    },
    update: async (
      id: number,
      note: { title?: string; content?: string },
      token?: string
    ) => {
      return client.api["private-notes"][id].put(note, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    },
    delete: async (id: number, token?: string) => {
      return client.api["private-notes"][id].delete({
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    },
  },

  // Public Notes API (mounted under /api)
  publicNotes: {
    getAll: async () => {
      return client.api["public-notes"].index.get();
    },
    getById: async (id: number) => {
      return client.api["public-notes"][id].get();
    },
    create: async (note: { content: string }) => {
      try {
        const response = await client.api["public-notes"].post(note);
        return response;
      } catch (error: unknown) {
        // Format the error with more details
        const apiError = new Error(
          (error as ApiResponseError).error || "Failed to create public note"
        ) as ApiError;
        apiError.details =
          (error as ApiResponseError).details || "Unknown error";
        apiError.technicalDetails = (
          error as ApiResponseError
        ).technicalDetails;
        apiError.status = (error as ApiResponseError).status;
        throw apiError;
      }
    },
  },

  versions: {
    get: async () => {
      return client.versions.get();
    },
  },
};

export default apiClient;
