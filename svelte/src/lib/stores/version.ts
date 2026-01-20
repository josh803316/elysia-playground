import { writable } from "svelte/store";
import apiClient from "../api/client";

interface VersionState {
  version: string | null;
  loading: boolean;
  error: Error | null;
}

function createVersionStore() {
  const { subscribe, set } = writable<VersionState>({
    version: null,
    loading: false,
    error: null,
  });

  return {
    subscribe,
    fetchVersion: async () => {
      set({ version: null, loading: true, error: null });
      try {
        const response = await apiClient.versions.get();
        set({ version: response.data.version, loading: false, error: null });
      } catch (err) {
        set({
          version: null,
          loading: false,
          error:
            err instanceof Error ? err : new Error("Failed to fetch version"),
        });
      }
    },
  };
}

export const versionStore = createVersionStore();
