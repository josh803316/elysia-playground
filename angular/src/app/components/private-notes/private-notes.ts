import { Component, inject, signal, computed, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesApiService, Note } from '../../services/notes-api.service';
import { SearchNotesService } from '../../services/search-notes.service';

/** Private notes (user-only). Loads when token input is set; uses OnChanges to react to token from parent. */
@Component({
  selector: 'app-private-notes',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="section-header">
      <div>
        <h2 class="section-title">Your Notes</h2>
        <p class="section-subtitle">Only you can see these notes</p>
      </div>
      <button class="btn-create-private" (click)="openCreateModal()">
        <span class="btn-icon">+</span> Create Private Note
      </button>
    </div>

    @if (searchQuery()) {
      <p class="loading-text">Showing notes matching &quot;{{ searchQuery() }}&quot;</p>
    }
    @if (error()) {
      <div class="error-banner">{{ error() }}</div>
    }

    @if (loading() && !searchQuery()) {
      <div class="loading-text">Loading your notes...</div>
    } @else if (displayedNotes().length === 0) {
      <div class="empty-state">
        <div class="empty-icon">🔒</div>
        <p class="empty-message">{{ searchQuery() ? 'No private notes match "' + searchQuery() + '"' : 'No private notes yet. Create your first one!' }}</p>
      </div>
    } @else {
      <div class="notes-grid">
        @for (note of displayedNotes(); track note.id) {
          <div class="note-card note-card--private">
            <div class="note-card-body">
              <div class="note-card-header">
                <h3 class="note-card-title">{{ note.title || note.content.substring(0, 40) || 'Private Note' }}</h3>
                <span class="badge-private">🔒 Private</span>
              </div>
              <p class="note-card-content">{{ note.content }}</p>
              <div class="note-card-meta">
                <span>{{ formatDate(note.createdAt) }}</span>
              </div>
            </div>
            <div class="note-card-footer">
              <button class="action-delete" (click)="deleteNote(note.id)">Delete</button>
            </div>
          </div>
        }
      </div>
    }

    <!-- Create Private Note Modal -->
    @if (showModal()) {
      <div class="modal-overlay" (click)="closeOnOverlay($event)">
        <div class="modal-box">
          <div class="modal-header-private">
            <h3>🔒 Create Private Note</h3>
            <button class="modal-close" (click)="closeModal()">×</button>
          </div>
          <form class="modal-form" (submit)="saveNote($event)">
            <div class="form-group">
              <label class="label">Content</label>
              <textarea
                [(ngModel)]="formContent"
                name="content"
                class="input"
                rows="4"
                required
                placeholder="Write your private note here..."
              ></textarea>
            </div>
            <p class="private-hint">🔒 This note will only be visible to you</p>
            @if (modalError()) {
              <div class="error-banner">{{ modalError() }}</div>
            }
            <div class="modal-actions">
              <button type="button" class="btn-cancel" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn-submit-purple" [disabled]="saving()">
                Create Private Note
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: `
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    .section-title { font-size: 1.5rem; font-weight: 700; color: #1f2937; }
    .section-subtitle { font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; }

    .btn-create-private {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #7c3aed;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background 0.15s;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    .btn-create-private:hover { background: #6d28d9; }
    .btn-icon { font-size: 1.2em; font-weight: 700; }

    .notes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .note-card {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: box-shadow 0.15s;
      display: flex;
      flex-direction: column;
    }
    .note-card:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1); }
    .note-card--private { border-left: 4px solid #7c3aed; }

    .note-card-body { padding: 1rem; flex: 1; }
    .note-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    .note-card-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      margin-right: 0.5rem;
    }
    .badge-private {
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      border-radius: 999px;
      background: #ede9fe;
      color: #7c3aed;
      flex-shrink: 0;
    }
    .note-card-content {
      color: #4b5563;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .note-card-meta {
      display: flex;
      justify-content: flex-end;
      font-size: 0.75rem;
      color: #6b7280;
    }
    .note-card-footer {
      border-top: 1px solid #f3f4f6;
      background: #f9fafb;
      padding: 0.75rem 1.25rem;
      display: flex;
      justify-content: flex-end;
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
    .action-delete:hover { color: #b91c1c; }

    .error-banner {
      background: #fef2f2;
      border: 1px solid #fca5a5;
      color: #b91c1c;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }
    .loading-text { color: #6b7280; font-size: 0.9rem; text-align: center; padding: 2rem 0; }
    .empty-state {
      text-align: center;
      padding: 2rem 1rem;
      color: #6b7280;
    }
    .empty-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .empty-message { font-size: 0.9rem; }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      padding: 1rem;
    }
    .modal-box {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 32rem;
    }
    .modal-header-private {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e5e7eb;
      padding: 1rem 1.5rem;
      background: linear-gradient(to right, #f5f3ff, #f0fdf4);
      border-radius: 0.5rem 0.5rem 0 0;
    }
    .modal-header-private h3 { font-size: 1.25rem; font-weight: 600; color: #1f2937; }
    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #6b7280;
      cursor: pointer;
      padding: 0.25rem;
      line-height: 1;
    }
    .modal-close:hover { color: #111827; }
    .modal-form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.25rem; }
    .private-hint { font-size: 0.875rem; color: #6b7280; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; }
    .btn-cancel {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: #4b5563;
      background: #e5e7eb;
      transition: background 0.15s;
    }
    .btn-cancel:hover { background: #d1d5db; }
    .btn-submit-purple {
      padding: 0.5rem 1.5rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: white;
      background: #7c3aed;
      transition: background 0.15s;
    }
    .btn-submit-purple:hover:not(:disabled) { background: #6d28d9; }
    .btn-submit-purple:disabled { opacity: 0.6; cursor: not-allowed; }
  `,
})
export class PrivateNotesComponent implements OnChanges {
  private api = inject(NotesApiService);
  private searchService = inject(SearchNotesService);

  @Input() token: string | null = null;
  @Output() notesChanged = new EventEmitter<void>();

  notes = signal<Note[]>([]);
  loading = signal(false);
  error = signal('');
  showModal = signal(false);
  formContent = '';
  saving = signal(false);
  modalError = signal('');

  searchQuery = this.searchService.searchQuery.asReadonly();
  displayedNotes = computed(() => {
    const q = this.searchService.searchQuery();
    if (!q.trim()) return this.notes();
    return this.searchService.searchResults().filter((n) => n.isPublic !== 'true');
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['token'] && this.token) {
      this.loadNotes();
    }
  }

  async loadNotes() {
    if (!this.token) return;
    this.loading.set(true);
    this.error.set('');
    try {
      const data = await this.api.fetchPrivateNotes(this.token);
      this.notes.set(Array.isArray(data) ? data.filter((n: any) => n.isPublic !== 'true') : []);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }

  openCreateModal() {
    this.formContent = '';
    this.modalError.set('');
    this.showModal.set(true);
  }

  closeModal() { this.showModal.set(false); }

  closeOnOverlay(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  async saveNote(event: Event) {
    event.preventDefault();
    if (!this.token) return;
    const content = this.formContent.trim();
    if (!content) { this.modalError.set('Content is required'); return; }
    this.saving.set(true);
    this.modalError.set('');
    try {
      await this.api.createPrivateNote(this.token, content);
      this.closeModal();
      await this.loadNotes();
      this.notesChanged.emit();
    } catch (e: any) {
      this.modalError.set(e.message);
    } finally {
      this.saving.set(false);
    }
  }

  async deleteNote(id: number) {
    if (!this.token) return;
    if (!confirm('Are you sure you want to delete this private note?')) return;
    this.error.set('');
    try {
      await this.api.deletePrivateNote(this.token, id);
      await this.loadNotes();
      this.notesChanged.emit();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
