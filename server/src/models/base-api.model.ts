import type { Database } from "../db";
import { eq } from "drizzle-orm";
import type { AnyPgColumn, PgTable } from "drizzle-orm/pg-core";

/**
 * Base model class for all API models
 * Provides common CRUD operations
 */
export class BaseApiModel<T extends object> {
  protected table: PgTable<any>;
  protected idColumn: AnyPgColumn;

  constructor(table: PgTable<any>, idColumn: AnyPgColumn) {
    this.table = table;
    this.idColumn = idColumn;
  }

  /**
   * Find a record by ID
   */
  async findById(
    db: Database,
    id: string | number
  ): Promise<T | null> {
    const records = await db
      .select()
      .from(this.table)
      .where(eq(this.idColumn, id));
    return records.length > 0 ? (records[0] as T) : null;
  }

  /**
   * Find all records
   */
  async findAll(db: Database): Promise<T[]> {
    const records = await db.select().from(this.table);
    return records as T[];
  }

  /**
   * Create a new record
   */
  async create(db: Database, data: Partial<T>): Promise<T> {
    const records = await db
      .insert(this.table)
      .values(data)
      .returning();
    return records[0] as T;
  }

  /**
   * Update an existing record
   */
  async update(
    db: Database,
    id: string | number,
    data: Partial<T>
  ): Promise<T | null> {
    const records = await db
      .update(this.table)
      .set(data)
      .where(eq(this.idColumn, id))
      .returning();

    return records.length > 0 ? (records[0] as T) : null;
  }

  /**
   * Delete a record
   */
  async delete(
    db: Database,
    id: string | number
  ): Promise<{ success: boolean; message?: string }> {
    const record = await this.findById(db, id);
    if (!record) {
      return { success: false, message: "Record not found" };
    }

    await db.delete(this.table).where(eq(this.idColumn, id));
    return { success: true, message: "Record deleted successfully" };
  }

  /**
   * Custom query with conditions
   */
  async findWhere(db: Database, conditions: Partial<T>): Promise<T[]> {
    // Keep this generic helper simple and type-safe:
    // fetch rows once, then filter in memory by key/value pairs.
    const records = await this.findAll(db);
    if (Object.keys(conditions).length === 0) return records;

    return records.filter((record) =>
      Object.entries(conditions).every(([key, value]) => {
        const rec = record as Record<string, unknown>;
        return rec[key] === value;
      })
    );
  }
}
