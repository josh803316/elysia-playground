import { Elysia, t } from "elysia";
import { eq, desc } from "drizzle-orm";
import { notes, users } from "../db/schema";
import { BaseApiController } from "./base-api.controller";
import { NotesModel, Note } from "../models/notes.model";
import { UsersModel } from "../models/users.model";
import { DrizzleD1Database } from "drizzle-orm/d1";

// Schema for public notes
const publicNoteSchema = t.Object({
  content: t.String(),
});

// Schema for updating public notes
const updatePublicNoteSchema = t.Object({
  title: t.String(),
  content: t.String(),
  isPublic: t.Boolean(),
});

// Type for database context
interface DbContext {
  db: DrizzleD1Database;
  params?: { id: string };
  body?: any;
  request: {
    headers: Headers;
  };
}

/**
 * Public Notes API Controller that extends the BaseApiController
 */
export class PublicNotesController extends BaseApiController<Note> {
  private notesModel: NotesModel;
  private usersModel: UsersModel;

  constructor() {
    const notesModel = new NotesModel();
    super(notesModel, "/public-notes", "Public Note");
    this.notesModel = notesModel;
    this.usersModel = new UsersModel();
  }

  /**
   * Initialize routes for the Public Notes API
   */
  init() {
    const app = new Elysia();

    return app.group(this.basePath, (app) => {
      app
        .model({
          publicNote: publicNoteSchema,
          updatePublicNote: updatePublicNoteSchema,
        })
        // Get all public notes
        .get("/", async (ctx) => {
          try {
            console.log("Public notes endpoint called - no auth required");
            const typedCtx = ctx as unknown as DbContext;

            // Get all public notes with user information
            const publicNotesWithUsers = await typedCtx.db
              .select({
                note: notes,
                user: {
                  email: users.email,
                  firstName: users.firstName,
                  lastName: users.lastName,
                },
              })
              .from(notes)
              .leftJoin(users, eq(notes.userId, users.id))
              .where(eq(notes.isPublic, "true"))
              .orderBy(desc(notes.createdAt));

            // Format the response to include user data
            const formattedNotes = publicNotesWithUsers.map(
              (item: {
                note: any;
                user: {
                  email: string | null;
                  firstName: string | null;
                  lastName: string | null;
                } | null;
              }) => ({
                ...item.note,
                user: item.user || null,
              })
            );

            return formattedNotes;
          } catch (error) {
            console.error("Error fetching public notes:", error);
            return new Response("Error fetching public notes", { status: 500 });
          }
        })
        // Create a new public note (anonymous)
        .post(
          "/",
          async (ctx) => {
            try {
              const typedCtx = ctx as unknown as DbContext;

              // Create new note
              const newNote = {
                title: "Public Note",
                content: typedCtx.body.content,
                userId: null, // anonymous note
                isPublic: "true", // Ensure this is a string
                createdAt: new Date(),
                updatedAt: new Date(),
              };

              // Insert note into database
              const inserted = await typedCtx.db
                .insert(notes)
                .values(newNote)
                .returning();

              return inserted[0];
            } catch (error) {
              console.error("Error creating public note:", error);
              return new Response(
                JSON.stringify({
                  error: "Database Error",
                  details: "Failed to create public note",
                  technicalDetails:
                    error instanceof Error ? error.message : "Unknown error",
                }),
                { status: 500 }
              );
            }
          },
          {
            body: "publicNote",
          }
        )
        // Update a public note
        .put(
          "/:id",
          async (ctx) => {
            try {
              const typedCtx = ctx as unknown as DbContext & {
                params: { id: string };
              };
              const { id } = typedCtx.params;
              const noteId = Number(id);

              if (isNaN(noteId)) {
                return new Response("Invalid note ID", { status: 400 });
              }

              // Check if note exists and is public
              const noteToUpdate = await typedCtx.db
                .select()
                .from(notes)
                .where(eq(notes.id, noteId))
                .limit(1);

              if (!noteToUpdate || noteToUpdate.length === 0) {
                return new Response("Note not found", { status: 404 });
              }

              // Verify the note is public and anonymous
              if (
                noteToUpdate[0].isPublic !== "true" ||
                noteToUpdate[0].userId !== null
              ) {
                return new Response(
                  "Cannot edit non-public or user-owned note",
                  {
                    status: 403,
                  }
                );
              }

              // Update the note
              const updatedNote = {
                title: typedCtx.body.title,
                content: typedCtx.body.content,
                isPublic: String(typedCtx.body.isPublic).toLowerCase(), // Convert boolean to string
                updatedAt: new Date(),
              };

              const result = await typedCtx.db
                .update(notes)
                .set(updatedNote)
                .where(eq(notes.id, noteId))
                .returning();

              return result[0];
            } catch (error) {
              console.error("Error updating public note:", error);
              return new Response("Error updating public note", {
                status: 500,
              });
            }
          },
          {
            body: "updatePublicNote",
          }
        )
        // Delete a public note
        .delete("/:id", async (ctx) => {
          try {
            const typedCtx = ctx as unknown as DbContext & {
              params: { id: string };
            };
            const { id } = typedCtx.params;
            const noteId = Number(id);

            if (isNaN(noteId)) {
              return new Response("Invalid note ID", { status: 400 });
            }

            // Check if note exists and is public
            const noteToDelete = await typedCtx.db
              .select()
              .from(notes)
              .where(eq(notes.id, noteId))
              .limit(1);

            if (!noteToDelete || noteToDelete.length === 0) {
              return new Response("Note not found", { status: 404 });
            }

            // Verify the note is public and anonymous
            if (
              noteToDelete[0].isPublic !== "true" ||
              noteToDelete[0].userId !== null
            ) {
              return new Response(
                "Cannot delete non-public or user-owned note",
                {
                  status: 403,
                }
              );
            }

            // Delete the note
            await typedCtx.db.delete(notes).where(eq(notes.id, noteId));

            return {
              success: true,
              message: "Public note deleted successfully",
            };
          } catch (error) {
            console.error("Error deleting public note:", error);
            return new Response("Error deleting public note", { status: 500 });
          }
        });

      return app;
    });
  }

  /**
   * Override isAuthorized to allow public note access without auth
   */
  protected async isAuthorized(): Promise<boolean> {
    // Public notes don't require authorization for read operations
    return true;
  }
}

// Export an instance to use in other modules
export const publicNotesController = new PublicNotesController().init();
