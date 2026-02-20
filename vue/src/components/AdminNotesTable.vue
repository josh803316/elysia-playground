<script setup lang="ts">
import { ref } from 'vue';
import type { Note } from '../types/note';

const props = defineProps<{
  notes: Note[];
  loading: boolean;
  error: string | null;
  adminApiKey: string | null;
}>();

const emit = defineEmits<{ refetch: [] }>();

const deleteError = ref<string | null>(null);

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

function preview(content: string): string {
  return content.length > 50 ? content.slice(0, 50) + '…' : content;
}

async function handleDelete(id: string) {
  if (!props.adminApiKey) return;
  if (!window.confirm('Are you sure you want to delete this note?')) return;
  deleteError.value = null;
  try {
    const res = await fetch(`/api/notes/${id}/admin`, {
      method: 'DELETE',
      headers: { 'X-API-Key': props.adminApiKey },
    });
    if (!res.ok) throw new Error(`Failed to delete note: ${res.status}`);
    emit('refetch');
  } catch (err) {
    deleteError.value = err instanceof Error ? err.message : 'Failed to delete note';
  }
}
</script>

<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">All Notes (Admin View)</h2>
      <p class="text-gray-600 text-sm">View and manage all notes in the system</p>
    </div>

    <p v-if="deleteError" class="mb-4 text-sm text-red-500 bg-red-50 rounded p-2">{{ deleteError }}</p>
    <p v-if="error" class="mb-4 text-sm text-red-500">{{ error }}</p>
    <p v-if="loading" class="text-gray-500 text-sm">Loading…</p>

    <div v-else class="overflow-x-auto">
      <table v-if="notes.length > 0" class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="text-left py-2 px-3 font-semibold text-gray-600">Title</th>
            <th class="text-left py-2 px-3 font-semibold text-gray-600">Content Preview</th>
            <th class="text-left py-2 px-3 font-semibold text-gray-600">Status</th>
            <th class="text-left py-2 px-3 font-semibold text-gray-600">Author</th>
            <th class="text-left py-2 px-3 font-semibold text-gray-600">Created</th>
            <th class="text-left py-2 px-3 font-semibold text-gray-600">Updated</th>
            <th class="text-left py-2 px-3 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="note in notes"
            :key="note.id"
            class="border-b border-gray-100 hover:bg-gray-50"
          >
            <td class="py-2 px-3 font-medium text-gray-800">{{ note.title || 'Untitled' }}</td>
            <td class="py-2 px-3 text-gray-500">{{ preview(note.content) }}</td>
            <td class="py-2 px-3">
              <span
                class="text-xs px-2 py-0.5 rounded-full font-medium"
                :class="note.isPublic === 'true' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'"
              >
                {{ note.isPublic === 'true' ? 'Public' : 'Private' }}
              </span>
            </td>
            <td class="py-2 px-3 text-gray-600">{{ getUserName(note) }}</td>
            <td class="py-2 px-3 text-gray-500 whitespace-nowrap">{{ formatDate(note.createdAt) }}</td>
            <td class="py-2 px-3 text-gray-500 whitespace-nowrap">{{ formatDate(note.updatedAt) }}</td>
            <td class="py-2 px-3">
              <button
                class="text-xs px-2 py-1 rounded border border-red-200 text-red-500 hover:bg-red-50"
                @click="handleDelete(note.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="italic text-gray-400 text-center py-8">No notes found in the system.</p>
    </div>
  </div>
</template>
