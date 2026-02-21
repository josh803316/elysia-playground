import { ref } from 'vue';
import type { Note } from '../types/note';

export function usePublicNotes() {
  const notes = ref<Note[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchPublicNotes() {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch('/api/public-notes');
      if (!res.ok) throw new Error('Failed to load public notes');
      const raw: unknown = await res.json();
      notes.value = Array.isArray(raw)
        ? (raw as Note[])
        : Array.isArray((raw as { data?: unknown }).data)
          ? ((raw as { data: Note[] }).data as Note[])
          : [];
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load public notes';
    } finally {
      loading.value = false;
    }
  }

  async function createAnonymousNote(content: string): Promise<void> {
    const res = await fetch('/api/public-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, isPublic: true }),
    });
    if (!res.ok) {
      const data: { error?: string } = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to create note');
    }
  }

  async function deletePublicNote(id: string): Promise<void> {
    const res = await fetch(`/api/public-notes/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete note');
  }

  return { notes, loading, error, fetchPublicNotes, createAnonymousNote, deletePublicNote };
}
