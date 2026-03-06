import { Component, inject, signal, OnInit, Output, EventEmitter } from '@angular/core';
import { computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesApiService, Note } from '../../services/notes-api.service';
import { SearchNotesService, type SearchNote } from '../../services/search-notes.service';
import { CodeExpanderComponent } from '../code-expander/code-expander';

const PUBLIC_CODE = `// Inject NotesApiService — handles fetch('/api/public-notes')
@Component({ selector: 'app-public-notes', ... })
export class PublicNotesComponent implements OnInit {
  private api = inject(NotesApiService);
  notes = signal<Note[]>([]);

  ngOnInit() { this.loadNotes(); }

  async loadNotes() {
    const data = await this.api.fetchPublicNotes();
    this.notes.set(Array.isArray(data) ? data : []);
  }

  async saveNote(title: string, content: string) {
    await this.api.createPublicNote({ title, content });
    await this.loadNotes();
    this.notesChanged.emit();
  }
}`;

/** Public notes section: list, create, edit, delete. Emits notesChanged so the shell can refresh nav counts. */
@Component({
  selector: 'app-public-notes',
  standalone: true,
  imports: [FormsModule, CodeExpanderComponent],
  template: `
    <div class="section-header">
      <div>
        <h2 class="section-title">Public Notes</h2>
        <p class="section-subtitle">Visible to everyone</p>
      </div>
      <button class="btn-create-public" (click)="openCreateModal()">
        <span class="btn-icon">+</span> Create Public Note
      </button>
    </div>

    @if (searchQuery()) {
      <p class="status-text">Showing notes matching &quot;{{ searchQuery() }}&quot;</p>
    }
    @if (error()) {
      <div class="error-banner">{{ error() }}</div>
    }

    @if (loading() && !searchQuery()) {
      <div class="loading-text">Loading public notes...</div>
    } @else if (displayedNotes().length === 0) {
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <h3 class="empty-title">
          {{ searchQuery() ? 'No public notes match "' + searchQuery() + '"' : 'No notes yet' }}
        </h3>
        <p class="empty-message">
          {{ searchQuery() ? '' : 'Create your first public note to get started!' }}
        </p>
      </div>
    } @else {
      <div class="notes-grid">
        @for (note of displayedNotes(); track note.id) {
          <div class="note-card" id="note-{{ note.id }}">
            <div class="note-card-body">
              <div class="note-card-header">
                <h3 class="note-card-title">{{ note.title || 'Public Note' }}</h3>
                <span class="badge-public">Public</span>
              </div>
              <p class="note-card-content">{{ note.content }}</p>
              <div class="note-card-meta">
                <span>By {{ getAuthor(note) }}</span>
                <span>{{ formatDate(note.createdAt) }}</span>
              </div>
            </div>
            <div class="note-card-footer">
              <button class="action-edit" (click)="openEditModal(note)">Edit</button>
              <button class="action-delete" (click)="deleteNote(note.id)">Delete</button>
            </div>
          </div>
        }
      </div>
    }

    <app-code-expander [code]="PUBLIC_CODE" id="angular-public-code" label="Angular code" />

    <!-- Create/Edit Note Modal -->
    @if (showModal()) {
      <div class="modal-overlay" (click)="closeOnOverlay($event)">
        <div class="modal-box">
          <div class="modal-header">
            <h3>{{ editingNote() ? 'Edit Note' : 'Create Public Note' }}</h3>
            <button class="modal-close" (click)="closeModal()">×</button>
          </div>
          <form class="modal-form" (submit)="saveNote($event)">
            <div class="form-group">
              <label class="label">Title</label>
              <input
                type="text"
                [(ngModel)]="formTitle"
                name="title"
                class="input"
                placeholder="Enter note title..."
                required
              />
            </div>
            <div class="form-group">
              <label class="label">Content</label>
              <textarea
                [(ngModel)]="formContent"
                name="content"
                class="input"
                rows="4"
                required
                placeholder="Write your note here..."
              ></textarea>
            </div>
            @if (modalError()) {
              <div class="error-banner">{{ modalError() }}</div>
            }
            <div class="modal-actions">
              <button type="button" class="btn-cancel" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn-submit-green" [disabled]="saving()">
                {{ editingNote() ? 'Save Changes' : 'Create' }}
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

    .btn-create-public {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #059669;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background 0.15s;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    .btn-create-public:hover {
      background: #047857;
    }
    .btn-icon {
      font-size: 1.2em;
      font-weight: 700;
    }

    .notes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .note-card {
      background: white;
      border-radius: 0.5rem;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -2px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: box-shadow 0.15s;
      display: flex;
      flex-direction: column;
    }
    .note-card:hover {
      box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -4px rgba(0, 0, 0, 0.1);
    }

    .note-card-body {
      padding: 1.25rem;
      flex: 1;
    }
    .note-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
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
    .badge-public {
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      border-radius: 999px;
      background: #dcfce7;
      color: #15803d;
      flex-shrink: 0;
    }
    .note-card-content {
      color: #4b5563;
      font-size: 0.875rem;
      margin-bottom: 1rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .note-card-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #6b7280;
    }
    .note-card-footer {
      border-top: 1px solid #f3f4f6;
      background: #f9fafb;
      padding: 0.75rem 1.25rem;
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }
    .action-edit {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: #0d9488;
      padding: 0;
      transition: color 0.15s;
    }
    .action-edit:hover {
      color: #0f766e;
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
    .status-text {
      color: #6b7280;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    .loading-text {
      color: #6b7280;
      font-size: 0.9rem;
      text-align: center;
      padding: 2rem 0;
    }
    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    .empty-icon {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }
    .empty-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #4b5563;
      margin-bottom: 0.5rem;
    }
    .empty-message {
      color: #6b7280;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      padding: 1rem;
    }
    .modal-box {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 32rem;
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e5e7eb;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem 0.5rem 0 0;
    }
    .modal-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
    }
    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #6b7280;
      cursor: pointer;
      padding: 0.25rem;
      line-height: 1;
    }
    .modal-close:hover {
      color: #111827;
    }
    .modal-form {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }
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
    .btn-cancel:hover {
      background: #d1d5db;
    }
    .btn-submit-green {
      padding: 0.5rem 1.5rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: white;
      background: #059669;
      transition: background 0.15s;
    }
    .btn-submit-green:hover:not(:disabled) {
      background: #047857;
    }
    .btn-submit-green:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `,
})
export class PublicNotesComponent implements OnInit {
  readonly PUBLIC_CODE = PUBLIC_CODE;
  private api = inject(NotesApiService);
  private searchService = inject(SearchNotesService);

  @Output() notesChanged = new EventEmitter<void>();

  notes = signal<Note[]>([]);
  loading = signal(true);
  error = signal('');
  showModal = signal(false);
  editingNote = signal<Note | null>(null);
  formTitle = '';
  formContent = '';
  saving = signal(false);
  modalError = signal('');

  searchQuery = this.searchService.searchQuery.asReadonly();
  displayedNotes = computed(() => {
    const q = this.searchService.searchQuery();
    if (!q.trim()) return this.notes();
    return this.searchService.searchResults().filter((n) => n.isPublic === 'true');
  });

  ngOnInit() {
    this.loadNotes();
  }

  async loadNotes() {
    this.loading.set(true);
    this.error.set('');
    try {
      const data = await this.api.fetchPublicNotes();
      this.notes.set(Array.isArray(data) ? data : []);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }

  openCreateModal() {
    this.editingNote.set(null);
    this.formTitle = '';
    this.formContent = '';
    this.modalError.set('');
    this.showModal.set(true);
  }

  openEditModal(note: Note | SearchNote) {
    this.editingNote.set(note as Note);
    this.formTitle = note.title ?? '';
    this.formContent = note.content ?? '';
    this.modalError.set('');
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingNote.set(null);
  }

  closeOnOverlay(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  async saveNote(event: Event) {
    event.preventDefault();
    const title = this.formTitle.trim();
    const content = this.formContent.trim();
    if (!title) {
      this.modalError.set('Title is required');
      return;
    }
    if (!content) {
      this.modalError.set('Content is required');
      return;
    }
    this.saving.set(true);
    this.modalError.set('');
    try {
      const editing = this.editingNote();
      if (editing) {
        await this.api.updatePublicNote(editing.id, {
          title,
          content,
          isPublic: true,
        });
      } else {
        await this.api.createPublicNote({
          title,
          content,
        });
      }
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
    if (!confirm('Are you sure you want to delete this note?')) return;
    this.error.set('');
    try {
      await this.api.deletePublicNote(id);
      await this.loadNotes();
      this.notesChanged.emit();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  getAuthor(note: Note | SearchNote): string {
    if (note && 'user' in note && note.user) {
      const name = [note.user.firstName, note.user.lastName].filter(Boolean).join(' ');
      return name || note.user.email || 'User';
    }
    return 'Anonymous';
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
