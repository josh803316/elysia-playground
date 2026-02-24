import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Text, Alert } from "@mantine/core";
import EditNoteModal from "./EditNoteModal";

interface Note {
  id: string;
  title: string;
  content: string;
  userId: string | null;
  isPublic: boolean | string;
  createdAt: string;
  updatedAt: string;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

interface NotesGridProps {
  notes: Note[];
  emptyMessage: string;
  showUser?: boolean;
  onNoteDeleted?: () => void;
  onNoteUpdated?: () => void;
  isAdmin?: boolean;
  currentUserNotes?: string[];
}

const NotesGrid = ({
  notes,
  emptyMessage,
  showUser = false,
  onNoteDeleted,
  onNoteUpdated,
  isAdmin = false,
  currentUserNotes = [],
}: NotesGridProps) => {
  const { getToken } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  if (notes.length === 0) {
    return (
      <Text fs="italic" c="dimmed" ta="center" mt="xl">
        {emptyMessage}
      </Text>
    );
  }

  const handleDelete = async (note: Note) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setDeletingId(note.id);
    setError(null);

    try {
      let response;
      const token = isAdmin
        ? localStorage.getItem("adminApiKey") || ""
        : await getToken();

      if (isAdmin && !token) {
        setError("Admin API key not found. Please login again.");
        setDeletingId(null);
        return;
      }

      if (isAdmin) {
        response = await fetch(`/api/notes/${note.id}/admin`, {
          method: "DELETE",
          headers: { "X-API-Key": token as string },
        });
      } else if ((note.isPublic === "true" || note.isPublic === true) && !note.userId) {
        response = await fetch(`/api/public-notes/${note.id}`, {
          method: "DELETE",
        });
      } else {
        response = await fetch(`/api/notes/${note.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete note");
      }

      if (onNoteDeleted) onNoteDeleted();
    } catch (err) {
      console.error("Error deleting note:", err);
      setError(err instanceof Error ? err.message : "Failed to delete note");
    } finally {
      setDeletingId(null);
    }
  };

  const canEditNote = (note: Note) => {
    if (isAdmin) return true;
    // All public notes are community-editable (matches HTMX behavior)
    const noteIsPublic =
      typeof note.isPublic === "string" ? note.isPublic === "true" : note.isPublic;
    if (noteIsPublic) return true;
    // Private notes: user must own them
    if (!showUser) return true;
    try {
      const ids = JSON.parse(localStorage.getItem("userNoteIds") || "[]");
      if (ids.includes(note.id)) return true;
    } catch {}
    if (currentUserNotes.includes(note.id)) return true;
    return false;
  };

  const getAuthorName = (note: Note): string => {
    if (showUser && note.user) {
      if (note.user.firstName)
        return `${note.user.firstName} ${note.user.lastName || ""}`.trim();
      if (note.user.email) return note.user.email;
    }
    if (!showUser) return "you";
    try {
      const ids = JSON.parse(localStorage.getItem("userNoteIds") || "[]");
      if (ids.includes(note.id)) return "you";
    } catch {}
    if (currentUserNotes.includes(note.id)) return "you";
    if (!note.userId) return "Anonymous";
    return "a user";
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <>
      {error && (
        <Alert color="red" mb="md" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {notes.map((note) => {
          const noteIsPublic =
            typeof note.isPublic === "string"
              ? note.isPublic === "true"
              : note.isPublic;
          const authorName = getAuthorName(note);
          const canEdit = canEditNote(note);

          return (
            <div
              key={note.id}
              style={{
                background: "white",
                borderRadius: "0.5rem",
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.15s",
                ...(!noteIsPublic && !isAdmin
                  ? { borderLeft: "4px solid #a855f7" }
                  : {}),
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
              }}
            >
              {/* Card body */}
              <div style={{ padding: "1.25rem", flex: 1 }}>
                {/* Title + badge */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.75rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#111827",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical" as const,
                      marginRight: "0.5rem",
                      flex: 1,
                      margin: "0 0.5rem 0 0",
                    }}
                  >
                    {note.title}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      padding: "0.125rem 0.5rem",
                      borderRadius: 999,
                      flexShrink: 0,
                      background: noteIsPublic ? "#dcfce7" : "#f3e8ff",
                      color: noteIsPublic ? "#15803d" : "#7e22ce",
                    }}
                  >
                    {noteIsPublic ? "Public" : "Private"}
                  </span>
                </div>

                {/* Content */}
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#4b5563",
                    marginBottom: "1rem",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical" as const,
                    margin: "0 0 1rem 0",
                  }}
                >
                  {note.content}
                </p>

                {/* Author + date meta */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.75rem",
                    color: "#6b7280",
                  }}
                >
                  <span>By {authorName}</span>
                  <span>{formatDate(note.createdAt)}</span>
                </div>
              </div>

              {/* Card footer: Edit | Delete */}
              {canEdit && (
                <div
                  style={{
                    borderTop: "1px solid #f3f4f6",
                    background: "#f9fafb",
                    padding: "0.75rem 1.25rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "0.75rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setEditingNote(note)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#0d9488",
                      padding: 0,
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#0f766e";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#0d9488";
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(note)}
                    disabled={deletingId === note.id}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: deletingId === note.id ? "wait" : "pointer",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#dc2626",
                      padding: 0,
                    }}
                    onMouseOver={(e) => {
                      if (deletingId !== note.id)
                        e.currentTarget.style.color = "#b91c1c";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#dc2626";
                    }}
                  >
                    {deletingId === note.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {editingNote && (
        <EditNoteModal
          note={{
            ...editingNote,
            isPublic:
              typeof editingNote.isPublic === "string"
                ? editingNote.isPublic
                : editingNote.isPublic
                  ? "true"
                  : "false",
          }}
          isOpen={!!editingNote}
          onClose={() => setEditingNote(null)}
          onSuccess={() => {
            setEditingNote(null);
            if (onNoteUpdated) onNoteUpdated();
          }}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
};

export default NotesGrid;
