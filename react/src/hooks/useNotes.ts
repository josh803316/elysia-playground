import { useState, useEffect } from "react";
import apiClient from "../api/client";
import { useAuth } from "@clerk/clerk-react";

export interface Note {
  id: number;
  title: string;
  content: string;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  data: Note[];
}

interface CreateNoteData {
  title: string;
  content: string;
}

export function useNotes() {
  const { getToken } = useAuth();
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [initialized, setInitialized] = useState(false);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token available");
      }
      const response = (await apiClient.notes.getAll(token)) as ApiResponse;
      console.log("Notes response:", response);
      setNotes(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch notes"));
    } finally {
      setIsLoading(false);
      setInitialized(true);
    }
  };

  const createNote = async (data: CreateNoteData) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token available");
      }
      await apiClient.notes.create(data, token);
      await fetchNotes();
    } catch (err) {
      console.error("Error creating note:", err);
      throw err instanceof Error ? err : new Error("Failed to create note");
    }
  };

  const updateNote = async (id: number, data: CreateNoteData) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token available");
      }
      await apiClient.notes.update(id, data, token);
      await fetchNotes();
    } catch (err) {
      console.error("Error updating note:", err);
      throw err instanceof Error ? err : new Error("Failed to update note");
    }
  };

  const deleteNote = async (id: number) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token available");
      }
      await apiClient.notes.delete(id, token);
      await fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
      throw err instanceof Error ? err : new Error("Failed to delete note");
    }
  };

  useEffect(() => {
    if (!initialized) {
      fetchNotes();
    }
  }, [initialized]);

  return {
    notes,
    isLoading,
    error,
    createNote,
    updateNote,
    deleteNote,
    refresh: fetchNotes,
  };
}
