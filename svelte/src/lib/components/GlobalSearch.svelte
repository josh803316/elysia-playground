<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { searchStore, type SearchNote } from '$lib/stores/searchStore.svelte';

	interface Props {
		adminApiKey?: string | null;
	}
	let { adminApiKey = null }: Props = $props();

	let query = $state('');
	let results = $state<SearchNote[]>([]);
	let loading = $state(false);
	let open = $state(false);
	let containerEl: HTMLDivElement;
	let debounceId: ReturnType<typeof setTimeout> | null = null;

	$effect(() => {
		const q = query.trim();
		if (!q) {
			results = [];
			open = false;
			searchStore.clearSearch();
			return;
		}
		if (debounceId) clearTimeout(debounceId);
		debounceId = setTimeout(async () => {
			loading = true;
			try {
				const headers: Record<string, string> = {};
				if (typeof window !== 'undefined' && (window as any).Clerk?.session) {
					const token = await (window as any).Clerk.session.getToken();
					if (token) headers['Authorization'] = `Bearer ${token}`;
				}
				if (adminApiKey) headers['X-API-Key'] = adminApiKey;
				// API is at origin root; do not use SPA base (e.g. /svelte) or request returns HTML
				const res = await fetch(`/api/notes/search?q=${encodeURIComponent(q)}`, { headers });
				if (!res.ok) throw new Error('Search failed');
				const data = await res.json();
				const list = Array.isArray(data) ? data : [];
				results = list;
				searchStore.setSearch(q, list);
				open = true;
			} catch {
				results = [];
				searchStore.setSearch(q, []);
			} finally {
				loading = false;
			}
		}, 200);
		return () => {
			if (debounceId) clearTimeout(debounceId);
		};
	});

	function handleClickOutside(e: MouseEvent) {
		if (containerEl && !containerEl.contains(e.target as Node)) open = false;
	}

	function clearAndGo() {
		open = false;
		query = '';
		searchStore.clearSearch();
	}
</script>

<svelte:window onmousedown={handleClickOutside} />

<div bind:this={containerEl} class="global-search">
	<input
		type="search"
		placeholder="Search notes…"
		bind:value={query}
		onfocus={() => query.trim() && (open = true)}
		class="search-input"
		aria-label="Search notes"
		data-testid="global-search-input"
	/>
	{#if open}
		<div class="search-dropdown">
			{#if loading}
				<div class="search-item search-muted">Searching…</div>
			{:else if results.length === 0}
				<div class="search-item search-muted">No notes found</div>
			{:else}
				{#each results as note (note.id)}
					<button
						type="button"
						class="search-item search-result"
						onclick={() => { clearAndGo(); goto(`${base}/notes/${note.id}/edit`); }}
					>
						<span class="search-result-title">{note.title || 'Untitled'}</span>
						{#if note.content}
							<span class="search-result-snippet">{note.content.slice(0, 60)}…</span>
						{/if}
					</button>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
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
