import { Elysia } from "elysia";
import { TestAuthUtils } from "./auth-utils";
import { TestDBUtils } from "./db-utils";

/**
 * Options for creating a test app
 */
export interface CreateAppOptions {
  /** Whether to include authentication */
  withAuth?: boolean;
  /** Whether to include API key authentication */
  withApiKey?: boolean;
  /** Custom API key to use (defaults to env var) */
  apiKey?: string;
  /** Custom user ID to use for authentication */
  userId?: string;
  /** Custom email to use for authentication */
  email?: string;
  /** Custom controller to use */
  controller: any;
  /** Database utils instance */
  dbUtils: TestDBUtils;
}

/**
 * Result of creating a test app
 */
export interface TestAppResult {
  app: any; // Using any to avoid complex Elysia generic typing issues
  token: string;
}

/**
 * Creates a test app with the specified options
 * @param options Configuration options for the test app
 * @returns The test app and authentication token
 */
export async function createTestApp(
  options: CreateAppOptions
): Promise<TestAppResult> {
  const {
    withAuth = true,
    withApiKey = false,
    apiKey = process.env.ADMIN_API_KEY,
    userId = "user_test123",
    email = "test@example.com",
    controller,
    dbUtils,
  } = options;

  // Set up the app the same way it's done in the main application
  const baseApp = new Elysia().group("api", (app) => app.use(controller));

  if (!withAuth) {
    // For unauthorized test, provide a mock auth function that returns null
    const mockApp = new Elysia()
      .derive(() => ({
        auth: () => ({ userId: null }), // This will trigger 401 in controller
        db: (dbUtils as any).db,
        clerk: {
          users: {
            getUser: async () => ({}),
          },
        },
        request: {
          headers: withApiKey
            ? {
                get: (name: string) =>
                  name.toLowerCase() === "x-api-key" ? apiKey : null,
              }
            : { get: () => null },
        },
      }))
      .group("api", (app) => app.use(controller));

    return { app: mockApp, token: "" };
  }

  // Create test context with authentication
  const testContext = await TestAuthUtils.createTestContext({
    controller: baseApp,
    userClaims: {
      sub: userId,
      email: email,
    },
  });

  // If we need API key support, add it to the app context
  if (withApiKey) {
    // Extract what we need from the context
    const auth = testContext.auth;
    const token = testContext.token;
    const db = testContext.db;

    // Create a modified app with the API key
    const appWithApiKey = new Elysia()
      .derive(() => {
        return {
          auth,
          db,
          clerk: {
            users: {
              getUser: async (id: string) => ({
                id,
                firstName: "Test",
                lastName: "User",
                emailAddresses: [{ emailAddress: email }],
              }),
            },
          },
          request: {
            headers: {
              get: (name: string) => {
                if (name.toLowerCase() === "x-api-key") {
                  return apiKey;
                }
                if (name.toLowerCase() === "authorization") {
                  return `Bearer ${token}`;
                }
                return null;
              },
            },
          },
        };
      })
      .group("api", (app) => app.use(controller));

    return { app: appWithApiKey, token };
  }

  return {
    app: testContext.app,
    token: testContext.token,
  };
}
