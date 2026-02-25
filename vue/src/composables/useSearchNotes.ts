import { ref, inject, provide, type Ref } from 'vue';

export interface SearchNote {
  id: number;
  title: string;
  content: string;
  isPublic: string;
  userId?: number | null;
  createdAt: string;
  updatedAt: string;
}

export type SearchNotesContext = {
  searchQuery: Ref<string>;
  searchResults: Ref<SearchNote[]>;
  setSearch: (query: string, results: SearchNote[]) => void;
  clearSearch: () => void;
};

const SEARCH_KEY: symbol = Symbol('search-notes');

export function provideSearchNotes(): SearchNotesContext {
  const searchQuery = ref('');
  const searchResults = ref<SearchNote[]>([]);
  function setSearch(query: string, results: SearchNote[]) {
    searchQuery.value = query;
    searchResults.value = results;
  }
  function clearSearch() {
    searchQuery.value = '';
    searchResults.value = [];
  }
  const ctx: SearchNotesContext = { searchQuery, searchResults, setSearch, clearSearch };
  provide(SEARCH_KEY, ctx);
  return ctx;
}

export function useSearchNotes(): SearchNotesContext {
  const ctx = inject<SearchNotesContext | undefined>(SEARCH_KEY);
  if (!ctx) throw new Error('useSearchNotes must be used under a provider that calls provideSearchNotes');
  return ctx;
}
