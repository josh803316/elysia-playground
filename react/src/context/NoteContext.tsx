import React, { createContext, useContext, useState, ReactNode } from "react";

interface NoteContextType {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <NoteContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = (): NoteContextType => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNoteContext must be used within a NoteProvider");
  }
  return context;
};
