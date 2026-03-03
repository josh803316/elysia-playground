import {BaseApiModel} from './base-api.model.js';
import {notes} from '../db/schema.js';
import type {Database} from '../db/index.js';
import {eq, and, or, sql} from 'drizzle-orm';

// Define the Note type based on the schema
export interface Note {
  id: number;
  userId: number | null;
  title: string;
  content: string;
  isPublic: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Note type as returned to the client
export interface NoteDTO {
  id: number;
  userId: number | null;
  title: string;
  content: string;
  isPublic: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Notes model class that extends the BaseApiModel
 */
export class NotesModel extends BaseApiModel<Note> {
  constructor() {
    super(notes, notes.id);
  }

  /**
   * Find notes by user ID
   */
  async findByUserId(db: Database, userId: number): Promise<Note[]> {
    const results = await db.select().from(notes).where(eq(notes.userId, userId));

    return results;
  }

  /**
   * Find public notes
   */
  async findPublicNotes(db: Database): Promise<Note[]> {
    const results = await db.select().from(notes).where(eq(notes.isPublic, 'true'));

    return results;
  }

  /**
   * Find private notes by user ID
   */
  async findPrivateNotesByUserId(db: Database, userId: number): Promise<Note[]> {
    const results = await db
      .select()
      .from(notes)
      .where(and(eq(notes.userId, userId), eq(notes.isPublic, 'false')));

    return results;
  }

  /**
   * Create a new note with the current timestamp
   */
  async createNote(db: Database, data: Omit<Partial<Note>, 'createdAt' | 'updatedAt'>): Promise<Note> {
    const now = new Date();

    const newNote = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    return await this.create(db, newNote);
  }

  /**
   * Convert a Note to a NoteDTO for client response
   */
  toDTO(note: Note): NoteDTO {
    return {
      ...note,
      isPublic: note.isPublic || 'false',
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  }

  /**
   * Convert an array of Notes to NoteDTOs
   */
  toDTOs(notes: Note[]): NoteDTO[] {
    return notes.map((note) => this.toDTO(note));
  }

  /**
   * Check if a user owns a note
   */
  async isOwner(db: Database, userId: number, noteId: number): Promise<boolean> {
    const note = await this.findById(db, noteId);
    return !!note && note.userId === userId;
  }

  /**
   * Delete all notes for a specific user
   */
  async deleteAllByUserId(db: Database, userId: number): Promise<{deletedCount: number}> {
    const result = await db.delete(notes).where(eq(notes.userId, userId)).returning();
    return {deletedCount: result.length};
  }

  /**
   * Delete all notes in the system (admin only)
   */
  async deleteAllNotes(db: Database): Promise<{deletedCount: number}> {
    const result = await db.delete(notes).returning();
    return {deletedCount: result.length};
  }

  /**
   * Escape a string for safe use in SQL LIKE/ILIKE patterns (% and _ are wildcards).
   */
  private escapeForLike(s: string): string {
    return s.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_');
  }

  /**
   * Full-text search across title + content using PostgreSQL tsvector/tsquery.
   * Uses inline to_tsvector (no stored column required). Uses 'simple' config so stop words match.
   * For queries of 3+ characters, also matches substrings (e.g. "miss" matches "missing") via ILIKE.
   * Scope:
   * - admin: search all notes.
   * - userId set: public notes + that user's private notes.
   * - userId null: public notes only.
   */
  async search(db: Database, query: string, userId: number | null, admin: boolean = false): Promise<Note[]> {
    const q = String(query).trim();
    if (!q) return [];

    // Full-text match (whole words)
    const ftsMatch = sql`to_tsvector('simple', coalesce(${notes.title}, '') || ' ' || coalesce(${notes.content}, '')) @@ plainto_tsquery('simple', ${q})`;

    // Substring match for 3+ chars so "miss" matches "missing"
    const minLengthForSubstring = 3;
    const substringPattern = q.length >= minLengthForSubstring ? `%${this.escapeForLike(q)}%` : null;
    const substringMatch =
      substringPattern !== null
        ? or(sql`${notes.title} ILIKE ${substringPattern}`, sql`${notes.content} ILIKE ${substringPattern}`)
        : null;

    const match = substringMatch !== null ? or(ftsMatch, substringMatch) : ftsMatch;

    if (admin) {
      const rows = await db.select().from(notes).where(match);
      return rows;
    }
    if (userId === null) {
      const rows = await db
        .select()
        .from(notes)
        .where(and(match, eq(notes.isPublic, 'true')));
      return rows;
    }
    const rows = await db
      .select()
      .from(notes)
      .where(and(match, or(eq(notes.isPublic, 'true'), eq(notes.userId, userId))));
    return rows;
  }

  /**
   * Delete notes whose content or title matches a regex (admin only).
   * Uses JS RegExp for portability across DB backends.
   */
  async deleteByContentRegex(
    db: Database,
    contentRegex: string,
  ): Promise<{deletedCount: number; deletedIds: number[]}> {
    const all = await this.findAll(db);
    let regex: RegExp;
    try {
      regex = new RegExp(contentRegex);
    } catch {
      return {deletedCount: 0, deletedIds: []};
    }
    const toDelete = all.filter((n) => regex.test(n.content) || regex.test(n.title ?? ''));
    const deletedIds: number[] = [];
    for (const note of toDelete) {
      const result = await this.delete(db, note.id);
      if (result.success) deletedIds.push(note.id);
    }
    return {deletedCount: deletedIds.length, deletedIds};
  }
}
