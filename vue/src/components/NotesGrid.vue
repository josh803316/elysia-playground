<script setup lang="ts">
import type { Note } from '../types/note';
import NoteCard from './NoteCard.vue';

defineProps<{
  notes: Note[];
  emptyMessage: string;
  showUser?: boolean;
  isAdmin?: boolean;
  adminApiKey?: string | null;
}>();

const emit = defineEmits<{ deleted: []; updated: [] }>();
</script>

<template>
  <div
    v-if="notes.length > 0"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    <NoteCard
      v-for="note in notes"
      :key="note.id"
      :note="note"
      :show-user="showUser"
      :is-admin="isAdmin"
      :admin-api-key="adminApiKey"
      @deleted="emit('deleted')"
      @updated="emit('updated')"
    />
  </div>
  <p v-else class="italic text-gray-400 text-center py-8">{{ emptyMessage }}</p>
</template>
