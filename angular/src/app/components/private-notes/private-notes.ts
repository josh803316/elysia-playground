import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesApiService, Note } from '../../services/notes-api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-private-notes',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="section">
      <h2>Private Notes</h2>
      <p class="subtitle">Authenticated CRUD — sign in to manage your personal notes.</p>

      @if (!auth.isSignedIn()) {
        <div class="sign-in-prompt">
          <p>Please sign in to view and create private notes.</p>
          <button class="btn btn-primary" (click)="auth.signIn()">Sign in</button>
        </div>
      } @else {
        <form class="note-form" (submit)="createNote($event)">
          <input
            type="text"
            placeholder="Write a private note..."
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
          <p class="empty">No private notes yet.</p>
        } @else {
          <ul class="note-list">
            @for (note of notes(); track note.id) {
              <li class="note-item">
                <span class="note-content">{{ note.content }}</span>
                <button class="btn btn-small btn-danger" (click)="deleteNote(note.id)">
                  Delete
                </button>
              </li>
            }
          </ul>
        }
      }
    </div>
  `,
  styles: `
    .section { padding: 4px 0; }
    .subtitle { color: #94a3b8; font-size: 0.85rem; margin-bottom: 16px; }
    .sign-in-prompt {
      text-align: center;
      padding: 32px;
      color: #94a3b8;
    }
    .sign-in-prompt p { margin-bottom: 16px; }
    .note-form {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
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
export class PrivateNotesComponent implements OnInit {
  readonly auth = inject(AuthService);
  private api = inject(NotesApiService);

  notes = signal<Note[]>([]);
  loading = signal(false);
  error = signal('');
  newContent = signal('');

  constructor() {
    // Reload notes when auth state changes
    effect(() => {
      if (this.auth.isSignedIn() && this.auth.token()) {
        this.loadNotes();
      } else {
        this.notes.set([]);
      }
    });
  }

  ngOnInit() {
    if (this.auth.isSignedIn() && this.auth.token()) {
      this.loadNotes();
    }
  }

  async loadNotes() {
    const token = this.auth.token();
    if (!token) return;
    this.loading.set(true);
    this.error.set('');
    try {
      const data = await this.api.fetchPrivateNotes(token);
      this.notes.set(Array.isArray(data) ? data : []);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }

  async createNote(event: Event) {
    event.preventDefault();
    const token = this.auth.token();
    if (!token) return;
    const content = this.newContent().trim();
    if (!content) return;
    this.error.set('');
    try {
      await this.api.createPrivateNote(token, content);
      this.newContent.set('');
      await this.loadNotes();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async deleteNote(id: number) {
    const token = this.auth.token();
    if (!token) return;
    this.error.set('');
    try {
      await this.api.deletePrivateNote(token, id);
      await this.loadNotes();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }
}
