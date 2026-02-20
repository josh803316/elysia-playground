<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuth } from '@clerk/vue';

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

watch(
  () => props.initialIsPublic,
  (val) => {
    isPublic.value = val ?? false;
  },
);

async function handleSubmit() {
  if (!content.value.trim()) {
    error.value = 'Content cannot be empty';
    return;
  }
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
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click.self="emit('close')"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">
          {{ isAnonymous ? 'Create Public Note' : isPublic ? 'Create Public Note' : 'Create Private Note' }}
        </h2>
        <button class="text-gray-400 hover:text-gray-600 text-xl leading-none" @click="emit('close')">
          &times;
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div v-if="!isAnonymous">
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            v-model="title"
            type="text"
            placeholder="Note title"
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            v-model="content"
            rows="4"
            :placeholder="isAnonymous ? 'Write a public note…' : 'Note content'"
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 resize-none"
            required
          />
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
            :class="isPublic || isAnonymous ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'"
          >
            {{ submitting ? 'Posting…' : isAnonymous ? 'Post Public Note' : isPublic ? 'Create Public Note' : 'Create Private Note' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
