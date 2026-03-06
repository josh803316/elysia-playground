<script setup lang="ts">
import { ref, nextTick } from 'vue';

const props = withDefaults(defineProps<{
  code: string;
  id: string;
  label?: string;
}>(), { label: 'Vue code' });

const open = ref(false);
const panelEl = ref<HTMLDivElement | null>(null);

async function toggle() {
  open.value = !open.value;
  if (open.value) {
    await nextTick();
    if (panelEl.value && (window as any).Prism) {
      (window as any).Prism.highlightAllUnder(panelEl.value);
    }
  }
}
</script>

<template>
  <div class="code-expander">
    <button
      type="button"
      class="code-toggle"
      :aria-controls="`${props.id}-panel`"
      :aria-expanded="open"
      @click="toggle"
    >
      <span class="code-icon">&lt;/&gt;</span>
      {{ props.label }}
      <span class="chevron" :class="{ rotated: open }">▼</span>
    </button>
    <div v-if="open" :id="`${props.id}-panel`" ref="panelEl">
      <pre class="language-javascript" style="margin:0;border-radius:0.5rem;font-size:0.75rem"><code class="language-javascript">{{ props.code }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.code-expander {
  border-top: 1px solid #e5e7eb;
  margin-top: 1rem;
}
.code-toggle {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: left;
  border-radius: 0.375rem;
  transition: background 0.15s, color 0.15s;
}
.code-toggle:hover { background: #f9fafb; color: #374151; }
.code-icon { font-family: monospace; color: #9ca3af; }
.chevron {
  margin-left: 0.25rem;
  display: inline-block;
  transition: transform 0.2s;
}
.chevron.rotated { transform: rotate(180deg); }
</style>
