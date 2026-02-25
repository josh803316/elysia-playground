import { Injectable, signal } from '@angular/core';

export interface SearchNote {
  id: number;
  title: string;
  content: string;
  isPublic: string;
  userId?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class SearchNotesService {
  readonly searchQuery = signal('');
  readonly searchResults = signal<SearchNote[]>([]);

  setSearch(query: string, results: SearchNote[]) {
    this.searchQuery.set(query);
    this.searchResults.set(results);
  }

  clearSearch() {
    this.searchQuery.set('');
    this.searchResults.set([]);
  }
}
