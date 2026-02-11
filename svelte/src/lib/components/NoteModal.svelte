<script lang="ts">
  import { notesStore } from '$lib/stores/notes';
  import { 
    Button, 
    Input, 
    Textarea, 
    Label, 
    Alert, 
    Checkbox, 
    Modal,
    Helper
  } from 'flowbite-svelte';
  
  // Note properties
  interface NoteData {
    id?: string;
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
  
  // Props (use export let; avoid $bindable() unless inside $props())
  export let open = false;
  export let onClose = () => {};
  export let onSuccess = () => {};
  export let userToken: string | null = null;
  export let initialNote: NoteData | null = null;
  export let isEditing = false;
  export let initialPublic = false;

  // Form state
  let title = '';
  let content = '';
  let isPublic = false; // This represents the checkbox state
  let loading = false;
  let error: Error | null = null;
  let noteId: string | undefined = undefined;
  
  // Track if we want to toggle from the initial state
  $: toggleState = isPublic; 
  
  // The actual final state of the note (public or private)
  $: finalPublicState = isEditing && initialNote 
    ? (toggleState 
      ? !(typeof initialNote.isPublic === 'string' 
          ? initialNote.isPublic === 'true' 
          : !!initialNote.isPublic)
      : (typeof initialNote.isPublic === 'string' 
          ? initialNote.isPublic === 'true' 
          : !!initialNote.isPublic))
    : toggleState ? !initialPublic : initialPublic;
  
  // UI-related derived state
  $: modalButtonColor = finalPublicState ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700";
  $: modalColor = finalPublicState ? "green" : "purple"; 
  $: console.log('Note state:', { 
    initialPublic, 
    toggleState,
    finalPublicState,
    editing: isEditing,
    checkboxState: isPublic
  });
  
  // Derived state for form validation - allow public notes without a title
  $: isFormValid = (finalPublicState ? content.trim() !== '' : (title.trim() !== '' && content.trim() !== ''));

  function resetForm() {
    title = '';
    content = '';
    isPublic = false; // Always unchecked by default
    error = null;
    noteId = undefined;
  }

  function loadNoteData(note: NoteData) {
    title = note.title || '';
    content = note.content || '';
    
    // When editing a note, we don't want to have any checkbox checked by default
    isPublic = false; // Always start with checkbox unchecked
    
    noteId = note.id;
    console.log('Loaded note data for editing, checkbox set to unchecked by default');
  }

  async function handleSubmit() {
    // For any note, content is required
    if (content.trim() === '') {
      error = new Error('Content is required');
      return;
    }

    // For private notes, title is required
    if (!finalPublicState && title.trim() === '') {
      error = new Error('Title is required for private notes');
      return;
    }

    // If creating or converting to a private note, we need a valid user token
    if (!finalPublicState && !userToken) {
      error = new Error('You must be signed in to create a private note');
      return;
    }

    try {
      console.log('Submitting note with token:', userToken ? 'Present' : 'Missing', 
                 'Is public:', finalPublicState ? 'Yes' : 'No',
                 'Checkbox checked:', isPublic ? 'Yes' : 'No');
      
      loading = true;
      error = null;
      
      if (isEditing && noteId) {
        // Update existing note
        console.log('Updating existing note:', noteId, 'as', finalPublicState ? 'public' : 'private');
        
        // For all notes being edited, ensure we have authorization headers when needed
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };
        
        // Add authorization header if we have a token (always include it when available)
        if (userToken) {
          headers['Authorization'] = `Bearer ${userToken}`;
        }
        
        // Use fetch for consistent behavior
        const response = await fetch(`/api/notes/${noteId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            title,
            content,
            isPublic: finalPublicState
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to update note: ${response.status}`);
        }
      } else {
        // Create new note
        console.log('Creating new note as', finalPublicState ? 'public' : 'private');

        // Resolve token only when needed for authenticated/private requests.
        // For anonymous public notes this stays non-blocking.
        let tokenToUse = userToken;
        if (!finalPublicState && typeof window !== 'undefined' && (window as any).Clerk?.session) {
          try {
            const fresh = await (window as any).Clerk.session.getToken();
            if (fresh) tokenToUse = fresh;
          } catch (_) {
            // keep tokenToUse as-is
          }
        }

        // For public notes without a token, use the public notes API (no auth)
        if (finalPublicState && !tokenToUse) {
          try {
            await notesStore.createNote(
              {
                title: title.trim() || 'Untitled Public Note',
                content,
                isPublic: true
              },
              undefined
            );
            resetForm();
            onSuccess();
            onClose();
            return;
          } catch (err) {
            console.error('Error creating anonymous public note:', err);
            throw err;
          }
        }

        // Authenticated path: POST /api/notes with Bearer token
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };
        if (tokenToUse) {
          headers['Authorization'] = `Bearer ${tokenToUse}`;
        }

        const payload = {
          title,
          content,
          isPublic: finalPublicState
        };

        const response = await fetch('/api/notes', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          // For public notes, fall back to anonymous creation if 401 (token not accepted)
          if (finalPublicState && response.status === 401) {
            try {
              await notesStore.createNote(
                {
                  title: title.trim() || 'Untitled Public Note',
                  content,
                  isPublic: true
                },
                undefined
              );
              resetForm();
              onSuccess();
              onClose();
              return;
            } catch (fallbackErr) {
              console.error('Fallback public note creation failed:', fallbackErr);
            }
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to create note: ${response.status}`);
        }
      }
      
      // Reset form and close modal
      resetForm();
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error saving note:', err);
      error = err instanceof Error ? err : new Error('Failed to save note');
    } finally {
      loading = false;
    }
  }

  // Handle modal close event
  function handleClose() {
    resetForm();
    onClose();
  }

  // Reset or initialize form when modal state changes
  $: if (open) {
    if (initialNote && isEditing) {
      console.log('Loading existing note data for editing:', initialNote);
      // First load the note data
      loadNoteData(initialNote);
      
      // For edited notes, always start with checkbox unchecked (no toggle)
      isPublic = false;
      
      console.log('Note loaded for editing, toggle checkbox set to unchecked by default');
    } else if (!isEditing) {
      // For new notes, reset form and clear toggle
      title = '';
      content = '';
      isPublic = false; // Start with no toggle (checkbox unchecked)
      noteId = undefined;
      error = null;
      console.log('Creating new note with initialPublic:', initialPublic);
    }
  }
</script>

<Modal 
  bind:open 
  title="{isEditing ? 'Edit' : 'Create'} {finalPublicState ? 'Public' : 'Private'} Note" 
  size="md"
  autoclose={false}
  outsideclose={true}
  placement="center"
  onclose={handleClose}
>
  <div class="p-4">
    {#if error}
      <Alert color="red" class="mb-4">{error.message}</Alert>
    {/if}

    <div class="space-y-4">
      <div>
        <Label for="title" class="block mb-2">
          Title {finalPublicState ? '(optional for public notes)' : '(required)'}
        </Label>
        <Input
          type="text"
          id="title"
          bind:value={title}
          placeholder={finalPublicState ? "Optional for public notes" : "Required"}
          required={!finalPublicState}
        />
        {#if !title.trim() && !finalPublicState && open}
          <Helper class="mt-2" color="red">Title is required for private notes</Helper>
        {/if}
      </div>

      <div>
        <Label for="content" class="block mb-2">Content (required)</Label>
        <Textarea
          id="content"
          bind:value={content}
          placeholder="Enter note content"
          rows={6}
          required
        />
        {#if !content.trim() && open}
          <Helper class="mt-2" color="red">Content is required</Helper>
        {/if}
      </div>

      <div class="flex items-center">
        <Checkbox
          id="isPublic"
          bind:checked={isPublic}
        />
        <Label for="isPublic" class="ml-2 flex items-center">
          {#if isEditing && initialNote}
            {#if typeof initialNote.isPublic === 'string' 
                ? initialNote.isPublic === 'true' 
                : !!initialNote.isPublic}
              <!-- Currently a public note -->
              <svg class="w-4 h-4 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
              </svg>
              <span>Convert to private note</span>
              <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-200 text-purple-800">Currently Public</span>
            {:else}
              <!-- Currently a private note -->
              <svg class="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"></path>
              </svg>
              <span>Convert to public note</span>
              <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-800">Currently Private</span>
            {/if}
          {:else}
            <!-- New note creation - standard labels -->
            {#if finalPublicState}
              <svg class="w-4 h-4 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
              </svg>
              <span>Make this note private</span>
            {:else}
              <svg class="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"></path>
              </svg>
              <span>Make this note public</span>
            {/if}
          {/if}
        </Label>
      </div>

      {#if !finalPublicState && !userToken}
        <Helper color="red">
          <span class="font-medium">Authentication required!</span> You must be signed in to create a private note.
        </Helper>
      {/if}
      
      {#if finalPublicState && !userToken}
        <Helper color="green">
          <span class="font-medium">Anonymous mode:</span> You're creating a public note without an account.
        </Helper>
      {/if}
    </div>

    <!-- Action buttons in body so they're always visible (flowbite Modal footer uses snippet API) -->
    <div class="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
      <Button
        type="button"
        color="light"
        class="px-6 py-2"
        disabled={loading}
        onclick={handleClose}
      >
        Cancel
      </Button>
      <Button
        type="button"
        class="{modalButtonColor} text-white px-6 py-2 font-semibold"
        disabled={loading || !isFormValid}
        onclick={handleSubmit}
      >
        {#if loading}
          <span class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {isEditing ? 'Updating...' : 'Creating...'}
          </span>
        {:else}
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d={isEditing 
              ? "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              : "M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"} 
              clip-rule="evenodd"></path>
          </svg>
          {isEditing ? 'Update ' : 'Save '}{finalPublicState ? 'Public ' : 'Private '}Note
        {/if}
      </Button>
    </div>
  </div>
</Modal> 
