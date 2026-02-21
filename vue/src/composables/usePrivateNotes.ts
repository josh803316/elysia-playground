import { ref } from 'vue';
import type { Note } from '../types/note';

export function usePrivateNotes() {
  const notes = ref<Note[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchPrivateNotes(token: string): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch('/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to load your notes');
      const data: unknown = await res.json();
      if (Array.isArray(data)) {
        notes.value = (data as Note[]).filter((n) => n.isPublic !== 'true');
      } else {
        notes.value = [];
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load your notes';
    } finally {
      loading.value = false;
    }
  }

  async function createNote(
    payload: { title: string; content: string; isPublic: boolean },
    token: string,
  ): Promise<void> {
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data: { error?: string } = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to create note');
    }
  }

  async function updateNote(
    id: string,
    payload: { title?: string; content?: string; isPublic?: boolean },
    token: string,
  ): Promise<void> {
    const res = await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update note');
  }

  async function deleteNote(id: string, token: string): Promise<void> {
    const res = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete note');
  }

  return { notes, loading, error, fetchPrivateNotes, createNote, updateNote, deleteNote };
}
