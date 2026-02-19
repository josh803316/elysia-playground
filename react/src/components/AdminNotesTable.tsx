import { useState } from "react";
import { Text, Paper, Alert } from "@mantine/core";
import { getApiBase } from "../api/client";

export interface AdminNote {
  id: string;
  title: string;
  content: string;
  userId: string | null;
  isPublic: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
}

function getUserDisplayName(note: AdminNote): string {
  if (note.user) {
    if (note.user.firstName) {
      const name = `${note.user.firstName} ${note.user.lastName || ""}`.trim();
      return name;
    }
    if (note.user.email) return note.user.email;
  }
  if (note.userId) return `User #${note.userId}`;
  return "Anonymous";
}

interface AdminNotesTableProps {
  notes: AdminNote[];
  loading: boolean;
  error: string | null;
  adminApiKey: string | null;
  onRefetch: () => void;
  onCreateClick?: () => void;
  showCreateButton?: boolean;
  "data-testid"?: string;
}

export function AdminNotesTable({
  notes,
  loading,
  error,
  adminApiKey,
  onRefetch,
  "data-testid": dataTestId,
}: AdminNotesTableProps) {
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleAdminDelete = async (noteId: string) => {
    if (!adminApiKey) return;
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      setDeleteError(null);
      const base = getApiBase();
      const url = base
        ? `${base}/api/notes/${noteId}/admin`
        : `/api/notes/${noteId}/admin`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "X-API-Key": adminApiKey },
      });
      if (!response.ok) throw new Error(`Failed to delete note: ${response.status}`);
      onRefetch();
    } catch (err) {
      console.error("Error deleting note as admin:", err);
      setDeleteError(err instanceof Error ? err.message : "Failed to delete note");
    }
  };

  return (
    <Paper
      style={{ padding: "1.5rem", borderColor: "#e5e7eb" }}
      withBorder
      shadow="sm"
      data-testid={dataTestId ?? "admin-notes-table"}
    >
      {/* Section header - always visible */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Text size="xl" fw={700} c="dark">All Notes (Admin View)</Text>
        <Text size="sm" c="dimmed">View and manage all notes in the system</Text>
      </div>

      {(error || deleteError) && (
        <Alert color="red" mb="md">
          {error || deleteError}
        </Alert>
      )}

      {loading ? (
        <Text c="dimmed" ta="center" py="xl">Loading notes...</Text>
      ) : notes.length === 0 ? (
        <Text c="dimmed" ta="center" py="xl" fs="italic">No notes found in the system</Text>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.875rem",
            }}
          >
            <thead style={{ background: "#f3f4f6" }}>
              <tr>
                {["Title", "Content Preview", "Status", "Author", "Created", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0.75rem 1rem",
                        fontWeight: 600,
                        color: "#374151",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr
                  key={note.id}
                  style={{ borderTop: "1px solid #e5e7eb" }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = "#f9fafb";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = "";
                  }}
                >
                  <td style={{ padding: "0.75rem 1rem", color: "#374151" }}>
                    {note.title || "Untitled"}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "#374151",
                      maxWidth: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {note.content
                      ? note.content.length > 60
                        ? `${note.content.substring(0, 60)}…`
                        : note.content
                      : "(No content)"}
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        padding: "0.125rem 0.5rem",
                        borderRadius: 999,
                        background: note.isPublic === "true" ? "#dcfce7" : "#ede9fe",
                        color: note.isPublic === "true" ? "#15803d" : "#7c3aed",
                      }}
                    >
                      {note.isPublic === "true" ? "Public" : "Private"}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "#374151" }}>
                    {getUserDisplayName(note)}
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "#374151" }}>
                    {formatDate(note.createdAt)}
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button
                        type="button"
                        onClick={() => handleAdminDelete(note.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#dc2626",
                          padding: 0,
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "#b91c1c";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = "#dc2626";
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Paper>
  );
}
