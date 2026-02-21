<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuth } from '@clerk/vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Message from 'primevue/message';

const props = defineProps<{
  initialIsPublic?: boolean;
  isAnonymous?: boolean;
}>();

const emit = defineEmits<{ submitted: []; close: [] }>();

const { getToken } = useAuth();
const title = ref('');
const content = ref('');
const isPublic = ref(props.initialIsPublic ?? false);
const submitting = ref(false);
const error = ref<string | null>(null);
const visible = ref(true);

watch(() => props.initialIsPublic, (val) => { isPublic.value = val ?? false; });

const dialogHeader = props.isAnonymous
  ? 'Create Public Note'
  : props.initialIsPublic
    ? 'Create Public Note'
    : 'Create Private Note';

async function handleSubmit() {
  if (!content.value.trim()) { error.value = 'Content cannot be empty'; return; }
  submitting.value = true;
  error.value = null;
  try {
    if (props.isAnonymous) {
      const res = await fetch('/api/public-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.value, isPublic: true }),
      });
      if (!res.ok) {
        const data: { error?: string } = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create note');
      }
    } else {
      const token = await getToken.value();
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: title.value, content: content.value, isPublic: isPublic.value }),
      });
      if (!res.ok) {
        const data: { error?: string } = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create note');
      }
    }
    title.value = '';
    content.value = '';
    emit('submitted');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to create note';
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :header="dialogHeader"
    :modal="true"
    :style="{ width: '480px' }"
    @hide="emit('close')"
  >
    <form @submit.prevent="handleSubmit" class="note-form">
      <div v-if="!isAnonymous" class="field">
        <label class="field-label">Title</label>
        <InputText v-model="title" placeholder="Note title" class="w-full" />
      </div>
      <div class="field">
        <label class="field-label">Content</label>
        <Textarea
          v-model="content"
          :rows="4"
          :placeholder="isAnonymous ? 'Write a public note…' : 'Note content'"
          class="w-full"
          required
        />
      </div>
      <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>
      <div class="dialog-footer">
        <Button type="button" label="Cancel" severity="secondary" text @click="emit('close')" />
        <Button
          type="submit"
          :label="isAnonymous ? 'Post Note' : isPublic ? 'Create Public Note' : 'Create Private Note'"
          :severity="isPublic || isAnonymous ? 'success' : 'secondary'"
          :loading="submitting"
        />
      </div>
    </form>
  </Dialog>
</template>

<style scoped>
.note-form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: 0.35rem; }
.field-label { font-size: 0.875rem; font-weight: 500; color: #374151; }
.w-full { width: 100%; }
.dialog-footer { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.25rem; }
</style>
