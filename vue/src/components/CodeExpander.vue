<script setup lang="ts">
import { ref, nextTick } from 'vue';

const props = withDefaults(defineProps<{
  code: string;
  id: string;
  label?: string;
  testCode?: string;
  testLabel?: string;
}>(), { label: 'Vue code', testLabel: 'E2E test (Playwright)' });

const open = ref(false);
const testOpen = ref(false);
const panelEl = ref<HTMLDivElement | null>(null);
const testPanelEl = ref<HTMLDivElement | null>(null);

async function toggle(isTest: boolean) {
  if (isTest) {
    testOpen.value = !testOpen.value;
    if (testOpen.value) {
      await nextTick();
      if (testPanelEl.value && (window as any).Prism) {
        (window as any).Prism.highlightAllUnder(testPanelEl.value);
      }
    }
  } else {
    open.value = !open.value;
    if (open.value) {
      await nextTick();
      if (panelEl.value && (window as any).Prism) {
        (window as any).Prism.highlightAllUnder(panelEl.value);
      }
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
      @click="toggle(false)"
    >
      <span class="code-icon">&lt;/&gt;</span>
      {{ props.label }}
      <span class="chevron" :class="{ rotated: open }">▼</span>
    </button>
    <div v-if="open" :id="`${props.id}-panel`" ref="panelEl">
      <pre class="language-javascript" style="margin:0;border-radius:0.5rem;font-size:0.75rem"><code class="language-javascript">{{ props.code }}</code></pre>
    </div>
  </div>
  <div v-if="props.testCode" class="code-expander">
    <button
      type="button"
      class="code-toggle"
      :aria-controls="`${props.id}-test-panel`"
      :aria-expanded="testOpen"
      @click="toggle(true)"
    >
      <span class="code-icon">🧪</span>
      {{ props.testLabel }}
      <span class="chevron" :class="{ rotated: testOpen }">▼</span>
    </button>
    <div v-if="testOpen" :id="`${props.id}-test-panel`" ref="testPanelEl">
      <pre class="language-javascript" style="margin:0;border-radius:0.5rem;font-size:0.75rem"><code class="language-javascript">{{ props.testCode }}</code></pre>
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
