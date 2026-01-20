import { useState, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
import apiClient from "../api/client";

// Generic type for API response
type ApiResponse<T> = {
  data: T | null;
  error: Error | string | null;
};

// Generic type for API functions
type ApiFunction<T, P extends unknown[]> = (
  ...params: P
) => Promise<ApiResponse<T>>;

// Helper function to wrap API calls in the ApiResponse format
function wrapApiCall<T, P extends unknown[]>(
  fn: (...args: P) => Promise<T>
): (...args: P) => Promise<ApiResponse<T>> {
  return async (...args: P) => {
    try {
      const response = await fn(...args);
      return { data: response, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
    }
  };
}

// Hook for handling API calls
export function useApi<T, P extends unknown[]>(apiFunc: ApiFunction<T, P>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { getToken } = useAuth();

  // Execute the API call with the given parameters
  const execute = useCallback(
    async (...params: P) => {
      setLoading(true);
      setError(null);

      try {
        // Get the auth token from Clerk
        const token = await getToken();

        // Add token as the last parameter if the API function accepts it
        const authParams = [...params] as unknown[];
        if (typeof apiFunc === "function" && apiFunc.length > params.length) {
          authParams.push(token);
        }

        const response = await apiFunc(...(authParams as P));

        if (response.error) {
          setError(response.error);
          setData(null);
        } else {
          setData(response.data);
        }

        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err : String(err);
        setError(errorMessage);
        setData(null);
        return { data: null, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [apiFunc, getToken]
  );

  return {
    data,
    error,
    loading,
    execute,
  };
}

// Custom hooks for different API endpoints
export function useGetAllNotes() {
  const { getToken } = useAuth();
  return useApi(
    wrapApiCall(async () => {
      const token = await getToken();
      return apiClient.notes.getAll(token || undefined);
    })
  );
}

export function useGetUserNotes() {
  const { getToken } = useAuth();
  return useApi(
    wrapApiCall(async () => {
      const token = await getToken();
      return apiClient.notes.getUserNotes(token || undefined);
    })
  );
}

export function useGetNoteById() {
  const { getToken } = useAuth();
  return useApi(
    wrapApiCall(async (id: number) => {
      const token = await getToken();
      return apiClient.notes.getById(id, token || undefined);
    })
  );
}

export function useCreateNote() {
  const { getToken } = useAuth();
  return useApi(
    wrapApiCall(
      async (note: {
        title: string;
        content: string;
        isPublic?: string | boolean;
      }) => {
        const token = await getToken();
        return apiClient.notes.create(note, token || undefined);
      }
    )
  );
}

export function useUpdateNote() {
  const { getToken } = useAuth();
  return useApi(
    wrapApiCall(
      async (
        id: number,
        note: { title?: string; content?: string; isPublic?: string | boolean }
      ) => {
        const token = await getToken();
        return apiClient.notes.update(id, note, token || undefined);
      }
    )
  );
}

export function useDeleteNote() {
  const { getToken } = useAuth();
  return useApi(
    wrapApiCall(async (id: number) => {
      const token = await getToken();
      return apiClient.notes.delete(id, token || undefined);
    })
  );
}

export function useGetAllPrivateNotes() {
  const { getToken } = useAuth();
  return useApi(
    wrapApiCall(async () => {
      const token = await getToken();
      return apiClient.privateNotes.getAll(token || undefined);
    })
  );
}

export function useGetPrivateNoteById() {
  const { getToken } = useAuth();
  return useApi(
    wrapApiCall(async (id: number) => {
      const token = await getToken();
      return apiClient.privateNotes.getById(id, token || undefined);
    })
  );
}

export function useCreatePrivateNote() {
  const { getToken } = useAuth();
  return useApi(
    wrapApiCall(async (note: { title: string; content: string }) => {
      const token = await getToken();
      return apiClient.privateNotes.create(note, token || undefined);
    })
  );
}

export function useUpdatePrivateNote() {
  const { getToken } = useAuth();
  return useApi(
    wrapApiCall(
      async (id: number, note: { title?: string; content?: string }) => {
        const token = await getToken();
        return apiClient.privateNotes.update(id, note, token || undefined);
      }
    )
  );
}

export function useDeletePrivateNote() {
  const { getToken } = useAuth();
  return useApi(
    wrapApiCall(async (id: number) => {
      const token = await getToken();
      return apiClient.privateNotes.delete(id, token || undefined);
    })
  );
}

export function useGetAllPublicNotes() {
  return useApi(wrapApiCall(apiClient.publicNotes.getAll));
}

export function useGetPublicNoteById() {
  return useApi(wrapApiCall(apiClient.publicNotes.getById));
}

export default useApi;
