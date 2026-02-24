import { Injectable } from '@angular/core';

/** API note shape; isPublic can be string from JSON (e.g. "true") or boolean. */
export interface Note {
  id: number;
  title?: string;
  content: string;
  isPublic?: boolean | string;
  userId?: string | number;
  createdAt?: string;
  updatedAt?: string;
  user?: { firstName?: string; lastName?: string; email?: string };
}

/**
 * Central API service for notes. Uses fetch() (not HttpClient) so the same patterns
 * work across all frontends and we avoid adding HttpClientModule. All methods throw
 * on non-ok responses so callers can handle errors in one place.
 */
@Injectable({ providedIn: 'root' })
export class NotesApiService {
  private readonly baseUrl = '/api';

  // ── Public Notes (no auth) ────────────────────────────────────

  async fetchPublicNotes(): Promise<Note[]> {
    const res = await fetch(`${this.baseUrl}/public-notes`);
    if (!res.ok) throw new Error('Failed to fetch public notes');
    return res.json();
  }

  async createPublicNote(data: { title?: string; content: string }): Promise<Note> {
    const res = await fetch(`${this.baseUrl}/public-notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: data.title?.trim() || 'Public Note', content: data.content }),
    });
    if (!res.ok) throw new Error('Failed to create public note');
    return res.json();
  }

  async updatePublicNote(
    id: number,
    data: { title?: string; content?: string; isPublic?: boolean }
  ): Promise<Note> {
    const res = await fetch(`${this.baseUrl}/public-notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update public note');
    return res.json();
  }

  async deletePublicNote(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/public-notes/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete public note');
  }

  // ── Private Notes (Bearer token from Clerk) ───────────────────

  async fetchPrivateNotes(token: string): Promise<Note[]> {
    const res = await fetch(`${this.baseUrl}/private-notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch private notes');
    return res.json();
  }

  async createPrivateNote(token: string, data: string): Promise<Note> {
    const title = data.trim().slice(0, 50) || 'Private Note';
    const res = await fetch(`${this.baseUrl}/private-notes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, data }),
    });
    if (!res.ok) throw new Error('Failed to create private note');
    return res.json();
  }

  async deletePrivateNote(token: string, id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/private-notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete private note');
  }

  // ── Admin (X-API-Key header; separate from user auth) ─────────

  async fetchAllNotesAdmin(apiKey: string): Promise<Note[]> {
    const res = await fetch(`${this.baseUrl}/notes/all`, {
      headers: { 'X-API-Key': apiKey },
    });
    if (!res.ok) throw new Error('Failed to fetch admin notes');
    return res.json();
  }

  async deleteNoteAdmin(apiKey: string, id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/notes/${id}/admin`, {
      method: 'DELETE',
      headers: { 'X-API-Key': apiKey },
    });
    if (!res.ok) throw new Error('Failed to delete note (admin)');
  }

  async deleteNotesByRegexAdmin(apiKey: string, contentRegex: string): Promise<{ deletedCount: number }> {
    const res = await fetch(`${this.baseUrl}/notes/admin/delete-by-regex`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({ contentRegex: contentRegex.trim() }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error || `Failed: ${res.status}`);
    }
    return res.json();
  }
}
