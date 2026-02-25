import { writable } from 'svelte/store';

export interface SearchNote {
  id: number;
  title: string;
  content: string;
  isPublic: string;
  userId?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

function createSearchStore() {
  const { subscribe, set, update } = writable<{
    query: string;
    results: SearchNote[];
  }>({ query: '', results: [] });

  return {
    subscribe,
    setSearch: (query: string, results: SearchNote[]) => set({ query, results }),
    clearSearch: () => set({ query: '', results: [] }),
  };
}

export const searchStore = createSearchStore();
