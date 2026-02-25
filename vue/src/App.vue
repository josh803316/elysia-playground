<!-- Root shell: only renders the active route via RouterView. Layout (nav, footer) lives in views/layout components. -->
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { provideSearchNotes } from './composables/useSearchNotes';

// Provide at app root so both layout (GlobalSearch) and views (HomeView, etc.) can inject. If we only
// provided in AppLayout, HomeView's setup() would run before AppLayout exists and useSearchNotes() would throw.
provideSearchNotes();
</script>

<template>
  <RouterView />
</template>
