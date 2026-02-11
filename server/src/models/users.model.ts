import { BaseApiModel } from "./base-api.model";
import { users } from "../db/schema";
import type { Database } from "../db";
import { eq } from "drizzle-orm";

// Define the User type based on the schema
export interface User {
  id: number;
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User type as returned to the client
export interface UserDTO {
  id: number;
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  updatedAt: string;
}

// Type for Clerk instance
export interface ClerkInstance {
  users: {
    getUser: (id: string) => Promise<{
      firstName?: string;
      lastName?: string;
      emailAddresses?: Array<{ emailAddress: string }>;
      [key: string]: any;
    }>;
  };
}

/**
 * Users model class that extends the BaseApiModel
 */
export class UsersModel extends BaseApiModel<User> {
  constructor() {
    super(users, users.id);
  }

  /**
   * Find a user by their Clerk ID
   */
  async findByClerkId(
    db: Database,
    clerkId: string
  ): Promise<User | null> {
    const results = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId));

    return results.length > 0 ? results[0] : null;
  }

  /**
   * Find a user by their email
   */
  async findByEmail(
    db: Database,
    email: string
  ): Promise<User | null> {
    const results = await db.select().from(users).where(eq(users.email, email));

    return results.length > 0 ? results[0] : null;
  }

  /**
   * Find or create a user based on their Clerk ID
   * This method fetches user data from Clerk if needed
   */
  async findOrCreateByClerkId(
    db: Database,
    clerkId: string,
    clerk: ClerkInstance
  ): Promise<User> {
    try {
      // Try to find the user first
      const existingUser = await this.findByClerkId(db, clerkId);
      if (existingUser) {
        console.log("Found existing user with ID:", existingUser.id);
        return existingUser;
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
      const inserted = await db.transaction(async (tx: Database) => {
        // Check one more time inside transaction to avoid race conditions
        const existingUserInTx = await tx
          .select()
          .from(users)
          .where(eq(users.clerkId, clerkId))
          .limit(1);

        if (existingUserInTx && existingUserInTx.length > 0) {
          return existingUserInTx[0];
        }

        // Insert the new user
        const result = await tx.insert(users).values(newUser).returning();
        return result[0];
      });

      console.log("Created new user with ID:", inserted.id);
      return inserted;
    } catch (error) {
      console.error("Error in findOrCreateByClerkId:", error);
      throw error;
    }
  }

  /**
   * Convert a User to a UserDTO for client response
   */
  toDTO(user: User): UserDTO {
    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  /**
   * Convert an array of Users to UserDTOs
   */
  toDTOs(users: User[]): UserDTO[] {
    return users.map((user) => this.toDTO(user));
  }
}
