import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  Grid,
  Card,
  Text,
  Group,
  Badge,
  Button,
  Title,
  Flex,
  Divider,
  Stack,
  Alert,
  TextInput,
  Textarea,
  Checkbox,
  ActionIcon,
} from "@mantine/core";
import { IconEdit, IconCheck, IconX } from "@tabler/icons-react";
import EditNoteModal from "./EditNoteModal";

interface Note {
  id: string;
  title: string;
  content: string;
  userId: string | null;
  isPublic: boolean | string;
  createdAt: string;
  updatedAt: string;
  // Optional user information that might be included for admin view
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
  currentUserNotes?: string[]; // IDs of notes owned by the current user
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
  const [editInPlaceId, setEditInPlaceId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<{
    title: string;
    content: string;
    isPublic: boolean;
  }>({
    title: "",
    content: "",
    isPublic: false,
  });

  if (notes.length === 0) {
    return (
      <Text fs="italic" c="dimmed" ta="center" mt="xl">
        {emptyMessage}
      </Text>
    );
  }

  const handleDelete = async (note: Note) => {
    if (!window.confirm(`Are you sure you want to delete this note?`)) {
      return;
    }

    setDeletingId(note.id);
    setError(null);

    try {
      let response;

      // Get either auth token or admin API key depending on user type
      const token = isAdmin
        ? localStorage.getItem("adminApiKey") || ""
        : await getToken();

      if (isAdmin && !token) {
        setError("Admin API key not found. Please login again.");
        setDeletingId(null);
        return;
      }

      // For admin users, always use the X-API-Key header
      if (isAdmin) {
        response = await fetch(`/api/notes/${note.id}/admin`, {
          method: "DELETE",
          headers: { "X-API-Key": token as string },
        });
      } else {
        // Choose endpoint based on note type, not user status
        if (note.isPublic === "true" && !note.userId) {
          // Public anonymous notes use the public-notes endpoint
          response = await fetch(`/api/public-notes/${note.id}`, {
            method: "DELETE",
            headers: {},
          });
        } else {
          // User's own notes use the notes endpoint with auth
          response = await fetch(`/api/notes/${note.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete note");
      }

      if (onNoteDeleted) {
        onNoteDeleted();
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      setError(err instanceof Error ? err.message : "Failed to delete note");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditClick = (note: Note) => {
    if (note.id === editInPlaceId) {
      return; // Already editing this note
    }

    // Set up in-place editing
    setEditInPlaceId(note.id);
    setEditFormData({
      title: note.title,
      content: note.content,
      isPublic:
        typeof note.isPublic === "string"
          ? note.isPublic === "true"
          : (note.isPublic ?? false),
    });
  };

  const handleEditCancel = () => {
    setEditInPlaceId(null);
  };

  const handleEditSave = async (noteId: string) => {
    try {
      setError(null);
      const token = isAdmin
        ? localStorage.getItem("adminApiKey") || ""
        : await getToken();

      if (isAdmin && !token) {
        setError("Admin API key not found. Please login again.");
        return;
      }

      let url = `/api/notes/${noteId}`;
      let headers: Record<string, string> = {};

      if (isAdmin) {
        url = `/api/notes/${noteId}/admin`;
        headers = { "X-API-Key": token as string };
      } else {
        headers = { Authorization: `Bearer ${token}` };
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          title: editFormData.title,
          content: editFormData.content,
          isPublic: editFormData.isPublic,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update note");
      }

      setEditInPlaceId(null);
      if (onNoteUpdated) {
        onNoteUpdated();
      }
    } catch (err) {
      console.error("Error updating note:", err);
      setError(err instanceof Error ? err.message : "Failed to update note");
    }
  };

  const handleEditSuccess = () => {
    if (onNoteUpdated) {
      onNoteUpdated();
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setEditFormData((prev) => ({
      ...prev,
      isPublic: checked,
    }));
  };

  // Helper to determine author display
  const getAuthorDisplay = (note: Note) => {
    // For admin view, show user details from the API
    if (showUser && note.user) {
      return (
        <>
          <Text size="sm" c="dimmed">
            By: {note.user.firstName} {note.user.lastName}{" "}
            {note.user.email && `(${note.user.email})`}
          </Text>
        </>
      );
    }

    // For public notes with titles that indicate the author
    if (
      showUser &&
      note.isPublic === "true" &&
      note.title.includes("'s Note")
    ) {
      const authorName = note.title.replace("'s Note", "");
      return (
        <Text size="sm" c="dimmed">
          Posted by {authorName}
        </Text>
      );
    }

    // If the logged-in user is the author of the note (has userId), should show "Posted by you"
    // regardless of whether it's public or private
    if (note.userId && note.userId === localStorage.getItem("currentUserId")) {
      return (
        <Text size="sm" c="blue">
          Posted by you
        </Text>
      );
    }

    // If in private notes section (showUser=false), we know it's the user's note
    if (!showUser) {
      return (
        <Text size="sm" c="blue">
          Posted by you
        </Text>
      );
    }

    // Check if this note's ID is in the localStorage userNoteIds
    const storedIds = localStorage.getItem("userNoteIds");
    if (storedIds) {
      try {
        const userIds = JSON.parse(storedIds);
        if (userIds.includes(note.id)) {
          return (
            <Text size="sm" c="blue">
              Posted by you
            </Text>
          );
        }
      } catch (e) {
        console.error("Error parsing user note IDs:", e);
      }
    }

    // Check if note is in the explicitly passed currentUserNotes list
    if (currentUserNotes.includes(note.id)) {
      return (
        <Text size="sm" c="blue">
          Posted by you
        </Text>
      );
    }

    // If the note has a userId (but not the current user's), fetch user email if possible
    if (note.userId) {
      // If we have user info
      if (note.user && note.user.email) {
        return (
          <Text size="sm" c="dimmed">
            Posted by {note.user.email}
          </Text>
        );
      }

      return (
        <Text size="sm" c="dimmed">
          Posted by user #{note.userId}
        </Text>
      );
    }

    // Anonymous notes (no userId)
    if (!note.userId) {
      return (
        <Text size="sm" c="dimmed">
          Posted anonymously
        </Text>
      );
    }

    // Look for name information in the note title or content
    // Test pattern: Try to extract a name from note fields
    const extractName = () => {
      // If the title format is "John's Note" or similar
      if (note.title && note.title.includes("'s Note")) {
        return note.title.replace("'s Note", "");
      }

      // If the note has a name in Test User Name format in content
      if (note.content && note.content.includes("Test User")) {
        const match = note.content.match(/Test User (\w+)/);
        if (match && match[1]) return `Test User ${match[1]}`;
      }

      return null;
    };

    const authorName = extractName();
    if (authorName) {
      return (
        <Text size="sm" c="dimmed">
          Posted by {authorName}
        </Text>
      );
    }

    // Default to anonymous for all other cases
    return (
      <Text size="sm" c="dimmed">
        Posted anonymously
      </Text>
    );
  };

  // Helper to determine if note can be edited by current user
  const canEditNote = (note: Note) => {
    // Admin can edit any note
    if (isAdmin) return true;

    // For anonymous notes (no userId), only allow if it's a public note
    if (
      !note.userId &&
      (typeof note.isPublic === "string"
        ? note.isPublic === "true"
        : note.isPublic)
    ) {
      return true;
    }

    // Check if this note's ID is in the localStorage userNoteIds
    const storedIds = localStorage.getItem("userNoteIds");
    if (storedIds) {
      try {
        const userIds = JSON.parse(storedIds);
        if (userIds.includes(note.id)) {
          return true;
        }
      } catch (e) {
        console.error("Error parsing user note IDs:", e);
      }
    }

    // Check if note is in the explicitly passed currentUserNotes list
    if (currentUserNotes.includes(note.id)) {
      return true;
    }

    // If we're in the private notes section (showUser=false), we know it's the user's note
    if (!showUser) {
      return true;
    }

    // Default to not editable
    return false;
  };

  return (
    <>
      {error && (
        <Alert color="red" mb="md" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <Grid grow gutter="md" style={{ width: "100%" }}>
        {notes.map((note) => (
          <Grid.Col key={note.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
              <Stack justify="space-between" h="100%">
                <div>
                  {editInPlaceId === note.id ? (
                    // Edit mode
                    <>
                      <TextInput
                        value={editFormData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        placeholder="Note title"
                        mb="xs"
                      />
                      <Textarea
                        value={editFormData.content}
                        onChange={(e) =>
                          handleInputChange("content", e.target.value)
                        }
                        placeholder="Note content"
                        minRows={3}
                        mb="xs"
                      />
                      <Group>
                        <Checkbox
                          label="Public"
                          checked={editFormData.isPublic}
                          onChange={(e) =>
                            handleCheckboxChange(e.target.checked)
                          }
                        />
                      </Group>
                    </>
                  ) : (
                    // View mode
                    <>
                      <Group justify="space-between" mb="xs">
                        <Title order={4}>{note.title}</Title>
                        <Badge
                          color={note.isPublic === "true" ? "green" : "blue"}
                        >
                          {note.isPublic === "true" ? "Public" : "Private"}
                        </Badge>
                      </Group>

                      {/* Show author information */}
                      {getAuthorDisplay(note)}
                      <Divider my="xs" />

                      <Text>{note.content}</Text>
                    </>
                  )}
                </div>

                <Flex justify="space-between" align="center" mt="md">
                  <Text size="xs" c="dimmed">
                    {new Date(note.createdAt).toLocaleString()}
                  </Text>

                  {editInPlaceId === note.id ? (
                    // Edit mode actions
                    <Group>
                      <ActionIcon
                        color="green"
                        onClick={() => handleEditSave(note.id)}
                      >
                        <IconCheck size={18} />
                      </ActionIcon>
                      <ActionIcon color="red" onClick={handleEditCancel}>
                        <IconX size={18} />
                      </ActionIcon>
                    </Group>
                  ) : (
                    // View mode actions
                    <Group>
                      {canEditNote(note) && (
                        <Button
                          color="blue"
                          size="xs"
                          onClick={() => handleEditClick(note)}
                          leftSection={<IconEdit size={14} />}
                        >
                          Edit
                        </Button>
                      )}
                      <Button
                        color="red"
                        size="xs"
                        onClick={() => handleDelete(note)}
                        loading={deletingId === note.id}
                      >
                        Delete
                      </Button>
                    </Group>
                  )}
                </Flex>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

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
          onSuccess={handleEditSuccess}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
};

export default NotesGrid;
