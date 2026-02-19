import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotesApiService } from './notes-api.service';

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
  });
});
