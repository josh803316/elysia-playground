import { BaseApiModel } from "./base-api.model";
import { notes } from "../db/schema";
import type { Database } from "../db";
import { eq, and } from "drizzle-orm";

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
    super(notes, "id");
  }

  /**
   * Find notes by user ID
   */
  async findByUserId(db: Database, userId: number): Promise<Note[]> {
    const results = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, userId));

    return results;
  }

  /**
   * Find public notes
   */
  async findPublicNotes(db: Database): Promise<Note[]> {
    const results = await db
      .select()
      .from(notes)
      .where(eq(notes.isPublic, "true"));

    return results;
  }

  /**
   * Find private notes by user ID
   */
  async findPrivateNotesByUserId(
    db: Database,
    userId: number
  ): Promise<Note[]> {
    const results = await db
      .select()
      .from(notes)
      .where(and(eq(notes.userId, userId), eq(notes.isPublic, "false")));

    return results;
  }

  /**
   * Create a new note with the current timestamp
   */
  async createNote(
    db: Database,
    data: Omit<Partial<Note>, "createdAt" | "updatedAt">
  ): Promise<Note> {
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
      isPublic: note.isPublic || "false",
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
  async isOwner(
    db: Database,
    userId: number,
    noteId: number
  ): Promise<boolean> {
    const note = await this.findById(db, noteId);
    return !!note && note.userId === userId;
  }
}
