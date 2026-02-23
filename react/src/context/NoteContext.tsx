/**
 * Lightweight context to signal "notes list should refetch". Children call triggerRefresh()
 * after create/update/delete so any useNotes() (or similar) can depend on refreshTrigger
 * and refetch. Avoids prop-drilling and keeps refresh logic in one place.
 */
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface NoteContextType {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <NoteContext.Provider value={{ refreshTrigger, triggerRefresh }}>
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
