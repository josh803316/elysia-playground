import { Elysia, t } from "elysia";
import { BaseApiController } from "./base-api.controller";
import { NotesModel, Note, NoteDTO } from "../models/notes.model";
import { UsersModel } from "../models/users.model";
import { DrizzleD1Database } from "drizzle-orm/d1";

// Context interface for authentication
interface AuthContext {
  db: DrizzleD1Database;
  // Use optional chaining for auth properties
  auth?: {
    userId?: string;
  };
  // Headers access
  request: {
    headers: Headers;
  };
  // Add JWT token handling
  jwt?: {
    sub?: string;
  };
}

/**
 * Notes API Controller that extends the BaseApiController
 */
export class NotesApiController extends BaseApiController<Note> {
  private notesModel: NotesModel;
  private usersModel: UsersModel;

  constructor() {
    const notesModel = new NotesModel();
    super(notesModel, "/api/notes", "Note");
    this.notesModel = notesModel;
    this.usersModel = new UsersModel();
  }

  /**
   * Initialize routes for the Notes API
   */
  init() {
    const app = new Elysia();

    // Instead of using a generic, create and return an Elysia instance
    return app.group(this.basePath, (app) => {
      // Get user's notes
      app.get("/user", async (context: AuthContext) => {
        // Extract userId from JWT token
        const userId = context.jwt?.sub || context.auth?.userId;

        if (!userId) {
          return new Response(
            JSON.stringify({ error: "Authentication required" }),
            { status: 401 }
          );
        }

        try {
          const userRecord = await this.usersModel.findByClerkId(
            context.db,
            userId
          );

          if (!userRecord) {
            return new Response(JSON.stringify({ error: "User not found" }), {
              status: 404,
            });
          }

          const notes = await this.notesModel.findByUserId(
            context.db,
            userRecord.id
          );
          return this.notesModel.toDTOs(notes);
        } catch (error) {
          console.error("Error fetching user notes:", error);
          throw new Error("Failed to fetch notes");
        }
      });

      // Admin: get all notes
      app.get("/admin", async (context: AuthContext) => {
        const apiKey = context.request.headers.get("x-api-key");

        if (!this.isAdminRequest(apiKey)) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 403,
          });
        }

        try {
          const notes = await this.notesModel.findAll(context.db);
          return this.notesModel.toDTOs(notes);
        } catch (error) {
          console.error("Error fetching all notes:", error);
          throw new Error("Failed to fetch notes");
        }
      });

      // Create a note
      app.post(
        "/",
        async (
          context: AuthContext & {
            body: { title: string; content: string; isPublic?: boolean };
          }
        ) => {
          const userId = context.auth?.userId;

          if (!userId) {
            return new Response(
              JSON.stringify({ error: "Authentication required" }),
              { status: 401 }
            );
          }

          try {
            const userRecord = await this.usersModel.findByClerkId(
              context.db,
              userId
            );

            if (!userRecord) {
              return new Response(
                JSON.stringify({
                  error: "User not found",
                  details:
                    "The user account could not be found in the database",
                }),
                { status: 404 }
              );
            }

            const { title, content, isPublic = false } = context.body;

            try {
              // Convert boolean to string "true" or "false"
              const isPublicString = String(isPublic).toLowerCase();

              const newNote = await this.notesModel.createNote(context.db, {
                userId: userRecord.id,
                title,
                content,
                isPublic: isPublicString,
              });

              return this.notesModel.toDTO(newNote);
            } catch (dbError) {
              console.error("Database error creating note:", dbError);
              return new Response(
                JSON.stringify({
                  error: "Database Error",
                  details: "Failed to save note to database",
                  technicalDetails:
                    dbError instanceof Error
                      ? dbError.message
                      : "Unknown error",
                }),
                { status: 500 }
              );
            }
          } catch (error) {
            console.error("Error creating note:", error);
            // Return a proper error response that will be caught by the client
            return new Response(
              JSON.stringify({
                error: "Server Error",
                details:
                  "An unexpected error occurred while processing your request",
                technicalDetails:
                  error instanceof Error ? error.message : "Unknown error",
              }),
              { status: 500 }
            );
          }
        },
        {
          body: t.Object({
            title: t.String(),
            content: t.String(),
            isPublic: t.Optional(t.Boolean()),
          }),
        }
      );

      // Update a note
      app.put(
        "/:id",
        async (
          context: AuthContext & {
            params: { id: string };
            body: { title?: string; content?: string; isPublic?: boolean };
          }
        ) => {
          const userId = context.auth?.userId;

          if (!userId) {
            return new Response(
              JSON.stringify({ error: "Authentication required" }),
              { status: 401 }
            );
          }

          try {
            const userRecord = await this.usersModel.findByClerkId(
              context.db,
              userId
            );

            if (!userRecord) {
              return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
              });
            }

            const noteId = parseInt(context.params.id, 10);
            const note = await this.notesModel.findById(context.db, noteId);

            if (!note) {
              return new Response(JSON.stringify({ error: "Note not found" }), {
                status: 404,
              });
            }

            // Check if user owns the note
            if (
              !(await this.notesModel.isOwner(
                context.db,
                noteId,
                userRecord.id
              ))
            ) {
              return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 403,
              });
            }

            const { title, content, isPublic } = context.body;
            const updateData: Partial<Note> = {};

            if (title !== undefined) updateData.title = title;
            if (content !== undefined) updateData.content = content;
            if (isPublic !== undefined) {
              updateData.isPublic = String(isPublic).toLowerCase();
            }

            // Add updatedAt timestamp
            updateData.updatedAt = new Date();

            const updatedNote = await this.notesModel.update(
              context.db,
              noteId,
              updateData
            );
            if (!updatedNote) {
              return new Response(
                JSON.stringify({ error: "Failed to update note" }),
                { status: 500 }
              );
            }
            return this.notesModel.toDTO(updatedNote);
          } catch (error) {
            console.error("Error updating note:", error);
            throw new Error("Failed to update note");
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          body: t.Object({
            title: t.Optional(t.String()),
            content: t.Optional(t.String()),
            isPublic: t.Optional(t.Boolean()),
          }),
        }
      );

      // Delete a note
      app.delete(
        "/:id",
        async (context: AuthContext & { params: { id: string } }) => {
          const userId = context.auth?.userId;

          if (!userId) {
            return new Response(
              JSON.stringify({ error: "Authentication required" }),
              { status: 401 }
            );
          }

          try {
            const userRecord = await this.usersModel.findByClerkId(
              context.db,
              userId
            );

            if (!userRecord) {
              return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
              });
            }

            const noteId = parseInt(context.params.id, 10);
            const note = await this.notesModel.findById(context.db, noteId);

            if (!note) {
              return new Response(JSON.stringify({ error: "Note not found" }), {
                status: 404,
              });
            }

            // Check if user owns the note
            if (
              !(await this.notesModel.isOwner(
                context.db,
                noteId,
                userRecord.id
              ))
            ) {
              return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 403,
              });
            }

            const result = await this.notesModel.delete(context.db, noteId);
            if (!result.success) {
              return new Response(
                JSON.stringify({
                  error: result.message || "Failed to delete note",
                }),
                { status: 500 }
              );
            }

            return { success: true, message: "Note deleted successfully" };
          } catch (error) {
            console.error("Error deleting note:", error);
            return new Response(
              JSON.stringify({
                error: "Server Error",
                details: "Failed to delete note",
                technicalDetails:
                  error instanceof Error ? error.message : "Unknown error",
              }),
              { status: 500 }
            );
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
        }
      );

      // Admin: delete a note (no ownership check)
      app.delete(
        "/admin/:id",
        async (context: AuthContext & { params: { id: string } }) => {
          const apiKey = context.request.headers.get("x-api-key");

          if (!this.isAdminRequest(apiKey)) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
              status: 403,
            });
          }

          try {
            const noteId = parseInt(context.params.id, 10);
            const result = await this.notesModel.delete(context.db, noteId);

            if (!result.success) {
              return new Response(
                JSON.stringify({ error: result.message || "Note not found" }),
                { status: 404 }
              );
            }

            return { success: true, message: "Note deleted successfully" };
          } catch (error) {
            console.error("Error deleting note:", error);
            throw new Error("Failed to delete note");
          }
        }
      );

      return app;
    });
  }

  /**
   * Override isAuthorized to check note ownership
   */
  protected async isAuthorized(
    userId: string,
    noteId: string
  ): Promise<boolean> {
    // We would need db access here, but this method signature
    // doesn't provide it. For now, just check if userId exists
    return !!userId;
  }

  protected isAdminRequest(apiKey: string | null): boolean {
    return apiKey === process.env.ADMIN_API_KEY;
  }
}

// Export an instance to use in other modules
export const notesApiController = new NotesApiController();
