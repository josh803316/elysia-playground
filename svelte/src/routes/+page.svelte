<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { notesStore } from '$lib/stores/notes';
  import { goto } from '$app/navigation';
  import { useClerkContext } from 'svelte-clerk/client';
  import { SignedIn, SignedOut, SignInButton } from 'svelte-clerk/client';
  import { 
    Alert, 
    Button, 
    Badge, 
    Spinner, 
    Heading,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Label,
    Input,
    Textarea
  } from 'flowbite-svelte';
  import { Card } from 'flowbite-svelte';
  import NoteModal from '$lib/components/NoteModal.svelte';
  import Footer from '$lib/components/Footer.svelte';

  // Define note type for better type safety
  interface Note {
    id: string;
    title?: string;
    content?: string;
    isPublic: boolean | string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
    user?: {
      id?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
    };
  }

  // State 
  let publicNotes = $state<Note[]>([]);
  let privateNotes = $state<Note[]>([]);
  let allNotes = $state<Note[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let isAdminLoggedIn = $state(false);
  let adminApiKey = $state<string | null>(null);
  let createNoteModalOpen = $state(false);
  let createPublicNote = $state(false);
  let initialized = $state(false);
  let anonymousNoteTitle = $state('');
  let anonymousNoteContent = $state('');
  let submittingAnonymousNote = $state(false);
  let anonymousNoteError = $state<string | null>(null);
  let isSignedIn = $state(false);
  let userToken = $state<string | null | undefined>(null);
  let editingNote = $state<Note | null>(null);

  // Test section to verify Flowbite-Svelte components are working
  let showTestAlert = $state(false);
  
  // Get Clerk context - must be called during component initialization
  let clerkCtx: any = null;
  let userData: any = null;
  if (typeof window !== 'undefined') {
    try {
      clerkCtx = useClerkContext();
      // Try to get user data if clerk context is available
      if (clerkCtx && clerkCtx.user) {
        userData = clerkCtx.user;
      }
    } catch (err) {
      console.error('Error getting Clerk context:', err);
    }
  }

  // Function to get Clerk token (tries context first, then window.Clerk so we get a token when layout has one)
  async function getClerkToken(): Promise<string | null> {
    try {
      if (clerkCtx?.session) {
        const token = await clerkCtx.session.getToken();
        if (token) return token;
      }
      if (typeof window !== 'undefined' && (window as any).Clerk?.session) {
        const token = await (window as any).Clerk.session.getToken();
        if (token) return token;
      }
      return null;
    } catch (error) {
      console.error('Error getting Clerk token:', error);
      return null;
    }
  }

  // Fetch public notes
  async function fetchPublicNotes() {
    try {
      loading = true;
      const response = await fetch('/api/public-notes');
      if (!response.ok) {
        throw new Error(`Failed to fetch public notes: ${response.status}`);
      }
      const data = await response.json();
      publicNotes = Array.isArray(data) ? data : [];
      console.log(`Fetched ${publicNotes.length} public notes`);
    } catch (err) {
      console.error('Error fetching public notes:', err);
      error = 'Failed to load public notes';
    } finally {
      loading = false;
    }
  }

  // Fetch authenticated private notes from /api/private-notes. Pass token when parent userToken may not be set yet.
  async function fetchAuthenticatedPrivateNotes(token?: string | null) {
    const authToken = token ?? userToken;
    if (!isSignedIn || !authToken) {
      console.log('Not fetching private notes - user not signed in or no token', { isSignedIn, hasToken: !!authToken });
      return;
    }

    try {
      console.log('Starting authenticated request to /api/private-notes');
      loading = true;
      
      const response = await fetch('/api/private-notes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Private notes response status:', response.status);
      
      if (!response.ok) {
        console.error('Failed response from private-notes:', response.status, response.statusText);
        throw new Error(`Failed to fetch private notes: ${response.status}`);
      }

      const data = await response.json();
      console.log('Private notes from authenticated endpoint:', data);

      // Store the private notes
      if (Array.isArray(data)) {
        privateNotes = data;
        console.log(`Received ${data.length} private notes`);
      } else {
        privateNotes = [];
        console.log('Received non-array response for private notes', data);
      }
    } catch (err) {
      console.error('Error fetching authenticated private notes:', err);
      error = 'Failed to load your private notes';
    } finally {
      loading = false;
    }
  }

  // Fetch all user notes (both private and public). Pass token when parent userToken may not be set yet (e.g. after modal save).
  async function fetchUserNotes(token?: string | null) {
    const authToken = token ?? userToken;
    if (!isSignedIn || !authToken) {
      console.log('Not fetching user notes - user not signed in or no token', { isSignedIn, hasToken: !!authToken });
      return;
    }

    try {
      loading = true;
      console.log('Fetching all user notes (private and public)');
      
      // Get all user notes from all endpoints
      const [privateResponse, publicResponse] = await Promise.all([
        // Get user's notes (private + public they own)
        fetch('/api/notes', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }),
        // Get all public notes (will filter for user's notes later)
        fetch('/api/public-notes')
      ]);
      
      if (!privateResponse.ok) {
        console.error('Failed to fetch private notes:', privateResponse.status);
      }
      
      if (!publicResponse.ok) {
        console.error('Failed to fetch public notes:', publicResponse.status);
      }
      
      // Parse response data
      const privateData = privateResponse.ok ? await privateResponse.json() : [];
      const publicData = publicResponse.ok ? await publicResponse.json() : [];
      
      console.log('User private notes:', privateData.length);
      console.log('All public notes:', publicData.length);

      // Filter public notes to only include those authored by the current user
      let userPublicNotes: any[] = [];
      
      if (Array.isArray(publicData) && clerkCtx && clerkCtx.user) {
        // Filter public notes to find ones created by current user
        userPublicNotes = publicData.filter((publicNote: any) => {
          if (!publicNote) return false;
          
          // Check direct userId match
          if (publicNote.userId === clerkCtx.user.id) return true;
          
          // Check user.id match
          if (publicNote.user && publicNote.user.id === clerkCtx.user.id) return true;
          
          // Check by email
          if (publicNote.user && publicNote.user.email && 
              publicNote.user.email === clerkCtx.user.primaryEmailAddress?.emailAddress) {
            return true;
          }
          
          return false;
        });
      }
      
      console.log('Found user public notes:', userPublicNotes.length);
      
      // Combine both sets of notes
      const combinedNotes = [...privateData];
      
      // Add public notes that aren't already in the private notes array
      const privateNoteIds = new Set(privateData.map((note: any) => note.id));
      
      // Add public notes that aren't already included
      for (const publicNote of userPublicNotes) {
        if (publicNote && publicNote.id && !privateNoteIds.has(publicNote.id)) {
          combinedNotes.push(publicNote);
        }
      }
      
      // Store in privateNotes state (which now includes all user notes)
      privateNotes = combinedNotes;
      
      console.log(`Combined user notes: ${privateNotes.length} total,`,
        `${privateNotes.filter(n => n.isPublic === 'true' || n.isPublic === true).length} public,`,
        `${privateNotes.filter(n => n.isPublic !== 'true' && n.isPublic !== true).length} private`);

      // Store IDs of all user notes (both private and public) for "Posted by you" display
      const userNoteIds = combinedNotes.map(note => note.id);
      localStorage.setItem('userNoteIds', JSON.stringify(userNoteIds));
      console.log('Stored userNoteIds in localStorage:', userNoteIds);
      
    } catch (err) {
      console.error('Error fetching user notes:', err);
      error = 'Failed to load your notes';
    } finally {
      loading = false;
    }
  }

  // Fetch all notes (admin only)
  async function fetchAllNotes() {
    if (!isAdminLoggedIn || !adminApiKey) return;

    try {
      loading = true;
      console.log('Fetching all notes with API key:', adminApiKey);

      // Correct endpoint is /api/notes/all as defined in notes.controller.ts
      const response = await fetch('/api/notes/all', {
        headers: {
          'X-API-Key': adminApiKey as string // Type assertion since we already checked it's not null
        },
      });

      if (!response.ok) {
        throw new Error(`Admin request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Admin notes data:', data);
      allNotes = data;
    } catch (err) {
      console.error('Error fetching all notes as admin:', err);
      error = 'Failed to load all notes. Admin access may be invalid.';
      // If we get an authorization error, log out the admin
      if (err instanceof Error && err.message.includes('401')) {
        handleAdminLogout();
      }
    } finally {
      loading = false;
    }
  }

  // Handle admin logout
  function handleAdminLogout() {
    adminApiKey = null;
    isAdminLoggedIn = false;
    allNotes = [];
    // Remove the API key from localStorage
    localStorage.removeItem('adminApiKey');
  }

  // Open note creation modal
  function handleCreateNote(isPublic = false) {
    createPublicNote = isPublic;
    createNoteModalOpen = true;
  }

  // Edit note in modal
  function handleEditNote(note: any) {
    createPublicNote = note.isPublic === 'true';
    createNoteModalOpen = true;
    // Pass the note data to the modal
    return note;
  }

  // Submit anonymous note
  async function handleSubmitAnonymousNote() {
    if (!anonymousNoteContent.trim()) {
      anonymousNoteError = 'Note content cannot be empty';
      return;
    }

    try {
      submittingAnonymousNote = true;
      anonymousNoteError = null;

      // Post a public note
      const response = await fetch('/api/public-notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: anonymousNoteTitle,
          content: anonymousNoteContent,
          isPublic: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create note');
      }

      // Reset form
      anonymousNoteTitle = '';
      anonymousNoteContent = '';

      // Refresh notes
      fetchPublicNotes();
    } catch (err) {
      console.error('Error creating note:', err);
      anonymousNoteError = 'Failed to create note. Please try again.';
    } finally {
      submittingAnonymousNote = false;
    }
  }

  // Manual test function for private notes API
  async function testPrivateNotesAPI() {
    if (!userToken) {
      console.log('No user token available for testing');
      error = 'Please login first - no token available';
      return;
    }
    
    console.log('=== MANUAL TEST: Fetching private notes ===');
    
    try {
      // Test direct call to API
      const directResponse = await fetch('/api/private-notes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Private notes direct API response:', {
        status: directResponse.status,
        ok: directResponse.ok,
        statusText: directResponse.statusText
      });
      
      if (directResponse.ok) {
        const data = await directResponse.json();
        console.log('Private notes direct API data:', data);
        error = null;
      } else {
        const errorText = await directResponse.text();
        console.error('Private notes API error:', errorText);
        error = `API Error: ${directResponse.status} ${directResponse.statusText}`;
      }
    } catch (err) {
      console.error('Error testing private notes API:', err);
      error = 'Failed to test private notes API: ' + (err instanceof Error ? err.message : String(err));
    }
  }

  // Delete a note (public section, your notes, or as admin)
  async function deleteNote(note: Note, isFromPrivateSection: boolean = false) {
    if (!confirm('Are you sure you want to delete this note?')) return;
    try {
      if (isAdminLoggedIn && adminApiKey) {
        const res = await fetch(`/api/notes/${note.id}/admin`, { method: 'DELETE', headers: { 'X-API-Key': adminApiKey } });
        if (!res.ok) throw new Error('Failed to delete');
      } else if (isFromPrivateSection && userToken) {
        const res = await fetch(`/api/private-notes/${note.id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${userToken}` } });
        if (!res.ok) throw new Error('Failed to delete');
      } else if (note.userId && userToken && isCurrentUserAuthor(note)) {
        const res = await fetch(`/api/notes/${note.id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${userToken}` } });
        if (!res.ok) throw new Error('Failed to delete');
      } else if (!note.userId && (note.isPublic === 'true' || note.isPublic === true)) {
        const res = await fetch(`/api/public-notes/${note.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
      } else {
        throw new Error('Cannot delete this note');
      }
      await refreshAllNotes();
    } catch (err) {
      console.error('Delete note error:', err);
      error = err instanceof Error ? err.message : 'Failed to delete note';
    }
  }

  // Function to refresh all notes after a change
  async function refreshAllNotes() {
    console.log('Refreshing all notes...');
    loading = true;
    
    try {
      // Reset error state
      error = null;
      
      // Start with fetching public notes
      await fetchPublicNotes();
      
      // Then fetch user's notes if signed in (get token so we refresh even when parent userToken not set yet, e.g. after modal save)
      if (isSignedIn) {
        const token = userToken ?? await getClerkToken();
        if (token) {
          console.log('Fetching user notes with token');
          await fetchUserNotes(token);
        }
      }
      
      // Fetch admin notes if logged in as admin
      if (isAdminLoggedIn && adminApiKey) {
        await fetchAllNotes();
      }
      
      // Force a re-check of all edit buttons by resetting and reloading localStorage userNoteIds
      if (isSignedIn && privateNotes.length > 0) {
        // Update the user note IDs in localStorage
        const userNoteIds = privateNotes.map(note => note.id);
        localStorage.setItem('userNoteIds', JSON.stringify(userNoteIds));
        console.log('Updated userNoteIds in localStorage:', userNoteIds);
      }
      
      console.log('All notes refreshed successfully');
    } catch (err) {
      console.error('Error refreshing notes:', err);
      error = err instanceof Error ? err.message : 'Failed to refresh notes';
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    console.log('Component mounted, initializing...');

    async function loadPrivateNotesWhenReady() {
      const clerk = typeof window !== 'undefined' ? (window as any).Clerk : null;
      if (!clerk?.user) return false;
      console.log('Clerk ready (window.Clerk.user), loading private notes...');
      isSignedIn = true;
      const token = await getClerkToken();
      if (token) {
        userToken = token;
        await fetchUserNotes(token);
        if (privateNotes.length === 0) await fetchAuthenticatedPrivateNotes(token);
      }
      return true;
    }

    function scheduleClerkReadyCheck() {
      const maxAttempts = 12;
      const delays = [0, 100, 250, 500, 750, 1000, 1300, 1700, 2100, 2600, 3200, 4000];
      let attempt = 0;
      const tryLoad = async () => {
        if (await loadPrivateNotesWhenReady()) return;
        attempt += 1;
        if (attempt < maxAttempts) setTimeout(tryLoad, delays[attempt] ?? 500);
      };
      tryLoad();
      // When Clerk appears, also subscribe so we run once when auth state is set
      const pollForClerk = (tries: number) => {
        const clerk = (window as any).Clerk;
        if (clerk) {
          clerk.addListener(() => void loadPrivateNotesWhenReady());
          void loadPrivateNotesWhenReady();
          return;
        }
        if (tries < 30) setTimeout(() => pollForClerk(tries + 1), 100);
      };
      setTimeout(() => pollForClerk(0), 50);
    }
    
    // Layout shows SignedIn via window.Clerk; page's clerkCtx often lags (not hydrated yet). So we always
    // fetch public notes first, then rely on window.Clerk for auth and run scheduleClerkReadyCheck so we
    // load private notes when Clerk is ready (same source as layout).
    try {
      console.log('Checking Clerk authentication status (window.Clerk is source of truth)...');
      const clerkNow = typeof window !== 'undefined' ? (window as any).Clerk : null;
      const signedInNow = !!(clerkNow?.user);
      isSignedIn = signedInNow;
      console.log('User signed in (from window.Clerk):', signedInNow);

      if (signedInNow) {
        let token = await getClerkToken();
        if (token) userToken = token;
        if (token) {
          await fetchUserNotes(token);
          if (privateNotes.length === 0) await fetchAuthenticatedPrivateNotes(token);
        }
        await fetchPublicNotes();
        // In case token wasn't ready yet, still schedule a follow-up check
        if (privateNotes.length === 0) scheduleClerkReadyCheck();
      } else {
        await fetchPublicNotes();
        scheduleClerkReadyCheck();
      }
    } catch (err) {
      console.error('Error during notes init:', err);
      await fetchPublicNotes();
      scheduleClerkReadyCheck();
    }

    // Check for existing admin API key
    const storedApiKey = localStorage.getItem('adminApiKey');
    if (storedApiKey) {
      adminApiKey = storedApiKey;
      isAdminLoggedIn = true;
      console.log('Admin login detected');
    }

    // Ensure public notes are loaded if not already (e.g. no Clerk context)
    if (publicNotes.length === 0) {
      await fetchPublicNotes();
    }

    if (isAdminLoggedIn && adminApiKey) {
      console.log('Fetching all notes as admin...');
      await fetchAllNotes();
    }

    initialized = true;
    console.log('Component initialization complete');
  });

  // Get formatted date
  function formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch (e) {
      return dateString || 'Unknown date';
    }
  }

  // Helper function to determine if current user is the author
  function isCurrentUserAuthor(note: any): boolean {
    // If admin is logged in, allow editing all notes
    if (isAdminLoggedIn) {
      return true;
    }
    
    // Check if user is logged in via Clerk
    if (clerkCtx && clerkCtx.user && note) {
      // 1. Direct check if note's userId matches current user's id
      if (note.userId === clerkCtx.user.id) {
        console.log('Note author match by userId:', note.id);
        return true;
      }
      
      // 2. Check note.user fields for additional matching
      if (note.user) {
        if (note.user.id === clerkCtx.user.id) {
          console.log('Note author match by note.user.id:', note.id);
          return true;
        }
        
        // Check if the email matches
        if (note.user.email && note.user.email === clerkCtx.user.primaryEmailAddress?.emailAddress) {
          console.log('Note author match by email:', note.id);
          return true;
        }
      }
      
      // 3. Check if the note is in privateNotes array (user's notes)
      if (privateNotes.some(privateNote => privateNote.id === note.id)) {
        console.log('Note author match by privateNotes array:', note.id);
        return true;
      }
      
      // 4. Check using stored userNoteIds from localStorage as fallback
      try {
        const userNoteIds = JSON.parse(localStorage.getItem('userNoteIds') || '[]');
        if (userNoteIds.includes(note.id)) {
          console.log('Note author match by localStorage:', note.id);
          return true;
        }
      } catch (err) {
        console.error('Error checking userNoteIds in localStorage:', err);
      }
    }
    
    return false;
  }
</script>

<svelte:head>
  <title>Elysia Notes - Svelte</title>
  <meta name="description" content="A simple notes application" />
</svelte:head>

<!-- Layout matches HTMX/React: same section order and spacing when not logged in -->
<div class="space-y-8">
    {#if error}
      <Alert color="red" rounded={true} class="my-4">
        <span class="font-medium">{error}</span>
      </Alert>
    {/if}

    <!-- All Notes (Admin View) - at top when admin -->
    {#if isAdminLoggedIn}
      <section class="bg-white rounded-lg shadow-sm p-6 border border-gray-200" data-testid="section-admin-table">
        <div class="mb-4">
          <h2 class="text-2xl font-bold text-gray-800">All Notes (Admin View)</h2>
          <p class="text-gray-600 text-sm">View and manage all notes in the system</p>
        </div>
        {#if loading && allNotes.length === 0}
          <div class="flex justify-center my-4">
            <Spinner size="8" />
          </div>
        {:else if allNotes.length === 0}
          <p class="text-center py-8 text-gray-500">No notes found in the system</p>
        {:else}
          <div class="overflow-x-auto rounded-lg border border-gray-200">
            <Table hoverable={true} striped={true}>
              <TableHead>
                <TableHeadCell>Title</TableHeadCell>
                <TableHeadCell>Content Preview</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Author</TableHeadCell>
                <TableHeadCell>Created</TableHeadCell>
                <TableHeadCell>Updated</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </TableHead>
              <TableBody>
                {#each allNotes as note}
                  <TableBodyRow>
                    <TableBodyCell>{note.title || 'Untitled'}</TableBodyCell>
                    <TableBodyCell>{note.content && note.content.length > 50 ? note.content.substring(0, 50) + '...' : (note.content || '(No content)')}</TableBodyCell>
                    <TableBodyCell>
                      <Badge color={note.isPublic === 'true' ? 'green' : 'purple'} class={note.isPublic === 'true' ? 'bg-green-200 text-green-800' : 'bg-purple-200 text-purple-800'}>
                        {note.isPublic === 'true' ? 'Public' : 'Private'}
                      </Badge>
                    </TableBodyCell>
                    <TableBodyCell>
                      {#if note.user && note.user.email}
                        {note.user.email}
                      {:else if note.user && (note.user.firstName || note.user.lastName)}
                        {(note.user.firstName || '') + ' ' + (note.user.lastName || '')}
                      {:else if note.userId}
                        User #{note.userId}
                      {:else}
                        Anonymous
                      {/if}
                    </TableBodyCell>
                    <TableBodyCell>{formatDate(note.createdAt)}</TableBodyCell>
                    <TableBodyCell>{formatDate(note.updatedAt)}</TableBodyCell>
                    <TableBodyCell>
                      <div class="flex space-x-2">
                        <Button size="xs" color="primary" class="px-4" onclick={() => { editingNote = note; createPublicNote = note.isPublic === 'true'; createNoteModalOpen = true; }}>
                          Edit
                        </Button>
                        <Button size="xs" color="red" class="bg-red-600 hover:bg-red-700 text-white px-4" onclick={async () => {
                          if (confirm('Are you sure you want to delete this note?')) {
                            if (adminApiKey) {
                              const res = await fetch(`/api/notes/${note.id}/admin`, { method: 'DELETE', headers: { 'X-API-Key': adminApiKey } });
                              if (res.ok) fetchAllNotes();
                            }
                          }
                        }}>Delete</Button>
                      </div>
                    </TableBodyCell>
                  </TableBodyRow>
                {/each}
              </TableBody>
            </Table>
          </div>
        {/if}
      </section>
    {/if}

    <!-- Public Notes Section (same order as HTMX/React: Admin → Public Notes → sign-in prompt → Your Notes) -->
    <section class="bg-white rounded-lg shadow-sm p-6 border border-gray-200" data-testid="section-public-notes">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Public Notes</h2>
            <p class="text-gray-600 text-sm">Visible to everyone</p>
          </div>
          <Button color="green" class="flex items-center bg-green-600 hover:bg-green-700 text-white px-4" onclick={() => {
            editingNote = null;
            createPublicNote = true;
            createNoteModalOpen = true;
          }}>
            <span class="text-xl mr-2">+</span>
            Create Public Note
          </Button>
        </div>
      
        {#if loading && !publicNotes.length}
          <div class="flex justify-center my-4">
            <Spinner size="8" />
          </div>
        {:else if error}
          <Alert color="red" class="mb-4">{error}</Alert>
        {:else if publicNotes.length === 0}
          <div class="text-center py-8 bg-green-50 rounded-lg border-2 border-dashed border-green-200 p-8">
            <svg class="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p class="text-gray-600 text-lg font-medium">No public notes yet. Be the first to create one!</p>
            <p class="text-gray-500">Use the button above to create a public note.</p>
            <Button color="green" class="mt-4 flex items-center mx-auto bg-green-600 hover:bg-green-700 text-white px-4" onclick={() => {
              editingNote = null;
              createPublicNote = true;
              createNoteModalOpen = true;
            }}>
              <span class="text-xl mr-2">+</span>
              Create Public Note
            </Button>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each publicNotes as note}
              <Card padding="sm" class="bg-green-50 flex flex-col">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-lg font-semibold">{note.title || 'Untitled'}</h3>
                  <Badge color="green" class="font-semibold px-2.5 py-1 bg-green-200 text-green-800">PUBLIC</Badge>
                </div>
                <p class="text-gray-600 mb-4">{note.content}</p>
                <div class="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    {#if isCurrentUserAuthor(note)}
                      Posted by you
                    {:else if note.user && note.user.email}
                      {note.user.email}
                    {:else if note.user && (note.user.firstName || note.user.lastName)}
                      {(note.user.firstName || '') + ' ' + (note.user.lastName || '')}
                    {:else}
                      Anonymous
                    {/if}
                  </span>
                  <span>Created: {formatDate(note.createdAt)}</span>
                </div>
                <!-- Card footer: Edit | Delete (match HTMX) - show both when user can act on the note -->
                {@const canAct = isAdminLoggedIn || (isSignedIn && isCurrentUserAuthor(note)) || (!note.userId && (note.isPublic === 'true' || note.isPublic === true))}
                {#if canAct}
                <div class="border-t border-gray-200 bg-gray-50 rounded-b-lg mt-auto px-4 py-3 flex justify-end gap-2 text-sm font-medium">
                  <button
                    type="button"
                    class="text-orange-600 hover:text-orange-800 bg-transparent border-none cursor-pointer p-0"
                    onclick={() => { editingNote = note; createPublicNote = true; createNoteModalOpen = true; }}
                  >Edit</button>
                  <span class="text-gray-400">|</span>
                  <button
                    type="button"
                    class="text-red-600 hover:text-red-800 bg-transparent border-none cursor-pointer p-0"
                    onclick={() => deleteNote(note, false)}
                  >Delete</button>
                </div>
                {/if}
              </Card>
            {/each}
          </div>
        {/if}
    </section>

    <!-- Want to create private notes? - only when signed out (match HTMX/React); client-only so prerender works -->
    {#if browser}
      <SignedOut>
        <section class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 text-center" data-testid="section-sign-in-prompt">
          <h2 class="text-xl font-semibold text-gray-700 mb-2">Want to create private notes?</h2>
          <p class="text-gray-600 mb-4">Sign in to create and manage your own private notes.</p>
          <SignInButton mode="modal">
            <Button class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 font-medium">Sign In to Get Started</Button>
          </SignInButton>
        </section>
      </SignedOut>
    {/if}

    <!-- Your Notes Section - only when signed in (use Clerk so it never shows when signed out) -->
    {#if browser}
      <SignedIn>
        <section class="bg-white rounded-lg shadow-sm p-6 border border-gray-200" data-testid="section-your-notes">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Your Notes</h2>
            <p class="text-gray-600 text-sm">Only you can see these notes</p>
          </div>
          <Button color="purple" class="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4" onclick={() => {
            editingNote = null;
            createPublicNote = false;
            createNoteModalOpen = true;
          }}>
            <span class="text-xl mr-2">+</span>
            Create Private Note
          </Button>
        </div>
        
        {#if loading && !privateNotes.length}
          <div class="flex justify-center my-4">
            <Spinner size="8" />
          </div>
        {:else if error}
          <Alert color="red" class="mb-4">{error}</Alert>
        {:else if privateNotes.length === 0}
          <div class="text-center py-8 bg-purple-50 rounded-lg border-2 border-dashed border-purple-200 p-8">
            <svg class="w-16 h-16 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p class="text-gray-600 text-lg font-medium">No notes yet.</p>
            <p class="text-gray-500">Create your first note using the button above!</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each privateNotes as note}
              <Card padding="sm" class={note.isPublic === 'true' || note.isPublic === true ? "bg-green-50 flex flex-col" : "bg-purple-50 flex flex-col"}>
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-lg font-semibold">{note.title || 'Untitled'}</h3>
                  <Badge color={note.isPublic === 'true' || note.isPublic === true ? "green" : "purple"} 
                         class={note.isPublic === 'true' || note.isPublic === true ? 
                         "font-semibold px-2.5 py-1 bg-green-200 text-green-800" : 
                         "font-semibold px-2.5 py-1 bg-purple-200 text-purple-800"}>
                    {note.isPublic === 'true' || note.isPublic === true ? "PUBLIC" : "PRIVATE"}
                  </Badge>
                </div>
                <p class="text-gray-600 mb-4">{note.content}</p>
                <div class="flex justify-between items-center text-sm text-gray-500">
                  <span>Posted by you</span>
                  <span>Created: {formatDate(note.createdAt)}</span>
                </div>
                <!-- Card footer: Edit | Delete (match HTMX) -->
                <div class="border-t border-gray-200 bg-gray-50 rounded-b-lg mt-auto px-4 py-3 flex justify-end gap-2 text-sm font-medium">
                  <button
                    type="button"
                    class="text-orange-600 hover:text-orange-800 bg-transparent border-none cursor-pointer p-0"
                    onclick={() => { editingNote = note; createPublicNote = note.isPublic === 'true' || note.isPublic === true; createNoteModalOpen = true; }}
                  >Edit</button>
                  <span class="text-gray-400">|</span>
                  <button
                    type="button"
                    class="text-red-600 hover:text-red-800 bg-transparent border-none cursor-pointer p-0"
                    onclick={() => deleteNote(note, true)}
                  >Delete</button>
                </div>
              </Card>
            {/each}
          </div>
        {/if}
        </section>
      </SignedIn>
    {/if}
</div>

<!-- Note modal -->
<NoteModal 
  open={createNoteModalOpen} 
  onClose={() => createNoteModalOpen = false} 
  onSuccess={() => refreshAllNotes()} 
  userToken={userToken}
  initialNote={editingNote as any}
  isEditing={!!editingNote}
  initialPublic={createPublicNote}
/>

<!-- Footer -->
<Footer /> 
