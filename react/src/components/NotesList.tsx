import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useGetAllNotes, useCreateNote } from "../hooks/useApi";
import {
  Table,
  Button,
  TextInput,
  Textarea,
  Text,
  Group,
  Badge,
  Title,
  Paper,
  Box,
  Container,
  Loader,
  Alert,
  Divider,
  Switch,
  Grid,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconRefresh,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

interface Note {
  id: number;
  title: string;
  content: string;
  isPublic: boolean | string;
  createdAt: string;
  updatedAt: string;
}

export default function NotesList() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const { userId, isSignedIn, getToken } = useAuth();
  const [authState, setAuthState] = useState({ token: "", userId: "" });
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  // Use our custom hooks
  const {
    data: notes,
    loading: notesLoading,
    error: notesError,
    execute: fetchNotes,
  } = useGetAllNotes();
  const {
    loading: createLoading,
    error: createError,
    execute: createNote,
  } = useCreateNote();

  // Only fetch notes once when the component mounts and user is authenticated
  useEffect(() => {
    const checkAuthAndFetch = async () => {
      if (isSignedIn && !initialFetchDone) {
        try {
          const token = await getToken();
          setAuthState({ token: token || "", userId: userId || "" });
          await fetchNotes();
        } finally {
          setInitialFetchDone(true);
        }
      }
    };

    checkAuthAndFetch();
  }, [isSignedIn, userId, getToken, initialFetchDone]);

  // Handle form submission for creating a new note
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!noteTitle || !noteContent) return;

    const response = await createNote({
      title: noteTitle,
      content: noteContent,
      isPublic: isPublic ? "true" : "false",
    });

    if (response.data) {
      // Clear form and refresh notes list
      setNoteTitle("");
      setNoteContent("");
      setIsPublic(false);
      fetchNotes();
    }
  };

  // Manual refresh button handler
  const handleRefresh = async () => {
    await fetchNotes();
  };

  if (!isSignedIn) {
    return (
      <Container size="md" py="xl">
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Authentication Required"
          color="blue"
        >
          Please sign in to view and create notes.
        </Alert>
      </Container>
    );
  }

  if (notesLoading && !initialFetchDone) {
    return (
      <Container size="md" py="xl" ta="center">
        <Loader size="lg" />
        <Text mt="md">Loading notes...</Text>
      </Container>
    );
  }

  if (notesError) {
    return (
      <Container size="md" py="xl">
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Error Loading Notes"
          color="red"
          mb="md"
        >
          {String(notesError)}
        </Alert>
        <Paper withBorder p="md" radius="md">
          <Title order={4} mb="sm">
            Auth Debug Info
          </Title>
          <Text>User ID: {authState.userId || "None"}</Text>
          <Text>
            Token:{" "}
            {authState.token
              ? `${authState.token.substring(0, 10)}...`
              : "None"}
          </Text>
          <Text>Is Signed In: {isSignedIn ? "Yes" : "No"}</Text>
          <Button
            leftSection={<IconRefresh size="1rem" />}
            onClick={handleRefresh}
            mt="md"
            variant="light"
          >
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  // Cast notes to array of Note and sort by creation date (newest first)
  const notesList: Note[] = Array.isArray(notes)
    ? [...notes].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  // Prepare table data for Mantine Table data prop
  const tableData = {
    head: ["Title", "Content", "Status", "Created", "Updated"],
    body: notesList.map((note) => [
      <Text fw={500}>{note.title}</Text>,
      <Text lineClamp={2}>{note.content}</Text>,
      note.isPublic === "true" || note.isPublic === "1" ? (
        <Badge color="green" leftSection={<IconCheck size={14} />}>
          Public
        </Badge>
      ) : (
        <Badge color="blue" leftSection={<IconX size={14} />}>
          Private
        </Badge>
      ),
      <Text size="sm" c="dimmed">
        {new Date(note.createdAt).toLocaleDateString()}
      </Text>,
      <Text size="sm" c="dimmed">
        {new Date(note.updatedAt).toLocaleDateString()}
      </Text>,
    ]),
  };

  return (
    <Container size="xl" py="md">
      <Title order={2} mb="lg">
        Your Notes
      </Title>

      {/* Create note form */}
      <Paper withBorder p="lg" radius="md" mb="xl">
        <Title order={3} mb="md">
          Create New Note
        </Title>
        <form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 8 }}>
              <TextInput
                label="Title"
                placeholder="Note title"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                required
                mb="md"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Box mt={25}>
                <Switch
                  label="Make note public"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
              </Box>
            </Grid.Col>
          </Grid>

          <Textarea
            label="Content"
            placeholder="Write your note here..."
            minRows={4}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            required
            mb="md"
          />

          <Group justify="flex-end">
            <Button
              type="submit"
              loading={createLoading}
              disabled={!noteTitle || !noteContent}
            >
              {createLoading ? "Creating..." : "Create Note"}
            </Button>
          </Group>

          {createError && (
            <Alert color="red" title="Error creating note" mt="md">
              {String(createError)}
            </Alert>
          )}
        </form>
      </Paper>

      {/* Notes table with refresh button */}
      <Group justify="space-between" mb="md">
        <Title order={3}>My Notes</Title>
        <Button
          variant="light"
          leftSection={<IconRefresh size="1rem" />}
          onClick={handleRefresh}
          loading={notesLoading}
        >
          {notesLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </Group>

      {notesList.length > 0 ? (
        <Paper withBorder radius="md">
          <Table striped highlightOnHover data={tableData} />
        </Paper>
      ) : (
        <Paper withBorder p="xl" radius="md" ta="center">
          <Text size="lg" fw={500} c="dimmed">
            No notes yet. Create one to get started!
          </Text>
        </Paper>
      )}

      {/* Debug information */}
      <Paper withBorder p="md" radius="md" mt="xl" bg="gray.0">
        <Title order={5} mb="xs">
          Auth Debug Info
        </Title>
        <Divider mb="sm" />
        <Text size="sm">User ID: {authState.userId || "None"}</Text>
        <Text size="sm">
          Token:{" "}
          {authState.token ? `${authState.token.substring(0, 10)}...` : "None"}
        </Text>
        <Text size="sm">Is Signed In: {isSignedIn ? "Yes" : "No"}</Text>
        <Text size="sm">
          Initial Fetch Done: {initialFetchDone ? "Yes" : "No"}
        </Text>
      </Paper>
    </Container>
  );
}
