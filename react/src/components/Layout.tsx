import {Container, Grid, AppShell, Modal} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {SignInButton, SignedIn, SignedOut, useUser, useAuth, useClerk} from '@clerk/clerk-react';
import AdminLoginForm from './AdminLoginForm';
import {GlobalSearch} from './GlobalSearch';
import {useNoteContext} from '../context/NoteContext';

interface VersionsPayload {
  version: string;
  name: string;
  environment: string;
  commitSha: string | null;
  timestamp: string;
  elysia: string | null;
  frameworks: {[k: string]: {name: string; version: string; dependencies: {[key: string]: string}}};
}

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
  const navigate = useNavigate();
  const {user, isSignedIn} = useUser();
  const {getToken} = useAuth();
  const {signOut} = useClerk();
  const {refreshTrigger} = useNoteContext();
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminApiKey, setAdminApiKey] = useState<string | null>(null);
  const [publicNotesCount, setPublicNotesCount] = useState(0);
  const [privateNotesCount, setPrivateNotesCount] = useState(0);

  // Store the current user ID in localStorage when they sign in
  useEffect(() => {
    if (isSignedIn && user?.id) {
      localStorage.setItem('currentUserId', user.id);
    } else if (!isSignedIn) {
      localStorage.removeItem('currentUserId');
    }
  }, [isSignedIn, user?.id]);

  // Fetch note counts
  const fetchNoteCounts = useCallback(async () => {
    if (!isSignedIn) {
      // Still fetch public notes count even when signed out
      try {
        const publicResponse = await fetch('/api/public-notes');
        const publicData = await publicResponse.json();
        const publicCount = Array.isArray(publicData) ? publicData.length : 0;
        setPublicNotesCount(publicCount);
      } catch (err) {
        console.error('Error fetching public notes count:', err);
      }
      setPrivateNotesCount(0);
      return;
    }

    try {
      // Check if user is admin
      if (isAdminLoggedIn && adminApiKey) {
        // Fetch all notes as admin
        const response = await fetch('/api/notes/all', {
          headers: {
            'X-API-Key': adminApiKey,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch admin notes counts');
        }

        const allNotes = await response.json();

        if (Array.isArray(allNotes)) {
          // Count public and private notes
          const publicCount = allNotes.filter((note) => note.isPublic === 'true').length;
          const privateCount = allNotes.length - publicCount;

          setPublicNotesCount(publicCount);
          setPrivateNotesCount(privateCount);
        }
        return;
      }

      // Regular user flow - fetch user's notes
      // Fetch public notes count
      const publicResponse = await fetch('/api/public-notes');
      const publicData = await publicResponse.json();
      const publicCount = Array.isArray(publicData) ? publicData.length : 0;
      setPublicNotesCount(publicCount);

      // Fetch private notes if user is signed in
      const token = await getToken();
      if (token) {
        const privateResponse = await fetch('/api/private-notes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const privateData = await privateResponse.json();

        // Filter to only include truly private notes (isPublic !== "true")
        const trulyPrivateNotes = Array.isArray(privateData)
          ? privateData.filter((note) => note.isPublic !== 'true')
          : [];

        setPrivateNotesCount(trulyPrivateNotes.length);
      }
    } catch (err) {
      console.error('Error fetching note counts:', err);
    }
  }, [isSignedIn, isAdminLoggedIn, adminApiKey, getToken]);

  // Versions: fetch once on load, show in expandable panel
  const [versionsData, setVersionsData] = useState<VersionsPayload | null>(null);
  const [versionsOpen, setVersionsOpen] = useState(false);
  const [versionsError, setVersionsError] = useState<string | null>(null);
  useEffect(() => {
    fetch('/versions')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${r.status}`))))
      .then((data: VersionsPayload) => setVersionsData(data))
      .catch((err) => setVersionsError(err?.message ?? 'Failed to load versions'));
  }, []);

  // Check for existing admin API key in localStorage on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('adminApiKey');
    if (storedApiKey) {
      // We'll assume the key is valid for now
      setAdminApiKey(storedApiKey);
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Fetch note counts on load, auth state changes, and note refresh events
  useEffect(() => {
    fetchNoteCounts();
  }, [fetchNoteCounts, refreshTrigger]);

  const handleAdminLogin = (apiKey: string) => {
    // For simplicity, we're not making the actual API call here
    // In a real app, you'd verify the API key first
    setAdminApiKey(apiKey);
    setIsAdminLoggedIn(true);
    localStorage.setItem('adminApiKey', apiKey);
    setAdminModalOpen(false);

    // Refresh note counts to show admin counts
    fetchNoteCounts();
    // Send admins directly to the table view on first login.
    navigate('/notes');
  };

  const handleAdminLogout = () => {
    setAdminApiKey(null);
    setIsAdminLoggedIn(false);
    localStorage.removeItem('adminApiKey');

    // Force page reload to update admin state across components
    window.location.reload();
  };

  // Shared button styles
  const navBtnTeal = {
    background: '#0d9488',
    color: 'white',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.25rem',
    fontWeight: 500,
    fontSize: '0.875rem',
    border: 'none',
    cursor: 'pointer' as const,
  };
  const navBtnRed = {
    ...navBtnTeal,
    background: '#dc2626',
  };
  const navBadgeGreen = {
    fontSize: '0.75rem',
    padding: '0.125rem 0.5rem',
    borderRadius: '0.25rem',
    background: '#dcfce7',
    color: '#166534',
    fontWeight: 600,
  };
  const navBadgePurple = {
    fontSize: '0.75rem',
    padding: '0.125rem 0.5rem',
    borderRadius: '0.25rem',
    background: '#f3e8ff',
    color: '#6b21a8',
    fontWeight: 600,
  };
  const footerLinkStyle = {fontSize: '0.875rem', color: '#9ca3af', textDecoration: 'none'};

  return (
    <AppShell
      styles={{
        main: {
          background: '#f3f4f6',
          minHeight: '100vh',
          padding: 0,
          paddingTop: '60px',
        },
      }}
      header={{height: 60}}
      padding={0}
    >
      <AppShell.Header style={{position: 'fixed', top: 0, zIndex: 1000}}>
        <div
          style={{
            background: '#fff',
            borderBottom: '1px solid #e5e7eb',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              maxWidth: 1320,
              width: '100%',
              margin: '0 auto',
              padding: '0 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Brand */}
            <Link
              to='/'
              style={{textDecoration: 'none', fontSize: '1.25rem', fontWeight: 700, color: '#111827', flexShrink: 0}}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#0f766e';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#111827';
              }}
            >
              Elysia Notes - React
            </Link>

            {/* Global search - right of title, left of nav */}
            <GlobalSearch adminApiKey={adminApiKey} />

            {/* Nav links */}
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0}}>
              <Link
                to='/'
                style={{textDecoration: 'none', fontSize: '0.875rem', color: '#374151', fontWeight: 500}}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#111827';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#374151';
                }}
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
                  to='/notes'
                  style={{
                    textDecoration: 'none',
                    color: '#374151',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#111827';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#374151';
                  }}
                >
                  {isAdminLoggedIn ? 'All Notes' : 'My Notes'}
                  <span style={navBadgeGreen}>Public: {publicNotesCount}</span>
                  <span style={navBadgePurple}>Private: {privateNotesCount}</span>
                </Link>
              </SignedIn>

              {/* Auth area */}
              <SignedIn>
                <span style={{fontSize: '0.875rem', color: '#374151'}}>Hello, {user?.firstName || 'User'}</span>
                <button
                  onClick={() => signOut()}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: '#4b5563',
                    fontWeight: 500,
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#111827';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#4b5563';
                  }}
                >
                  Sign Out
                </button>
              </SignedIn>

              <SignedOut>
                <SignInButton mode='modal'>
                  <button
                    style={{...navBtnTeal, padding: '0.5rem 1rem', borderRadius: '0.5rem'}}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.background = '#0f766e';
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.background = '#0d9488';
                    }}
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              {/* Admin button */}
              {isAdminLoggedIn ? (
                <button
                  style={navBtnRed}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#b91c1c';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#dc2626';
                  }}
                  onClick={handleAdminLogout}
                >
                  Admin Logout
                </button>
              ) : (
                <button
                  style={navBtnTeal}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#0f766e';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#0d9488';
                  }}
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
        <Container size='xl' py='xl' style={{maxWidth: 1320}}>
          <Grid>
            <Grid.Col span={12}>{children}</Grid.Col>
          </Grid>
        </Container>

        {/* Footer – matches HTMX dark footer; Versions inline with other links */}
        <footer
          style={{
            background: '#1f2937',
            color: '#9ca3af',
            padding: '1.5rem 0',
            marginTop: '3rem',
            position: 'relative',
          }}
        >
          {versionsOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                right: '1rem',
                marginBottom: 4,
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                padding: 16,
                maxWidth: 360,
                maxHeight: '70vh',
                overflow: 'auto',
                textAlign: 'left',
                zIndex: 50,
              }}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                <span style={{fontWeight: 600, color: '#1f2937'}}>Versions</span>
                <button
                  type='button'
                  style={{background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#6b7280'}}
                  onClick={() => setVersionsOpen(false)}
                  aria-label='Close'
                >
                  ×
                </button>
              </div>
              {versionsError && <p style={{fontSize: '0.875rem', color: '#dc2626'}}>{versionsError}</p>}
              {versionsData && (
                <dl style={{fontSize: '0.875rem', margin: 0}}>
                  <div style={{marginBottom: 8}}>
                    <dt style={{color: '#6b7280'}}>App</dt>
                    <dd style={{fontWeight: 500, margin: 0}}>
                      {versionsData.name} @ {versionsData.version}
                    </dd>
                  </div>
                  {versionsData.elysia && (
                    <div style={{marginBottom: 8}}>
                      <dt style={{color: '#6b7280'}}>Elysia</dt>
                      <dd style={{fontWeight: 500, margin: 0}}>{versionsData.elysia}</dd>
                    </div>
                  )}
                  {versionsData.commitSha && (
                    <div style={{marginBottom: 8}}>
                      <dt style={{color: '#6b7280'}}>Commit</dt>
                      <dd style={{fontFamily: 'monospace', fontSize: '0.75rem', wordBreak: 'break-all', margin: 0}}>
                        {versionsData.commitSha}
                      </dd>
                    </div>
                  )}
                  <div style={{marginBottom: 8}}>
                    <dt style={{color: '#6b7280'}}>Environment</dt>
                    <dd style={{margin: 0}}>{versionsData.environment}</dd>
                  </div>
                  {Object.keys(versionsData.frameworks).length > 0 && (
                    <div style={{marginTop: 12}}>
                      <dt style={{color: '#6b7280', marginBottom: 4}}>Frameworks</dt>
                      <dd style={{margin: 0}}>
                        {Object.entries(versionsData.frameworks).map(([key, info]) => (
                          <div key={key} style={{marginBottom: 8, paddingLeft: 8, borderLeft: '2px solid #e5e7eb'}}>
                            <span style={{fontWeight: 500}}>{info.name}</span>{' '}
                            <span style={{color: '#4b5563'}}>{info.version}</span>
                            {Object.keys(info.dependencies).length > 0 && (
                              <ul style={{fontSize: '0.75rem', color: '#6b7280', margin: '4px 0 0 0', paddingLeft: 16}}>
                                {Object.entries(info.dependencies).map(([dep, ver]) => (
                                  <li key={dep}>
                                    {dep}: {ver}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              )}
              {!versionsData && !versionsError && <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Loading…</p>}
            </div>
          )}
          <div
            style={{
              maxWidth: 1320,
              margin: '0 auto',
              padding: '0 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{fontSize: '0.875rem'}}>© 2024 Notes App</span>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap'}}>
              <a
                href='#'
                style={footerLinkStyle}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'white';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#9ca3af';
                }}
              >
                Privacy Policy
              </a>
              <a
                href='#'
                style={footerLinkStyle}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'white';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#9ca3af';
                }}
              >
                Terms of Service
              </a>
              <a
                href='#'
                style={footerLinkStyle}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'white';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#9ca3af';
                }}
              >
                Contact Us
              </a>
              <button
                type='button'
                style={{...footerLinkStyle, background: 'none', border: 'none', cursor: 'pointer', padding: 0}}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'white';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#9ca3af';
                }}
                onClick={() => setVersionsOpen((o) => !o)}
              >
                Versions
              </button>
            </div>
          </div>
        </footer>
      </AppShell.Main>

      {/* Admin Login Modal */}
      <Modal opened={adminModalOpen} onClose={() => setAdminModalOpen(false)} title='Admin Login' centered>
        <AdminLoginForm
          onAdminLogin={handleAdminLogin}
          isAdminLoggedIn={isAdminLoggedIn}
          onAdminLogout={handleAdminLogout}
        />
      </Modal>
    </AppShell>
  );
};
