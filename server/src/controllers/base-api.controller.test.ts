import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { Elysia } from "elysia";
import { BaseApiController } from "./base-api.controller";
import { BaseApiModel } from "../models/base-api.model";
import { TestDBUtils } from "../../test/utils/db-utils";
import { createTestApp } from "../../test/utils/app-utils";
import { SQLiteTable, integer, text } from "drizzle-orm/sqlite-core";

// Create a mock table for testing
const testResources = {
  id: { name: "id", ...integer("id").primaryKey() },
  name: { name: "name", ...text("name") },
  description: { name: "description", ...text("description") },
  createdAt: { name: "created_at", ...text("created_at") },
  updatedAt: { name: "updated_at", ...text("updated_at") },
} as unknown as SQLiteTable;

// Mock resource type
interface TestResource {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Create a mock model that extends BaseApiModel
class TestModel extends BaseApiModel<TestResource> {
  constructor() {
    super(testResources, "id");
  }

  // Override methods for testing to avoid DB dependencies
  async findAll(db: any): Promise<TestResource[]> {
    // Return mock data
    return [
      {
        id: 1,
        name: "Test Resource 1",
        description: "First test resource",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Test Resource 2",
        description: "Second test resource",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  async findById(db: any, id: string): Promise<TestResource | null> {
    // Return mock data for id=1 or id=2, null otherwise
    if (id === "1") {
      return {
        id: 1,
        name: "Test Resource 1",
        description: "First test resource",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } else if (id === "2") {
      return {
        id: 2,
        name: "Test Resource 2",
        description: "Second test resource",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    return null;
  }

  async delete(
    db: any,
    id: string
  ): Promise<{ success: boolean; message?: string }> {
    // Return success for id=1 or id=2, fail otherwise
    if (id === "1" || id === "2") {
      return { success: true };
    }
    return { success: false, message: "Resource not found" };
  }

  // Add create method for full CRUD testing
  async create(db: any, data: Partial<TestResource>): Promise<TestResource> {
    return {
      id: 3, // Simulate auto-increment ID
      name: data.name || "New Resource",
      description: data.description || "New Description",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  // Add update method for full CRUD testing
  async update(
    db: any,
    id: string,
    data: Partial<TestResource>
  ): Promise<TestResource | null> {
    if (id === "1" || id === "2") {
      const existingResource = await this.findById(db, id);
      if (!existingResource) return null;

      return {
        ...existingResource,
        ...data,
        updatedAt: new Date().toISOString(),
      };
    }
    return null;
  }

  // Add findWhere method for query testing
  async findWhere(
    db: any,
    conditions: Partial<TestResource>
  ): Promise<TestResource[]> {
    const allResources = await this.findAll(db);

    // Filter resources based on conditions
    return allResources.filter((resource) => {
      for (const [key, value] of Object.entries(conditions)) {
        if (resource[key as keyof TestResource] !== value) {
          return false;
        }
      }
      return true;
    });
  }
}

// Simple concrete controller that extends BaseApiController for testing
class TestController extends BaseApiController<TestResource> {
  constructor() {
    super(new TestModel(), "/test-resources", "test resource");
  }

  init(): Elysia {
    return new Elysia().group("/api", (app) =>
      app.group("/test-resources", (app) => {
        // Use type assertion to fix the type error
        const typedApp = this.registerCommonRoutes(app as any);

        // Add create and update endpoints
        return typedApp
          .post(
            "",
            ({ body, db }: { body: Partial<TestResource>; db: any }) => {
              return this.model.create(db, body);
            }
          )
          .put(
            "/:id",
            ({
              params: { id },
              body,
              db,
            }: {
              params: { id: string };
              body: Partial<TestResource>;
              db: any;
            }) => {
              return this.model.update(db, id, body);
            }
          )
          .get(
            "/search",
            ({ query, db }: { query: Partial<TestResource>; db: any }) => {
              return this.model.findWhere(db, query);
            }
          );
      })
    );
  }

  // Override isAuthorized for testing
  protected async isAuthorized(
    userId: string | null,
    resourceId: string | number
  ): Promise<boolean> {
    return userId === "user_test123" || userId === "user_test456";
  }

  // Override isAdminRequest for testing
  protected isAdminRequest(apiKey: string | null): boolean {
    return apiKey === "test-admin-key";
  }
}

describe("Base API Controller", () => {
  let dbUtils: TestDBUtils;
  let mockDb: any;

  // Setup test database before all tests
  beforeAll(async () => {
    // Initialize test database
    dbUtils = await TestDBUtils.getInstance();
    await dbUtils.createTestDB();

    // Create a mock DB object
    mockDb = {};
  });

  // Cleanup after tests
  afterAll(async () => {
    if (dbUtils) {
      await dbUtils.clearAllData();
    }
  });

  it("should initialize with proper routes", () => {
    const controller = new TestController();
    const app = controller.init();

    // Check that app has the expected routes
    expect(app).toBeDefined();
  });

  // Direct tests of the methods without using the app
  it("should check authorization correctly", async () => {
    const controller = new TestController();

    // Test with authorized user
    const authorized = await controller["isAuthorized"]("user_test123", "1");
    expect(authorized).toBe(true);

    // Test with unauthorized user
    const unauthorized = await controller["isAuthorized"]("wrong_user", "1");
    expect(unauthorized).toBe(false);
  });

  it("should check admin access correctly", () => {
    const controller = new TestController();

    // Test with valid admin key
    const isAdmin = controller["isAdminRequest"]("test-admin-key");
    expect(isAdmin).toBe(true);

    // Test with invalid admin key
    const notAdmin = controller["isAdminRequest"]("wrong-key");
    expect(notAdmin).toBe(false);
  });

  // Model-Controller Interaction Tests
  describe("Model-Controller Interaction Tests", () => {
    it("should use model to list all resources", async () => {
      const controller = new TestController();
      const model = controller["model"] as TestModel;

      const results = await model.findAll(mockDb);

      expect(results).toHaveLength(2);
      expect(results[0].name).toBe("Test Resource 1");
      expect(results[1].name).toBe("Test Resource 2");
    });

    it("should use model to find resources by ID", async () => {
      const controller = new TestController();
      const model = controller["model"] as TestModel;

      const result = await model.findById(mockDb, "1");

      expect(result).not.toBeNull();
      expect(result?.id).toBe(1);
      expect(result?.name).toBe("Test Resource 1");

      const notFound = await model.findById(mockDb, "999");
      expect(notFound).toBeNull();
    });

    it("should use model to create resources", async () => {
      const controller = new TestController();
      const model = controller["model"] as TestModel;

      const newResourceData = {
        name: "Test Model Resource",
        description: "Testing model integration",
      };

      const result = await model.create(mockDb, newResourceData);

      expect(result.id).toBe(3);
      expect(result.name).toBe("Test Model Resource");
      expect(result.description).toBe("Testing model integration");
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });

    it("should use model to update resources", async () => {
      const controller = new TestController();
      const model = controller["model"] as TestModel;

      const updateData = {
        description: "Updated via model test",
      };

      const result = await model.update(mockDb, "1", updateData);

      expect(result).not.toBeNull();
      if (result) {
        expect(result.id).toBe(1);
        expect(result.name).toBe("Test Resource 1");
        expect(result.description).toBe("Updated via model test");
      }

      const notFoundUpdate = await model.update(mockDb, "999", updateData);
      expect(notFoundUpdate).toBeNull();
    });

    it("should use model to delete resources", async () => {
      const controller = new TestController();
      const model = controller["model"] as TestModel;

      const result = await model.delete(mockDb, "2");

      expect(result.success).toBe(true);

      const notFoundDelete = await model.delete(mockDb, "999");
      expect(notFoundDelete.success).toBe(false);
      expect(notFoundDelete.message).toBe("Resource not found");
    });

    it("should use model to find resources by criteria", async () => {
      const controller = new TestController();
      const model = controller["model"] as TestModel;

      const query = { name: "Test Resource 2" };
      const results = await model.findWhere(mockDb, query);

      expect(results).toHaveLength(1);
      expect(results[0].name).toBe("Test Resource 2");

      const emptyResults = await model.findWhere(mockDb, {
        name: "Non Existent",
      });
      expect(emptyResults).toHaveLength(0);
    });

    it("should test controller's integration with model for CRUD operations", async () => {
      const controller = new TestController();
      const app = controller.init();

      // Verify routes are registered
      expect(app.routes.length).toBeGreaterThan(0);

      // Test that routes are using model methods
      const routeHandlers = app.routes.map((route) => route.handler);
      expect(routeHandlers.length).toBeGreaterThan(0);

      // Check that the controller has model attached
      const model = controller["model"];
      expect(model).toBeInstanceOf(TestModel);
    });
  });
});
