import type { Database } from "../db";
import { eq, and } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";

/**
 * Base model class for all API models
 * Provides common CRUD operations
 */
export class BaseApiModel<T extends Record<string, unknown>> {
  protected table: PgTable<any>;
  protected idColumn: keyof T & string;

  constructor(
    table: PgTable<any>,
    idColumn: keyof T & string = "id"
  ) {
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
      .where(eq(this.table[this.idColumn], id));
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
      .where(eq(this.table[this.idColumn], id))
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

    await db.delete(this.table).where(eq(this.table[this.idColumn], id));
    return { success: true, message: "Record deleted successfully" };
  }

  /**
   * Custom query with conditions
   */
  async findWhere(db: Database, conditions: Partial<T>): Promise<T[]> {
    // Convert conditions to an array of eq conditions
    const conditionArray = Object.entries(conditions).map(([key, value]) => {
      return eq(this.table[key], value);
    });

    // If no conditions provided, return all records
    if (conditionArray.length === 0) {
      return this.findAll(db);
    }

    // Combine all conditions with AND
    const whereClause =
      conditionArray.length === 1 ? conditionArray[0] : and(...conditionArray);

    const records = await db.select().from(this.table).where(whereClause);
    return records as T[];
  }
}
