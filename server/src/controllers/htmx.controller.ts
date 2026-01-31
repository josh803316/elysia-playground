import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { eq, desc } from "drizzle-orm";
import { notes, users } from "../db/schema";
import { authGuard } from "../guards/auth-guard";
import { DrizzleD1Database } from "drizzle-orm/d1";

// Type for database context
interface DbContext {
  db: DrizzleD1Database;
  params?: { id: string };
  body?: any;
  request: {
    headers: Headers;
  };
  auth?: () => { userId: string; [key: string]: any };
  clerk?: any;
}

// Helper function to format date
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Helper to render a note card
function renderNoteCard(note: any, showUser: boolean = false): string {
  const isPublic = note.isPublic === "true";
  const userName =
    note.user?.firstName || note.user?.lastName
      ? `${note.user.firstName || ""} ${note.user.lastName || ""}`.trim()
      : note.user?.email || "Anonymous";

  return `
    <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-900">${note.title || "Untitled"}</h3>
        <span class="px-2 py-1 text-xs font-medium rounded ${
          isPublic
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800"
        }">
          ${isPublic ? "Public" : "Private"}
        </span>
      </div>
      <p class="text-gray-700 mb-4 line-clamp-3">${note.content || ""}</p>
      <div class="flex justify-between items-center text-sm text-gray-500 border-t pt-2">
        <span>${formatDate(note.createdAt)}</span>
        ${showUser ? `<span class="text-xs">by ${userName}</span>` : ""}
      </div>
    </div>
  `;
}

/**
 * HTMX Controller for serving HTML fragments
 */
export const htmxController = new Elysia({ prefix: "/htmx" })
  .use(html())
  // Serve the main HTMX page
  .get("/", async () => {
    return Bun.file("htmx/index.html");
  })
  // Get public notes as HTML fragment
  .get("/public-notes", async (ctx) => {
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

      // Format the notes as HTML
      const notesHTML = publicNotesWithUsers
        .map((item) => {
          const noteWithUser = { ...item.note, user: item.user };
          return renderNoteCard(noteWithUser, true);
        })
        .join("");

      if (notesHTML === "") {
        return `<div class="text-center py-8 text-gray-500">No public notes yet. Be the first to create one!</div>`;
      }

      return `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${notesHTML}</div>`;
    } catch (error) {
      console.error("Error fetching public notes:", error);
      return `<div class="text-red-500">Error loading public notes</div>`;
    }
  })
  // Get private notes as HTML fragment (requires auth)
  .get(
    "/private-notes",
    async (ctx) => {
      try {
        const typedCtx = ctx as unknown as DbContext;
        const authData = typedCtx.auth?.();

        if (!authData?.userId) {
          return `<div class="text-center py-8 text-gray-500">Please sign in to view your private notes</div>`;
        }

        // Find the user by Clerk ID
        const userResult = await typedCtx.db
          .select()
          .from(users)
          .where(eq(users.clerkUserId, authData.userId))
          .limit(1);

        if (!userResult || userResult.length === 0) {
          return `<div class="text-center py-8 text-gray-500">No private notes yet.</div>`;
        }

        const user = userResult[0];

        // Get user's private notes
        const userNotes = await typedCtx.db
          .select()
          .from(notes)
          .where(eq(notes.userId, user.id))
          .orderBy(desc(notes.createdAt));

        const privateNotes = userNotes.filter(
          (note) => note.isPublic !== "true"
        );

        const notesHTML = privateNotes.map((note) => renderNoteCard(note, false)).join("");

        if (notesHTML === "") {
          return `<div class="text-center py-8 text-gray-500">You don't have any private notes yet.</div>`;
        }

        return `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${notesHTML}</div>`;
      } catch (error) {
        console.error("Error fetching private notes:", error);
        return `<div class="text-red-500">Error loading private notes</div>`;
      }
    },
    {
      beforeHandle: authGuard,
    }
  )
  // Create a public note (anonymous)
  .post(
    "/public-notes",
    async (ctx) => {
      try {
        const typedCtx = ctx as unknown as DbContext;
        const content = typedCtx.body?.content;

        if (!content || content.trim() === "") {
          return `<div class="text-red-500">Content is required</div>`;
        }

        // Create new note
        const newNote = {
          title: "Public Note",
          content: content.trim(),
          userId: null,
          isPublic: "true",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const inserted = await typedCtx.db
          .insert(notes)
          .values(newNote)
          .returning();

        // Return a success message that triggers a refresh
        return `<div class="text-green-600 mb-4" id="success-message">Note created successfully!</div>`;
      } catch (error) {
        console.error("Error creating public note:", error);
        return `<div class="text-red-500">Error creating note</div>`;
      }
    },
    {
      body: t.Object({
        content: t.String(),
      }),
    }
  )
  // Create a private note (requires auth)
  .post(
    "/private-notes",
    async (ctx) => {
      try {
        const typedCtx = ctx as unknown as DbContext;
        const authData = typedCtx.auth?.();

        if (!authData?.userId) {
          return `<div class="text-red-500">Authentication required</div>`;
        }

        const content = typedCtx.body?.content;

        if (!content || content.trim() === "") {
          return `<div class="text-red-500">Content is required</div>`;
        }

        // Find or create the user
        let userResult = await typedCtx.db
          .select()
          .from(users)
          .where(eq(users.clerkUserId, authData.userId))
          .limit(1);

        if (!userResult || userResult.length === 0) {
          // Create the user if they don't exist
          const clerkUser = await typedCtx.clerk?.users.getUser(
            authData.userId
          );
          const newUser = {
            clerkUserId: authData.userId,
            email: clerkUser?.emailAddresses?.[0]?.emailAddress || "",
            firstName: clerkUser?.firstName || "",
            lastName: clerkUser?.lastName || "",
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          userResult = await typedCtx.db
            .insert(users)
            .values(newUser)
            .returning();
        }

        const user = userResult[0];

        // Create new note
        const newNote = {
          title: "Private Note",
          content: content.trim(),
          userId: user.id,
          isPublic: "false",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const inserted = await typedCtx.db
          .insert(notes)
          .values(newNote)
          .returning();

        return `<div class="text-green-600 mb-4" id="success-message">Private note created successfully!</div>`;
      } catch (error) {
        console.error("Error creating private note:", error);
        return `<div class="text-red-500">Error creating note</div>`;
      }
    },
    {
      beforeHandle: authGuard,
      body: t.Object({
        content: t.String(),
      }),
    }
  );
