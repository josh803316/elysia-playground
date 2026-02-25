import { Elysia, t } from "elysia";
import { authGuard } from "../guards/auth-guard.js";
import { ownershipGuard } from "../guards/ownership-guard.js";
import { eq, and, desc } from "drizzle-orm";
import { notes, users } from "../db/schema.js";
import { BaseApiController } from "./base-api.controller.js";
import { NotesModel, Note } from "../models/notes.model.js";
import { UsersModel } from "../models/users.model.js";
import type { Database } from "../db/index.js";

// Type definitions for context
type AuthData = {
  userId: string | number;
  sessionClaims?: Record<string, unknown>;
  [key: string]: unknown;
};

type Context = {
  auth: () => AuthData;
  clerk: {
    users: {
      getUser: (id: string) => Promise<{
        firstName?: string;
        lastName?: string;
        emailAddresses?: Array<{ emailAddress: string }>;
        [key: string]: unknown;
      }>;
    };
  };
  db: Database;
  store: {
    resource: any;
  };
  body: { title: string; content: string; isPublic?: string };
  params: { id: string | number };
  query?: { q?: string };
  request: {
    headers: Headers | Record<string, string>;
  };
};

// Schema for note creation and updates
const noteSchema = t.Object({
  title: t.String(),
  content: t.String(),
  isPublic: t.Optional(t.Boolean()),
});

/**
 * Notes API Controller that extends the BaseApiController
 */
export class NotesController extends BaseApiController<Note> {
  private notesModel: NotesModel;
  private usersModel: UsersModel;

  constructor() {
    const notesModel = new NotesModel();
    super(notesModel, "/notes", "Note");
    this.notesModel = notesModel;
    this.usersModel = new UsersModel();
  }

  /**
   * Initialize routes for the Notes API
   */
  init(): Elysia<any, any, any, any, any, any, any> {
    const app = new Elysia();

    return (
      app
        .group(this.basePath, (app) => {
          return (
            app
              .model({
                note: noteSchema,
                noteResponse: t.Object({
                  id: t.Number(),
                  title: t.String(),
                  content: t.String(),
                  isPublic: t.String(),
                  userId: t.Number(),
                  createdAt: t.String(),
                  updatedAt: t.String(),
                }),
              })
              // Search must be registered before /:id so "search" is not captured as id (no auth guard)
              .get(
                "/search",
                async (ctx: any) => {
                  try {
                    const typedCtx = ctx as unknown as Context;
                    const q = (typedCtx.query?.q ?? "").trim();
                    const apiKey =
                      typeof typedCtx.request?.headers?.get === "function"
                        ? typedCtx.request.headers.get("x-api-key")
                        : (typedCtx.request?.headers as Record<string, string>)?.["x-api-key"];
                    const isAdmin =
                      !!process.env.ADMIN_API_KEY &&
                      apiKey === process.env.ADMIN_API_KEY;

                    let userId: number | null = null;
                    if (!isAdmin) {
                      try {
                        const auth = typedCtx.auth();
                        const user = await this.usersModel.findOrCreateByClerkId(
                          typedCtx.db,
                          String(auth.userId),
                          typedCtx.clerk
                        );
                        userId = user.id;
                      } catch {
                        // Not signed in: search public notes only
                      }
                    }

                    const results = await this.notesModel.search(
                      typedCtx.db,
                      q,
                      userId,
                      isAdmin
                    );
                    return this.notesModel.toDTOs(results);
                  } catch (err) {
                    console.error("Error searching notes:", err);
                    return new Response("Server error searching notes", {
                      status: 500,
                    });
                  }
                },
                {
                  query: t.Object({
                    q: t.Optional(t.String()),
                  }),
                }
              )
              // Apply both auth and ownership guards to all routes
              .guard(
                {
                  beforeHandle: [authGuard, ownershipGuard],
                },
                (app) =>
                  app
                    // Get all notes for the current user
                    .get("/", async (ctx: any) => {
                      try {
                        const typedCtx = ctx as unknown as Context;
                        const auth = typedCtx.auth();

                        // Get the database user ID from the clerk ID
                        const user =
                          await this.usersModel.findOrCreateByClerkId(
                            typedCtx.db,
                            String(auth.userId),
                            typedCtx.clerk
                          );

                        // Get user's notes using the database ID
                        const userNotes = await this.notesModel.findByUserId(
                          typedCtx.db,
                          user.id
                        );

                        return userNotes;
                      } catch (err) {
                        console.error("Error fetching notes:", err);
                        return new Response("Server error fetching notes", { status: 500 });
                      }
                    })

                    // Create a new note
                    .post(
                      "/",
                      async (ctx: any) => {
                        try {
                          const typedCtx = ctx as unknown as Context;
                          const auth = typedCtx.auth();

                          // Get the database user ID from the clerk ID
                          const user =
                            await this.usersModel.findOrCreateByClerkId(
                              typedCtx.db,
                              String(auth.userId),
                              typedCtx.clerk
                            );

                          // Create new note with the database ID
                          const noteData = {
                            title: typedCtx.body.title,
                            content: typedCtx.body.content,
                            isPublic: String(
                              typedCtx.body.isPublic || false
                            ).toLowerCase(),
                            userId: user.id, // Use database ID instead of clerk ID
                          };

                          // Create the note using the model
                          const note = await this.notesModel.createNote(
                            typedCtx.db,
                            noteData
                          );

                          return note;
                        } catch (err) {
                          console.error("Error creating note:", err);
                          return new Response(
                            JSON.stringify({
                              error: "Server Error",
                              details: "Failed to create note",
                              technicalDetails:
                                err instanceof Error
                                  ? err.message
                                  : "Unknown error",
                            }),
                            { status: 500, headers: { "Content-Type": "application/json" } }
                          );
                        }
                      },
                      {
                        body: "note",
                      }
                    )

                    // Get a specific note by ID
                    .get("/:id", async (ctx: any) => {
                      // ownershipGuard has already verified access and loaded the note
                      const typedCtx = ctx as unknown as Context;
                      return typedCtx.store.resource;
                    })

                    // Update a note
                    .put(
                      "/:id",
                      async (ctx: any) => {
                        try {
                          const typedCtx = ctx as unknown as Context;
                          const { id } = typedCtx.params;
                          const auth = typedCtx.auth();

                          // Get the database user ID from the clerk ID
                          const user =
                            await this.usersModel.findOrCreateByClerkId(
                              typedCtx.db,
                              String(auth.userId),
                              typedCtx.clerk
                            );

                          // Update the note
                          const updatedNote = {
                            title: typedCtx.body.title,
                            content: typedCtx.body.content,
                            isPublic: String(
                              typedCtx.body.isPublic !== undefined
                                ? typedCtx.body.isPublic
                                : typedCtx.store.resource.isPublic
                            ).toLowerCase(),
                            updatedAt: new Date(),
                          };

                          // Update using the model
                          const result = await this.notesModel.update(
                            typedCtx.db,
                            Number(id),
                            updatedNote
                          );
                          if (!result) {
                            return new Response("Note not found", { status: 404 });
                          }

                          return result;
                        } catch (err) {
                          console.error("Error updating note:", err);
                          return new Response("Server error updating note", { status: 500 });
                        }
                      },
                      {
                        body: "note",
                      }
                    )

                    // Delete a note
                    .delete("/:id", async (ctx: any) => {
                      try {
                        const typedCtx = ctx as unknown as Context;
                        const { id } = typedCtx.params;
                        const auth = typedCtx.auth();

                        // Get the database user ID from the clerk ID
                        const user =
                          await this.usersModel.findOrCreateByClerkId(
                            typedCtx.db,
                            String(auth.userId),
                            typedCtx.clerk
                          );

                        // Safely parse ID as integer
                        const noteId = parseInt(String(id), 10);

                        // Validate the ID
                        if (isNaN(noteId)) {
                          console.error("Invalid ID conversion:", {
                            noteId,
                            original: { id },
                          });
                          return new Response(
                            "Bad Request - Invalid ID format",
                            { status: 400 }
                          );
                        }

                        // Delete the note using the model
                        const result = await this.notesModel.delete(
                          typedCtx.db,
                          noteId
                        );
                        if (!result.success) {
                          return new Response("Note not found", { status: 404 });
                        }

                        return {
                          success: true,
                          message: "Note deleted successfully",
                        };
                      } catch (err) {
                        console.error("Error deleting note:", err);
                        return new Response("Server error deleting note", { status: 500 });
                      }
                    })
              )
          );
        })
        // Authenticated user endpoint - delete all my notes
        .delete("/notes/all", async (ctx: any) => {
          try {
            const typedCtx = ctx as unknown as Context;
            const auth = typedCtx.auth();

            // Get the database user ID from the clerk ID
            const user = await this.usersModel.findOrCreateByClerkId(
              typedCtx.db,
              String(auth.userId),
              typedCtx.clerk
            );

            const result = await this.notesModel.deleteAllByUserId(
              typedCtx.db,
              user.id
            );

            return {
              success: true,
              deletedCount: result.deletedCount,
            };
          } catch (err) {
            console.error("Error deleting all user notes:", err);
            return new Response("Server error deleting notes", { status: 500 });
          }
        }, {
          beforeHandle: [authGuard],
        })
        // Admin endpoint - delete ALL notes in the system
        .delete("/notes/all/admin", async (ctx: any) => {
          try {
            const typedCtx = ctx as unknown as Context;

            // Check for API key in headers
            let apiKey;
            if (typeof typedCtx.request.headers.get === "function") {
              apiKey = typedCtx.request.headers.get("x-api-key");
            } else {
              const headers = typedCtx.request.headers as Record<string, string>;
              apiKey =
                headers["x-api-key"] ||
                headers["X-API-Key"] ||
                headers["X-Api-Key"];
            }

            if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
              return new Response(
                "Unauthorized: Invalid or missing API key",
                { status: 401 }
              );
            }

            const result = await this.notesModel.deleteAllNotes(typedCtx.db);

            return {
              success: true,
              deletedCount: result.deletedCount,
            };
          } catch (err) {
            console.error("Error deleting all notes (admin):", err);
            return new Response("Server error deleting all notes", { status: 500 });
          }
        })
        // Admin endpoint - delete notes matching content/title regex
        .post("/notes/admin/delete-by-regex", async (ctx: any) => {
          try {
            const typedCtx = ctx as unknown as Context & {
              body?: { contentRegex?: string };
            };

            let apiKey;
            if (typeof typedCtx.request.headers.get === "function") {
              apiKey = typedCtx.request.headers.get("x-api-key");
            } else {
              const headers = typedCtx.request.headers as Record<string, string>;
              apiKey =
                headers["x-api-key"] ||
                headers["X-API-Key"] ||
                headers["X-Api-Key"];
            }

            if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
              return new Response(
                "Unauthorized: Invalid or missing API key",
                { status: 401 }
              );
            }

            const contentRegex =
              typeof typedCtx.body?.contentRegex === "string"
                ? typedCtx.body.contentRegex.trim()
                : "";

            if (!contentRegex) {
              return new Response(
                JSON.stringify({ error: "contentRegex is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
              );
            }

            const result = await this.notesModel.deleteByContentRegex(
              typedCtx.db,
              contentRegex
            );

            return {
              success: true,
              deletedCount: result.deletedCount,
              deletedIds: result.deletedIds,
            };
          } catch (err) {
            console.error("Error deleting notes by regex (admin):", err);
            return new Response(
              "Server error deleting notes by regex",
              { status: 500 }
            );
          }
        }, {
          body: t.Object({
            contentRegex: t.String(),
          }),
        })
        // Admin endpoints - no guards needed as they use API key auth
        .get("/notes/all", async (ctx: any) => {
          try {
            const typedCtx = ctx as unknown as Context;

            // Check for API key in headers
            let apiKey;
            if (typeof typedCtx.request.headers.get === "function") {
              apiKey = typedCtx.request.headers.get("x-api-key");
            } else {
              // For Record<string, string> type headers
              const headers = typedCtx.request.headers as Record<
                string,
                string
              >;
              apiKey =
                headers["x-api-key"] ||
                headers["X-API-Key"] ||
                headers["X-Api-Key"];
            }

            if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
              return new Response(
                "Unauthorized: Invalid or missing API key",
                { status: 401 }
              );
            }

            // If authorized, get all notes
            const notesList = await typedCtx.db
              .select()
              .from(notes)
              .orderBy(desc(notes.createdAt));

            console.log(
              "Raw notes data sample:",
              notesList.length > 0
                ? {
                    id: notesList[0].id,
                    title: notesList[0].title,
                    createdAt: notesList[0].createdAt,
                    updatedAt: notesList[0].updatedAt,
                    typeof_createdAt: typeof notesList[0].createdAt,
                    instanceof_date: notesList[0].createdAt instanceof Date,
                  }
                : "No notes"
            );

            // Get all users to combine with notes
            const usersList = await typedCtx.db.select().from(users);

            // Create a user lookup map for faster access
            type UserRow = typeof users.$inferSelect;
            const userMap = new Map<number, UserRow>();
            usersList.forEach((user: UserRow) => {
              userMap.set(user.id, user);
            });

            // Ensure all dates are properly formatted as strings
            const ensureISOString = (date: Date | string | null | undefined): string => {
              if (!date) return "";

              try {
                // If it's already a string, validate it's an ISO date
                if (typeof date === "string") {
                  // Check if it's a valid date string
                  const testDate = new Date(date);
                  if (!isNaN(testDate.getTime())) {
                    return date; // It's already a valid date string
                  }
                }

                // If it's a Date object, convert to ISO string
                if (date instanceof Date) {
                  return date.toISOString();
                }

                // Try to convert to a Date and then to ISO string
                const newDate = new Date(date);
                if (!isNaN(newDate.getTime())) {
                  return newDate.toISOString();
                }
              } catch (err) {
                console.error("Date conversion error:", err);
              }

              // Default fallback for invalid dates
              return new Date().toISOString();
            };

            // Format notes with user data
            type NoteRow = typeof notes.$inferSelect;
            const formattedNotes = notesList.map((note: NoteRow) => {
              const userData = note.userId ? userMap.get(note.userId) : null;

              // Format date values as ISO strings
              const formattedNote = {
                ...note,
                // Ensure dates are properly formatted
                createdAt: ensureISOString(note.createdAt),
                updatedAt: ensureISOString(note.updatedAt),
                user: userData
                  ? {
                      firstName: userData.firstName,
                      lastName: userData.lastName,
                      email: userData.email,
                    }
                  : null,
              };

              return formattedNote;
            });

            console.log(
              "Admin API returning formatted notes:",
              formattedNotes.length,
              formattedNotes.length > 0 ? formattedNotes[0] : "No notes"
            );

            return formattedNotes;
          } catch (err) {
            console.error("Error fetching all notes:", err);
            return new Response("Server error fetching all notes", { status: 500 });
          }
        })
        .delete("/notes/:id/admin", async (ctx: any) => {
          try {
            const typedCtx = ctx as unknown as Context;

            // Check for API key in headers - handle different header formats safely
            let apiKey;
            console.log("ctx.request.headers:", typedCtx.request.headers);
            console.log(
              "typeof ctx.request.headers.get:",
              typeof typedCtx.request.headers.get
            );

            if (typeof typedCtx.request.headers.get === "function") {
              apiKey = typedCtx.request.headers.get("x-api-key");
            } else {
              // For Record<string, string> type headers
              const headers = typedCtx.request.headers as Record<
                string,
                string
              >;
              apiKey =
                headers["x-api-key"] ||
                headers["X-API-Key"] ||
                headers["X-Api-Key"];
            }

            console.log("Admin API Key from env:", process.env.ADMIN_API_KEY);
            console.log("Provided API Key:", apiKey);
            console.log("API Key match:", apiKey === process.env.ADMIN_API_KEY);

            if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
              return new Response(
                "Unauthorized: Invalid or missing API key",
                { status: 401 }
              );
            }

            const { id } = typedCtx.params;
            console.log("Deleting note with ID:", id);

            // Delete the note without checking ownership
            const result = await this.notesModel.delete(
              typedCtx.db,
              Number(id)
            );
            if (!result.success) {
              return new Response("Note not found", { status: 404 });
            }

            console.log("Delete result:", result);
            return {
              success: true,
              message: "Note deleted successfully by admin",
            };
          } catch (err) {
            console.error("Error in admin delete:", err);
            return new Response("Server error deleting note", { status: 500 });
          }
        })
        .put("/notes/:id/admin", async (ctx: any) => {
          try {
            const typedCtx = ctx as unknown as Context & {
              body?: { title?: string; content?: string; isPublic?: boolean };
            };

            let apiKey;
            if (typeof typedCtx.request.headers.get === "function") {
              apiKey = typedCtx.request.headers.get("x-api-key");
            } else {
              const headers = typedCtx.request.headers as Record<string, string>;
              apiKey =
                headers["x-api-key"] ||
                headers["X-API-Key"] ||
                headers["X-Api-Key"];
            }

            if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
              return new Response(
                "Unauthorized: Invalid or missing API key",
                { status: 401 }
              );
            }

            const { id } = typedCtx.params;
            const noteId = parseInt(String(id), 10);
            if (isNaN(noteId)) {
              return new Response("Invalid note ID", { status: 400 });
            }

            const note = await this.notesModel.findById(typedCtx.db, noteId);
            if (!note) {
              return new Response("Note not found", { status: 404 });
            }

            const { title, content, isPublic } = typedCtx.body ?? {};
            const updateData: Partial<Note> = { updatedAt: new Date() };
            if (title !== undefined) updateData.title = title;
            if (content !== undefined) updateData.content = content;
            if (isPublic !== undefined) {
              updateData.isPublic = String(isPublic).toLowerCase();
            }

            const updated = await this.notesModel.update(
              typedCtx.db,
              noteId,
              updateData
            );
            if (!updated) {
              return new Response("Failed to update note", { status: 500 });
            }
            return updated;
          } catch (err) {
            console.error("Error in admin update:", err);
            return new Response("Server error updating note", { status: 500 });
          }
        }, {
          body: t.Object({
            title: t.Optional(t.String()),
            content: t.Optional(t.String()),
            isPublic: t.Optional(t.Boolean()),
          }),
        })
    );
  }

  /**
   * Override isAuthorized to ensure proper authorization
   */
  protected async isAuthorized(userId: string | null): Promise<boolean> {
    // Notes require authentication
    return userId !== null;
  }

  /**
   * Check if a request is from an admin
   */
  protected isAdminRequest(apiKey: string | null): boolean {
    return apiKey === process.env.ADMIN_API_KEY;
  }
}

// Export an instance to use in other modules
export const notesController = new NotesController().init();
