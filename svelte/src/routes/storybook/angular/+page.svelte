<script lang="ts">
  const STORYBOOK_URL = import.meta.env.VITE_STORYBOOK_ANGULAR_URL as string | undefined;
  // Angular Storybook has no Search/GlobalSearch story (Angular 21 compiler incompatibility).
  // Default to a story that exists when no path is in the URL.
  const iframeSrc =
    STORYBOOK_URL && !STORYBOOK_URL.includes('path=')
      ? `${STORYBOOK_URL.replace(/\/?$/, '')}?path=/story/notes-publicnotes--default`
      : STORYBOOK_URL ?? '';
</script>

<main class="storybook-page">
  <h1 class="storybook-title">Angular Storybook (Chromatic)</h1>

  {#if !STORYBOOK_URL}
    <p class="storybook-hint">
      Storybook URL is not configured. Set <code>VITE_STORYBOOK_ANGULAR_URL</code> in
      <code>svelte/.env</code> to the Chromatic-hosted Angular Storybook URL.
    </p>
  {:else}
    <div class="storybook-frame-wrapper">
      <iframe
        src={iframeSrc}
        title="Angular Storybook"
        class="storybook-iframe"
      ></iframe>
    </div>
  {/if}
</main>

<style>
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

