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
  <div v-if="notes.length > 0" class="notes-grid">
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
  <p v-else class="empty-state">{{ emptyMessage }}</p>
</template>

<style scoped>
.notes-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .notes-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .notes-grid { grid-template-columns: repeat(3, 1fr); }
}

.empty-state {
  text-align: center;
  color: #9ca3af;
  font-style: italic;
  padding: 2rem 0;
  margin: 0;
}
</style>
