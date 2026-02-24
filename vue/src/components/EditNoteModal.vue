<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@clerk/vue';
import type { Note } from '../types/note';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import Message from 'primevue/message';

const props = defineProps<{
  note: Note;
  isAdmin?: boolean;
  adminApiKey?: string | null;
}>();
const emit = defineEmits<{ updated: []; close: [] }>();

const { getToken } = useAuth();
const title = ref(props.note.title ?? '');
const content = ref(props.note.content ?? '');
const isPublic = ref(props.note.isPublic === 'true');
const submitting = ref(false);
const error = ref<string | null>(null);
const visible = ref(true);

async function handleSubmit() {
  if (!content.value.trim()) { error.value = 'Content cannot be empty'; return; }
  submitting.value = true;
  error.value = null;
  try {
    const note = props.note;
    const isAnonymousPublic = note.isPublic === 'true' && (note.userId == null || note.userId === '');

    let res: Response;
    if (props.isAdmin && props.adminApiKey) {
      res = await fetch(`/api/notes/${note.id}/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': props.adminApiKey,
        },
        body: JSON.stringify({ title: title.value, content: content.value, isPublic: isPublic.value }),
      });
    } else if (isAnonymousPublic) {
      res = await fetch(`/api/public-notes/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.value.trim() || 'Public Note',
          content: content.value,
          isPublic: isPublic.value,
        }),
      });
    } else {
      const token = await getToken.value();
      res = await fetch(`/api/notes/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: title.value, content: content.value, isPublic: isPublic.value }),
      });
    }
    if (!res.ok) {
      const data: { error?: string } = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to update note');
    }
    emit('updated');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to update note';
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    header="Edit Note"
    :modal="true"
    :style="{ width: '480px' }"
    @hide="emit('close')"
  >
    <form @submit.prevent="handleSubmit" class="note-form">
      <div class="field">
        <label class="field-label">Title</label>
        <InputText v-model="title" placeholder="Note title" class="w-full" />
      </div>
      <div class="field">
        <label class="field-label">Content</label>
        <Textarea v-model="content" rows="4" placeholder="Note content" class="w-full" required />
      </div>
      <div class="field field--checkbox">
        <Checkbox v-model="isPublic" inputId="edit-public" :binary="true" />
        <label for="edit-public" class="field-label">Make public</label>
      </div>
      <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>
      <div class="dialog-footer">
        <Button type="button" label="Cancel" severity="secondary" text @click="emit('close')" />
        <Button type="submit" label="Save Changes" :loading="submitting" />
      </div>
    </form>
  </Dialog>
</template>

<style scoped>
.note-form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: 0.35rem; }
.field--checkbox { flex-direction: row; align-items: center; gap: 0.5rem; }
.field-label { font-size: 0.875rem; font-weight: 500; color: #374151; }
.w-full { width: 100%; }
.dialog-footer { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem; }
</style>
