<script lang="ts">
  import { onMount } from 'svelte';
  import { notesStore } from '$lib/stores/notes';
  import { goto } from '$app/navigation';
  import { useClerkContext } from 'svelte-clerk/client';
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

  // Function to get Clerk token
  async function getClerkToken(): Promise<string | null> {
    try {
      if (!clerkCtx || !clerkCtx.session) {
        console.log('No active Clerk session available');
        return null;
      }

      const token = await clerkCtx.session.getToken();
      console.log('Clerk token retrieved successfully');
      return token;
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

  // Fetch authenticated private notes endpoint
  async function fetchAuthenticatedPrivateNotes() {
    if (!isSignedIn || !userToken) {
      console.log('Not fetching private notes - user not signed in or no token', { isSignedIn, hasToken: !!userToken });
      return;
    }

    try {
      console.log('Starting authenticated request to /api/private-notes');
      loading = true;
      
      // Get user's private notes from the private notes endpoint
      const response = await fetch('/api/private-notes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
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

  // Fetch all user notes (both private and public)
  async function fetchUserNotes() {
    if (!isSignedIn || !userToken) {
      console.log('Not fetching user notes - user not signed in or no token');
      return;
    }

    try {
      loading = true;
      console.log('Fetching all user notes (private and public)');
      
      // Get all user notes from all endpoints
      const [privateResponse, publicResponse] = await Promise.all([
        // Get user's private notes
        fetch('/api/notes', {
          headers: {
            'Authorization': `Bearer ${userToken}`,
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

  // Function to refresh all notes after a change
  async function refreshAllNotes() {
    console.log('Refreshing all notes...');
    loading = true;
    
    try {
      // Reset error state
      error = null;
      
      // Start with fetching public notes
      await fetchPublicNotes();
      
      // Then fetch user's notes if signed in
      if (isSignedIn && userToken) {
        console.log('Fetching user notes with token');
        await fetchUserNotes();
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
    
    // Only access Clerk context after component is mounted
    if (clerkCtx) {
      try {
        console.log('Checking Clerk authentication status...');
        
        // Check if user is signed in
        isSignedIn = clerkCtx.auth?.userId !== null;
        console.log('User signed in:', isSignedIn);
        
        // If signed in, get the token for future API calls
        if (isSignedIn) {
          console.log('Getting JWT token for authenticated requests...');
          
          try {
            userToken = await getClerkToken();
            console.log('Token received immediately:', userToken ? 'Yes (token hidden)' : 'No');
            
            if (userToken) {
              // Load all notes (both public and private)
              console.log('Fetching all user notes...');
              await fetchUserNotes();
              
              // Also fetch public notes to ensure we see all available notes
              console.log('Fetching all public notes...');
              await fetchPublicNotes();
            } else {
              console.warn('No user token available - trying again with delay');
              // If token wasn't available immediately, try again with a delay
              setTimeout(async () => {
                userToken = await getClerkToken();
                console.log('Token received after delay:', userToken ? 'Yes (token hidden)' : 'No');
                
                if (userToken) {
                  // Load all notes after delay
                  console.log('Fetching all user notes after delay...');
                  await fetchUserNotes();
                  
                  // Also fetch public notes
                  console.log('Fetching all public notes after delay...');
                  await fetchPublicNotes();
                } else {
                  console.error('Failed to get user token even after delay');
                }
              }, 1000); // Longer delay to ensure Clerk is fully initialized
            }
          } catch (tokenError) {
            console.error('Error getting Clerk token:', tokenError);
          }
        } else {
          // Even if not signed in, still fetch public notes
          console.log('User not signed in, fetching public notes only...');
          await fetchPublicNotes();
        }
      } catch (err) {
        console.error('Error using Clerk context:', err);
      }
    } else {
      console.log('Clerk context not available, fetching public notes only...');
      await fetchPublicNotes();
    }
    
    // Check for existing admin API key
    const storedApiKey = localStorage.getItem('adminApiKey');
    if (storedApiKey) {
      adminApiKey = storedApiKey;
      isAdminLoggedIn = true;
      console.log('Admin login detected');
    }

    // Fetch notes
    console.log('Fetching public notes...');
    await fetchPublicNotes();
    
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

<div class="container mx-auto px-4 py-8">
  <main class="p-4">
    {#if error}
      <Alert color="red" rounded={true} class="my-4">
        <span class="font-medium">{error}</span>
      </Alert>
    {/if}

    <!-- Anonymous: create public note prompt (matches React anonymous section) -->
    {#if !isSignedIn}
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Create a Public Note</h2>
        <p class="text-gray-600 mb-4">You can post public notes anonymously without signing in.</p>
        <Button color="green" class="bg-green-600 hover:bg-green-700 text-white" onclick={() => {
          editingNote = null;
          createPublicNote = true;
          createNoteModalOpen = true;
        }}>
          <span class="text-xl mr-2">+</span>
          Create Public Note
        </Button>
      </div>
    {/if}

    <div class="mt-6">
      <section class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Public Notes ({publicNotes.length || 0})</h2>
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
            <p class="text-gray-600 text-lg font-medium">No public notes available.</p>
            <p class="text-gray-500">Be the first one to post a public note!</p>
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
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each publicNotes as note}
              <Card padding="sm" class="bg-green-50 relative">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-lg font-semibold">{note.title || 'Untitled'}</h3>
                  <Badge color="green" class="font-semibold px-2.5 py-1 bg-green-200 text-green-800">PUBLIC</Badge>
                </div>
                <p class="text-gray-600 mb-4">{note.content}</p>
                <div class="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    {#if isCurrentUserAuthor(note)}
                      Posted by you
                      <!-- Add a debug indicator for troubleshooting -->
                      <span class="text-xs text-green-600 ml-1">(authored by you)</span>
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
                <!-- Show edit button for notes owned by the user or for admin users -->
                {#if isAdminLoggedIn || (isSignedIn && isCurrentUserAuthor(note))}
                  <div class="absolute bottom-2 right-2">
                    <Button size="xs" class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 p-0 flex items-center justify-center" onclick={() => {
                      editingNote = note;
                      createPublicNote = true; // It's definitely a public note
                      createNoteModalOpen = true;
                    }}>
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                      </svg>
                    </Button>
                  </div>
                {/if}
              </Card>
            {/each}
          </div>
        {/if}
      </section>
    </div>

    <!-- Private Notes Section - Only show for signed in users -->
    {#if isSignedIn}
      <section class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Your Notes ({privateNotes.length || 0})</h2>
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
            <p class="text-gray-600 text-lg font-medium">You don't have any notes yet.</p>
            <p class="text-gray-500">Create your first note using one of the buttons above!</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each privateNotes as note}
              <Card padding="sm" class={note.isPublic === 'true' || note.isPublic === true ? "bg-green-50 relative" : "bg-purple-50 relative"}>
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
                <!-- Show edit button for notes owned by the user or for admin users -->
                {#if isAdminLoggedIn || (isSignedIn && isCurrentUserAuthor(note))}
                  <div class="absolute bottom-2 right-2">
                    <Button size="xs" class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 p-0 flex items-center justify-center" onclick={() => {
                      editingNote = note;
                      createPublicNote = note.isPublic === 'true' || note.isPublic === true;
                      createNoteModalOpen = true;
                    }}>
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                      </svg>
                    </Button>
                  </div>
                {/if}
              </Card>
            {/each}
          </div>
        {/if}
      </section>
    {/if}
  </main>
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
