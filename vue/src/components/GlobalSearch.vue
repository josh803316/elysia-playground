<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@clerk/vue';
import { useSearchNotes, type SearchNote } from '../composables/useSearchNotes';

const props = withDefaults(
  defineProps<{ adminApiKey?: string | null }>(),
  { adminApiKey: null }
);

const { getToken } = useAuth();
const { setSearch, clearSearch } = useSearchNotes();

const query = ref('');
const results = ref<SearchNote[]>([]);
const loading = ref(false);
const open = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);
const router = useRouter();
let debounceId: ReturnType<typeof setTimeout> | null = null;

watch(query, (q) => {
  if (!q.trim()) {
    results.value = [];
    open.value = false;
    clearSearch();
    return;
  }
  if (debounceId) clearTimeout(debounceId);
  debounceId = setTimeout(async () => {
    loading.value = true;
    try {
      const headers: Record<string, string> = {};
      const token = await getToken.value();
      if (token) headers.Authorization = `Bearer ${token}`;
      if (props.adminApiKey) headers['X-API-Key'] = props.adminApiKey;
      const res = await fetch(`/api/notes/search?q=${encodeURIComponent(q.trim())}`, { headers });
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      results.value = list;
      setSearch(q.trim(), list);
      open.value = true;
    } catch {
      results.value = [];
      setSearch(q.trim(), []);
    } finally {
      loading.value = false;
    }
  }, 200);
});

function handleClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside));
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside));

function goToNote(_note: SearchNote) {
  open.value = false;
  query.value = '';
  clearSearch();
  router.push(`/notes`);
}
</script>

<template>
  <div ref="containerRef" class="global-search">
    <input
      v-model="query"
      type="search"
      placeholder="Search notes…"
      class="search-input"
      aria-label="Search notes"
      data-testid="global-search-input"
      @focus="query.trim() && (open = true)"
    />
    <div v-if="open" class="search-dropdown">
      <div v-if="loading" class="search-item search-muted">Searching…</div>
      <div v-else-if="results.length === 0" class="search-item search-muted">No notes found</div>
      <button
        v-for="note in results"
        :key="note.id"
        type="button"
        class="search-item search-result"
        @click="goToNote(note)"
      >
        <span class="search-result-title">{{ note.title || 'Untitled' }}</span>
        <span v-if="note.content" class="search-result-snippet">{{ note.content.slice(0, 60) }}…</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.global-search {
  position: relative;
  flex: 1;
  max-width: 320px;
  margin: 0 1rem;
}
.search-input {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  outline: none;
}
.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  max-height: 320px;
  overflow: auto;
  z-index: 1001;
}
.search-item {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
}
.search-muted {
  color: #6b7280;
}
.search-result:hover {
  background: #f9fafb;
}
.search-result-title {
  font-weight: 600;
  color: #111827;
}
.search-result-snippet {
  display: block;
  color: #6b7280;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
