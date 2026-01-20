import { PGlite } from "@electric-sql/pglite";
import { sql } from "drizzle-orm";
import { notes, users } from "../../src/db/schema";
import { drizzle } from "drizzle-orm/pglite";
import { randomUUID } from "crypto";

interface UserRow {
  id: number;
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
}

interface NoteRow {
  id: number;
  user_id: number | null;
  title: string;
  content: string;
  is_public: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * Test database utilities for creating isolated test database instances
 */
export class TestDBUtils {
  private static instance: TestDBUtils;
  private pgLiteInstance: PGlite | null = null;
  private db: any = null;

  private constructor() {}

  /**
   * Get or create a singleton instance of TestDBUtils
   */
  public static async getInstance(): Promise<TestDBUtils> {
    if (!TestDBUtils.instance) {
      TestDBUtils.instance = new TestDBUtils();
    }
    return TestDBUtils.instance;
  }

  /**
   * Create a test database with in-memory PGlite
   */
  public async createTestDB() {
    try {
      if (this.pgLiteInstance) {
        // Return existing instance if already created
        return { db: this.db, pgLiteInstance: this.pgLiteInstance };
      }

      // Create a new in-memory database
      this.pgLiteInstance = new PGlite();

      // Create Drizzle database instance
      this.db = drizzle(this.pgLiteInstance);

      // Create tables one by one with proper sequencing
      await this.pgLiteInstance.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          clerk_id TEXT NOT NULL UNIQUE,
          email TEXT NOT NULL UNIQUE,
          first_name TEXT,
          last_name TEXT,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);

      // Wait for the first query to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      await this.pgLiteInstance.query(`
        CREATE TABLE IF NOT EXISTS notes (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          is_public TEXT DEFAULT 'false',
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);

      console.log("Test database created successfully");
      return { db: this.db, pgLiteInstance: this.pgLiteInstance };
    } catch (error) {
      console.error("Error creating test database:", error);
      if (this.pgLiteInstance) {
        try {
          await this.pgLiteInstance.close();
        } catch (e) {
          console.error("Error closing PGlite instance:", e);
        }
        this.pgLiteInstance = null;
      }
      throw error;
    }
  }

  /**
   * Seed the test database with a test user and some notes
   */
  public async seedTestUser(clerkId: string) {
    try {
      if (!this.db) {
        throw new Error("Database not initialized");
      }

      // Create a test user
      const testUser = {
        clerkId: clerkId,
        firstName: "Test",
        lastName: "User",
        email: `test-${clerkId}@example.com`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Insert user with a proper transaction
      const userInsertQuery = `
        INSERT INTO users (clerk_id, first_name, last_name, email, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (clerk_id) DO UPDATE
        SET first_name = EXCLUDED.first_name, 
            last_name = EXCLUDED.last_name,
            email = EXCLUDED.email,
            updated_at = EXCLUDED.updated_at
        RETURNING *
      `;

      const insertedUser = await this.pgLiteInstance!.query(userInsertQuery, [
        testUser.clerkId,
        testUser.firstName,
        testUser.lastName,
        testUser.email,
        testUser.createdAt,
        testUser.updatedAt,
      ]);

      if (
        !insertedUser ||
        !insertedUser.rows ||
        insertedUser.rows.length === 0
      ) {
        throw new Error("Failed to insert test user");
      }

      const userId = (insertedUser.rows[0] as UserRow).id;

      // Create test notes
      const notesData = [
        {
          title: "Test Note 1",
          content: "Test content for note 1",
          userId: userId,
          isPublic: "false",
        },
        {
          title: "Test Note 2",
          content: "Test content for note 2",
          userId: userId,
          isPublic: "false",
        },
      ];

      // Insert notes with a proper transaction
      const insertedNotes: NoteRow[] = [];
      for (const note of notesData) {
        const noteInsertQuery = `
          INSERT INTO notes (title, content, user_id, is_public, created_at, updated_at)
          VALUES ($1, $2, $3, $4, NOW(), NOW())
          RETURNING *
        `;

        const result = await this.pgLiteInstance!.query(noteInsertQuery, [
          note.title,
          note.content,
          note.userId,
          note.isPublic,
        ]);

        if (result && result.rows && result.rows.length > 0) {
          insertedNotes.push(result.rows[0] as NoteRow);
        }
      }

      return {
        user: insertedUser.rows[0] as UserRow,
        notes: insertedNotes,
      };
    } catch (error) {
      console.error("Error seeding test user:", error);
      throw error;
    }
  }

  /**
   * Create a public anonymous note (not associated with a user)
   */
  public async createPublicAnonymousNote() {
    try {
      if (!this.db) {
        throw new Error("Database not initialized");
      }

      const noteData = {
        title: "Public Anonymous Note",
        content: "This is a public anonymous note for testing",
        isPublic: "true",
      };

      const noteInsertQuery = `
        INSERT INTO notes (title, content, user_id, is_public, created_at, updated_at)
        VALUES ($1, $2, NULL, $3, NOW(), NOW())
        RETURNING *
      `;

      const result = await this.pgLiteInstance!.query(noteInsertQuery, [
        noteData.title,
        noteData.content,
        noteData.isPublic,
      ]);

      if (!result || !result.rows || result.rows.length === 0) {
        throw new Error("Failed to insert public anonymous note");
      }

      return result.rows[0] as NoteRow;
    } catch (error) {
      console.error("Error creating public anonymous note:", error);
      throw error;
    }
  }

  /**
   * Clear all data from the database for clean tests
   */
  public async clearAllData() {
    try {
      if (!this.pgLiteInstance) {
        throw new Error("Database not initialized");
      }

      // Delete data in reverse order of dependencies
      await this.pgLiteInstance.query("DELETE FROM notes");
      await this.pgLiteInstance.query("DELETE FROM users");

      console.log("Database cleared successfully");
    } catch (error) {
      console.error("Error clearing database:", error);
      throw error;
    }
  }
}
