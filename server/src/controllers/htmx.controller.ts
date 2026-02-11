import { Elysia, t } from "elysia";
import { eq, desc, and } from "drizzle-orm";
import { notes, users } from "../db/schema";
import type { Database } from "../db";
import {
  notesPage,
  notesTablePage,
  noteCard,
  newNoteModal,
  editNoteModal,
  newPrivateNoteModal,
  privateNotesGrid,
  privateNoteCard,
  authRequiredMessage,
  errorMessage,
  emptyState,
  adminNotesGrid,
  adminUnauthorizedMessage,
  adminLoginModal,
  type Note,
} from "../views/htmx-templates";
import { NotesModel } from "../models/notes.model";
import { UsersModel } from "../models/users.model";

// Type for database context
interface DbContext {
  db: Database;
  params?: { id: string };
  body?: unknown;
  request: Request;
}

// Type for context with clerk auth
interface ClerkContext extends DbContext {
  auth: () => { userId: string; sessionClaims?: { email?: string } } | null;
  clerk: {
    users: {
      getUser: (id: string) => Promise<{
        firstName?: string;
        lastName?: string;
        emailAddresses?: Array<{ emailAddress: string }>;
      }>;
    };
  };
}

// Get Clerk publishable key and Admin API key from environment
const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY || "";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";

function getAdminApiKeyFromRequest(request: Request): string | null {
  return request.headers.get("x-api-key") ?? request.headers.get("X-API-Key");
}

function isAdminRequest(request: Request): boolean {
  const key = getAdminApiKeyFromRequest(request);
  return !!ADMIN_API_KEY && key === ADMIN_API_KEY;
}

// Initialize models
const notesModel = new NotesModel();
const usersModel = new UsersModel();

/**
 * HTMX Controller - Serves HTML pages and fragments for the Notes App
 *
 * This controller demonstrates server-side rendering with HTMX,
 * where the server returns HTML fragments that HTMX swaps into the DOM.
 */
export const htmxController = new Elysia({ prefix: "/htmx" })
  // Main page - renders full HTML page with all public notes
  .get("/", async (ctx) => {
    try {
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

      // Format the response
      const formattedNotes: Note[] = publicNotesWithUsers.map((item: {
        note: typeof notes.$inferSelect;
        user: {
          email: string;
          firstName: string | null;
          lastName: string | null;
        } | null;
      }) => ({
        ...item.note,
        user: item.user || null,
      }));

      return new Response(notesPage(formattedNotes, CLERK_PUBLISHABLE_KEY), {
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      console.error("Error fetching notes for HTMX:", error);
      return new Response(errorMessage("Failed to load notes"), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }
  })

  // Notes table view (full page, same layout as Svelte admin /notes)
  .get("/notes", async () => {
    return new Response(notesTablePage(CLERK_PUBLISHABLE_KEY), {
      headers: { "Content-Type": "text/html" },
    });
  })

  // Get new note form modal
  .get("/notes/new", () => {
    return new Response(newNoteModal(), {
      headers: { "Content-Type": "text/html" },
    });
  })

  // Get edit note form modal
  .get("/notes/:id/edit", async (ctx) => {
    try {
      const typedCtx = ctx as unknown as DbContext & { params: { id: string } };
      const noteId = Number(typedCtx.params.id);

      if (isNaN(noteId)) {
        return new Response(errorMessage("Invalid note ID"), {
          status: 400,
          headers: { "Content-Type": "text/html" },
        });
      }

      // Fetch the note
      const noteResult = await typedCtx.db
        .select()
        .from(notes)
        .where(eq(notes.id, noteId))
        .limit(1);

      if (!noteResult || noteResult.length === 0) {
        return new Response(errorMessage("Note not found"), {
          status: 404,
          headers: { "Content-Type": "text/html" },
        });
      }

      const note = noteResult[0] as Note;
      return new Response(editNoteModal(note), {
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      console.error("Error fetching note for edit:", error);
      return new Response(errorMessage("Failed to load note"), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }
  })

  // Create a new note - returns the new note card HTML
  .post(
    "/notes",
    async (ctx) => {
      try {
        const typedCtx = ctx as unknown as DbContext;
        const body = typedCtx.body as { title?: string; content: string };

        if (!body.content || body.content.trim() === "") {
          return new Response(errorMessage("Content is required"), {
            status: 400,
            headers: { "Content-Type": "text/html" },
          });
        }

        // Create new note
        const newNote = {
          title: body.title || "Public Note",
          content: body.content,
          userId: null, // anonymous note
          isPublic: "true",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Insert note into database
        const inserted = await typedCtx.db
          .insert(notes)
          .values(newNote)
          .returning();

        const createdNote: Note = {
          ...inserted[0],
          user: null,
        };

        // Return the new note card HTML
        return new Response(noteCard(createdNote), {
          headers: { "Content-Type": "text/html" },
        });
      } catch (error) {
        console.error("Error creating note:", error);
        return new Response(errorMessage("Failed to create note"), {
          status: 500,
          headers: { "Content-Type": "text/html" },
        });
      }
    },
    {
      body: t.Object({
        title: t.Optional(t.String()),
        content: t.String(),
      }),
    }
  )

  // Update a note - returns the updated note card HTML
  .put(
    "/notes/:id",
    async (ctx) => {
      try {
        const typedCtx = ctx as unknown as DbContext & { params: { id: string } };
        const noteId = Number(typedCtx.params.id);
        const body = typedCtx.body as { title: string; content: string; isPublic?: string };

        if (isNaN(noteId)) {
          return new Response(errorMessage("Invalid note ID"), {
            status: 400,
            headers: { "Content-Type": "text/html" },
          });
        }

        // Check if note exists
        const noteToUpdate = await typedCtx.db
          .select()
          .from(notes)
          .where(eq(notes.id, noteId))
          .limit(1);

        if (!noteToUpdate || noteToUpdate.length === 0) {
          return new Response(errorMessage("Note not found"), {
            status: 404,
            headers: { "Content-Type": "text/html" },
          });
        }

        // Only allow editing anonymous public notes (like the public notes API)
        if (noteToUpdate[0].userId !== null) {
          return new Response(errorMessage("Cannot edit user-owned notes"), {
            status: 403,
            headers: { "Content-Type": "text/html" },
          });
        }

        // Update the note
        const updatedNoteData = {
          title: body.title,
          content: body.content,
          isPublic: body.isPublic === "on" ? "true" : "false",
          updatedAt: new Date(),
        };

        const result = await typedCtx.db
          .update(notes)
          .set(updatedNoteData)
          .where(eq(notes.id, noteId))
          .returning();

        const updatedNote: Note = {
          ...result[0],
          user: null,
        };

        // Return the updated note card HTML
        return new Response(noteCard(updatedNote), {
          headers: { "Content-Type": "text/html" },
        });
      } catch (error) {
        console.error("Error updating note:", error);
        return new Response(errorMessage("Failed to update note"), {
          status: 500,
          headers: { "Content-Type": "text/html" },
        });
      }
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.String(),
        isPublic: t.Optional(t.String()),
      }),
    }
  )

  // Delete a note - returns empty string to remove from DOM
  .delete("/notes/:id", async (ctx) => {
    try {
      const typedCtx = ctx as unknown as DbContext & { params: { id: string } };
      const noteId = Number(typedCtx.params.id);

      if (isNaN(noteId)) {
        return new Response(errorMessage("Invalid note ID"), {
          status: 400,
          headers: { "Content-Type": "text/html" },
        });
      }

      // Check if note exists
      const noteToDelete = await typedCtx.db
        .select()
        .from(notes)
        .where(eq(notes.id, noteId))
        .limit(1);

      if (!noteToDelete || noteToDelete.length === 0) {
        return new Response(errorMessage("Note not found"), {
          status: 404,
          headers: { "Content-Type": "text/html" },
        });
      }

      // Only allow deleting anonymous public notes
      if (noteToDelete[0].userId !== null) {
        return new Response(errorMessage("Cannot delete user-owned notes"), {
          status: 403,
          headers: { "Content-Type": "text/html" },
        });
      }

      // Delete the note
      await typedCtx.db.delete(notes).where(eq(notes.id, noteId));

      // Return empty string - HTMX will remove the element
      return new Response("", {
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      return new Response(errorMessage("Failed to delete note"), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }
  })

  // Refresh notes grid - returns all note cards
  .get("/notes/refresh", async (ctx) => {
    try {
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

      // Format the response
      const formattedNotes: Note[] = publicNotesWithUsers.map((item: {
        note: typeof notes.$inferSelect;
        user: {
          email: string;
          firstName: string | null;
          lastName: string | null;
        } | null;
      }) => ({
        ...item.note,
        user: item.user || null,
      }));

      if (formattedNotes.length === 0) {
        return new Response(emptyState(), {
          headers: { "Content-Type": "text/html" },
        });
      }

      // Return all note cards
      return new Response(
        formattedNotes.map((note) => noteCard(note)).join(""),
        {
          headers: { "Content-Type": "text/html" },
        }
      );
    } catch (error) {
      console.error("Error refreshing notes:", error);
      return new Response(errorMessage("Failed to refresh notes"), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }
  })

  // ============================================
  // PRIVATE NOTES ROUTES (require authentication)
  // ============================================

  // Get new private note form modal
  .get("/private-notes/new", () => {
    return new Response(newPrivateNoteModal(), {
      headers: { "Content-Type": "text/html" },
    });
  })

  // Get all private notes for the current user
  .get("/private-notes", async (ctx) => {
    try {
      const typedCtx = ctx as unknown as ClerkContext;

      // Check if user is authenticated
      let authData;
      try {
        authData = typedCtx.auth();
      } catch (e) {
        return new Response(authRequiredMessage(), {
          headers: { "Content-Type": "text/html" },
        });
      }

      if (!authData?.userId) {
        return new Response(authRequiredMessage(), {
          headers: { "Content-Type": "text/html" },
        });
      }

      console.log("HTMX: Looking up private notes for Clerk user:", authData.userId);

      // Find or create the user
      const user = await usersModel.findOrCreateByClerkId(
        typedCtx.db,
        authData.userId,
        typedCtx.clerk
      );

      // Get user's private notes
      const userNotes = await notesModel.findPrivateNotesByUserId(typedCtx.db, user.id);

      console.log(`HTMX: Found ${userNotes.length} private notes for user ID:`, user.id);

      return new Response(privateNotesGrid(userNotes as Note[]), {
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      console.error("Error fetching private notes:", error);
      return new Response(authRequiredMessage(), {
        headers: { "Content-Type": "text/html" },
      });
    }
  })

  // Create a new private note
  .put(
    "/private-notes",
    async (ctx) => {
      try {
        const typedCtx = ctx as unknown as ClerkContext;
        const body = typedCtx.body as { data: string };

        // Check if user is authenticated
        let authData;
        try {
          authData = typedCtx.auth();
        } catch (e) {
          return new Response(errorMessage("Authentication required"), {
            status: 401,
            headers: { "Content-Type": "text/html" },
          });
        }

        if (!authData?.userId) {
          return new Response(errorMessage("Authentication required"), {
            status: 401,
            headers: { "Content-Type": "text/html" },
          });
        }

        if (!body.data || body.data.trim() === "") {
          return new Response(errorMessage("Content is required"), {
            status: 400,
            headers: { "Content-Type": "text/html" },
          });
        }

        console.log("HTMX: Creating private note for Clerk user:", authData.userId);

        // Find or create the user
        const user = await usersModel.findOrCreateByClerkId(
          typedCtx.db,
          authData.userId,
          typedCtx.clerk
        );

        // Create new private note
        const noteData = {
          title: "Private Note",
          content: body.data,
          userId: user.id,
          isPublic: "false",
        };

        const note = await notesModel.createNote(typedCtx.db, noteData);

        console.log("HTMX: Created private note with ID:", note.id);

        // Return updated private notes grid
        const userNotes = await notesModel.findPrivateNotesByUserId(typedCtx.db, user.id);
        return new Response(privateNotesGrid(userNotes as Note[]), {
          headers: { "Content-Type": "text/html" },
        });
      } catch (error) {
        console.error("Error creating private note:", error);
        return new Response(errorMessage("Failed to create note. Please ensure you are signed in."), {
          status: 500,
          headers: { "Content-Type": "text/html" },
        });
      }
    },
    {
      body: t.Object({
        data: t.String(),
      }),
    }
  )

  // Delete a private note
  .delete("/private-notes/:id", async (ctx) => {
    try {
      const typedCtx = ctx as unknown as ClerkContext & { params: { id: string } };
      const noteId = Number(typedCtx.params.id);

      if (isNaN(noteId)) {
        return new Response(errorMessage("Invalid note ID"), {
          status: 400,
          headers: { "Content-Type": "text/html" },
        });
      }

      // Check if user is authenticated
      let authData;
      try {
        authData = typedCtx.auth();
      } catch (e) {
        return new Response(errorMessage("Authentication required"), {
          status: 401,
          headers: { "Content-Type": "text/html" },
        });
      }

      if (!authData?.userId) {
        return new Response(errorMessage("Authentication required"), {
          status: 401,
          headers: { "Content-Type": "text/html" },
        });
      }

      // Find the user
      const user = await usersModel.findOrCreateByClerkId(
        typedCtx.db,
        authData.userId,
        typedCtx.clerk
      );

      // Verify the note belongs to this user
      const noteToDelete = await typedCtx.db
        .select()
        .from(notes)
        .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)))
        .limit(1);

      if (!noteToDelete || noteToDelete.length === 0) {
        return new Response(errorMessage("Note not found or access denied"), {
          status: 404,
          headers: { "Content-Type": "text/html" },
        });
      }

      // Delete the note
      await notesModel.delete(typedCtx.db, noteId);

      console.log("HTMX: Deleted private note ID:", noteId);

      // Return empty string - HTMX will remove the element
      return new Response("", {
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      console.error("Error deleting private note:", error);
      return new Response(errorMessage("Failed to delete note"), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }
  })

  // ============================================
  // ADMIN ROUTES (require X-API-Key = ADMIN_API_KEY)
  // ============================================

  // Get admin login modal (no auth required)
  .get("/admin/login-modal", () => {
    return new Response(adminLoginModal(), {
      headers: { "Content-Type": "text/html" },
    });
  })

  // Get all notes as HTML fragment (admin only)
  .get("/admin/notes", async (ctx) => {
    try {
      const typedCtx = ctx as unknown as DbContext;
      if (!isAdminRequest(typedCtx.request)) {
        // Return 200 so HTMX swaps the message (HTMX does not swap on 4xx/5xx by default)
        return new Response(adminUnauthorizedMessage(), {
          status: 200,
          headers: { "Content-Type": "text/html" },
        });
      }

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
        .orderBy(desc(notes.createdAt));

      const formattedNotes: Note[] = publicNotesWithUsers.map((item: {
        note: typeof notes.$inferSelect;
        user: {
          email: string;
          firstName: string | null;
          lastName: string | null;
        } | null;
      }) => ({
        ...item.note,
        user: item.user || null,
      }));

      if (formattedNotes.length === 0) {
        return new Response(
          '<div class="text-center py-8 text-gray-500">No notes in the system.</div>',
          { headers: { "Content-Type": "text/html" } }
        );
      }

      return new Response(adminNotesGrid(formattedNotes), {
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      console.error("Error fetching admin notes:", error);
      return new Response(errorMessage("Failed to load admin notes"), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }
  })

  // Delete any note as admin
  .delete("/admin/notes/:id", async (ctx) => {
    try {
      const typedCtx = ctx as unknown as DbContext & { params: { id: string } };
      if (!isAdminRequest(typedCtx.request)) {
        return new Response(adminUnauthorizedMessage(), {
          status: 401,
          headers: { "Content-Type": "text/html" },
        });
      }

      const noteId = Number(typedCtx.params.id);
      if (isNaN(noteId)) {
        return new Response(errorMessage("Invalid note ID"), {
          status: 400,
          headers: { "Content-Type": "text/html" },
        });
      }

      const noteToDelete = await typedCtx.db
        .select()
        .from(notes)
        .where(eq(notes.id, noteId))
        .limit(1);

      if (!noteToDelete || noteToDelete.length === 0) {
        return new Response(errorMessage("Note not found"), {
          status: 404,
          headers: { "Content-Type": "text/html" },
        });
      }

      await typedCtx.db.delete(notes).where(eq(notes.id, noteId));

      return new Response("", {
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      console.error("Error deleting note as admin:", error);
      return new Response(errorMessage("Failed to delete note"), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }
  });
