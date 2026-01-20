import { DrizzleD1Database } from "drizzle-orm/d1";
import { eq, and, SQL } from "drizzle-orm";
import { SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";

/**
 * Base model class for all API models
 * Provides common CRUD operations
 */
export class BaseApiModel<T extends Record<string, any>> {
  protected table: SQLiteTableWithColumns<any>;
  protected idColumn: keyof T & string;

  constructor(
    table: SQLiteTableWithColumns<any>,
    idColumn: keyof T & string = "id"
  ) {
    this.table = table;
    this.idColumn = idColumn;
  }

  /**
   * Find a record by ID
   */
  async findById(
    db: DrizzleD1Database,
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
  async findAll(db: DrizzleD1Database): Promise<T[]> {
    const records = await db.select().from(this.table);
    return records as T[];
  }

  /**
   * Create a new record
   */
  async create(db: DrizzleD1Database, data: Partial<T>): Promise<T> {
    const records = await db
      .insert(this.table)
      .values(data as any)
      .returning();
    return records[0] as T;
  }

  /**
   * Update an existing record
   */
  async update(
    db: DrizzleD1Database,
    id: string | number,
    data: Partial<T>
  ): Promise<T | null> {
    const records = await db
      .update(this.table)
      .set(data as any)
      .where(eq(this.table[this.idColumn], id))
      .returning();

    return records.length > 0 ? (records[0] as T) : null;
  }

  /**
   * Delete a record
   */
  async delete(
    db: DrizzleD1Database,
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
  async findWhere(db: DrizzleD1Database, conditions: Partial<T>): Promise<T[]> {
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
