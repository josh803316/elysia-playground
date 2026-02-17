import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesApiService, Note } from '../../services/notes-api.service';

@Component({
  selector: 'app-public-notes',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="section">
      <h2>Public Notes</h2>
      <p class="subtitle">No authentication required — anyone can read and write.</p>

      <form class="note-form" (submit)="createNote($event)">
        <input
          type="text"
          placeholder="Write a public note..."
          [(ngModel)]="newContent"
          name="content"
          class="input"
          required
        />
        <button type="submit" class="btn btn-primary" [disabled]="!newContent().trim()">
          Add
        </button>
      </form>

      @if (error()) {
        <div class="error">{{ error() }}</div>
      }

      @if (loading()) {
        <p class="loading">Loading notes...</p>
      } @else if (notes().length === 0) {
        <p class="empty">No public notes yet. Create the first one!</p>
      } @else {
        <ul class="note-list">
          @for (note of notes(); track note.id) {
            <li class="note-item">
              @if (editingId() === note.id) {
                <form class="edit-form" (submit)="saveEdit(note.id, $event)">
                  <input
                    type="text"
                    [(ngModel)]="editContent"
                    name="editContent"
                    class="input"
                  />
                  <button type="submit" class="btn btn-small">Save</button>
                  <button type="button" class="btn btn-small btn-outline" (click)="cancelEdit()">
                    Cancel
                  </button>
                </form>
              } @else {
                <span class="note-content">{{ note.content }}</span>
                <div class="note-actions">
                  <button class="btn btn-small btn-outline" (click)="startEdit(note)">Edit</button>
                  <button class="btn btn-small btn-danger" (click)="deleteNote(note.id)">
                    Delete
                  </button>
                </div>
              }
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: `
    .section { padding: 4px 0; }
    .subtitle { color: #94a3b8; font-size: 0.85rem; margin-bottom: 16px; }
    .note-form {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    .edit-form {
      display: flex;
      gap: 8px;
      flex: 1;
    }
    .note-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .note-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 14px;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 8px;
    }
    .note-content { flex: 1; }
    .note-actions { display: flex; gap: 6px; }
    .loading, .empty { color: #64748b; font-size: 0.9rem; }
    .error {
      color: #f87171;
      background: rgba(248, 113, 113, 0.1);
      padding: 8px 12px;
      border-radius: 6px;
      margin-bottom: 12px;
      font-size: 0.85rem;
    }
  `,
})
export class PublicNotesComponent implements OnInit {
  private api = inject(NotesApiService);

  notes = signal<Note[]>([]);
  loading = signal(true);
  error = signal('');
  newContent = signal('');
  editingId = signal<number | null>(null);
  editContent = signal('');

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

  async createNote(event: Event) {
    event.preventDefault();
    const content = this.newContent().trim();
    if (!content) return;
    this.error.set('');
    try {
      await this.api.createPublicNote(content);
      this.newContent.set('');
      await this.loadNotes();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  startEdit(note: Note) {
    this.editingId.set(note.id);
    this.editContent.set(note.content);
  }

  cancelEdit() {
    this.editingId.set(null);
    this.editContent.set('');
  }

  async saveEdit(id: number, event: Event) {
    event.preventDefault();
    this.error.set('');
    try {
      await this.api.updatePublicNote(id, { content: this.editContent() });
      this.editingId.set(null);
      await this.loadNotes();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async deleteNote(id: number) {
    this.error.set('');
    try {
      await this.api.deletePublicNote(id);
      await this.loadNotes();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }
}
