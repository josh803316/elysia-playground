<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@clerk/vue';
import type { Note } from '../types/note';

const props = defineProps<{ note: Note }>();
const emit = defineEmits<{ updated: []; close: [] }>();

const { getToken } = useAuth();
const title = ref(props.note.title ?? '');
const content = ref(props.note.content ?? '');
const isPublic = ref(props.note.isPublic === 'true');
const submitting = ref(false);
const error = ref<string | null>(null);

async function handleSubmit() {
  if (!content.value.trim()) {
    error.value = 'Content cannot be empty';
    return;
  }
  submitting.value = true;
  error.value = null;
  try {
    const token = await getToken.value();
    const res = await fetch(`/api/notes/${props.note.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title: title.value, content: content.value, isPublic: isPublic.value }),
    });
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
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click.self="emit('close')"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Edit Note</h2>
        <button class="text-gray-400 hover:text-gray-600 text-xl leading-none" @click="emit('close')">
          &times;
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            v-model="title"
            type="text"
            placeholder="Note title"
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
            style="--tw-ring-color: var(--vue-green)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            v-model="content"
            rows="4"
            placeholder="Note content"
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 resize-none"
            style="--tw-ring-color: var(--vue-green)"
            required
          />
        </div>
        <div class="flex items-center gap-2">
          <input id="edit-public" v-model="isPublic" type="checkbox" class="rounded" />
          <label for="edit-public" class="text-sm text-gray-700">Make public</label>
        </div>

        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="px-4 py-2 text-sm rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
            @click="emit('close')"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="px-4 py-2 text-sm rounded text-white font-medium disabled:opacity-50"
            style="background: var(--vue-green)"
          >
            {{ submitting ? 'Saving…' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
