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
    return (
      date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) +
      ', ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
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
  <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col gap-2">
    <div class="flex items-start justify-between gap-2">
      <h3 class="font-semibold text-gray-800 text-sm leading-snug break-words flex-1">
        {{ note.title || 'Untitled' }}
      </h3>
      <span
        class="shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
        :class="note.isPublic === 'true' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'"
      >
        {{ note.isPublic === 'true' ? 'Public' : 'Private' }}
      </span>
    </div>

    <p class="text-gray-600 text-sm line-clamp-3 flex-1">{{ note.content }}</p>

    <div v-if="showUser" class="text-xs text-gray-400">By {{ getUserName(note) }}</div>

    <div class="text-xs text-gray-400">{{ formatDate(note.createdAt) }}</div>

    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>

    <div class="flex gap-2 mt-1">
      <button
        class="text-xs px-2 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50"
        @click="showEdit = true"
      >
        Edit
      </button>
      <button
        class="text-xs px-2 py-1 rounded border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50"
        :disabled="deleting"
        @click="handleDelete"
      >
        {{ deleting ? '…' : 'Delete' }}
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
