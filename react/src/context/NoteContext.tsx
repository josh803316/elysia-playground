/**
 * Lightweight context to signal "notes list should refetch" and global search state.
 * Children call triggerRefresh() after create/update/delete. GlobalSearch sets search
 * query/results; notes views filter by search when active.
 */
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface SearchNote {
  id: number;
  title: string;
  content: string;
  isPublic: string;
  userId?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

interface NoteContextType {
  refreshTrigger: number;
  triggerRefresh: () => void;
  searchQuery: string;
  searchResults: SearchNote[];
  setSearch: (query: string, results: SearchNote[]) => void;
  clearSearch: () => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchNote[]>([]);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const setSearch = useCallback((query: string, results: SearchNote[]) => {
    setSearchQuery(query);
    setSearchResults(results);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  return (
    <NoteContext.Provider
      value={{
        refreshTrigger,
        triggerRefresh,
        searchQuery,
        searchResults,
        setSearch,
        clearSearch,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

/** Throws if used outside NoteProvider so misuse fails fast. */
export const useNoteContext = (): NoteContextType => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNoteContext must be used within a NoteProvider");
  }
  return context;
};
