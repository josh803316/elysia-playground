import {describe, expect, it, beforeAll, afterAll} from 'bun:test';
import {NotesModel} from './notes.model.js';
import {TestDBUtils} from '../../test/utils/db-utils.js';
import type {Database} from '../db/index.js';

describe('NotesModel search', () => {
  let dbUtils: TestDBUtils;
  let db: Database;
  let notesModel: NotesModel;
  let testUserId: number;

  beforeAll(async () => {
    dbUtils = await TestDBUtils.getInstance();
    await dbUtils.createTestDB();
    db = (dbUtils as any).db as Database;
    notesModel = new NotesModel();

    const seeded = await dbUtils.seedTestUser('user_search_test');
    testUserId = (seeded.user as {id: number}).id;

    // Public note (searchable word "sunshine")
    await notesModel.createNote(db, {
      title: 'Public search test',
      content: 'Content with sunshine and weather',
      userId: null,
      isPublic: 'true',
    });

    // Private note for test user (searchable word "sunshine")
    await notesModel.createNote(db, {
      title: 'Private search test',
      content: 'Private note with sunshine',
      userId: testUserId,
      isPublic: 'false',
    });

    // Another user's private note (we don't have another user, so use same user but different content)
    // Second private note for same user (searchable "uniquePrivate")
    await notesModel.createNote(db, {
      title: 'Another private',
      content: 'uniquePrivate content',
      userId: testUserId,
      isPublic: 'false',
    });
  });

  afterAll(async () => {
    if (dbUtils) await dbUtils.clearAllData();
  });

  it('returns empty array for empty query', async () => {
    const results = await notesModel.search(db, '', null, false);
    expect(results).toEqual([]);
  });

  it('returns only public notes when userId is null', async () => {
    const results = await notesModel.search(db, 'sunshine', null, false);
    expect(results.length).toBe(1);
    expect(results[0].isPublic).toBe('true');
    expect(results[0].content).toContain('sunshine');
  });

  it('returns public and own private notes when userId is set', async () => {
    const results = await notesModel.search(db, 'sunshine', testUserId, false);
    expect(results.length).toBe(2); // public + own private
    const titles = results.map((n) => n.title);
    expect(titles).toContain('Public search test');
    expect(titles).toContain('Private search test');
  });

  it('returns only matching notes for authenticated user (uniquePrivate)', async () => {
    const results = await notesModel.search(db, 'uniquePrivate', testUserId, false);
    expect(results.length).toBe(1);
    expect(results[0].content).toContain('uniquePrivate');
  });

  it('returns all matching notes when admin is true', async () => {
    const results = await notesModel.search(db, 'sunshine', null, true);
    expect(results.length).toBe(2);
  });

  it('uses simple config so stop-word-like terms match', async () => {
    await notesModel.createNote(db, {
      title: 'Good day',
      content: 'Good',
      userId: null,
      isPublic: 'true',
    });
    const results = await notesModel.search(db, 'Good', null, false);
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((n) => n.content === 'Good' || n.title === 'Good day')).toBe(true);
  });

  it('finds notes by 3+ character substring (e.g. miss matches missing)', async () => {
    await notesModel.createNote(db, {
      title: 'Note with missing word',
      content: 'Something is missing here',
      userId: null,
      isPublic: 'true',
    });
    const results = await notesModel.search(db, 'miss', null, false);
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((n) => n.content.includes('missing') || n.title.toLowerCase().includes('missing'))).toBe(true);
  });
});
