import { useState, useEffect } from "react";
import { useNotes } from "../hooks/useNotes";
import { useAuth } from "../hooks/useAuth";
import { NoteForm } from "../components/NoteForm";
import NoteList from "../components/NoteList";
import {
  Title,
  Text,
  Paper,
  Button,
  Group,
  Stack,
  Alert,
  Table,
  Badge,
  ActionIcon,
  Tooltip,
  Modal,
} from "@mantine/core";
import { IconPlus, IconEdit, IconTrash, IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useNoteContext } from "../context/NoteContext";

interface Note {
  id: string;
  title: string;
  content: string;
  userId: string | null;
  isPublic: string;
  createdAt: string;
  updatedAt: string;
  // Optional user information that might be included for admin view
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

export const NotesPage = () => {
  const { notes, deleteNote, isLoading, error } = useNotes();
  const { isSignedIn } = useAuth();
  const { triggerRefresh } = useNoteContext();
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const navigate = useNavigate();

  // Admin state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminApiKey, setAdminApiKey] = useState<string | null>(null);
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);

  // State for admin note view
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // Check if user is logged in as admin
  useEffect(() => {
    const storedApiKey = localStorage.getItem("adminApiKey");
    if (storedApiKey) {
      setAdminApiKey(storedApiKey);
      setIsAdminLoggedIn(true);
      fetchAllNotes(storedApiKey);
    }
  }, []);

  // Fetch all notes if admin is logged in
  const fetchAllNotes = async (apiKey: string) => {
    if (!apiKey) return;

    try {
      setAdminLoading(true);
      console.log("Admin: Fetching all notes for All Notes page");

      const response = await fetch("/api/notes/all", {
        headers: {
          "X-API-Key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Admin request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Admin: Retrieved notes for All Notes page:", data.length);
      console.log("Raw data structure:", data);
      if (data.length > 0) {
        console.log("First note structure:", data[0]);
      }
      setAllNotes(data);
    } catch (err) {
      console.error("Error fetching all notes as admin:", err);
      setAdminError("Failed to load all notes. Admin access may be invalid.");
    } finally {
      setAdminLoading(false);
    }
  };

  // Delete note as admin
  const handleAdminDelete = async (noteId: string) => {
    if (!adminApiKey) return;

    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      const response = await fetch(`/api/notes/${noteId}/admin`, {
        method: "DELETE",
        headers: {
          "X-API-Key": adminApiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.status}`);
      }

      // Refetch all notes
      fetchAllNotes(adminApiKey);
    } catch (err) {
      console.error("Error deleting note as admin:", err);
      setAdminError("Failed to delete note");
    }
  };

  const handleDelete = (id: number) => {
    deleteNote(id);
    triggerRefresh();

    // If admin is logged in, refresh admin notes too
    if (isAdminLoggedIn && adminApiKey) {
      fetchAllNotes(adminApiKey);
    }
  };

  const handleEdit = (id: number) => {
    setEditingNote(id);
  };

  // Handle view note
  const handleViewNote = (note: Note) => {
    setViewingNote(note);
    setViewModalOpen(true);
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }

      return (
        date.toLocaleDateString() +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    } catch (err) {
      console.error("Error formatting date:", dateString, err);
      return "Invalid Date";
    }
  };

  // Get user display name
  const getUserDisplayName = (note: Note) => {
    if (note.user) {
      // If we have user details, show email or name
      if (note.user.email) {
        return note.user.email;
      }
      return (
        `${note.user.firstName || ""} ${note.user.lastName || ""}`.trim() ||
        "Unknown User"
      );
    }

    // If only userId is available (no user object)
    if (note.userId) {
      return `User #${note.userId}`;
    }

    return note.userId ? "User" : "Anonymous";
  };

  if (!isSignedIn) {
    return (
      <Layout>
        <Paper p="md" withBorder>
          <Text>Please sign in to view your notes.</Text>
        </Paper>
      </Layout>
    );
  }

  if (!isAdminLoggedIn && isLoading) {
    return (
      <Layout>
        <Paper p="md" withBorder>
          <Text>Loading notes...</Text>
        </Paper>
      </Layout>
    );
  }

  if (!isAdminLoggedIn && error) {
    return (
      <Layout>
        <Paper p="md" withBorder>
          <Text c="red">Error: {error.message}</Text>
        </Paper>
      </Layout>
    );
  }

  const currentNote =
    editingNote && notes
      ? notes.find((note) => note.id === editingNote)
      : undefined;

  // Admin view - show all notes in a table
  if (isAdminLoggedIn) {
    return (
      <Layout>
        <Stack>
          <Paper p="md" withBorder shadow="sm">
            <Group justify="space-between" mb="md">
              <Title order={1}>All Notes (Admin View)</Title>
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={() => navigate("/notes/new")}
              >
                Create New Note
              </Button>
            </Group>
            {adminError && (
              <Alert color="red" mb="md" title="Error">
                {adminError}
              </Alert>
            )}
          </Paper>

          <Paper p="md" withBorder shadow="sm">
            {adminLoading ? (
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
                  {allNotes.length === 0 ? (
                    <Table.Tr>
                      <Table.Td colSpan={7} style={{ textAlign: "center" }}>
                        No notes found in the system
                      </Table.Td>
                    </Table.Tr>
                  ) : (
                    allNotes.map((note) => (
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
                          <Badge
                            color={note.isPublic === "true" ? "green" : "blue"}
                          >
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
                                  // Let's setup a clean state and navigate to edit page
                                  // Store the note data in localStorage to be accessed by the form
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

          {/* Note View Modal */}
          <Modal
            opened={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title={viewingNote?.title || "Note Details"}
            size="lg"
            centered={true}
            zIndex={1000}
            overlayProps={{ blur: 3 }}
          >
            {viewingNote && (
              <Stack>
                <Group>
                  <Badge
                    color={viewingNote.isPublic === "true" ? "green" : "blue"}
                  >
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
        </Stack>
      </Layout>
    );
  }

  // Regular user view - show only their notes
  return (
    <Layout>
      <Stack>
        <Paper p="md" withBorder shadow="sm">
          <Group justify="space-between" mb="md">
            <Title order={1}>My Notes</Title>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={() => navigate("/notes/new")}
            >
              Create New Note
            </Button>
          </Group>
        </Paper>
        <Paper p="md" withBorder shadow="sm">
          {currentNote ? (
            <NoteForm
              initialValues={{
                title: currentNote.title,
                content: currentNote.content,
                isPublic:
                  typeof currentNote.isPublic === "string"
                    ? currentNote.isPublic === "true"
                    : (currentNote.isPublic ?? false),
              }}
              onSubmitSuccess={() => setEditingNote(null)}
            />
          ) : (
            notes && (
              <NoteList
                notes={notes}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )
          )}
        </Paper>
      </Stack>
    </Layout>
  );
};
