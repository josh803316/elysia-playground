import { Elysia, t } from "elysia";
import { notes, users } from "../db/schema";
import { eq, and } from "drizzle-orm";

// Type definitions for context
type AuthData = {
  userId: string | number;
  [key: string]: any;
};

type Context = {
  auth: () => AuthData;
  clerk: {
    users: {
      getUser: (id: string) => Promise<{
        firstName?: string;
        lastName?: string;
        emailAddresses?: Array<{ emailAddress: string }>;
        [key: string]: any;
      }>;
    };
  };
  db: any;
  store: {
    resource?: any;
  };
  params?: Record<string, string>;
  status: (code: number, message: string) => Response;
};

// Helper function to find or create a user - shared with other controllers
async function findOrCreateUser(clerkId: string, clerk: any, db: any) {
  try {
    // Try to find the user first
    const userRecord = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1);

    // If user exists, return their record
    if (userRecord && userRecord.length > 0) {
      console.log("Found existing user with ID:", userRecord[0].id);
      return userRecord[0];
    }

    // User doesn't exist, so get their details from Clerk
    console.log("User not found, creating new user record for:", clerkId);
    const userInfo = await clerk.users.getUser(clerkId);

    // Prepare the user record
    const newUser = {
      clerkId: clerkId,
      email:
        userInfo.emailAddresses?.[0]?.emailAddress || "unknown@example.com",
      firstName: userInfo.firstName || null,
      lastName: userInfo.lastName || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Use a transaction for the insert to handle race conditions
    const inserted = await db.transaction(async (tx: any) => {
      // Check one more time inside transaction to avoid race conditions
      const existingUser = await tx
        .select()
        .from(users)
        .where(eq(users.clerkId, clerkId))
        .limit(1);

      if (existingUser && existingUser.length > 0) {
        return existingUser[0];
      }

      // Insert the new user
      const result = await tx.insert(users).values(newUser).returning();
      return result[0];
    });

    console.log("Created new user with ID:", inserted.id);
    return inserted;
  } catch (error) {
    console.error("Error in findOrCreateUser:", error);
    throw error;
  }
}

// Generic ownership check function that can be used with any resource
export const ownershipGuard = async (ctx: any) => {
  try {
    const typedCtx = ctx as unknown as Context;
    const { params } = typedCtx;

    // Get auth data
    const auth = typedCtx.auth();
    if (!auth?.userId) {
      return typedCtx.status(
        401,
        "Unauthorized - Authentication required for ownership check"
      );
    }

    // Skip ownership check if there's no params or no ID parameter
    if (!params || !params.id) {
      return;
    }

    // Make sure we have an ID to check ownership against
    const resourceId = params.id;
    if (!resourceId) {
      return typedCtx.status(400, "Bad Request - Resource ID is required");
    }

    // This will be attached by the derive method in index.ts
    if (!typedCtx.db) {
      return typedCtx.status(
        500,
        "Server Error - Database connection not available"
      );
    }

    // Safely convert resource ID to number
    const resourceIdNum = parseInt(resourceId, 10);
    if (isNaN(resourceIdNum)) {
      return typedCtx.status(
        400,
        `Bad Request - Invalid resource ID format: ${resourceId}`
      );
    }

    // First check if the note exists
    const noteExists = await typedCtx.db
      .select()
      .from(notes)
      .where(eq(notes.id, resourceIdNum))
      .limit(1);

    if (!noteExists || noteExists.length === 0) {
      return typedCtx.status(404, "Note not found");
    }

    // Get the database user ID using the Clerk ID from auth - using the findOrCreateUser pattern
    const clerkId = String(auth.userId);
    console.log("Looking up database user ID for Clerk user:", clerkId);

    // Get or create the user
    const user = await findOrCreateUser(clerkId, typedCtx.clerk, typedCtx.db);
    const dbUserId = user.id;

    console.log("Found/created user with database ID:", dbUserId);

    // Check if the resource belongs to the current user
    const results = await typedCtx.db
      .select()
      .from(notes)
      .where(and(eq(notes.id, resourceIdNum), eq(notes.userId, dbUserId)));

    if (!results || results.length === 0) {
      return typedCtx.status(
        403,
        "Forbidden - You don't have permission to access this resource"
      );
    }

    // Store the resource for the handler to use
    typedCtx.store.resource = results[0];
  } catch (e) {
    console.error("Ownership check error:", e);
    return ctx.status(500, "Server Error - Error checking ownership");
  }
};
