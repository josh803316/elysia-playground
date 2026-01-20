<script lang="ts">
  import { Paper, Text, Group, Button, Container, Badge, Modal } from '@mantine/core';
  import { authStore } from './stores/authStore';
  import { useClerkContext, SignOutButton } from 'svelte-clerk';
  import AdminLoginForm from './components/AdminLoginForm.svelte';
  import SignedIn from './components/SignedIn.svelte';
  import SignedOut from './components/SignedOut.svelte';
  
  let { navigate } = $props<{
    navigate: (path: string) => void;
  }>();
  
  // Local state
  let adminModalOpen = $state(false);
  let isAdminLoggedIn = $state(false);
  let adminApiKey = $state<string | null>(null);
  let publicNotesCount = $state(0);
  let privateNotesCount = $state(0);
  
  // Derived state
  const isSignedIn = $derived($authStore.isSignedIn);
  const clerk = useClerkContext();
  
  // Fetch note counts
  const fetchNoteCounts = async () => {
    if (!isSignedIn) {
      publicNotesCount = 0;
      privateNotesCount = 0;
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
          
          publicNotesCount = publicCount;
          privateNotesCount = privateCount;
        }
        return;
      }
      
      // Regular user flow - fetch user's notes
      // Fetch public notes count
      const publicResponse = await fetch("/api/public-notes");
      const publicData = await publicResponse.json();
      publicNotesCount = Array.isArray(publicData) ? publicData.length : 0;
      
      // Fetch private notes if user is signed in
      const token = await authStore.getToken();
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
        
        privateNotesCount = trulyPrivateNotes.length;
      }
    } catch (err) {
      console.error("Error fetching note counts:", err);
    }
  };
  
  // Check for existing admin API key on mount
  $effect(() => {
    const storedApiKey = localStorage.getItem("adminApiKey");
    if (storedApiKey) {
      adminApiKey = storedApiKey;
      isAdminLoggedIn = true;
    }
  });
  
  // Fetch note counts whenever auth state changes
  $effect(() => {
    if (isSignedIn) {
      fetchNoteCounts();
    }
  });
  
  // Refresh counts when noteStore refreshTrigger changes
  $effect(() => {
    if (isSignedIn) {
      fetchNoteCounts();
    }
  });
  
  // Handle admin login
  const handleAdminLogin = (apiKey: string) => {
    adminApiKey = apiKey;
    isAdminLoggedIn = true;
    localStorage.setItem("adminApiKey", apiKey);
    adminModalOpen = false;
    
    // Refresh note counts
    fetchNoteCounts();
    
    // Force page reload to update admin state across components
    window.location.reload();
  };
  
  // Handle admin logout
  const handleAdminLogout = () => {
    adminApiKey = null;
    isAdminLoggedIn = false;
    localStorage.removeItem("adminApiKey");
    
    // Force page reload to update admin state across components
    window.location.reload();
  };
</script>

<Paper p="md" withBorder radius={0} style="background: #fff; height: 60px; width: 100%; position: fixed; top: 0; z-index: 1000;">
  <Container size="xl">
    <Group justify="space-between" h="100%">
      <Text size="xl" fw={700} style="cursor: pointer;" onclick={() => navigate('/')}>
        Elysia Notes - Svelte
      </Text>
      <Group>
        <Text style="cursor: pointer;" onclick={() => navigate('/')}>Home</Text>
        
        {#if isSignedIn}
          <Text style="cursor: pointer;" onclick={() => navigate('/notes')}>
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
          </Text>
          
          {#if isAdminLoggedIn}
            <Button variant="outline" color="red" size="xs" onclick={handleAdminLogout}>
              Exit Admin
            </Button>
          {:else}
            <Button variant="outline" color="gray" size="xs" onclick={() => adminModalOpen = true}>
              Admin
            </Button>
          {/if}
          
          <SignOutButton>
            <Button color="red" variant="subtle">Sign Out</Button>
          </SignOutButton>
        {:else}
          <Button onclick={() => navigate('/sign-in')}>Sign In</Button>
        {/if}
      </Group>
    </Group>
  </Container>
</Paper>

<!-- Admin Login Modal -->
<Modal opened={adminModalOpen} onClose={() => adminModalOpen = false} title="Admin Login">
  <AdminLoginForm onLogin={handleAdminLogin} />
</Modal> 
