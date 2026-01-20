<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { useClerkContext } from 'svelte-clerk/client';
  import { 
    Alert, 
    Card, 
    Button, 
    Badge, 
    Spinner, 
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from 'flowbite-svelte';
  import NoteModal from '$lib/components/NoteModal.svelte';
  import Footer from '$lib/components/Footer.svelte';

  // State 
  let publicNotes = $state<any[]>([]);
  let privateNotes = $state<any[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let isSignedIn = $state(false);
  let userToken = $state<string | null>(null);
  let showNoteModal = $state(false);
  let editingNote = $state<any>(null);
  let isAdminLoggedIn = $state(false);
  let adminApiKey = $state<string | null>(null);
  let createPublicNote = $state(false);

  // Get Clerk context
  let clerkCtx: any = null;
  if (typeof window !== 'undefined') {
    try {
      clerkCtx = useClerkContext();
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

      // Check if session exists and is valid
      if (!clerkCtx.session.status || clerkCtx.session.status !== 'active') {
        console.log('Clerk session is not active:', clerkCtx.session.status);
        return null;
      }

      // The ensureLoaded method doesn't exist, so we'll just try to get the token directly
      const token = await clerkCtx.session.getToken();
      
      if (!token) {
        console.error('Failed to get token from Clerk session');
        return null;
      }
      
      console.log('Clerk token retrieved successfully');
      return token;
    } catch (error) {
      console.error('Error getting Clerk token:', error);
      return null;
    }
  }

  // Fetch private notes
  async function fetchPrivateNotes() {
    if (!isSignedIn || !userToken) return;

    try {
      loading = true;
      
      // Get user's notes
      const response = await fetch('/api/notes', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();

      // Include all notes (both private and public)
      if (Array.isArray(data)) {
        // Include all notes without filtering
        privateNotes = data;

        // Store IDs of all notes that belong to the user
        const userNoteIds = data.map((note) => note.id);
        localStorage.setItem('userNoteIds', JSON.stringify(userNoteIds));
      } else {
        privateNotes = [];
      }
    } catch (err) {
      console.error('Error fetching private notes:', err);
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
      
      // Get all notes as admin
      const response = await fetch('/api/notes/all', {
        headers: {
          'X-API-Key': adminApiKey
        },
      });

      if (!response.ok) {
        throw new Error(`Admin request failed with status ${response.status}`);
      }

      const data = await response.json();
      privateNotes = data; // Store all notes in privateNotes for admin view
    } catch (err) {
      console.error('Error fetching all notes as admin:', err);
      error = 'Failed to load all notes. Admin access may be invalid.';
    } finally {
      loading = false;
    }
  }

  // Open note creation modal
  function handleCreateNote() {
    editingNote = null;
    createPublicNote = false; // Default to private notes for creation
    showNoteModal = true;
  }

  // Open note editing modal
  function handleEditNote(note: any) {
    editingNote = note;
    // Set initial public status based on the note being edited
    createPublicNote = note.isPublic === 'true';
    showNoteModal = true;
  }

  // Handle successful note creation
  function handleNoteCreated() {
    fetchPrivateNotes();
  }

  // Helper function to format date with full timestamp
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  // Sort notes by creation date (newest first)
  let sortedNotes = $derived([...privateNotes].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }));

  onMount(async () => {
    console.log('Notes page mounted, initializing...');
    
    // Check for admin login
    const storedApiKey = localStorage.getItem('adminApiKey');
    if (storedApiKey) {
      adminApiKey = storedApiKey;
      isAdminLoggedIn = true;
      console.log('Admin login detected');
      
      // Fetch all notes as admin
      await fetchAllNotes();
      return;
    }
    
    // Check authentication status
    if (clerkCtx) {
      try {
        // Check if user is signed in
        isSignedIn = clerkCtx.auth?.userId !== null;
        console.log('User signed in:', isSignedIn);
        
        // If signed in, get the token for API calls
        if (isSignedIn) {
          console.log('Fetching Clerk token...');
          
          // Try to get token with retries if needed
          let retries = 2; // Reduce retries to avoid too many error messages
          
          try {
            userToken = await getClerkToken();
            
            // If first attempt failed, try with a delay
            if (!userToken && retries > 0) {
              // Wait a bit before retrying
              await new Promise(resolve => setTimeout(resolve, 1000));
              console.log('First token attempt failed, retrying...');
              userToken = await getClerkToken();
            }
          } catch (err) {
            console.error('Error fetching token:', err);
          }
          
          console.log('Token received:', userToken ? 'Yes (token hidden)' : 'No');
          
          if (userToken) {
            // Fetch notes
            await fetchPrivateNotes();
          } else {
            console.warn('No user token available - redirecting to home');
            goto('/');
          }
        } else {
          // Redirect if not signed in
          console.log('User not signed in, redirecting to home page');
          goto('/');
        }
      } catch (err) {
        console.error('Error using Clerk context:', err);
      }
    } else {
      console.log('Clerk context not available - redirecting to home');
      goto('/');
    }
  });
</script>

<svelte:head>
  <title>My Notes</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="space-y-6">
    <section class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">{isAdminLoggedIn ? 'All Notes (Admin View)' : 'My Notes'}</h2>
        <Button color="primary" class="flex items-center px-4" onclick={handleCreateNote}>
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
          </svg>
          Create New Note
        </Button>
      </div>
      
      {#if loading}
        <div class="flex justify-center my-4">
          <Spinner size="8" />
        </div>
      {:else if error}
        <Alert color="red" class="mb-4">{error}</Alert>
      {:else if privateNotes.length === 0}
        <div class="text-center py-8 bg-purple-50 rounded-lg border-2 border-dashed border-purple-200 p-8">
          <svg class="w-16 h-16 text-purple-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
          </svg>
          <p class="text-gray-600 text-lg font-medium">You don't have any notes yet.</p>
          <p class="text-gray-500">Create your first note using the button above!</p>
          <Button color="purple" class="mt-4 flex items-center mx-auto px-4" onclick={handleCreateNote}>
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
            </svg>
            Create New Note
          </Button>
        </div>
      {:else}
        <Table hoverable={true} striped={true}>
          <TableHead>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Content</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            {#if isAdminLoggedIn}
              <TableHeadCell>Author</TableHeadCell>
            {/if}
            <TableHeadCell>Created</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each sortedNotes as note}
              <TableBodyRow>
                <TableBodyCell>{note.title || 'Untitled'}</TableBodyCell>
                <TableBodyCell>{note.content.length > 50 ? note.content.substring(0, 50) + '...' : note.content}</TableBodyCell>
                <TableBodyCell>
                  <Badge 
                    color={note.isPublic === 'true' ? 'green' : 'purple'} 
                    class={note.isPublic === 'true' ? 
                      "font-semibold px-2.5 py-1 bg-green-200 text-green-800" : 
                      "font-semibold px-2.5 py-1 bg-purple-200 text-purple-800"
                    }
                  >
                    {note.isPublic === 'true' ? 'PUBLIC' : 'PRIVATE'}
                  </Badge>
                </TableBodyCell>
                {#if isAdminLoggedIn}
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
                {/if}
                <TableBodyCell>{formatDate(note.createdAt)}</TableBodyCell>
                <TableBodyCell>
                  <div class="flex space-x-2">
                    <Button size="xs" color="blue" class="bg-blue-600 hover:bg-blue-700 text-white px-4" onclick={() => handleEditNote(note)}>
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                      </svg>
                      Edit
                    </Button>
                    <Button size="xs" color="red" class="bg-red-600 hover:bg-red-700 text-white px-4" onclick={async () => {
                      if (confirm('Are you sure you want to delete this note?')) {
                        if (isAdminLoggedIn && adminApiKey) {
                          // Admin delete API endpoint
                          const response = await fetch(`/api/notes/${note.id}/admin`, {
                            method: 'DELETE',
                            headers: { 'X-API-Key': adminApiKey }
                          });
                          if (response.ok) {
                            fetchAllNotes();
                          }
                        } else {
                          // Regular user delete endpoint
                          const response = await fetch(`/api/notes/${note.id}`, {
                            method: 'DELETE',
                            headers: { 'Authorization': `Bearer ${userToken}` }
                          });
                          if (response.ok) {
                            fetchPrivateNotes();
                          }
                        }
                      }
                    }}>
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                      </svg>
                      Delete
                    </Button>
                  </div>
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
        
        {#if !isAdminLoggedIn}
          <div class="mt-4 border-2 border-dashed border-purple-200 bg-purple-50 rounded-lg p-4 cursor-pointer" 
            onclick={handleCreateNote}
            onkeydown={e => e.key === 'Enter' && handleCreateNote()} 
            tabindex={0}
            role="button"
            aria-label="Create another note">
            <div class="flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-purple-700 font-medium">Create Another Note</span>
            </div>
          </div>
        {/if}
      {/if}
    </section>
  </div>
</div>

<!-- Note creation modal -->
<NoteModal 
  open={showNoteModal} 
  onClose={() => showNoteModal = false} 
  onSuccess={handleNoteCreated}
  userToken={userToken}
  initialNote={editingNote}
  isEditing={!!editingNote}
  initialPublic={createPublicNote}
/>

<!-- Footer -->
<Footer /> 
