import { writable } from "svelte/store";
import apiClient from "../api/client";

export interface Note {
  id: number;
  title: string;
  content: string;
  isPublic: boolean;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

interface NotesState {
  notes: Note[] | null;
  loading: boolean;
  error: Error | null;
  initialized: boolean;
}

function createNotesStore() {
  const { subscribe, set, update } = writable<NotesState>({
    notes: null,
    loading: false,
    error: null,
    initialized: false,
  });

  const store = {
    subscribe,
    fetchNotes: async (token?: string) => {
      update((state) => ({ ...state, loading: true }));
      try {
        if (!token) {
          throw new Error("No authentication token available");
        }
        const response = (await apiClient.notes.getAll(token)) as {
          data: Note[];
        };
        set({
          notes: response.data,
          loading: false,
          error: null,
          initialized: true,
        });
      } catch (err) {
        console.error("Error fetching notes:", err);
        set({
          notes: null,
          loading: false,
          error:
            err instanceof Error ? err : new Error("Failed to fetch notes"),
          initialized: true,
        });
      }
    },
    createNote: async (
      data: { title: string; content: string; isPublic?: boolean },
      token?: string
    ) => {
      try {
        // For public notes without authentication, use the public notes API
        if (data.isPublic && !token) {
          await apiClient.publicNotes.create({ content: data.content });
          return;
        }

        // For authenticated requests (both public and private notes)
        if (!token) {
          throw new Error("No authentication token available");
        }
        await apiClient.notes.create(data, token);
        // Refresh notes after creation if authenticated
        await store.fetchNotes(token);
      } catch (err) {
        console.error("Error creating note:", err);
        throw err instanceof Error ? err : new Error("Failed to create note");
      }
    },
    updateNote: async (
      id: number,
      data: { title?: string; content?: string; isPublic?: boolean },
      token?: string
    ) => {
      try {
        if (!token) {
          throw new Error("No authentication token available");
        }
        await apiClient.notes.update(id, data, token);
        // Refresh notes after update
        await store.fetchNotes(token);
      } catch (err) {
        console.error("Error updating note:", err);
        throw err instanceof Error ? err : new Error("Failed to update note");
      }
    },
    deleteNote: async (id: number, token?: string) => {
      try {
        if (!token) {
          throw new Error("No authentication token available");
        }
        await apiClient.notes.delete(id, token);
        // Refresh notes after deletion
        await store.fetchNotes(token);
      } catch (err) {
        console.error("Error deleting note:", err);
        throw err instanceof Error ? err : new Error("Failed to delete note");
      }
    },
  };

  return store;
}

export const notesStore = createNotesStore();
