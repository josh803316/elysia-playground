<script lang="ts">
  import { onMount } from 'svelte';
  import { notesStore } from '$lib/stores/notes';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Button, Input, Textarea, Label, Alert, Checkbox } from 'flowbite-svelte';
  
  // Import Clerk at component initialization
  import { useClerkContext } from 'svelte-clerk/client';

  let title = $state('');
  let content = $state('');
  let isPublic = $state(false);
  let loading = $state(false);
  let error = $state<Error | null>(null);
  let isSignedIn = $state(false);
  let userToken = $state<string | null>(null);

  // Initialize clerk context only during component initialization
  let clerkContext: any = null;
  if (typeof window !== 'undefined') {
    try {
      clerkContext = useClerkContext();
    } catch (err) {
      console.error('Error getting Clerk context:', err);
    }
  }

  onMount(async () => {
    // Setup auth after component is mounted
    if (typeof window !== 'undefined' && clerkContext) {
      try {
        if (clerkContext?.auth?.userId) {
          isSignedIn = true;
          userToken = await clerkContext.session?.getToken() || null;
        }
        // We no longer redirect non-authenticated users
      } catch (err) {
        console.error('Error setting up Clerk auth:', err);
        error = err instanceof Error ? err : new Error('Authentication error');
      }
    }
    
    // Check if public parameter is set in URL
    const publicParam = new URLSearchParams(window.location.search).get('public');
    if (publicParam === 'true') {
      isPublic = true;
    }
  });

  async function handleSubmit() {
    // For any note, content is required
    if (!content.trim()) {
      error = new Error('Content is required');
      return;
    }

    // For private notes, title is required and user must be signed in
    if (!isPublic) {
      if (!title.trim()) {
        error = new Error('Title is required for private notes');
        return;
      }
      
      if (!isSignedIn || !userToken) {
        error = new Error('You must be signed in to create a private note');
        return;
      }
    }

    try {
      loading = true;
      error = null;
      
      // For public anonymous notes, title is optional - use a default if not provided
      const noteData = {
        title: title.trim() || 'Untitled Public Note',
        content,
        isPublic,
      };
      
      await notesStore.createNote(
        noteData,
        // Only pass userToken if signed in, otherwise undefined for anonymous public notes
        isSignedIn ? userToken : undefined
      );
      
      // Redirect to home page
      await goto('/');
    } catch (err) {
      error = err instanceof Error ? err : new Error('Failed to create note');
    } finally {
      loading = false;
    }
  }
</script>

<div class="p-4">
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Create New Note</h1>

    {#if error}
      <Alert color="red" class="mb-4">{error.message}</Alert>
    {/if}

    {#if !isSignedIn}
      <Alert color="blue" class="mb-4">
        You are not signed in. You can create public notes anonymously, but private notes require an account.
      </Alert>
    {/if}

    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
      <div>
        <Label for="title" class="mb-1">Title {!isPublic ? '(required)' : '(optional)'}</Label>
        <Input
          type="text"
          id="title"
          bind:value={title}
          required={!isPublic}
          placeholder={isPublic ? "Optional for public notes" : "Required"}
        />
      </div>

      <div>
        <Label for="content" class="mb-1">Content (required)</Label>
        <Textarea
          id="content"
          bind:value={content}
          rows={6}
          required
        />
      </div>

      <div class="flex items-center">
        <Checkbox
          id="isPublic"
          bind:checked={isPublic}
        />
        <Label for="isPublic" class="ml-2">Make this note public</Label>
        <div class="ml-2">
          <span class={isPublic ? 
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-800" : 
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-200 text-purple-800"}>
            {isPublic ? 'Public' : 'Private'}
          </span>
        </div>
      </div>

      {#if !isPublic && !isSignedIn}
        <Alert color="yellow" class="mb-4">
          To create a private note, you need to <a href="/" class="underline">sign in</a> first.
        </Alert>
      {/if}

      <div class="flex justify-end space-x-4">
        <Button 
          color="light"
          on:click={() => goto('/')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          class={isPublic ? "bg-green-600 hover:bg-green-700 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"}
          disabled={loading || (!isPublic && !isSignedIn)}
        >
          {#if loading}
            <span class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          {:else}
            {isPublic ? 'Create Public Note' : 'Create Private Note'}
          {/if}
        </Button>
      </div>
    </form>
  </div>
</div> 
