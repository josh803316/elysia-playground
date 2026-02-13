import { treaty } from "@elysiajs/eden";
// Import the App type from the server
import type { App } from "../../../server/src/index";

// Resolve API base URL safely.
// In production (Vercel), default to same-origin unless an explicit valid
// absolute/root-relative VITE_API_URL is provided.
const rawApiUrl = (import.meta.env.VITE_API_URL ?? "").trim();
const normalizedApiUrl = rawApiUrl.toLowerCase();
const isPlaceholderApiHost =
  normalizedApiUrl === "api" ||
  normalizedApiUrl === "//api" ||
  normalizedApiUrl === "http://api" ||
  normalizedApiUrl === "https://api";
const isAbsoluteApiUrl = /^https?:\/\//i.test(rawApiUrl);
const isRootRelativeApiUrl = rawApiUrl.startsWith("/");
const isInvalidApiUrl =
  !!rawApiUrl &&
  !isPlaceholderApiHost &&
  !isAbsoluteApiUrl &&
  !isRootRelativeApiUrl;

export const API_URL =
  typeof window !== "undefined"
    ? rawApiUrl && !isPlaceholderApiHost
      ? isAbsoluteApiUrl
        ? rawApiUrl.replace(/\/+$/, "")
        : isRootRelativeApiUrl
          ? `${window.location.origin}${rawApiUrl.replace(/\/+$/, "")}`
          : window.location.origin
      : window.location.origin
    : rawApiUrl && !isPlaceholderApiHost && isAbsoluteApiUrl
      ? rawApiUrl.replace(/\/+$/, "")
      : typeof process !== "undefined" && process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

if (typeof console !== "undefined") {
  if (isPlaceholderApiHost) {
    console.warn(
      `[api/client] Ignoring invalid VITE_API_URL="${rawApiUrl}". ` +
        "Using same-origin API base instead."
    );
  } else if (isInvalidApiUrl) {
    console.warn(
      `[api/client] VITE_API_URL="${rawApiUrl}" is not absolute or root-relative. ` +
        "Using same-origin API base instead."
    );
  }
}

/** In dev (Vite on 5173), use relative path so the proxy forwards to the server and we avoid CORS. */
export function getApiBase(): string {
  return API_URL.replace(/\/$/, "");
}

// Define error types
interface ApiError extends Error {
  details?: string;
  status?: number;
  technicalDetails?: string;
}

interface ApiResponseError {
  message: string;
  details?: string;
  status?: number;
  error?: string;
  technicalDetails?: string;
}

// Use a more specific async function type for endpoints
type Endpoint = (...args: unknown[]) => Promise<unknown>;

// Define the expected client structure manually
interface ExpectedClient {
  "auth-example": {
    get: Endpoint;
  };
  api: {
    notes: {
      get: Endpoint;
      post: Endpoint;
    } & {
      // Index signature *only* for dynamic ID routes
      [id: string]: {
        get: Endpoint;
        put: Endpoint;
        delete: Endpoint;
      };
    };
    "private-notes": {
      get: Endpoint;
      put: Endpoint;
    } & {
      // Index signature *only* for dynamic ID routes
      [id: string]: {
        get: Endpoint;
        put: Endpoint;
        delete: Endpoint;
      };
    };
    "public-notes": {
      get: Endpoint;
    } & {
      // Index signature *only* for dynamic ID routes
      [id: string]: {
        get: Endpoint;
      };
    };
    // Add other API namespaces if necessary
  };
  // Add other treaty methods like $ws if used
}

// Create and export the base Eden Treaty client, asserting its shape
const client = treaty<App>(API_URL) as ExpectedClient;

// Helper functions for common API operations using the exported client
export const apiClient = {
  // Notes API (mounted under /api)
  notes: {
    getAll: async (token?: string) => {
      return client.api.notes.get({
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
            : (note.isPublic ?? false),
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
            : (note.isPublic ?? false),
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
      return client.api["private-notes"].put(note, {
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
      return client.api["public-notes"].get();
    },
    getById: async (id: number) => {
      return client.api["public-notes"][id].get();
    },
  },

  // Delete all notes
  deleteAllMyNotes: async (token: string) => {
    const response = await fetch(`${API_URL}/api/notes/all`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete all notes: ${response.status}`);
    }
    return response.json();
  },

  deleteAllNotesAdmin: async (apiKey: string) => {
    const response = await fetch(`${API_URL}/api/notes/all/admin`, {
      method: "DELETE",
      headers: {
        "X-API-Key": apiKey,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete all notes (admin): ${response.status}`);
    }
    return response.json();
  },

  // Auth example (mounted at root /)
  auth: {
    example: async (token?: string) => {
      // Correct path: Access root route directly via client
      return client["auth-example"].get({
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    },
  },
};

export default apiClient;
