import apiClient from '../api/client'

export interface Note {
  id: number
  title: string
  content: string
  isPublic: boolean
  userId: string | null
  createdAt: string
  updatedAt: string
  user?: {
    firstName?: string
    lastName?: string
    email?: string
  }
}

// `.svelte.ts` is required so `$state` compiles outside components.
class NotesStore {
  notes = $state<Note[] | null>(null)
  loading = $state(false)
  error = $state<Error | null>(null)
  initialized = $state(false)

  async fetchNotes(token?: string) {
    this.loading = true
    try {
      if (!token) {
        throw new Error('No authentication token available')
      }
      const response = (await apiClient.notes.getAll(token)) as {
        data: Note[]
      }
      this.notes = response.data
      this.loading = false
      this.error = null
      this.initialized = true
    } catch (err) {
      this.notes = null
      this.loading = false
      this.error = err instanceof Error ? err : new Error('Failed to fetch notes')
      this.initialized = true
    }
  }

  async createNote(data: { title: string; content: string; isPublic?: boolean }, token?: string) {
    try {
      if (data.isPublic && !token) {
        await apiClient.publicNotes.create({ title: data.title, content: data.content })
        return
      }

      if (!token) {
        throw new Error('No authentication token available')
      }
      await apiClient.notes.create(data, token)
      await this.fetchNotes(token)
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create note')
    }
  }

  async updateNote(
    id: number,
    data: { title?: string; content?: string; isPublic?: boolean },
    token?: string
  ) {
    try {
      if (!token) {
        throw new Error('No authentication token available')
      }
      await apiClient.notes.update(id, data, token)
      await this.fetchNotes(token)
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update note')
    }
  }

  async deleteNote(id: number, token?: string) {
    try {
      if (!token) {
        throw new Error('No authentication token available')
      }
      await apiClient.notes.delete(id, token)
      await this.fetchNotes(token)
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete note')
    }
  }
}

export const notesStore = new NotesStore()
