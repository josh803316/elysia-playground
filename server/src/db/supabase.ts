import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

export type SupabaseDatabase = ReturnType<typeof createSupabaseDB>;

/**
 * Create a Drizzle instance connected to Supabase via postgres-js driver
 */
export const createSupabaseDB = () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL environment variable is required for Supabase connection"
    );
  }

  const client = postgres(databaseUrl, {
    prepare: false, // Supabase transaction pooler doesn't support prepared statements
  });

  return drizzle(client, { schema });
};
