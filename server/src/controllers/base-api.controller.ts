import { Elysia, t } from "elysia";
import { BaseApiModel } from "../models/base-api.model";
import { DrizzleD1Database } from "drizzle-orm/d1";

// Type definition for the context that includes db
interface DbContext {
  db: DrizzleD1Database;
}

/**
 * Base controller class for all API controllers
 * Provides common CRUD operations and validation
 */
export abstract class BaseApiController<T extends Record<string, any>> {
  protected readonly model: BaseApiModel<T>;
  protected readonly basePath: string;
  protected readonly resourceName: string;

  constructor(model: BaseApiModel<T>, basePath: string, resourceName: string) {
    this.model = model;
    this.basePath = basePath;
    this.resourceName = resourceName;
  }

  /**
   * Initialize the controller with routes
   * Should be implemented by subclasses
   */
  abstract init(): Elysia;

  /**
   * Define common routes for the controller
   */
  protected registerCommonRoutes<E extends Elysia>(app: E): E {
    return (
      app
        // Get all resources
        .get("", async ({ db }: DbContext) => {
          try {
            const records = await this.model.findAll(db);
            return records;
          } catch (error) {
            console.error(`Error fetching ${this.resourceName}:`, error);
            throw new Error(`Failed to fetch ${this.resourceName}`);
          }
        })

        // Get a resource by ID
        .get(
          "/:id",
          async ({
            params: { id },
            db,
          }: DbContext & { params: { id: string } }) => {
            try {
              const record = await this.model.findById(db, id);
              if (!record) {
                return new Response(
                  JSON.stringify({ error: `${this.resourceName} not found` }),
                  { status: 404 }
                );
              }
              return record;
            } catch (error) {
              console.error(`Error fetching ${this.resourceName}:`, error);
              throw new Error(`Failed to fetch ${this.resourceName}`);
            }
          }
        )

        // Delete a resource
        .delete(
          "/:id",
          async ({
            params: { id },
            db,
          }: DbContext & { params: { id: string } }) => {
            try {
              const result = await this.model.delete(db, id);
              if (!result.success) {
                return new Response(
                  JSON.stringify({
                    error: result.message || `${this.resourceName} not found`,
                  }),
                  { status: 404 }
                );
              }
              return {
                success: true,
                message: `${this.resourceName} deleted successfully`,
              };
            } catch (error) {
              console.error(`Error deleting ${this.resourceName}:`, error);
              throw new Error(`Failed to delete ${this.resourceName}`);
            }
          }
        ) as any
    );
  }

  /**
   * Check if a user is authorized to access a resource
   * Should be implemented by subclasses
   */
  protected async isAuthorized(
    userId: string | null,
    resourceId: string | number
  ): Promise<boolean> {
    // By default, any authenticated user can access resources
    return userId !== null;
  }

  /**
   * Check if a request is from an admin
   */
  protected isAdminRequest(apiKey: string | null): boolean {
    // Subclasses should override this if admin functionality is needed
    return apiKey === process.env.ADMIN_API_KEY;
  }
}
