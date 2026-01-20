import { drizzle } from "drizzle-orm/pglite";
import { PGlite } from "@electric-sql/pglite";
import * as schema from "./schema";
import { notes, users } from "./schema";
import { sql } from "drizzle-orm";

// Database singleton
let pgLiteInstance: PGlite | null = null;
let db: ReturnType<typeof createDB> | null = null;
let isInitialized = false;

/**
 * Create a drizzle database instance with the schema
 */
export const createDB = (client: PGlite) => {
  return drizzle(client, { schema });
};

/**
 * Initialize the database with schema, migrations, and seed data
 */
export const initDB = async (options: { seed?: boolean } = {}) => {
  if (isInitialized && db) return db;

  try {
    console.log("Initializing PGlite database...");

    // Create a new PGlite instance (in-memory Postgres)
    pgLiteInstance = new PGlite();

    // Initialize the database with schema
    db = createDB(pgLiteInstance);

    // Create tables using SQL
    await createTables(pgLiteInstance);

    // Seed database if requested
    if (options.seed) {
      await seedDatabase(db);
    }

    console.log("Database initialized successfully");
    isInitialized = true;

    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

/**
 * Create database tables
 */
async function createTables(client: PGlite) {
  console.log("Creating database tables...");

  try {
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        clerk_id TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        first_name TEXT,
        last_name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // Create notes table
    await client.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        is_public TEXT DEFAULT 'false',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Verify tables were created
    const tables = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `);

    // console.log("Tables created:", tables);
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
}

/**
 * Seed the database with initial data
 */
async function seedDatabase(db: any) {
  console.log("Seeding database...");

  try {
    // Check if users already exist
    const existingUsers = await db.select({ count: sql`count(*)` }).from(users);

    if (existingUsers[0]?.count > 0) {
      console.log("Database already seeded, skipping");
      return;
    }

    // First user - automation test user
    const user1 = {
      clerkId: "user_test123",
      email: "test-user-1@test.io",
      firstName: "Automation",
      lastName: "Test User",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Second user - test user
    const user2 = {
      clerkId: "user_test456",
      email: "test-user-2@test.io",
      firstName: "Test",
      lastName: "User",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert users and get their IDs
    const insertedUsers = await db
      .insert(users)
      .values([user1, user2])
      .returning();

    // Create notes
    const note1 = {
      userId: insertedUsers[0].id,
      title: "Automation Test Note",
      content: "This is a test note for the automation user.",
      isPublic: "false",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const note2 = {
      userId: insertedUsers[1].id,
      title: "Test User Note",
      content: "This is a test note for the regular test user.",
      isPublic: "true",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert notes
    await db.insert(notes).values([note1, note2]);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

/**
 * Get the database instance (initializes if not already done)
 */
export const getDB = async () => {
  if (!db) {
    return await initDB();
  }
  return db;
};
