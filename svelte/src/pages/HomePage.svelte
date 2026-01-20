<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { authStore } from '../stores/authStore';
  import { noteStore } from '../stores/noteStore';
  import type { Note } from '../api/client';
  import { withAuth, API_URL } from '../api/client';
  import NoteForm from '../components/NoteForm.svelte';
  import NotesGrid from '../components/NotesGrid.svelte';
  import AnonymousNoteForm from '../components/AnonymousNoteForm.svelte';
  import { IconPlus } from '@tabler/icons-svelte';
  import { goto } from '$app/navigation';
  
  // Local state
  let publicNotes = $state<Note[]>([]);
  let privateNotes = $state<Note[]>([]);
  let allNotes = $state<Note[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let isAdminLoggedIn = $state(false);
  let adminApiKey = $state<string | null>(null);
  let noteModalOpen = $state(false);
  let initialNoteValues = $state({
    title: "",
    content: "",
    isPublic: false
  });
  let initialized = $state(false);
  let hasLoadedPrivateNotes = $state(false);
  let showAdminLogin = $state(false);
  let adminKeyInput = $state('');
  let loadingPrivateNotes = $state(false);
  let privateNotesError = $state<string | null>(null);
  let authCheckComplete = $state(false);
  
  // Derived values
  const isSignedIn = $derived($authStore.isSignedIn);
  
  // Fetch public notes
  const fetchPublicNotes = async () => {
    try {
      loading = true;
      await noteStore.fetchPublicNotes();
      publicNotes = $noteStore.publicNotes;
      console.log("Fetched public notes:", publicNotes);
    } catch (err) {
      console.error("Error fetching public notes:", err);
      error = "Failed to load public notes";
    } finally {
      loading = false;
    }
  };
  
  // Fetch private notes if user is signed in
  const fetchPrivateNotes = async () => {
    console.log("Attempting to fetch private notes");
    if (!isSignedIn) {
      console.warn("Cannot fetch private notes: user is not signed in");
      return;
    }

    loadingPrivateNotes = true;
    privateNotesError = null;

    try {
      console.log("Getting auth token...");
      const token = await authStore.getToken();
      console.log("Auth token retrieved, making API request");
      
      const response = await fetch(`${API_URL}/api/notes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching private notes:", response.status, errorText);
        throw new Error(`Failed to fetch private notes: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Private notes fetched successfully:", data.length);
      privateNotes = data;
      hasLoadedPrivateNotes = true;
      
      // Store IDs of all notes that belong to the user (for showing "Posted by you")
      const userNoteIds = data.map((note: Note) => note.id);
      localStorage.setItem("userNoteIds", JSON.stringify(userNoteIds));
    } catch (error: any) {
      console.error("Error fetching private notes:", error);
      privateNotesError = error.message || "Failed to fetch private notes";
    } finally {
      loadingPrivateNotes = false;
    }
  };
  
  // Fetch all notes (admin only)
  const fetchAllNotes = async () => {
    if (!isAdminLoggedIn || !adminApiKey) return;
    
    try {
      loading = true;
      // Use string value for logging
      console.log("Fetching all notes with API key: [API KEY HIDDEN]");
      
      // Fetch all notes as admin
      const response = await fetch("/api/notes/all", {
        headers: {
          "X-API-Key": adminApiKey
        }
      });
      
      console.log("Admin fetch response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Admin request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Admin notes data:", data);
      allNotes = data;
    } catch (err) {
      console.error("Error fetching all notes as admin:", err);
      error = "Failed to load all notes. Admin access may be invalid.";
      
      // If we get an authorization error, log out the admin
      if (err instanceof Error && err.message.includes("401")) {
        handleAdminLogout();
      }
    } finally {
      loading = false;
    }
  };
  
  // Fetch notes on load and when auth state changes
  onMount(async () => {
    console.log("HomePage component mounted");
    
    // Set initialized flag immediately to prevent infinite loops
    initialized = true;
    
    try {
      // Just load public notes once on mount
      await fetchPublicNotes();
      console.log("Initial public notes loaded");
    } catch (err) {
      console.error("Error loading initial public notes:", err);
    } finally {
      // Set authCheckComplete after initial load
      authCheckComplete = true;
      
      // Check if user is signed in and load private data if needed
      if (isSignedIn && !hasLoadedPrivateNotes) {
        try {
          await handlePrivateDataInit();
        } catch (err) {
          console.error("Error loading private data:", err);
        }
      }
    }
  });
  
  // Handle auth state changes with SignedIn component's onMount/onDestroy
  const handlePrivateDataInit = async () => {
    console.log("User is signed in, checking for private data");
    
    if (!hasLoadedPrivateNotes) {
      await fetchPrivateNotes();
    }
    
    // Check for existing admin API key in localStorage
    const storedApiKey = localStorage.getItem("adminApiKey");
    if (storedApiKey) {
      adminApiKey = storedApiKey;
      isAdminLoggedIn = true;
      await fetchAllNotes();
    }
  };
  
  const handleSignOut = () => {
    console.log("User signed out, clearing private data");
    privateNotes = [];
    hasLoadedPrivateNotes = false;
    adminApiKey = null;
    isAdminLoggedIn = false;
    localStorage.removeItem("adminApiKey");
  };
  
  // Re-fetch when noteStore refreshTrigger changes - with safeguards
  $effect(() => {
    const refreshTrigger = $noteStore.refreshTrigger;
    
    if (initialized && refreshTrigger > 0) {
      console.log("Note store refresh triggered:", refreshTrigger);
      
      fetchPublicNotes();
      
      if (isSignedIn) {
        fetchPrivateNotes();
      }
      
      if (isAdminLoggedIn) {
        fetchAllNotes();
      }
    }
  });
  
  // Effect to handle auth state changes
  $effect(() => {
    if (!initialized || !authCheckComplete) return;
    
    // Use local variables to prevent excessive effect runs
    const isUserSignedIn = isSignedIn;
    const hasUserData = hasLoadedPrivateNotes;
    
    console.log(
      "Auth state effect check:",
      isUserSignedIn ? "Signed In" : "Not Signed In",
      "Has data:", hasUserData ? "Yes" : "No"
    );
    
    if (isUserSignedIn) {
      // Only fetch private notes if we haven't already loaded them
      if (!hasUserData) {
        console.log("Auth state: user signed in without data, fetching private notes");
        // Use setTimeout to avoid any potential synchronous loops
        setTimeout(() => {
          handlePrivateDataInit();
        }, 100);
      }
    } else if (hasUserData) {
      // Only clear data if we actually have data to clear
      console.log("Auth state: user signed out, clearing private data");
      handleSignOut();
    }
  });
  
  // Handle note creation
  const handleNoteCreated = () => {
    console.log("Note created, refreshing data");
    
    // First close the modal
    noteModalOpen = false;
    
    // Then fetch the updated notes
    fetchPublicNotes();
    
    // Fetch private notes if signed in
    if (isSignedIn) {
      fetchPrivateNotes();
    }
    
    // Fetch admin notes if in admin mode
    if (isAdminLoggedIn) {
      fetchAllNotes();
    }
  };
  
  // Handle admin logout
  const handleAdminLogout = () => {
    adminApiKey = null;
    isAdminLoggedIn = false;
    allNotes = [];
    // Remove the API key from localStorage
    localStorage.removeItem("adminApiKey");
  };
  
  // Toggle admin login form
  const toggleAdminLogin = () => {
    showAdminLogin = !showAdminLogin;
    adminKeyInput = '';
  };
  
  // Handle admin login
  const handleAdminLogin = async () => {
    if (!adminKeyInput.trim()) {
      error = "Admin API key is required";
      return;
    }
    
    try {
      // Verify the key by making a test request
      const response = await fetch("/api/notes/all", {
        headers: {
          "X-API-Key": adminKeyInput
        }
      });
      
      if (!response.ok) {
        throw new Error(`Invalid admin API key. Status: ${response.status}`);
      }
      
      // If successful, save the key and log in
      adminApiKey = adminKeyInput;
      isAdminLoggedIn = true;
      showAdminLogin = false;
      localStorage.setItem("adminApiKey", adminKeyInput);
      
      // Fetch all notes with the new key
      fetchAllNotes();
    } catch (err) {
      console.error("Admin login error:", err);
      error = err instanceof Error ? err.message : "Failed to login as admin";
      setTimeout(() => {
        error = null;
      }, 5000);
    }
  };
  
  // Open note modal with pre-set public/private setting
  const openNoteModal = (isPublic: boolean) => {
    console.log("Opening modal with isPublic =", isPublic);
    initialNoteValues = { ...initialNoteValues, isPublic };
    noteModalOpen = true;
  };
  
  onDestroy(() => {
    // Clean up resources if needed
  });
  
  // Delete a note (admin only) - with proper type annotation
  const deleteNote = async (id: number): Promise<void> => {
    if (!isAdminLoggedIn || !adminApiKey) return;
    
    if (!confirm("Are you sure you want to delete this note?")) return;
    
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          "X-API-Key": adminApiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.status}`);
      }
      
      // Remove from the admin notes list
      allNotes = allNotes.filter((note: Note) => note.id !== id);
      
      // Refresh other note lists
      fetchPublicNotes();
      if (isSignedIn) {
        fetchPrivateNotes();
      }
      
      // Also trigger a refresh in the noteStore
      noteStore.triggerRefresh();
      
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Failed to delete note. Please try again.");
      
      // If unauthorized, log out admin
      if (err instanceof Error && err.message.includes("401")) {
        handleAdminLogout();
      }
    }
  };
  
  // Format date helper function
  function formatDate(dateString: string | Date): string {
    if (!dateString) return 'Unknown date';
    
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    
    // Check if date is valid
    if (isNaN(date.getTime())) return 'Invalid date';
    
    // Format the date - using toLocaleDateString for locale awareness
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
</script>

<div class="home-page">
  <!-- Hero Section -->
  <section class="hero">
    <h1>Welcome to Notes App</h1>
    <p>A simple app for creating and sharing notes</p>
  </section>
  
  <!-- Admin Section - Only shown when logged in with API key -->
  {#if isAdminLoggedIn && adminApiKey}
    <section class="notes-section admin-section">
      <div class="section-header">
        <h2>Admin: All Notes</h2>
        <span class="admin-badge">Admin Mode</span>
        <button class="logout-button" onclick={handleAdminLogout}>Logout Admin</button>
      </div>
      
      {#if loading && !allNotes.length}
        <div class="loading">Loading all notes...</div>
      {:else if allNotes.length === 0}
        <div class="empty-state">
          <p>No notes in the system.</p>
        </div>
      {:else}
        <NotesGrid 
          notes={allNotes}
          emptyMessage="No notes in the system"
          showUser={true}
          isAdmin={true}
          adminApiKey={adminApiKey}
          onNoteDeleted={fetchAllNotes}
          onNoteUpdated={fetchAllNotes}
        />
      {/if}
    </section>
  {/if}
  
  <!-- Public Notes Section -->
  <section class="notes-section public-notes">
    <div class="section-header">
      <h2>Public Notes</h2>
      <button class="create-button" onclick={() => openNoteModal(true)}>
        Create Public Note
      </button>
    </div>
    
    {#if loading && !publicNotes.length}
      <div class="loading">Loading notes...</div>
    {:else if error}
      <div class="error-message">{error}</div>
    {:else if publicNotes.length === 0}
      <div class="empty-state">
        <p>No public notes yet. Be the first to create one!</p>
      </div>
    {:else}
      <NotesGrid 
        notes={publicNotes}
        emptyMessage="No public notes yet. Be the first to create one!"
        showUser={true}
        onNoteDeleted={fetchPublicNotes}
        onNoteUpdated={fetchPublicNotes}
        isAdmin={false}
        currentUserNotes={JSON.parse(localStorage.getItem("userNoteIds") || "[]")}
      />
    {/if}
  </section>
  
  <!-- Private Notes Section - Only shown to authenticated users -->
  {#if isSignedIn}
    <section class="notes-section private-notes">
      <div class="section-header">
        <h2>Your Private Notes</h2>
        <button class="create-button" onclick={() => openNoteModal(false)}>
          Create Private Note
        </button>
      </div>
      
      <!-- Debug info -->
      {#if import.meta.env.DEV}
        <div class="debug-info">
          <p>Auth State: {isSignedIn ? "Signed In" : "Not Signed In"}</p>
          <p>Private Notes Count: {privateNotes.length}</p>
          <p>Has Loaded: {hasLoadedPrivateNotes ? "Yes" : "No"}</p>
          <p>Loading: {loadingPrivateNotes ? "Yes" : "No"}</p>
          {#if privateNotesError}
            <p class="error">Error: {privateNotesError}</p>
          {/if}
        </div>
      {/if}
      
      {#if loadingPrivateNotes}
        <p>Loading your private notes...</p>
      {:else if privateNotesError}
        <p class="error">{privateNotesError}</p>
        <button class="refresh-button" onclick={fetchPrivateNotes}>
          Retry
        </button>
      {:else if privateNotes.length === 0}
        <div class="empty-state">
          <p>You don't have any private notes yet.</p>
        </div>
      {:else}
        <NotesGrid 
          notes={privateNotes}
          emptyMessage="You don't have any private notes yet."
          showUser={false}
          onNoteDeleted={fetchPrivateNotes}
          onNoteUpdated={fetchPrivateNotes}
          isAdmin={false}
          currentUserNotes={JSON.parse(localStorage.getItem("userNoteIds") || "[]")}
        />
      {/if}
      
      <button class="refresh-button" onclick={fetchPrivateNotes}>
        Refresh Notes
      </button>
    </section>
  {/if}
  
  <!-- Admin Login Button - Only shown to authenticated users who aren't already admin -->
  {#if !isAdminLoggedIn}
    <section class="admin-login-section">
      <button class="admin-login-button" onclick={toggleAdminLogin}>
        {showAdminLogin ? 'Cancel Admin Login' : 'Admin Login'}
      </button>
      
      {#if showAdminLogin}
        <div class="admin-login-form">
          <div class="form-group">
            <label for="admin-key">Admin API Key</label>
            <input 
              id="admin-key"
              type="password" 
              placeholder="Enter admin API key" 
              bind:value={adminKeyInput}
              class="admin-key-input"
            />
          </div>
          <button class="admin-submit-button" onclick={handleAdminLogin}>
            Login as Admin
          </button>
        </div>
      {/if}
    </section>
  {/if}
  
  <!-- Login prompt for unauthenticated users -->
  {#if !isSignedIn}
    <div class="login-prompt">
      <p>Sign in to manage your private notes and see more features</p>
      <button class="sign-in-button" onclick={() => goto('/sign-in')}>
        Sign In
      </button>
    </div>
  {/if}
  
  <!-- Note creation modal -->
  {#if isSignedIn && noteModalOpen}
    <div class="modal">
      <div class="modal-overlay" onclick={() => noteModalOpen = false}></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2>{initialNoteValues.isPublic ? 'Create Public Note' : 'Create Private Note'}</h2>
          <button class="close-button" onclick={() => noteModalOpen = false}>×</button>
        </div>
        
        <NoteForm 
          isOpen={true}
          initialValues={initialNoteValues}
          onClose={() => noteModalOpen = false}
          onSubmitSuccess={handleNoteCreated}
        />
      </div>
    </div>
  {/if}
</div>

<style>
  .home-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .header {
    margin-bottom: 30px;
    text-align: center;
  }
  
  .title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #333;
  }
  
  .subtitle {
    font-size: 16px;
    color: #666;
  }
  
  .section {
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .section-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    color: #333;
  }
  
  .add-button {
    background-color: #4c6ef5;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .add-button:hover {
    background-color: #364fc7;
  }
  
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #666;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #4c6ef5;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .error-alert {
    background-color: #ffebee;
    border: 1px solid #ffcdd2;
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 20px;
    color: #c62828;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .retry-button {
    background-color: #ef5350;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .retry-button:hover {
    background-color: #d32f2f;
  }
  
  .empty-state {
    text-align: center;
    padding: 40px;
    background-color: #f5f5f5;
    border-radius: 8px;
    color: #666;
  }
  
  .notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .note-card {
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }
  
  .note-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
  }
  
  .note-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    color: #333;
    word-break: break-word;
  }
  
  .badge {
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
  }
  
  .badge.public {
    background-color: #e3f2fd;
    color: #1565c0;
  }
  
  .badge.private {
    background-color: #f5f5f5;
    color: #616161;
  }
  
  .note-content {
    flex-grow: 1;
    font-size: 14px;
    line-height: 1.5;
    margin: 0 0 16px 0;
    color: #333;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    word-break: break-word;
  }
  
  .note-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #555;
    border-top: 1px solid #f0f0f0;
    padding-top: 12px;
  }
  
  .note-date {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .note-actions {
    display: flex;
    gap: 8px;
  }
  
  .action-button {
    font-size: 12px;
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: transparent;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
  }
  
  .action-button.edit {
    color: #4c6ef5;
  }
  
  .action-button.edit:hover {
    background-color: #eaeffd;
  }
  
  .login-prompt {
    margin-top: 30px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    text-align: center;
  }
  
  .login-prompt p {
    margin-bottom: 16px;
    font-size: 16px;
    color: #555;
  }
  
  .sign-in-button {
    background-color: #4c6ef5;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .sign-in-button:hover {
    background-color: #364fc7;
  }
  
  .admin-badge {
    background-color: #fa5252;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    margin-left: 0.5rem;
  }
  
  .logout-button {
    background-color: #fa5252;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    margin-left: auto;
    border: none;
    cursor: pointer;
  }
  
  .logout-button:hover {
    background-color: #e03131;
  }
  
  .action-button {
    background-color: transparent;
    border: none;
    font-size: 0.75rem;
    color: #228be6;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }
  
  .action-button.edit:hover {
    color: #1971c2;
    text-decoration: underline;
  }
  
  .action-button.delete {
    color: #e03131;
  }
  
  .action-button.delete:hover {
    color: #c92a2a;
    text-decoration: underline;
  }
  
  .admin-login-section {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px dashed #adb5bd;
  }
  
  .admin-login-button {
    background-color: #364fc7;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .admin-login-button:hover {
    background-color: #2b3e9e;
  }
  
  .admin-login-form {
    margin-top: 1rem;
    padding: 1rem;
    background-color: white;
    border-radius: 4px;
    border: 1px solid #dee2e6;
  }
  
  .admin-key-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    margin-top: 0.25rem;
    margin-bottom: 1rem;
  }
  
  .admin-submit-button {
    background-color: #495057;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .admin-submit-button:hover {
    background-color: #343a40;
  }
  
  .refresh-button {
    background-color: #4dabf7;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 12px;
    transition: background-color 0.2s;
  }
  
  .refresh-button:hover {
    background-color: #339af0;
  }
</style> 
