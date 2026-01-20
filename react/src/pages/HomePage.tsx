import { useUser, useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Grid, Paper, Title, Text, ActionIcon, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import AnonymousNoteForm from "../components/AnonymousNoteForm";
import NotesGrid from "../components/NotesGrid";
import { NoteForm } from "../components/NoteForm";
import { useNoteContext } from "../context/NoteContext";

interface Note {
  id: string;
  title: string;
  content: string;
  userId: string | null;
  isPublic: string;
  createdAt: string;
  updatedAt: string;
}

const HomePage = () => {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { triggerRefresh } = useNoteContext();
  const [publicNotes, setPublicNotes] = useState<Note[]>([]);
  const [privateNotes, setPrivateNotes] = useState<Note[]>([]);
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminApiKey, setAdminApiKey] = useState<string | null>(null);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [initialNoteValues, setInitialNoteValues] = useState({
    isPublic: false,
  });
  const [initialized, setInitialized] = useState(false);

  // Fetch public notes
  const fetchPublicNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/public-notes");
      const data = await response.json();
      setPublicNotes(data);
    } catch (err) {
      console.error("Error fetching public notes:", err);
      setError("Failed to load public notes");
    } finally {
      setLoading(false);
    }
  };

  // Fetch private notes if user is signed in
  const fetchPrivateNotes = async () => {
    if (!isSignedIn) return;

    try {
      setLoading(true);
      // Get token using useAuth hook
      const token = await getToken();

      // Get user's notes (both private and public)
      const response = await fetch("/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      // Split into private and public notes
      if (Array.isArray(data)) {
        // Filter to only include private notes
        const trulyPrivateNotes = data.filter(
          (note) => note.isPublic !== "true"
        );
        setPrivateNotes(trulyPrivateNotes);

        // Store IDs of all notes that belong to the user (for showing "Posted by you")
        const userNoteIds = data.map((note) => note.id);
        localStorage.setItem("userNoteIds", JSON.stringify(userNoteIds));
      } else {
        setPrivateNotes([]);
      }
    } catch (err) {
      console.error("Error fetching private notes:", err);
      setError("Failed to load your notes");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all notes (admin only)
  const fetchAllNotes = async () => {
    if (!isAdminLoggedIn || !adminApiKey) return;

    try {
      setLoading(true);
      console.log("Fetching all notes with API key:", adminApiKey);

      // Correct endpoint is /api/notes/all as defined in notes.controller.ts
      const response = await fetch("/api/notes/all", {
        headers: {
          "X-API-Key": adminApiKey,
        },
      });

      console.log("Admin fetch response status:", response.status);

      if (!response.ok) {
        throw new Error(`Admin request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Admin notes data:", data);
      setAllNotes(data);
    } catch (err) {
      console.error("Error fetching all notes as admin:", err);
      setError("Failed to load all notes. Admin access may be invalid.");
      // If we get an authorization error, log out the admin
      if (err instanceof Error && err.message.includes("401")) {
        handleAdminLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch notes on load and when auth state changes
  useEffect(() => {
    // Only fetch if not initialized yet
    if (!initialized) {
      fetchPublicNotes();
      if (isSignedIn) {
        fetchPrivateNotes();
      }
      if (isAdminLoggedIn) {
        fetchAllNotes();
      }
      setInitialized(true);
    }
  }, [isSignedIn, isAdminLoggedIn, adminApiKey, initialized]);

  // Re-fetch when the refresh trigger changes
  useEffect(() => {
    if (initialized) {
      fetchPublicNotes();
      if (isSignedIn) {
        fetchPrivateNotes();
      }
      if (isAdminLoggedIn) {
        fetchAllNotes();
      }
    }
  }, [triggerRefresh, initialized]);

  // Check for existing admin API key in localStorage on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem("adminApiKey");
    if (storedApiKey) {
      setAdminApiKey(storedApiKey);
      setIsAdminLoggedIn(true);
      fetchAllNotes();
    }
  }, []);

  // Handle note creation
  const handleNoteCreated = () => {
    // Always fetch both public and private notes
    fetchPublicNotes();

    if (isSignedIn) {
      fetchPrivateNotes();
    }

    if (isAdminLoggedIn) {
      fetchAllNotes();
    }

    // Trigger a refresh event for other components
    triggerRefresh();

    // Close the modal if it's open
    setNoteModalOpen(false);
  };

  // Handle admin logout
  const handleAdminLogout = () => {
    setAdminApiKey(null);
    setIsAdminLoggedIn(false);
    setAllNotes([]);
    // Remove the API key from localStorage
    localStorage.removeItem("adminApiKey");
  };

  // Open note modal with pre-set public/private setting
  const openNoteModal = (isPublic: boolean) => {
    console.log("Opening modal with isPublic =", isPublic);
    setInitialNoteValues({ isPublic });
    setNoteModalOpen(true);
  };

  return (
    <Grid>
      {/* Admin View - All Notes */}
      {isAdminLoggedIn && (
        <Grid.Col span={12}>
          <Paper shadow="xs" p="md" withBorder>
            <Title order={2} mb="md">
              Admin Dashboard
            </Title>
            {loading && <Text>Loading all notes...</Text>}
            {error && <Text c="red">{error}</Text>}

            {/* Admin View - Public Notes */}
            <div
              className="admin-notes-section public-notes"
              style={{ marginBottom: "2rem" }}
            >
              <Title order={3} mb="md">
                Public Notes
              </Title>
              <NotesGrid
                notes={allNotes.filter((note) => note.isPublic === "true")}
                emptyMessage="No public notes found in the system."
                showUser={true}
                onNoteDeleted={handleNoteCreated}
                onNoteUpdated={handleNoteCreated}
                isAdmin={true}
              />
            </div>

            {/* Admin View - Private Notes */}
            <div className="admin-notes-section private-notes">
              <Title order={3} mb="md">
                Private Notes
              </Title>
              <NotesGrid
                notes={allNotes.filter((note) => note.isPublic !== "true")}
                emptyMessage="No private notes found in the system."
                showUser={true}
                onNoteDeleted={handleNoteCreated}
                onNoteUpdated={handleNoteCreated}
                isAdmin={true}
              />
            </div>
          </Paper>
        </Grid.Col>
      )}

      {/* User View */}
      {!isAdminLoggedIn && (
        <>
          {/* Public Notes Section */}
          <Grid.Col span={12}>
            <Paper shadow="xs" p="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={2}>Public Notes</Title>
                {isSignedIn && (
                  <ActionIcon
                    variant="filled"
                    color="indigo"
                    size="lg"
                    radius="xl"
                    onClick={() => openNoteModal(true)}
                  >
                    <IconPlus size={20} />
                  </ActionIcon>
                )}
              </Group>
              {loading && <Text>Loading public notes...</Text>}
              {error && <Text c="red">{error}</Text>}
              <NotesGrid
                notes={publicNotes}
                emptyMessage="No public notes yet. Be the first to create one!"
                showUser={true}
                onNoteDeleted={handleNoteCreated}
                onNoteUpdated={handleNoteCreated}
                currentUserNotes={privateNotes
                  .filter((note) => note.isPublic === "true")
                  .map((note) => note.id)}
              />
            </Paper>
          </Grid.Col>

          {/* Private Notes Section (only for signed-in users) */}
          {isSignedIn && (
            <Grid.Col span={12}>
              <Paper shadow="xs" p="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Title order={2}>Your Private Notes</Title>
                  <ActionIcon
                    variant="filled"
                    color="indigo"
                    size="lg"
                    radius="xl"
                    onClick={() => openNoteModal(false)}
                  >
                    <IconPlus size={20} />
                  </ActionIcon>
                </Group>
                {loading && <Text>Loading your notes...</Text>}
                {error && <Text c="red">{error}</Text>}
                <NotesGrid
                  notes={privateNotes}
                  emptyMessage="You haven't created any private notes yet."
                  showUser={false}
                  onNoteDeleted={handleNoteCreated}
                  onNoteUpdated={handleNoteCreated}
                />
              </Paper>
            </Grid.Col>
          )}

          {/* Anonymous Note Creation (only for non-signed in users) */}
          {!isSignedIn && (
            <Grid.Col span={12}>
              <Paper shadow="xs" p="md" withBorder>
                <Title order={2} mb="md">
                  Create a Public Note
                </Title>
                <AnonymousNoteForm onNoteCreated={handleNoteCreated} />
              </Paper>
            </Grid.Col>
          )}
        </>
      )}

      {/* Note Creation Modal */}
      {isSignedIn && (
        <NoteForm
          isOpen={noteModalOpen}
          initialValues={{
            title: "",
            content: "",
            isPublic: initialNoteValues.isPublic,
          }}
          onClose={() => setNoteModalOpen(false)}
          onSubmitSuccess={handleNoteCreated}
        />
      )}
    </Grid>
  );
};

export default HomePage;
