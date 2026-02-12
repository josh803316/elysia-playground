import { useState, useEffect } from "react";
import { useNotes } from "../hooks/useNotes";
import { useAuth } from "../hooks/useAuth";
import { NoteForm } from "../components/NoteForm";
import NoteList from "../components/NoteList";
import { AdminNotesTable } from "../components/AdminNotesTable";
import { Title, Text, Paper, Button, Group, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
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

  if (!isSignedIn) {
    return (
      <Layout>
        <Paper p="md" withBorder data-testid="section-your-notes">
          <Text>Sign in to view your notes.</Text>
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
        <Stack data-testid="section-admin-table">
          <AdminNotesTable
            notes={allNotes}
            loading={adminLoading}
            error={adminError}
            adminApiKey={adminApiKey}
            onRefetch={() => adminApiKey && fetchAllNotes(adminApiKey)}
            showCreateButton
            onCreateClick={() => navigate("/notes/new")}
          />
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
