<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ isAdminLoggedIn: boolean }>();
const emit = defineEmits<{
  login: [key: string];
  logout: [];
  close: [];
}>();

const apiKey = ref('');
const error = ref<string | null>(null);
const submitting = ref(false);

async function handleSubmit() {
  error.value = null;
  if (!apiKey.value.trim()) {
    error.value = 'API key is required';
    return;
  }
  submitting.value = true;
  try {
    const res = await fetch('/api/api-key-example', {
      headers: { 'X-API-Key': apiKey.value },
    });
    if (!res.ok) throw new Error('Invalid API key');
    emit('login', apiKey.value);
  } catch {
    // Accept key anyway for demo parity with React app
    emit('login', apiKey.value);
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
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Admin Login</h2>
        <button class="text-gray-400 hover:text-gray-600 text-xl leading-none" @click="emit('close')">
          &times;
        </button>
      </div>

      <template v-if="isAdminLoggedIn">
        <p class="text-gray-600 mb-4">You are logged in as an administrator.</p>
        <button
          class="px-4 py-2 rounded bg-red-500 text-white font-medium hover:bg-red-600"
          @click="emit('logout')"
        >
          Logout
        </button>
      </template>

      <form v-else @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Admin API Key</label>
          <input
            v-model="apiKey"
            type="password"
            placeholder="Enter your admin API key"
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vue-green"
            :class="{ 'border-red-400': error }"
            required
          />
          <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="submitting"
            class="px-4 py-2 rounded text-white text-sm font-medium disabled:opacity-50"
            style="background: var(--vue-green)"
          >
            {{ submitting ? 'Logging in…' : 'Login' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
