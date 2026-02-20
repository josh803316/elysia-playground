<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@clerk/vue';
import type { Note } from '../types/note';
import EditNoteModal from './EditNoteModal.vue';

const props = defineProps<{
  note: Note;
  showUser?: boolean;
  isAdmin?: boolean;
  adminApiKey?: string | null;
}>();

const emit = defineEmits<{
  deleted: [];
  updated: [];
}>();

const { getToken } = useAuth();
const deleting = ref(false);
const error = ref<string | null>(null);
const showEdit = ref(false);

function formatDate(d: string | null): string {
  if (!d) return 'N/A';
  try {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return 'Invalid Date';
  }
}

function getUserName(note: Note): string {
  if (note.user?.firstName) return `${note.user.firstName} ${note.user.lastName ?? ''}`.trim();
  if (note.user?.email) return note.user.email;
  if (note.userId) return `User #${note.userId}`;
  return 'Anonymous';
}

async function handleDelete() {
  if (!window.confirm('Are you sure you want to delete this note?')) return;
  deleting.value = true;
  error.value = null;
  try {
    let res: Response;
    if (props.isAdmin && props.adminApiKey) {
      res = await fetch(`/api/notes/${props.note.id}/admin`, {
        method: 'DELETE',
        headers: { 'X-API-Key': props.adminApiKey },
      });
    } else if (props.note.isPublic === 'true' && !props.note.userId) {
      res = await fetch(`/api/public-notes/${props.note.id}`, { method: 'DELETE' });
    } else {
      const token = await getToken.value();
      res = await fetch(`/api/notes/${props.note.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    if (!res.ok) throw new Error('Failed to delete note');
    emit('deleted');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to delete note';
  } finally {
    deleting.value = false;
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
    <div class="p-5">
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-semibold text-gray-800 line-clamp-1">
          {{ note.title || 'Untitled' }}
        </h3>
        <span
          class="text-xs px-2 py-1 rounded-full shrink-0 ml-2"
          :class="note.isPublic === 'true' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
        >
          {{ note.isPublic === 'true' ? 'Public' : 'Private' }}
        </span>
      </div>
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ note.content }}</p>
      <div class="flex justify-between items-center text-xs text-gray-500">
        <span v-if="showUser">By {{ getUserName(note) }}</span>
        <span v-else />
        <span>{{ formatDate(note.createdAt) }}</span>
      </div>
      <p v-if="error" class="mt-2 text-xs text-red-500">{{ error }}</p>
    </div>

    <div class="border-t bg-gray-50 px-5 py-3 flex justify-end gap-2">
      <button
        class="text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors"
        @click="showEdit = true"
      >
        Edit
      </button>
      <button
        class="text-red-600 hover:text-red-800 text-sm font-medium transition-colors disabled:opacity-50"
        :disabled="deleting"
        @click="handleDelete"
      >
        {{ deleting ? 'Deleting…' : 'Delete' }}
      </button>
    </div>

    <EditNoteModal
      v-if="showEdit"
      :note="note"
      @updated="emit('updated'); showEdit = false"
      @close="showEdit = false"
    />
  </div>
</template>
