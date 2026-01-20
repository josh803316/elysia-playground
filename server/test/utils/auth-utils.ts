import { Elysia } from "elysia";
import jwt from "jsonwebtoken";
import { TestDBUtils } from "./db-utils";

/**
 * Clerk JWT claims interface
 */
interface ClerkJWTClaims {
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  sid: string;
  sub: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  userID?: string;
  id?: string;
  orgId?: string;
}

export class TestAuthUtils {
  private static SECRET_KEY = "mock-clerk-secret-key";
  private static dbUtils: TestDBUtils | null = null;

  private static async getDBUtils() {
    if (!this.dbUtils) {
      this.dbUtils = await TestDBUtils.getInstance();
    }
    return this.dbUtils;
  }

  /**
   * Generate a Clerk-like JWT token with claims
   */
  static generateClerkToken(overrides: Partial<ClerkJWTClaims> = {}): string {
    const now = Math.floor(Date.now() / 1000);

    const defaultClaims: ClerkJWTClaims = {
      azp: "clerk.test.app",
      exp: now + 3600, // 1 hour from now
      iat: now,
      iss: "https://clerk.test.com",
      nbf: now,
      sid: `sess_${Math.random().toString(36).substring(7)}`,
      sub: overrides.sub || `user_${Math.random().toString(36).substring(7)}`,
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      userID:
        overrides.sub || `user_${Math.random().toString(36).substring(7)}`,
      id: overrides.sub || `user_${Math.random().toString(36).substring(7)}`,
      ...overrides,
    };

    return jwt.sign(defaultClaims, this.SECRET_KEY, {
      algorithm: "HS256",
    });
  }

  /**
   * Verify a Clerk test token
   */
  static verifyClerkToken(token: string): ClerkJWTClaims {
    return jwt.verify(token, this.SECRET_KEY) as ClerkJWTClaims;
  }

  /**
   * Creates a test context with authentication that can be used directly
   * or as a wrapper app for controllers
   * @param options.controller Controller to wrap in an authenticated app
   * @param options.userClaims Custom user claims to override defaults
   * @returns An object with the wrapped app and token
   */
  static async createTestContext({
    controller,
    userClaims = {},
  }: {
    controller: any;
    userClaims?: Partial<ClerkJWTClaims>;
  }) {
    // Get database instance
    const dbUtils = await this.getDBUtils();
    const { db } = await dbUtils.createTestDB();

    // Generate a token with the user claims
    const token = this.generateClerkToken(userClaims);
    const claims = this.verifyClerkToken(token);

    // Create the auth object that matches what Clerk would provide
    const auth = () => ({
      userId: claims.sub,
      sessionId: claims.sid,
      sessionClaims: claims,
      sessionStatus: "active",
      getToken: async () => token,
      has: (claim: string) => claim in claims,
      orgId: claims.orgId,
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Create the mock clerk client for the controller
    const clerk = {
      users: {
        getUser: async (userId: string) => ({
          id: userId,
          firstName: claims.firstName || "Test",
          lastName: claims.lastName || "User",
          emailAddresses: [
            {
              emailAddress: claims.email || "test@example.com",
            },
          ],
        }),
      },
    };

    // Create a new app that wraps the controller with our auth
    const app = new Elysia()
      .derive(() => ({
        auth,
        clerk,
        db,
      }))
      .use(controller);

    // Return everything needed for testing
    return {
      app,
      token,
      claims,
      headers,
      auth,
      db,
    };
  }
}
