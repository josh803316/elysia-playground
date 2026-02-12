import { useState } from "react";
import {
  Text,
  Paper,
  Table,
  Badge,
  ActionIcon,
  Tooltip,
  Modal,
  Stack,
  Group,
  Button,
  Alert,
} from "@mantine/core";
import { IconEdit, IconTrash, IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
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
    return (
      date.toLocaleDateString() +
      ", " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  } catch {
    return "Invalid Date";
  }
}

function getUserDisplayName(note: AdminNote): string {
  if (note.user) {
    if (note.user.email) return note.user.email;
    const name = `${note.user.firstName || ""} ${note.user.lastName || ""}`.trim();
    return name || "Unknown User";
  }
  if (note.userId) return `User #${note.userId}`;
  return note.userId ? "User" : "Anonymous";
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
  onCreateClick,
  showCreateButton = false,
  "data-testid": dataTestId,
}: AdminNotesTableProps) {
  const navigate = useNavigate();
  const [viewingNote, setViewingNote] = useState<AdminNote | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleAdminDelete = async (noteId: string) => {
    if (!adminApiKey) return;
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const base = getApiBase();
      const url = base ? `${base}/api/notes/${noteId}/admin` : `/api/notes/${noteId}/admin`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "X-API-Key": adminApiKey },
      });
      if (!response.ok) throw new Error(`Failed to delete note: ${response.status}`);
      onRefetch();
    } catch (err) {
      console.error("Error deleting note as admin:", err);
    }
  };

  const handleViewNote = (note: AdminNote) => {
    setViewingNote(note);
    setViewModalOpen(true);
  };

  return (
    <>
      <Paper p="md" withBorder shadow="sm" data-testid={dataTestId ?? "admin-notes-table"}>
        {showCreateButton && onCreateClick && (
          <Group justify="space-between" mb="md">
            <div>
              <Text size="lg" fw={700}>All Notes (Admin View)</Text>
              <Text size="sm" c="dimmed">View and manage all notes in the system</Text>
            </div>
            <Button leftSection={<span>+</span>} onClick={onCreateClick}>
              Create New Note
            </Button>
          </Group>
        )}
        {error && (
          <Alert color="red" mb="md" title="Error">
            {error}
          </Alert>
        )}
        {loading ? (
          <Text>Loading notes...</Text>
        ) : (
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Content Preview</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Author</Table.Th>
                <Table.Th>Created</Table.Th>
                <Table.Th>Updated</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {notes.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={7} style={{ textAlign: "center" }}>
                    No notes found in the system
                  </Table.Td>
                </Table.Tr>
              ) : (
                notes.map((note) => (
                  <Table.Tr key={note.id}>
                    <Table.Td>{note.title || "Untitled"}</Table.Td>
                    <Table.Td>
                      {note.content
                        ? note.content.length > 50
                          ? `${note.content.substring(0, 50)}...`
                          : note.content
                        : "(No content)"}
                    </Table.Td>
                    <Table.Td>
                      <Badge color={note.isPublic === "true" ? "green" : "blue"}>
                        {note.isPublic === "true" ? "Public" : "Private"}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{getUserDisplayName(note)}</Table.Td>
                    <Table.Td>{formatDate(note.createdAt)}</Table.Td>
                    <Table.Td>{formatDate(note.updatedAt)}</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip label="View">
                          <ActionIcon
                            color="blue"
                            onClick={() => handleViewNote(note)}
                            variant="subtle"
                          >
                            <IconEye size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Edit">
                          <ActionIcon
                            color="green"
                            onClick={() => {
                              localStorage.setItem(
                                "editingNote",
                                JSON.stringify({
                                  id: note.id,
                                  title: note.title,
                                  content: note.content,
                                  isPublic: note.isPublic,
                                })
                              );
                              navigate(`/notes/${note.id}/edit`);
                            }}
                            variant="subtle"
                          >
                            <IconEdit size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Delete">
                          <ActionIcon
                            color="red"
                            onClick={() => handleAdminDelete(note.id)}
                            variant="subtle"
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        )}
      </Paper>

      <Modal
        opened={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title={viewingNote?.title || "Note Details"}
        size="lg"
        centered
        zIndex={1000}
        overlayProps={{ blur: 3 }}
      >
        {viewingNote && (
          <Stack>
            <Group>
              <Badge color={viewingNote.isPublic === "true" ? "green" : "blue"}>
                {viewingNote.isPublic === "true" ? "Public" : "Private"}
              </Badge>
              <Text size="sm" c="dimmed">
                Author: {getUserDisplayName(viewingNote)}
              </Text>
            </Group>
            <Text>{viewingNote.content}</Text>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Created: {formatDate(viewingNote.createdAt)}
              </Text>
              <Text size="sm" c="dimmed">
                Updated: {formatDate(viewingNote.updatedAt)}
              </Text>
            </Group>
            <Group justify="flex-end" mt="md">
              <Button color="blue" onClick={() => setViewModalOpen(false)}>
                Close
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </>
  );
}
