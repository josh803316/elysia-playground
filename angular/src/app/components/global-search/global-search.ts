import { Component, signal, effect, ElementRef, viewChild, inject, OnDestroy, input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchNotesService, type SearchNote } from '../../services/search-notes.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-global-search',
  standalone: true,
  template: `
    <div class="global-search" #container>
      <input
        type="search"
        placeholder="Search notes…"
        [value]="query()"
        (input)="query.set($any($event.target).value)"
        (focus)="query().trim() && open.set(true)"
        class="search-input"
        aria-label="Search notes"
        data-testid="global-search-input"
      />
      @if (open()) {
        <div class="search-dropdown">
          @if (loading()) {
            <div class="search-item search-muted">Searching…</div>
          } @else if (results().length === 0) {
            <div class="search-item search-muted">No notes found</div>
          } @else {
            @for (note of results(); track note.id) {
              <button
                type="button"
                class="search-item search-result"
                (click)="goToNote(note)"
              >
                <span class="search-result-title">{{ note.title || 'Untitled' }}</span>
                @if (note.content) {
                  <span class="search-result-snippet">{{ note.content.slice(0, 60) }}…</span>
                }
              </button>
            }
          }
        </div>
      }
    </div>
  `,
  styles: `
    .global-search { position: relative; flex: 1; max-width: 320px; margin: 0 1rem; }
    .search-input {
      width: 100%;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.25rem;
      outline: none;
    }
    .search-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 0.25rem;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      max-height: 320px;
      overflow: auto;
      z-index: 1001;
    }
    .search-item {
      display: block;
      width: 100%;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      text-align: left;
      border: none;
      background: transparent;
      cursor: pointer;
    }
    .search-muted { color: #6b7280; }
    .search-result:hover { background: #f9fafb; }
    .search-result-title { font-weight: 600; color: #111827; }
    .search-result-snippet {
      display: block;
      color: #6b7280;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,
})
export class GlobalSearchComponent implements OnDestroy {
  private router = inject(Router);
  private searchService = inject(SearchNotesService);
  private auth = inject(AuthService);
  private container = viewChild<ElementRef<HTMLDivElement>>('container');
  private clickHandler = (e: MouseEvent) => {
    const el = this.container()?.nativeElement;
    if (el && !el.contains(e.target as Node)) this.open.set(false);
  };

  adminApiKey = input<string | null>(null);

  query = signal('');
  results = signal<SearchNote[]>([]);
  loading = signal(false);
  open = signal(false);
  private debounceId: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      const q = this.query().trim();
      if (!q) {
        this.results.set([]);
        this.open.set(false);
        this.searchService.clearSearch();
        return;
      }
      if (this.debounceId) clearTimeout(this.debounceId);
      this.debounceId = setTimeout(async () => {
        this.loading.set(true);
        try {
          const headers: Record<string, string> = {};
          const token = this.auth.token();
          if (token) headers['Authorization'] = `Bearer ${token}`;
          const key = this.adminApiKey();
          if (key) headers['X-API-Key'] = key;
          const res = await fetch(`/api/notes/search?q=${encodeURIComponent(q)}`, { headers });
          if (!res.ok) throw new Error('Search failed');
          const data = await res.json();
          const list = Array.isArray(data) ? data : [];
          this.results.set(list);
          this.searchService.setSearch(q, list);
          this.open.set(true);
        } catch {
          this.results.set([]);
          this.searchService.setSearch(q, []);
        } finally {
          this.loading.set(false);
        }
      }, 200);
      return () => {
        if (this.debounceId) clearTimeout(this.debounceId);
      };
    });
  }

  ngOnInit() {
    document.addEventListener('mousedown', this.clickHandler);
  }

  ngOnDestroy() {
    document.removeEventListener('mousedown', this.clickHandler);
  }

  goToNote(_note: SearchNote) {
    this.open.set(false);
    this.query.set('');
    this.searchService.clearSearch();
    this.router.navigate(['/']);
  }
}
