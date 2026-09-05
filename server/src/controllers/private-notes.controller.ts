import { Elysia, t } from 'elysia'
import type { Database } from '../db/index.js'
import { authGuard } from '../guards/auth-guard.js'
import { ownershipGuard } from '../guards/ownership-guard.js'
import type { Note } from '../models/notes.model.js'
import { NotesModel } from '../models/notes.model.js'
import { UsersModel } from '../models/users.model.js'
import { BaseApiController } from './base-api.controller.js'

// Schema for private notes
const privateMemoSchema = t.Object({
  title: t.String(),
  data: t.String(),
})

// Type for context with clerk auth and database
type ClerkContext = {
  auth: () => { userId: string; [key: string]: any }
  clerk: {
    users: {
      getUser: (id: string) => Promise<{
        firstName?: string
        lastName?: string
        emailAddresses?: Array<{ emailAddress: string }>
        [key: string]: any
      }>
    }
  }
  db: Database
  params?: { id: string }
  body?: any
}

/**
 * Private Notes API Controller that extends the BaseApiController
 */
export class PrivateNotesController extends BaseApiController<Note> {
  private notesModel: NotesModel
  private usersModel: UsersModel

  constructor() {
    const notesModel = new NotesModel()
    super(notesModel, '/private-notes', 'Private Note')
    this.notesModel = notesModel
    this.usersModel = new UsersModel()
  }

  /**
   * Initialize routes for the Private Notes API
   */
  init() {
    const app = new Elysia().state({ resource: null as unknown })

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
              .get('/', async (ctx) => {
                try {
                  const typedCtx = ctx as unknown as ClerkContext
                  const authData = typedCtx.auth()

                  // Find or create the user using the users model
                  const user = await this.usersModel.findOrCreateByClerkId(
                    typedCtx.db,
                    authData.userId,
                    typedCtx.clerk
                  )

                  // Get notes using the database ID
                  const userNotes = await this.notesModel.findByUserId(typedCtx.db, user.id)

                  return userNotes
                } catch (_error) {
                  return new Response('Error accessing notes', { status: 500 })
                }
              })
              // Create a new private note
              .put(
                '/',
                {
                  body: 'privateMemo',
                },
                async (ctx) => {
                  try {
                    const typedCtx = ctx as unknown as ClerkContext
                    const authData = typedCtx.auth()

                    // Find or create the user using the users model
                    const user = await this.usersModel.findOrCreateByClerkId(
                      typedCtx.db,
                      authData.userId,
                      typedCtx.clerk
                    )

                    // Create new note using the database ID
                    const rawTitle = (typedCtx.body.title || '').trim()
                    if (!rawTitle) {
                      return new Response(JSON.stringify({ error: 'Title is required' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                      })
                    }
                    const noteData = {
                      title: rawTitle,
                      content: typedCtx.body.data,
                      userId: user.id,
                      isPublic: 'false',
                    }

                    // Create the note using the model
                    const note = await this.notesModel.createNote(typedCtx.db, noteData)

                    // Return the newly created note
                    return note
                  } catch (_error) {
                    return new Response('Error creating note', { status: 500 })
                  }
                }
              )
              // Update an existing private note
              .put(
                '/:id',
                {
                  body: 'privateMemo',
                },
                async (ctx) => {
                  try {
                    const typedCtx = ctx as unknown as ClerkContext & {
                      params: { id: string }
                    }
                    const { id } = typedCtx.params
                    const noteId = Number(id)

                    if (Number.isNaN(noteId)) {
                      return new Response('Invalid note ID', { status: 400 })
                    }

                    const rawTitle = (typedCtx.body.title || '').trim()
                    if (!rawTitle) {
                      return new Response(JSON.stringify({ error: 'Title is required' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                      })
                    }

                    // ownershipGuard has already verified this note belongs to the current user
                    const updatedNote = await this.notesModel.update(typedCtx.db, noteId, {
                      title: rawTitle,
                      content: typedCtx.body.data,
                      updatedAt: new Date(),
                    })

                    if (!updatedNote) {
                      return new Response('Note not found', { status: 404 })
                    }

                    return updatedNote
                  } catch (_error) {
                    return new Response('Error updating note', { status: 500 })
                  }
                }
              )
              // Delete a private note
              .delete('/:id', async (ctx) => {
                try {
                  const typedCtx = ctx as unknown as ClerkContext & {
                    params: { id: string }
                  }
                  const authData = typedCtx.auth()
                  const { id } = typedCtx.params
                  const noteId = Number(id)

                  if (Number.isNaN(noteId)) {
                    return new Response('Invalid note ID', { status: 400 })
                  }

                  // Find the user using the users model
                  const _user = await this.usersModel.findOrCreateByClerkId(
                    typedCtx.db,
                    authData.userId,
                    typedCtx.clerk
                  )

                  // Delete the note
                  const result = await this.notesModel.delete(typedCtx.db, noteId)
                  if (!result.success) {
                    return new Response('Note not found', { status: 404 })
                  }

                  return {
                    success: true,
                    message: 'Note deleted successfully',
                  }
                } catch (_error) {
                  return new Response('Error deleting note', { status: 500 })
                }
              })
        )

      return app
    })
  }

  /**
   * Override isAuthorized to ensure proper authorization
   */
  protected override async isAuthorized(
    userId: string | null,
    _resourceId: string | number
  ): Promise<boolean> {
    // Private notes require authentication
    return userId !== null
  }
}

// Export an instance to use in other modules
export const privateNotesController = new PrivateNotesController().init()
