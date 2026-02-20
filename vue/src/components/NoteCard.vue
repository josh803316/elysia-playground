<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@clerk/vue';
import type { Note } from '../types/note';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import EditNoteModal from './EditNoteModal.vue';

const props = defineProps<{
  note: Note;
  showUser?: boolean;
  isAdmin?: boolean;
  adminApiKey?: string | null;
}>();

const emit = defineEmits<{ deleted: []; updated: [] }>();
const { getToken } = useAuth();
const deleting = ref(false);
const error = ref<string | null>(null);
const showEdit = ref(false);

function formatDate(d: string | null): string {
  if (!d) return 'N/A';
  try {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return 'Invalid Date'; }
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
  <Card class="note-card">
    <template #title>
      <div class="card-title-row">
        <span class="note-title line-clamp-1">{{ note.title || 'Untitled' }}</span>
        <Tag
          :value="note.isPublic === 'true' ? 'Public' : 'Private'"
          :severity="note.isPublic === 'true' ? 'success' : 'secondary'"
          rounded
        />
      </div>
    </template>

    <template #content>
      <p class="note-content line-clamp-3">{{ note.content }}</p>
      <div class="card-meta">
        <span v-if="showUser" class="meta-text">By {{ getUserName(note) }}</span>
        <span v-else />
        <span class="meta-text">{{ formatDate(note.createdAt) }}</span>
      </div>
      <p v-if="error" class="error-text">{{ error }}</p>
    </template>

    <template #footer>
      <div class="card-actions">
        <Button
          label="Edit"
          icon="pi pi-pencil"
          size="small"
          text
          severity="secondary"
          @click="showEdit = true"
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          size="small"
          text
          severity="danger"
          :loading="deleting"
          @click="handleDelete"
        />
      </div>
    </template>
  </Card>

  <EditNoteModal
    v-if="showEdit"
    :note="note"
    @updated="emit('updated'); showEdit = false"
    @close="showEdit = false"
  />
</template>

<style scoped>
.note-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
}

.note-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  flex: 1;
}

.note-content {
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meta-text {
  font-size: 0.75rem;
  color: #9ca3af;
}

.error-text {
  font-size: 0.8rem;
  color: #ef4444;
  margin-top: 0.5rem;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.25rem;
}
</style>
