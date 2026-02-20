import { ref, computed } from 'vue';
import type { Note } from '../types/note';

export function useAdmin() {
  const adminApiKey = ref<string | null>(localStorage.getItem('adminApiKey'));
  const isAdminLoggedIn = computed(() => !!adminApiKey.value);
  const allNotes = ref<Note[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  function login(key: string) {
    adminApiKey.value = key;
    localStorage.setItem('adminApiKey', key);
  }

  function logout() {
    adminApiKey.value = null;
    allNotes.value = [];
    localStorage.removeItem('adminApiKey');
  }

  async function fetchAllNotes(keyOverride?: string): Promise<void> {
    const key = keyOverride ?? adminApiKey.value;
    if (!key) return;
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch('/api/notes/all', { headers: { 'X-API-Key': key } });
      if (!res.ok) throw new Error(`Admin request failed: ${res.status}`);
      const data: unknown = await res.json();
      allNotes.value = Array.isArray(data) ? (data as Note[]) : [];
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load admin notes';
    } finally {
      loading.value = false;
    }
  }

  async function adminDeleteNote(id: string): Promise<void> {
    if (!adminApiKey.value) return;
    const res = await fetch(`/api/notes/${id}/admin`, {
      method: 'DELETE',
      headers: { 'X-API-Key': adminApiKey.value },
    });
    if (!res.ok) throw new Error('Failed to delete note');
  }

  return {
    adminApiKey,
    isAdminLoggedIn,
    allNotes,
    loading,
    error,
    login,
    logout,
    fetchAllNotes,
    adminDeleteNote,
  };
}
