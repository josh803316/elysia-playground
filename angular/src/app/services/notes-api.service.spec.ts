import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotesApiService } from './notes-api.service';

/**
 * Unit tests for NotesApiService. We mock global fetch so we don't hit the network and
 * we assert request shape (URL, method, headers, body) and response handling. This
 * documents API contract and catches regressions when changing the service.
 */
describe('NotesApiService', () => {
  let service: NotesApiService;

  beforeEach(() => {
    service = new NotesApiService();
    vi.stubGlobal('fetch', vi.fn());
  });

  describe('createPublicNote', () => {
    it('sends content and default title when title not provided', async () => {
      const mockFetch = vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 1, title: 'Public Note', content: 'Hello' }),
      } as Response);

      await service.createPublicNote({ content: 'Hello' });

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/public-notes',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'Public Note', content: 'Hello' }),
        }),
      );
    });

    it('sends custom title when provided', async () => {
      const mockFetch = vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({ id: 1, title: 'My Title', content: 'Body' }),
      } as Response);

      await service.createPublicNote({
        title: 'My Title',
        content: 'Body',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/public-notes',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ title: 'My Title', content: 'Body' }),
        }),
      );
    });
  });

  describe('fetchPublicNotes', () => {
    it('returns notes from API', async () => {
      const notes = [{ id: 1, title: 'T', content: 'C', isPublic: 'true' }];
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(notes),
      } as Response);

      const result = await service.fetchPublicNotes();

      expect(fetch).toHaveBeenCalledWith('/api/public-notes');
      expect(result).toEqual(notes);
    });

    it('throws when response is not ok', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({ ok: false } as Response);
      await expect(service.fetchPublicNotes()).rejects.toThrow('Failed to fetch public notes');
    });
  });

  describe('deletePublicNote', () => {
    it('calls DELETE and throws when not ok', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({ ok: false } as Response);
      await expect(service.deletePublicNote(1)).rejects.toThrow('Failed to delete public note');
    });
  });

  describe('private notes (Bearer token)', () => {
    it('fetchPrivateNotes sends Authorization header', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response);
      await service.fetchPrivateNotes('token-123');
      expect(fetch).toHaveBeenCalledWith(
        '/api/private-notes',
        expect.objectContaining({ headers: { Authorization: 'Bearer token-123' } }),
      );
    });
  });

  describe('admin (X-API-Key)', () => {
    it('fetchAllNotesAdmin sends X-API-Key header', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response);
      await service.fetchAllNotesAdmin('admin-key');
      expect(fetch).toHaveBeenCalledWith(
        '/api/notes/all',
        expect.objectContaining({ headers: { 'X-API-Key': 'admin-key' } }),
      );
    });

    it('deleteNoteAdmin calls correct endpoint with API key', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({ ok: true } as Response);
      await service.deleteNoteAdmin('key', 42);
      expect(fetch).toHaveBeenCalledWith('/api/notes/42/admin', {
        method: 'DELETE',
        headers: { 'X-API-Key': 'key' },
      });
    });
  });
});
