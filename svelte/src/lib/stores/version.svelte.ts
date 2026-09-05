import apiClient from '../api/client'

export interface VersionsResponse {
  version: string
  name: string
  environment: string
  commitSha: string | null
  timestamp: string
  elysia: string | null
  frameworks: Record<
    string,
    { name: string; version: string; dependencies: Record<string, string> }
  >
  config?: {
    packageManager?: string
    engines?: Record<string, string>
    overrides?: Record<string, string>
  }
  rootDependencies?: {
    dependencies: Record<string, string>
    devDependencies: Record<string, string>
  }
  workspaces?: Record<
    string,
    {
      name: string
      version: string
      dependencies: Record<string, string>
      devDependencies: Record<string, string>
    }
  >
}

// `.svelte.ts` is required so `$state` compiles outside components.
class VersionStore {
  data = $state<VersionsResponse | null>(null)
  loading = $state(false)
  error = $state<Error | null>(null)

  async fetchVersion() {
    this.data = null
    this.loading = true
    this.error = null
    try {
      const response = await apiClient.versions.get()
      this.data = response.data
      this.loading = false
      this.error = null
    } catch (err) {
      this.data = null
      this.loading = false
      this.error = err instanceof Error ? err : new Error('Failed to fetch version')
    }
  }
}

export const versionStore = new VersionStore()
