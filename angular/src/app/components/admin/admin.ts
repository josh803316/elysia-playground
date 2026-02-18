import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesApiService, Note } from '../../services/notes-api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="section">
      <h2>Admin Panel</h2>
      <p class="subtitle">Enter your API key to view and manage all notes.</p>

      <form class="api-key-form" (submit)="loadNotes($event)">
        <input
          type="password"
          placeholder="API Key"
          [(ngModel)]="apiKey"
          name="apiKey"
          class="input"
          required
        />
        <button type="submit" class="btn btn-primary" [disabled]="!apiKey().trim()">
          Load All Notes
        </button>
      </form>

      @if (error()) {
        <div class="error">{{ error() }}</div>
      }

      @if (loading()) {
        <p class="loading">Loading...</p>
      } @else if (loaded() && notes().length === 0) {
        <p class="empty">No notes found.</p>
      } @else if (loaded()) {
        <p class="count">{{ notes().length }} note(s) found</p>
        <ul class="note-list">
          @for (note of notes(); track note.id) {
            <li class="note-item">
              <div class="note-info">
                <span class="note-content">{{ note.content }}</span>
                <span class="note-meta">
                  ID: {{ note.id }}
                  @if (note.userId) {
                    · User: {{ note.userId }}
                  }
                  @if (note.isPublic !== undefined) {
                    · {{ note.isPublic ? 'Public' : 'Private' }}
                  }
                </span>
              </div>
              <button class="btn btn-small btn-danger" (click)="deleteNote(note.id)">
                Delete
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: `
    .section { padding: 4px 0; }
    .subtitle { color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px; }
    .api-key-form {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    .api-key-form .input { flex: 1; }
    .count {
      color: var(--text-secondary);
      font-size: 0.85rem;
      margin-bottom: 12px;
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
      background: var(--bg-white);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
    }
    .note-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .note-content { color: var(--text); font-size: 0.875rem; }
    .note-meta {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .loading, .empty { color: var(--text-muted); font-size: 0.9rem; }
    .error {
      color: #dc2626;
      background: rgba(220, 38, 38, 0.08);
      padding: 8px 12px;
      border-radius: var(--radius);
      margin-bottom: 12px;
      font-size: 0.85rem;
    }
  `,
})
export class AdminComponent {
  private api = inject(NotesApiService);

  apiKey = signal('');
  notes = signal<Note[]>([]);
  loading = signal(false);
  loaded = signal(false);
  error = signal('');

  async loadNotes(event: Event) {
    event.preventDefault();
    const key = this.apiKey().trim();
    if (!key) return;
    this.loading.set(true);
    this.error.set('');
    try {
      const data = await this.api.fetchAllNotesAdmin(key);
      this.notes.set(Array.isArray(data) ? data : []);
      this.loaded.set(true);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteNote(id: number) {
    const key = this.apiKey().trim();
    if (!key) return;
    this.error.set('');
    try {
      await this.api.deleteNoteAdmin(key, id);
      this.notes.update((n) => n.filter((note) => note.id !== id));
    } catch (e: any) {
      this.error.set(e.message);
    }
  }
}
