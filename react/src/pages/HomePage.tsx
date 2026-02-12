import { useUser, useAuth, SignInButton, SignedOut } from "@clerk/clerk-react";
import { useState, useEffect, useRef } from "react";
import { Grid, Paper, Title, Text, Group, Button, Modal, Textarea, Stack, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import NotesGrid from "../components/NotesGrid";
import { NoteForm } from "../components/NoteForm";
import { AdminNotesTable } from "../components/AdminNotesTable";
import { useNoteContext } from "../context/NoteContext";
import { getApiBase } from "../api/client";

interface Note {
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

const HomePage = () => {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { refreshTrigger, triggerRefresh } = useNoteContext();
  const prevRefreshTriggerRef = useRef(refreshTrigger);
  const [publicNotes, setPublicNotes] = useState<Note[]>([]);
  const [privateNotes, setPrivateNotes] = useState<Note[]>([]);
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminApiKey, setAdminApiKey] = useState<string | null>(null);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [anonymousNoteModalOpen, setAnonymousNoteModalOpen] = useState(false);
  const [initialNoteValues, setInitialNoteValues] = useState({
    isPublic: false,
  });
  const [initialized, setInitialized] = useState(false);
  const [anonymousSubmitError, setAnonymousSubmitError] = useState<string | null>(null);
  const anonymousForm = useForm({
    initialValues: { content: "", isPublic: true },
    validate: { content: (v) => (v.trim().length > 0 ? null : "Note content cannot be empty") },
  });
  const publicNotesRequestIdRef = useRef(0);

  // Fetch public notes (use relative URL in dev so Vite proxy is used; avoids CORS)
  const fetchPublicNotes = async () => {
    const requestId = ++publicNotesRequestIdRef.current;
    const base = getApiBase();
    const url = base ? `${base}/api/public-notes` : "/api/public-notes";
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      const contentType = response.headers.get("content-type");
      let raw: unknown;
      if (contentType?.includes("application/json")) {
        raw = await response.json();
      } else {
        await response.text(); // consume body
        if (requestId === publicNotesRequestIdRef.current) {
          setError("Failed to load public notes (invalid response)");
        }
        return;
      }
      // Server returns array directly; handle wrapped { data } in case of middleware
      const data: Note[] | null = Array.isArray(raw)
        ? raw
        : raw && Array.isArray((raw as { data?: unknown }).data)
          ? (raw as { data: Note[] }).data
          : null;
      const notes = data ?? [];
      if (!response.ok) {
        if (requestId === publicNotesRequestIdRef.current) {
          setError("Failed to load public notes");
          setPublicNotes(notes);
        }
        return;
      }
      // Update state: prefer non-empty data so a late empty response doesn't overwrite real notes
      setPublicNotes((prev) => (notes.length > 0 ? notes : prev.length > 0 ? prev : notes));
    } catch (err) {
      console.error("Error fetching public notes:", err);
      if (requestId === publicNotesRequestIdRef.current) {
        setError("Failed to load public notes");
      }
    } finally {
      if (requestId === publicNotesRequestIdRef.current) setLoading(false);
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
      const base = getApiBase();
      const notesUrl = base ? `${base}/api/notes` : "/api/notes";
      const response = await fetch(notesUrl, {
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
  const fetchAllNotes = async (apiKeyOverride?: string) => {
    const effectiveApiKey = apiKeyOverride ?? adminApiKey;
    if (!isAdminLoggedIn || !effectiveApiKey) return;

    try {
      setLoading(true);
      console.log("Fetching all notes with API key:", adminApiKey);

      // Correct endpoint is /api/notes/all as defined in notes.controller.ts
      const base = getApiBase();
      const allUrl = base ? `${base}/api/notes/all` : "/api/notes/all";
      const response = await fetch(allUrl, {
        headers: {
          "X-API-Key": effectiveApiKey,
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

  // Fetch notes once on mount
  useEffect(() => {
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

  // Re-fetch only when refreshTrigger actually changes (e.g. after create/update), not on mount
  useEffect(() => {
    if (!initialized || prevRefreshTriggerRef.current === refreshTrigger) return;
    prevRefreshTriggerRef.current = refreshTrigger;
    fetchPublicNotes();
    if (isSignedIn) {
      fetchPrivateNotes();
    }
    if (isAdminLoggedIn) {
      fetchAllNotes();
    }
  }, [refreshTrigger, initialized, isSignedIn, isAdminLoggedIn]);

  // Check for existing admin API key in localStorage on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem("adminApiKey");
    if (storedApiKey) {
      setAdminApiKey(storedApiKey);
      setIsAdminLoggedIn(true);
      fetchAllNotes(storedApiKey);
    }
  }, []);

  // Ensure admin dashboard data loads whenever admin auth state becomes active.
  useEffect(() => {
    if (isAdminLoggedIn && adminApiKey) {
      fetchAllNotes(adminApiKey);
    }
  }, [isAdminLoggedIn, adminApiKey]);

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

  const handleAnonymousNoteSubmit = async (values: { content: string; isPublic: boolean }) => {
    if (!values.content.trim()) return;
    setAnonymousSubmitError(null);
    try {
      const base = getApiBase();
      const url = base ? `${base}/api/public-notes` : "/api/public-notes";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: values.content, isPublic: values.isPublic }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create note");
      }
      anonymousForm.reset();
      setAnonymousNoteModalOpen(false);
      triggerRefresh();
      handleNoteCreated();
    } catch (err) {
      setAnonymousSubmitError(err instanceof Error ? err.message : "Failed to create note");
    }
  };

  return (
    <Grid>
      {/* All Notes (Admin View) - single table at top when admin */}
      {isAdminLoggedIn && (
        <Grid.Col span={12} data-testid="section-admin-table">
          <AdminNotesTable
            notes={allNotes}
            loading={loading}
            error={error}
            adminApiKey={adminApiKey}
            onRefetch={() => fetchAllNotes()}
            showCreateButton={false}
          />
        </Grid.Col>
      )}

      {/* Public Notes Section - match HTMX/Svelte: wide section, green button in header for everyone */}
      <Grid.Col span={12} data-testid="section-public-notes">
        <Paper shadow="sm" p="md" withBorder radius="md">
          <Group justify="space-between" mb="md">
            <div>
              <Title order={2}>Public Notes</Title>
              <Text size="sm" c="dimmed">Visible to everyone</Text>
            </div>
            <Button
              leftSection={<IconPlus size={18} />}
              color="green"
              variant="filled"
              onClick={() => {
                if (isSignedIn) {
                  openNoteModal(true);
                } else {
                  setAnonymousSubmitError(null);
                  anonymousForm.reset();
                  setAnonymousNoteModalOpen(true);
                }
              }}
            >
              + Create Public Note
            </Button>
          </Group>
          {loading && <Text>Loading public notes...</Text>}
          {error && <Text c="red">{error}</Text>}
          <NotesGrid
            notes={publicNotes}
            emptyMessage="No public notes yet. Be the first to create one!"
            showUser={true}
            onNoteDeleted={handleNoteCreated}
            onNoteUpdated={handleNoteCreated}
            currentUserNotes={isSignedIn ? privateNotes.filter((n) => n.isPublic === "true").map((n) => n.id) : undefined}
          />
        </Paper>
      </Grid.Col>

      {/* Want to create private notes? - only when signed out (match HTMX) */}
      <SignedOut>
        <Grid.Col span={12}>
          <Paper shadow="sm" p="md" withBorder radius="md" style={{ textAlign: "center" }}>
            <Title order={2} mb="xs">
              Want to create private notes?
            </Title>
            <Text size="sm" c="dimmed" mb="md">
              Sign in to create and manage your own private notes.
            </Text>
            <SignInButton mode="modal">
              <Button variant="filled" color="indigo">
                Sign In to Get Started
              </Button>
            </SignInButton>
          </Paper>
        </Grid.Col>
      </SignedOut>

      {/* Your Notes Section - only when signed in */}
      {isSignedIn && (
        <Grid.Col span={12} data-testid="section-your-notes">
          <Paper shadow="sm" p="md" withBorder radius="md">
            <Group justify="space-between" mb="xs">
              <div>
                <Title order={2}>Your Notes</Title>
                <Text size="sm" c="dimmed">Only you can see these notes</Text>
              </div>
              <Button
                leftSection={<IconPlus size={18} />}
                color="violet"
                variant="filled"
                onClick={() => openNoteModal(false)}
              >
                + Create Private Note
              </Button>
            </Group>
            {loading && <Text>Loading your notes...</Text>}
            {error && <Text c="red">{error}</Text>}
            <NotesGrid
              notes={privateNotes}
              emptyMessage="No notes yet. Create your first note using the button above!"
              showUser={false}
              onNoteDeleted={handleNoteCreated}
              onNoteUpdated={handleNoteCreated}
            />
          </Paper>
        </Grid.Col>
      )}

      {/* Note Creation Modal (signed in) */}
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

      {/* Create Public Note modal (signed out) - opened by "+ Create Public Note" button */}
      <Modal
        title="Create Public Note"
        opened={anonymousNoteModalOpen}
        onClose={() => setAnonymousNoteModalOpen(false)}
        centered
      >
        {anonymousSubmitError && (
          <Alert color="red" mb="md" onClose={() => setAnonymousSubmitError(null)}>
            {anonymousSubmitError}
          </Alert>
        )}
        <form onSubmit={anonymousForm.onSubmit(handleAnonymousNoteSubmit)}>
          <Stack>
            <Textarea
              placeholder="Write a public note..."
              minRows={3}
              {...anonymousForm.getInputProps("content")}
              required
            />
            <Group justify="flex-end">
              <Button type="submit" color="green">
                Post Public Note
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Grid>
  );
};

export default HomePage;
