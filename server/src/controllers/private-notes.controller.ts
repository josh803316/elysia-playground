import { Elysia, t } from "elysia";
import { BaseApiController } from "./base-api.controller";
import { NotesModel, Note } from "../models/notes.model";
import { UsersModel } from "../models/users.model";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { authGuard } from "../guards/auth-guard";
import { ownershipGuard } from "../guards/ownership-guard";

// Schema for private notes
const privateMemoSchema = t.Object({
  data: t.String(),
});

// Type for context with clerk auth and database
type ClerkContext = {
  auth: () => { userId: string; [key: string]: any };
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
  db: DrizzleD1Database;
  params?: { id: string };
  body?: any;
};

/**
 * Private Notes API Controller that extends the BaseApiController
 */
export class PrivateNotesController extends BaseApiController<Note> {
  private notesModel: NotesModel;
  private usersModel: UsersModel;

  constructor() {
    const notesModel = new NotesModel();
    super(notesModel, "/private-notes", "Private Note");
    this.notesModel = notesModel;
    this.usersModel = new UsersModel();
  }

  /**
   * Initialize routes for the Private Notes API
   */
  init() {
    const app = new Elysia();

    return app.group(this.basePath, (app) => {
      app
        .model({
          privateMemo: privateMemoSchema,
        })
        // Apply both auth and ownership guards to all routes
        .guard(
          {
            beforeHandle: [authGuard, ownershipGuard],
          },
          (app) =>
            app
              // Get all private notes for the current user
              .get("/", async (ctx) => {
                try {
                  const typedCtx = ctx as unknown as ClerkContext;
                  const authData = typedCtx.auth();

                  console.log(
                    "Looking up notes for Clerk user:",
                    authData.userId
                  );

                  // Find or create the user using the users model
                  const user = await this.usersModel.findOrCreateByClerkId(
                    typedCtx.db,
                    authData.userId,
                    typedCtx.clerk
                  );

                  // Get notes using the database ID
                  const userNotes = await this.notesModel.findByUserId(
                    typedCtx.db,
                    user.id
                  );

                  console.log(
                    `Found ${userNotes.length} notes for user ID:`,
                    user.id
                  );

                  return userNotes;
                } catch (error) {
                  console.error("Error accessing notes:", error);
                  return new Response("Error accessing notes", { status: 500 });
                }
              })
              // Create a new private note
              .put(
                "/",
                async (ctx) => {
                  try {
                    const typedCtx = ctx as unknown as ClerkContext;
                    const authData = typedCtx.auth();

                    console.log(
                      "Creating note for Clerk user:",
                      authData.userId
                    );

                    // Find or create the user using the users model
                    const user = await this.usersModel.findOrCreateByClerkId(
                      typedCtx.db,
                      authData.userId,
                      typedCtx.clerk
                    );

                    // Create new note using the database ID
                    const noteData = {
                      title: "Private Note",
                      content: typedCtx.body.data,
                      userId: user.id,
                      isPublic: "false",
                    };

                    console.log("Creating note with user ID:", user.id);

                    // Create the note using the model
                    const note = await this.notesModel.createNote(
                      typedCtx.db,
                      noteData
                    );

                    // Return the newly created note
                    return note;
                  } catch (error) {
                    console.error("Error creating note:", error);
                    return new Response("Error creating note", { status: 500 });
                  }
                },
                {
                  body: "privateMemo",
                }
              )
              // Delete a private note
              .delete("/:id", async (ctx) => {
                try {
                  const typedCtx = ctx as unknown as ClerkContext & {
                    params: { id: string };
                  };
                  const authData = typedCtx.auth();
                  const { id } = typedCtx.params;
                  const noteId = Number(id);

                  if (isNaN(noteId)) {
                    return new Response("Invalid note ID", { status: 400 });
                  }

                  // Find the user using the users model
                  const user = await this.usersModel.findOrCreateByClerkId(
                    typedCtx.db,
                    authData.userId,
                    typedCtx.clerk
                  );

                  // Delete the note
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
                } catch (error) {
                  console.error("Error deleting note:", error);
                  return new Response("Error deleting note", { status: 500 });
                }
              })
        );

      return app;
    });
  }

  /**
   * Override isAuthorized to ensure proper authorization
   */
  protected async isAuthorized(userId: string | null): Promise<boolean> {
    // Private notes require authentication
    return userId !== null;
  }
}

// Export an instance to use in other modules
export const privateNotesController = new PrivateNotesController().init();
