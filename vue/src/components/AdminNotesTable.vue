<script setup lang="ts">
import type { Note } from '../types/note';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Message from 'primevue/message';
import { ref } from 'vue';

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
  } catch { return 'Invalid Date'; }
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
  <div class="admin-section">
    <div class="section-header">
      <h2 class="section-title">All Notes (Admin View)</h2>
      <p class="section-subtitle">View and manage all notes in the system</p>
    </div>

    <Message v-if="deleteError" severity="error" :closable="false" style="margin-bottom: 1rem">
      {{ deleteError }}
    </Message>
    <Message v-if="error" severity="error" :closable="false" style="margin-bottom: 1rem">
      {{ error }}
    </Message>

    <DataTable
      :value="notes"
      :loading="loading"
      striped-rows
      size="small"
      :paginator="notes.length > 10"
      :rows="10"
      empty-message="No notes found in the system."
      style="font-size: 0.875rem"
    >
      <Column field="title" header="Title">
        <template #body="{ data }">
          <span style="font-weight: 500">{{ data.title || 'Untitled' }}</span>
        </template>
      </Column>
      <Column header="Content Preview">
        <template #body="{ data }">{{ preview(data.content) }}</template>
      </Column>
      <Column header="Status" style="width: 100px">
        <template #body="{ data }">
          <Tag
            :value="data.isPublic === 'true' ? 'Public' : 'Private'"
            :severity="data.isPublic === 'true' ? 'success' : 'secondary'"
            rounded
          />
        </template>
      </Column>
      <Column header="Author">
        <template #body="{ data }">{{ getUserName(data) }}</template>
      </Column>
      <Column header="Created" style="width: 160px">
        <template #body="{ data }">{{ formatDate(data.createdAt) }}</template>
      </Column>
      <Column header="Updated" style="width: 160px">
        <template #body="{ data }">{{ formatDate(data.updatedAt) }}</template>
      </Column>
      <Column header="Actions" style="width: 80px">
        <template #body="{ data }">
          <Button
            icon="pi pi-trash"
            size="small"
            text
            severity="danger"
            @click="handleDelete(data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.admin-section {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  padding: 1.5rem;
}

.section-header { margin-bottom: 1.25rem; }

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.section-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}
</style>
