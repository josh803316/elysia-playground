export interface SearchNote {
  id: number | string
  title: string
  content: string
  isPublic: string | boolean
  userId?: number | string | null
  createdAt?: string
  updatedAt?: string
  user?: {
    id?: string
    email?: string
    firstName?: string
    lastName?: string
  }
}

// `.svelte.ts` is required so `$state` compiles outside components.
class SearchStore {
  query = $state('')
  results = $state<SearchNote[]>([])

  setSearch(query: string, results: SearchNote[]) {
    this.query = query
    this.results = results
  }

  clearSearch() {
    this.query = ''
    this.results = []
  }
}

export const searchStore = new SearchStore()
