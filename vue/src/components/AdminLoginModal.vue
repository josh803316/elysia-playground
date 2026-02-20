<script setup lang="ts">
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';

defineProps<{ isAdminLoggedIn: boolean }>();
const emit = defineEmits<{
  login: [key: string];
  logout: [];
  close: [];
}>();

const apiKey = ref('');
const error = ref<string | null>(null);
const submitting = ref(false);
const visible = ref(true);

async function handleSubmit() {
  error.value = null;
  if (!apiKey.value.trim()) {
    error.value = 'API key is required';
    return;
  }
  submitting.value = true;
  try {
    emit('login', apiKey.value);
  } finally {
    submitting.value = false;
  }
}

function onHide() {
  visible.value = false;
  emit('close');
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    header="Admin Login"
    :modal="true"
    :closable="true"
    :style="{ width: '420px' }"
    @hide="onHide"
  >
    <template v-if="isAdminLoggedIn">
      <p style="margin-bottom: 1rem; color: #374151;">You are logged in as an administrator.</p>
      <Button label="Logout" severity="danger" @click="emit('logout')" />
    </template>

    <form v-else @submit.prevent="handleSubmit">
      <div class="field">
        <label for="admin-key" class="field-label">Admin API Key</label>
        <InputText
          id="admin-key"
          v-model="apiKey"
          type="password"
          placeholder="Enter your admin API key"
          class="w-full"
          required
        />
        <Message v-if="error" severity="error" :closable="false" style="margin-top: 0.5rem">
          {{ error }}
        </Message>
      </div>

      <div class="dialog-footer">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          text
          @click="emit('close')"
        />
        <Button
          type="submit"
          label="Login"
          :loading="submitting"
        />
      </div>
    </form>
  </Dialog>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}
.field-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}
.w-full { width: 100%; }
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
