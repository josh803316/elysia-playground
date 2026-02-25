-- Add tsvector column for full-text search on notes (title + content)
ALTER TABLE "notes" ADD COLUMN IF NOT EXISTS "search_vector" tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce("title", '') || ' ' || coalesce("content", ''))
  ) STORED;

-- GIN index for fast tsquery matching
CREATE INDEX IF NOT EXISTS "notes_search_idx" ON "notes" USING GIN ("search_vector");
