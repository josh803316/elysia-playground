import {
  Container,
  Grid,
  Paper,
  Text,
  Group,
  AppShell,
  Modal,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  useUser,
  useAuth,
  useClerk,
} from "@clerk/clerk-react";
import AdminLoginForm from "./AdminLoginForm";
import { GlobalSearch } from "./GlobalSearch";
import { useNoteContext } from "../context/NoteContext";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { signOut } = useClerk();
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
      // Still fetch public notes count even when signed out
      try {
        const publicResponse = await fetch("/api/public-notes");
        const publicData = await publicResponse.json();
        const publicCount = Array.isArray(publicData) ? publicData.length : 0;
        setPublicNotesCount(publicCount);
      } catch (err) {
        console.error("Error fetching public notes count:", err);
      }
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
    fetchNoteCounts();
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

  // Shared button styles
  const navBtnTeal = {
    background: "#0d9488", color: "white", padding: "0.375rem 0.75rem",
    borderRadius: "0.25rem", fontWeight: 500, fontSize: "0.875rem",
    border: "none", cursor: "pointer" as const,
  };
  const navBtnRed = {
    ...navBtnTeal, background: "#dc2626",
  };
  const navBadgeGreen = {
    fontSize: "0.75rem", padding: "0.125rem 0.5rem", borderRadius: "0.25rem",
    background: "#dcfce7", color: "#166534", fontWeight: 600,
  };
  const navBadgePurple = {
    fontSize: "0.75rem", padding: "0.125rem 0.5rem", borderRadius: "0.25rem",
    background: "#f3e8ff", color: "#6b21a8", fontWeight: 600,
  };
  const footerLinkStyle = { fontSize: "0.875rem", color: "#9ca3af", textDecoration: "none" };

  return (
    <AppShell
      styles={{
        main: {
          background: "#f3f4f6",
          minHeight: "100vh",
          padding: 0,
          paddingTop: "60px",
        },
      }}
      header={{ height: 60 }}
      padding={0}
    >
      <AppShell.Header style={{ position: "fixed", top: 0, zIndex: 1000 }}>
        <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", height: "100%", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: 1320, width: "100%", margin: "0 auto", padding: "0 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Brand */}
            <Link
              to="/"
              style={{ textDecoration: "none", fontSize: "1.25rem", fontWeight: 700, color: "#111827", flexShrink: 0 }}
              onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "#0f766e"; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#111827"; }}
            >
              Elysia Notes - React
            </Link>

            {/* Global search - right of title, left of nav */}
            <GlobalSearch adminApiKey={adminApiKey} />

            {/* Nav links */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
              <Link
                to="/"
                style={{ textDecoration: "none", fontSize: "0.875rem", color: "#374151", fontWeight: 500 }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "#111827"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#374151"; }}
              >
                Home
              </Link>

              {/* Public badge: signed-out only (standalone) */}
              <SignedOut>
                <span style={navBadgeGreen}>Public: {publicNotesCount}</span>
              </SignedOut>

              {/* My Notes + both badges: signed-in only */}
              <SignedIn>
                <Link
                  to="/notes"
                  style={{ textDecoration: "none", color: "#374151", fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.375rem" }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "#111827"; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#374151"; }}
                >
                  {isAdminLoggedIn ? "All Notes" : "My Notes"}
                  <span style={navBadgeGreen}>Public: {publicNotesCount}</span>
                  <span style={navBadgePurple}>Private: {privateNotesCount}</span>
                </Link>
              </SignedIn>

              {/* Auth area */}
              <SignedIn>
                <span style={{ fontSize: "0.875rem", color: "#374151" }}>
                  Hello, {user?.firstName || "User"}
                </span>
                <button
                  onClick={() => signOut()}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", color: "#4b5563", fontWeight: 500 }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "#111827"; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#4b5563"; }}
                >
                  Sign Out
                </button>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    style={{ ...navBtnTeal, padding: "0.5rem 1rem", borderRadius: "0.5rem" }}
                    onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = "#0f766e"; }}
                    onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = "#0d9488"; }}
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              {/* Admin button */}
              {isAdminLoggedIn ? (
                <button
                  style={navBtnRed}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = "#b91c1c"; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = "#dc2626"; }}
                  onClick={handleAdminLogout}
                >
                  Admin Logout
                </button>
              ) : (
                <button
                  style={navBtnTeal}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = "#0f766e"; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = "#0d9488"; }}
                  onClick={() => setAdminModalOpen(true)}
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>
        </div>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl" py="xl" style={{ maxWidth: 1320 }}>
          <Grid>
            <Grid.Col span={12}>{children}</Grid.Col>
          </Grid>
        </Container>

        {/* Footer – matches HTMX dark footer at end of content */}
        <footer style={{ background: "#1f2937", color: "#9ca3af", padding: "1.5rem 0", marginTop: "3rem" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.875rem" }}>© 2024 Notes App</span>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="#" style={footerLinkStyle}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
              >Privacy Policy</a>
              <a href="#" style={footerLinkStyle}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
              >Terms of Service</a>
              <a href="#" style={footerLinkStyle}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
              >Contact Us</a>
            </div>
          </div>
        </footer>
      </AppShell.Main>

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
