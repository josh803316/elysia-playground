import {
  Component,
  inject,
  signal,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { NotesApiService, Note } from '../../services/notes-api.service';
import { CodeExpanderComponent } from '../code-expander/code-expander';
import { ADMIN_TEST_SNIPPET } from '../../lib/e2e-snippets';

const ADMIN_CODE = `// admin.ts — Inject NotesApiService and load all notes
@Component({ selector: 'app-admin', ... })
export class AdminComponent implements OnChanges {
  private api = inject(NotesApiService);
  notes = signal<Note[]>([]);
  loading = signal(false);

  @Input() apiKey: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['apiKey'] && this.apiKey) this.loadNotes();
  }

  async loadNotes() {
    const data = await this.api.fetchAllNotes(this.apiKey!);
    this.notes.set(Array.isArray(data) ? data : []);
  }

  async deleteNote(id: number) {
    await this.api.deleteNote(id, this.apiKey!);
    await this.loadNotes();
  }
}`;

/** Admin view: all notes table with delete. Requires apiKey (X-API-Key). Emits onLogout on 401 so parent can clear key. */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CodeExpanderComponent],
  template: `
    <div class="section-header">
      <div>
        <h2 class="section-title">All Notes (Admin View)</h2>
        <p class="section-subtitle">View and manage all notes in the system</p>
      </div>
    </div>

    @if (error()) {
      <div class="error-banner">{{ error() }}</div>
    }

    <div class="delete-by-regex-row">
      <input
        type="text"
        placeholder="e.g. e2e- or ^test"
        [value]="regexInput()"
        (input)="regexInput.set($any($event.target).value)"
        class="regex-input"
      />
      <button
        type="button"
        class="btn-delete-matching"
        [disabled]="!regexInput().trim() || !apiKey || deleteByRegexLoading()"
        (click)="deleteByRegex()"
      >
        {{ deleteByRegexLoading() ? 'Deleting…' : 'Delete matching notes' }}
      </button>
    </div>
    <p class="regex-hint">Delete notes whose content or title matches the regex</p>

    @if (loading()) {
      <div class="loading-text">Loading admin notes...</div>
    } @else if (!loaded()) {
      <div class="loading-text">Loading...</div>
    } @else if (notes().length === 0) {
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <p>No notes found in the system</p>
      </div>
    } @else {
      <div class="table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content Preview</th>
              <th>Status</th>
              <th>Author</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (note of notes(); track note.id) {
              <tr>
                <td>{{ note.title || 'Untitled' }}</td>
                <td class="content-cell">{{ getContentPreview(note.content || '') }}</td>
                <td>
                  @if (note.isPublic === 'true') {
                    <span class="badge-public">Public</span>
                  } @else {
                    <span class="badge-private">Private</span>
                  }
                </td>
                <td>{{ getAuthor(note) }}</td>
                <td>{{ formatDate(note.createdAt) }}</td>
                <td>
                  <button class="action-delete" (click)="deleteNote(note.id)">Delete</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }

    <app-code-expander
      [code]="ADMIN_CODE"
      id="angular-admin-code"
      label="Angular code"
      [testCode]="ADMIN_TEST_SNIPPET"
      testLabel="E2E test (Playwright)"
    />
  `,
  styles: `
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
    }
    .section-subtitle {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .table-wrapper {
      overflow-x: auto;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
    }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    .admin-table thead {
      background: #f3f4f6;
    }
    .admin-table th {
      padding: 0.75rem 1rem;
      text-align: left;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      color: #374151;
      letter-spacing: 0.05em;
    }
    .admin-table td {
      padding: 0.75rem 1rem;
      color: #374151;
      border-top: 1px solid #e5e7eb;
    }
    .admin-table tbody tr:hover td {
      background: #f9fafb;
    }
    .content-cell {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #6b7280;
    }

    .badge-public {
      display: inline-block;
      padding: 0.125rem 0.5rem;
      border-radius: 0.25rem;
      background: #dcfce7;
      color: #15803d;
      font-size: 0.75rem;
      font-weight: 500;
    }
    .badge-private {
      display: inline-block;
      padding: 0.125rem 0.5rem;
      border-radius: 0.25rem;
      background: #f3f4f6;
      color: #374151;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .action-delete {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: #dc2626;
      padding: 0;
      transition: color 0.15s;
    }
    .action-delete:hover {
      color: #b91c1c;
    }

    .error-banner {
      background: #fef2f2;
      border: 1px solid #fca5a5;
      color: #b91c1c;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }
    .loading-text {
      color: #6b7280;
      font-size: 0.9rem;
      text-align: center;
      padding: 2rem 0;
    }
    .empty-state {
      text-align: center;
      padding: 2rem 1rem;
      color: #6b7280;
    }
    .empty-icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .delete-by-regex-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }
    .regex-input {
      flex: 1;
      min-width: 200px;
      padding: 0.5rem 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      font-size: 0.875rem;
    }
    .btn-delete-matching {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #b91c1c;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 0.375rem;
      cursor: pointer;
    }
    .btn-delete-matching:hover:not(:disabled) {
      background: #fee2e2;
    }
    .btn-delete-matching:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .regex-hint {
      font-size: 0.75rem;
      color: #6b7280;
      margin: 0 0 1rem 0;
    }
  `,
})
export class AdminComponent implements OnChanges {
  readonly ADMIN_CODE = ADMIN_CODE;
  readonly ADMIN_TEST_SNIPPET = ADMIN_TEST_SNIPPET;
  private api = inject(NotesApiService);

  @Input() apiKey: string | null = null;
  @Output() onLogout = new EventEmitter<void>();

  notes = signal<Note[]>([]);
  loading = signal(false);
  loaded = signal(false);
  error = signal('');
  regexInput = signal('');
  deleteByRegexLoading = signal(false);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['apiKey'] && this.apiKey) {
      this.loadNotes();
    }
  }

  async loadNotes() {
    const key = this.apiKey;
    if (!key) return;
    this.loading.set(true);
    this.error.set('');
    try {
      const data = await this.api.fetchAllNotesAdmin(key);
      this.notes.set(Array.isArray(data) ? data : []);
      this.loaded.set(true);
    } catch (e: any) {
      this.error.set(e.message);
      if (e.message.includes('401') || e.message.includes('Unauthorized')) {
        this.onLogout.emit();
      }
    } finally {
      this.loading.set(false);
    }
  }

  async deleteNote(id: number) {
    const key = this.apiKey;
    if (!key) return;
    if (!confirm('Are you sure you want to delete this note?')) return;
    this.error.set('');
    try {
      await this.api.deleteNoteAdmin(key, id);
      this.notes.update((n) => n.filter((note) => note.id !== id));
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async deleteByRegex() {
    const key = this.apiKey;
    const regex = this.regexInput().trim();
    if (!key || !regex) return;
    this.error.set('');
    this.deleteByRegexLoading.set(true);
    try {
      await this.api.deleteNotesByRegexAdmin(key, regex);
      this.regexInput.set('');
      await this.loadNotes();
    } catch (e: any) {
      this.error.set(e?.message ?? 'Failed to delete by regex');
    } finally {
      this.deleteByRegexLoading.set(false);
    }
  }

  getAuthor(note: Note): string {
    if (note.user) {
      const name = [note.user.firstName, note.user.lastName].filter(Boolean).join(' ');
      return name || note.user.email || 'User';
    }
    if (note.userId) return `User #${note.userId}`;
    return 'Anonymous';
  }

  getContentPreview(content: string): string {
    return content.length > 50 ? content.substring(0, 50) + '…' : content || '(No content)';
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
