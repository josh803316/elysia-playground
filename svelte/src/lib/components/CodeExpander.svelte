<script lang="ts">
  import { tick } from 'svelte';

  let { code, id, label = 'Svelte code' }: { code: string; id: string; label?: string } = $props();

  let open = $state(false);
  let panelEl = $state<HTMLDivElement | undefined>(undefined);

  async function toggle() {
    open = !open;
    if (open) {
      await tick();
      if (panelEl && (window as any).Prism) {
        (window as any).Prism.highlightAllUnder(panelEl);
      }
    }
  }
</script>

<div class="code-expander">
  <button
    type="button"
    class="code-toggle"
    onclick={toggle}
    aria-controls="{id}-panel"
    aria-expanded={open}
  >
    <span class="code-icon">&lt;/&gt;</span>
    {label}
    <span class="chevron" class:rotated={open}>▼</span>
  </button>
  {#if open}
    <div id="{id}-panel" bind:this={panelEl}>
      <pre class="language-javascript" style="margin:0;border-radius:0.5rem;font-size:0.75rem"><code class="language-javascript">{code}</code></pre>
    </div>
  {/if}
</div>

<style>
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
