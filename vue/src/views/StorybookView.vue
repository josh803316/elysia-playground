<script setup lang="ts">
const STORYBOOK_URL = import.meta.env.VITE_STORYBOOK_VUE_URL as string | undefined;
</script>

<template>
  <main class="storybook-page">
    <h1 class="storybook-title">Vue Storybook (Chromatic)</h1>
    <p v-if="!STORYBOOK_URL" class="storybook-hint">
      Storybook URL is not configured. Set <code>VITE_STORYBOOK_VUE_URL</code> in
      <code>vue/.env</code> to the Chromatic-hosted Storybook URL.
    </p>
    <div v-else class="storybook-frame-wrapper">
      <iframe
        :src="STORYBOOK_URL"
        title="Vue Storybook"
        class="storybook-iframe"
      />
    </div>
  </main>
</template>

<style scoped>
.storybook-page {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
  box-sizing: border-box;
}

.storybook-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.storybook-hint {
  color: #6b7280;
}

.storybook-frame-wrapper {
  flex: 1;
  min-height: 0;
}

.storybook-iframe {
  width: 100%;
  height: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #fff;
}
</style>

