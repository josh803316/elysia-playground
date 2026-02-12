<script lang="ts">
  import { ClerkProvider, UserButton, SignInButton, SignedIn, SignedOut } from 'svelte-clerk';
  
  import {
    Navbar,
    NavBrand,
    NavLi,
    Button,
    Footer,
    FooterCopyright,
    Badge,
    Divider
  } from 'flowbite-svelte';
  
  import apiClient from './lib/api/client';
  
  let apiVersion = 'Loading...';
  let publicNotesCount = 0;
  let privateNotesCount = 0;
  let isAdminLoggedIn = false;

  const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk publishable key. Set VITE_CLERK_PUBLISHABLE_KEY in env");
  }
  
  async function loadInitialData() {
    try {
      const storedApiKey = localStorage.getItem('adminApiKey');
  
      if (storedApiKey) {
        isAdminLoggedIn = true;
      }
  
      const versionData = await apiClient.version.get();
  
      if (versionData && versionData.version) {
        apiVersion = versionData.version;
      } else if (versionData && versionData.name) {
        apiVersion = versionData.name;
      } else {
        apiVersion = 'Unknown';
      }
  
      try {
        const publicNotes = await apiClient.notes.publicNotes.getAll();
  
        if (Array.isArray(publicNotes)) {
          publicNotesCount = publicNotes.length;
        }
      } catch(err) {
        console.error('Error fetching note counts:', err);
      }
    } catch(error) {
      console.error('Error fetching API version:', error);
      apiVersion = 'Error fetching';
    }
  }
  
  function handleAdminLogout() {
    localStorage.removeItem('adminApiKey');
    isAdminLoggedIn = false;
    window.location.reload();
  }
  
  loadInitialData();
</script>

<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <!-- Fixed Header -->
    <Navbar class="px-6 border-b shadow-sm fixed top-0 left-0 right-0 z-40 bg-white h-[60px]">
      <div class="container mx-auto flex justify-between items-center h-full">
        <!-- Logo/Brand -->
        <NavBrand href="/" class="mr-6">
          <span class="text-xl font-semibold whitespace-nowrap">Elysia Notes - Svelte</span>
        </NavBrand>
        
        <!-- Navigation Links -->
        <div class="hidden md:flex items-center">
          <NavLi href="/" class="mr-4 font-medium">Home</NavLi>
          <SignedIn>
            <NavLi href="/notes" class="mr-4 font-medium">
              <div class="flex items-center gap-2">
                <span>{isAdminLoggedIn ? 'All Notes' : 'My Notes'}</span>
                <div class="flex gap-1">
                  <Badge color="blue" class="text-xs">Public: {publicNotesCount}</Badge>
                  <Badge color="dark" class="text-xs">Private: 0</Badge>
                </div>
              </div>
            </NavLi>
          </SignedIn>
        </div>
        
        <!-- Right side with user info and actions -->
        <div class="flex items-center gap-4">
          <div class="text-sm text-gray-500 hidden md:block">API v{apiVersion}</div>
          
          <SignedIn>
            <div class="flex items-center gap-2">
              <span class="text-sm hidden md:inline">Hello, <UserButton /></span>
            </div>
          </SignedIn>
          
          <SignedOut>
            <SignInButton>
              <Button color="primary" size="xs" class="ml-2">Sign In</Button>
            </SignInButton>
          </SignedOut>
          
          <Divider orientation="vertical" class="h-8 hidden md:block" />
          
          <!-- Admin Authentication -->
          {#if isAdminLoggedIn}
            <Button color="red" size="xs" onclick={handleAdminLogout}>Admin Logout</Button>
          {:else}
            <Button color="primary" size="xs" href="/">Admin Login</Button>
          {/if}
        </div>
      </div>
    </Navbar>
    
    <!-- Main Content -->
    <main class="flex-grow pt-[80px] pb-8">
      <div class="container mx-auto px-4">
        <slot />
      </div>
    </main>
    
    <!-- Footer -->
    <Footer class="py-4 border-t">
      <div class="container mx-auto px-6">
        <div class="flex justify-between items-center">
          <FooterCopyright href="/" by="Notes App" year={new Date().getFullYear()} />
          <div class="hidden md:flex gap-6">
            <a href="/" class="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
            <a href="/" class="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a>
            <a href="/" class="text-sm text-gray-500 hover:text-gray-900">Contact Us</a>
          </div>
        </div>
      </div>
    </Footer>
  </div>
</ClerkProvider>

<style>
  /* Ensure Svelte styles don't interfere with Flowbite */
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
</style> 
