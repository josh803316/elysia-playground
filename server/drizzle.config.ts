import type { Config } from "drizzle-kit";

// DIRECT_URL is preferred for migrations (bypasses pooler); fallback to DATABASE_URL
const dbUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!dbUrl) {
  console.warn("DIRECT_URL or DATABASE_URL must be set for migrations.");
}

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
