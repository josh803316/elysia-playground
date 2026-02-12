<script lang="ts">
  import { onMount } from 'svelte';
  import { useClerkContext } from 'svelte-clerk/client';
  import { notesStore } from '$lib/stores/notes';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import { Button, Input, Textarea, Label, Alert, Checkbox, Spinner } from 'flowbite-svelte';

  const noteId = parseInt($page.params.id ?? '');
  let title = $state('');
  let content = $state('');
  let isPublic = $state(false);
  let loading = $state(false);
  let error = $state<Error | null>(null);
  let note = $state<any>(null);
  let isSignedIn = $state(false);
  let userToken = $state<string | null>(null);

  onMount(async () => {
    // Initialize Clerk on the client side
    try {
      const clerkCtx = useClerkContext();
      if (clerkCtx?.auth?.userId) {
        isSignedIn = true;
        userToken = await clerkCtx.session?.getToken() || null;
      } else {
        goto(`${base}/`);
        return;
      }

      if (!isSignedIn || !userToken) {
        goto(`${base}/`);
        return;
      }

      // Fetch the note
      try {
        loading = true;
        const response = await fetch(`/api/notes/${noteId}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch note');
        }

        note = await response.json();
        title = note.title || '';
        content = note.content || '';
        isPublic = note.isPublic === 'true';
      } catch (err) {
        console.error('Error fetching note:', err);
        error = err instanceof Error ? err : new Error('Note not found');
      } finally {
        loading = false;
      }
    } catch (err) {
      console.error('Error initializing Clerk:', err);
      error = err instanceof Error ? err : new Error('Authentication error');
    }
  });

  async function handleSubmit() {
    if (!title.trim() || !content.trim()) {
      error = new Error('Title and content are required');
      return;
    }

    if (!isSignedIn || !userToken) {
      error = new Error('You must be signed in to edit a note');
      return;
    }

    try {
      loading = true;
      error = null;
      
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          isPublic: isPublic ? 'true' : 'false'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      goto(`${base}/notes`);
    } catch (err) {
      error = err instanceof Error ? err : new Error('Failed to update note');
    } finally {
      loading = false;
    }
  }
</script>

<div class="p-4">
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Edit Note</h1>

    {#if error}
      <Alert color="red" class="mb-4">{error.message}</Alert>
    {/if}

    {#if !note && !error}
      <div class="flex justify-center items-center h-64">
        <Spinner size="8" />
      </div>
    {:else if note}
      <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
        <div>
          <Label for="title" class="mb-1">Title</Label>
          <Input
            type="text"
            id="title"
            bind:value={title}
            required
          />
        </div>

        <div>
          <Label for="content" class="mb-1">Content</Label>
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
        </div>

        <div class="flex justify-end space-x-4">
          <Button 
            color="light"
            onclick={() => goto(`${base}/notes`)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="blue"
            disabled={loading}
          >
            {#if loading}
              <span class="flex items-center">
                <Spinner size="4" class="mr-2" />
                Saving...
              </span>
            {:else}
              Save Changes
            {/if}
          </Button>
        </div>
      </form>
    {/if}
  </div>
</div> 
