import {
  Container,
  Grid,
  Paper,
  Text,
  Group,
  AppShell,
  Modal,
  Button,
  Divider,
  Badge,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  useAuth,
} from "@clerk/clerk-react";
import AdminLoginForm from "./AdminLoginForm";
import { useNoteContext } from "../context/NoteContext";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { refreshTrigger } = useNoteContext();
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  // adminApiKey is used for localStorage persistence and should be kept
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [adminApiKey, setAdminApiKey] = useState<string | null>(null);
  const [publicNotesCount, setPublicNotesCount] = useState(0);
  const [privateNotesCount, setPrivateNotesCount] = useState(0);

  // Store the current user ID in localStorage when they sign in
  useEffect(() => {
    if (isSignedIn && user?.id) {
      localStorage.setItem("currentUserId", user.id);
    } else if (!isSignedIn) {
      localStorage.removeItem("currentUserId");
    }
  }, [isSignedIn, user?.id]);

  // Fetch note counts
  const fetchNoteCounts = async () => {
    if (!isSignedIn) {
      setPublicNotesCount(0);
      setPrivateNotesCount(0);
      return;
    }

    try {
      // Check if user is admin
      if (isAdminLoggedIn && adminApiKey) {
        // Fetch all notes as admin
        const response = await fetch("/api/notes/all", {
          headers: {
            "X-API-Key": adminApiKey,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch admin notes counts");
        }

        const allNotes = await response.json();

        if (Array.isArray(allNotes)) {
          // Count public and private notes
          const publicCount = allNotes.filter(
            (note) => note.isPublic === "true"
          ).length;
          const privateCount = allNotes.length - publicCount;

          setPublicNotesCount(publicCount);
          setPrivateNotesCount(privateCount);
        }
        return;
      }

      // Regular user flow - fetch user's notes
      // Fetch public notes count
      const publicResponse = await fetch("/api/public-notes");
      const publicData = await publicResponse.json();
      const publicCount = Array.isArray(publicData) ? publicData.length : 0;
      setPublicNotesCount(publicCount);

      // Fetch private notes if user is signed in
      const token = await getToken();
      if (token) {
        const privateResponse = await fetch("/api/private-notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const privateData = await privateResponse.json();

        // Filter to only include truly private notes (isPublic !== "true")
        const trulyPrivateNotes = Array.isArray(privateData)
          ? privateData.filter((note) => note.isPublic !== "true")
          : [];

        setPrivateNotesCount(trulyPrivateNotes.length);
      }
    } catch (err) {
      console.error("Error fetching note counts:", err);
    }
  };

  // Check for existing admin API key in localStorage on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem("adminApiKey");
    if (storedApiKey) {
      // We'll assume the key is valid for now
      setAdminApiKey(storedApiKey);
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Fetch note counts on load, auth state changes, and note refresh events
  useEffect(() => {
    if (isSignedIn) {
      fetchNoteCounts();
    }
  }, [isSignedIn, refreshTrigger, isAdminLoggedIn, adminApiKey]);

  const handleAdminLogin = (apiKey: string) => {
    // For simplicity, we're not making the actual API call here
    // In a real app, you'd verify the API key first
    setAdminApiKey(apiKey);
    setIsAdminLoggedIn(true);
    localStorage.setItem("adminApiKey", apiKey);
    setAdminModalOpen(false);

    // Refresh note counts to show admin counts
    fetchNoteCounts();
    // Send admins directly to the table view on first login.
    navigate("/notes");
  };

  const handleAdminLogout = () => {
    setAdminApiKey(null);
    setIsAdminLoggedIn(false);
    localStorage.removeItem("adminApiKey");

    // Force page reload to update admin state across components
    window.location.reload();
  };

  return (
    <AppShell
      styles={{
        main: {
          background: "#f8f9fa",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          maxWidth: "100%",
          padding: 0,
          paddingTop: "60px", // Add padding to account for fixed header
        },
      }}
      header={{ height: 60 }}
      footer={{ height: 60 }}
      padding={0}
    >
      <AppShell.Header style={{ position: "fixed", top: 0, zIndex: 1000 }}>
        <Paper
          p="md"
          withBorder
          radius={0}
          style={{ background: "#fff", height: "100%", width: "100%" }}
        >
          <Container size="xl" style={{ maxWidth: 1320 }}>
            <Group justify="space-between" h="100%">
              <Text size="xl" fw={700}>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Elysia Notes - React
                </Link>
              </Text>
              <Group>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Text>Home</Text>
                </Link>
                <SignedIn>
                  <Link
                    to="/notes"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Group gap={8}>
                      <Text>{isAdminLoggedIn ? "All Notes" : "My Notes"}</Text>
                      <Group gap={4}>
                        <Badge color="blue" size="sm">
                          Public: {publicNotesCount}
                        </Badge>
                        <Badge color="green" size="sm">
                          Private: {privateNotesCount}
                        </Badge>
                      </Group>
                    </Group>
                  </Link>
                </SignedIn>

                {/* User Authentication */}
                <SignedIn>
                  <Group>
                    <Text size="sm">Hello, {user?.firstName || "User"}</Text>
                    <UserButton />
                  </Group>
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button size="xs" variant="filled" color="indigo">
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>

                <Divider orientation="vertical" />

                {/* Admin Authentication */}
                {isAdminLoggedIn ? (
                  <Button size="xs" color="red" onClick={handleAdminLogout}>
                    Admin Logout
                  </Button>
                ) : (
                  <Button
                    size="xs"
                    color="blue"
                    onClick={() => setAdminModalOpen(true)}
                  >
                    Admin Login
                  </Button>
                )}
              </Group>
            </Group>
          </Container>
        </Paper>
      </AppShell.Header>

      <AppShell.Main style={{ flex: 1 }}>
        <Container size="xl" py="xl" style={{ maxWidth: 1320 }}>
          <Grid>
            <Grid.Col span={12}>{children}</Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>

      <AppShell.Footer>
        <Paper
          p="md"
          withBorder
          radius={0}
          style={{ background: "#fff", height: "100%", width: "100%" }}
        >
          <Container size="xl" style={{ maxWidth: 1320 }}>
            <Group justify="space-between" h="100%">
              <Text size="sm">© 2024 Notes App</Text>
              <Group>
                <Text size="sm">Privacy Policy</Text>
                <Text size="sm">Terms of Service</Text>
                <Text size="sm">Contact Us</Text>
              </Group>
            </Group>
          </Container>
        </Paper>
      </AppShell.Footer>

      {/* Admin Login Modal */}
      <Modal
        opened={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        title="Admin Login"
        centered
      >
        <AdminLoginForm
          onAdminLogin={handleAdminLogin}
          isAdminLoggedIn={isAdminLoggedIn}
          onAdminLogout={handleAdminLogout}
        />
      </Modal>
    </AppShell>
  );
};
