import { writable } from "svelte/store";
import apiClient from "../api/client";

export interface VersionsResponse {
  version: string;
  name: string;
  environment: string;
  commitSha: string | null;
  timestamp: string;
  elysia: string | null;
  frameworks: Record<
    string,
    { name: string; version: string; dependencies: Record<string, string> }
  >;
}

interface VersionState {
  data: VersionsResponse | null;
  loading: boolean;
  error: Error | null;
}

function createVersionStore() {
  const { subscribe, set } = writable<VersionState>({
    data: null,
    loading: false,
    error: null,
  });

  return {
    subscribe,
    fetchVersion: async () => {
      set({ data: null, loading: true, error: null });
      try {
        const response = await apiClient.versions.get();
        set({ data: response.data, loading: false, error: null });
      } catch (err) {
        set({
          data: null,
          loading: false,
          error:
            err instanceof Error ? err : new Error("Failed to fetch version"),
        });
      }
    },
  };
}

export const versionStore = createVersionStore();
