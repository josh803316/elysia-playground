<script lang="ts">
	import { ClerkProvider, SignedIn, SignedOut, SignInButton } from 'svelte-clerk/client';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { versionStore } from '$lib/stores/version';
	
	// Import Flowbite components
import { 
		Navbar, 
		NavBrand, 
		NavLi, 
		NavUl, 
		Button,
		Modal,
		Label,
		Input,
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import NoteModal from '$lib/components/NoteModal.svelte';
	import GlobalSearch from '$lib/components/GlobalSearch.svelte';
	import CodeExpander from '$lib/components/CodeExpander.svelte';

    let { children } = $props();
	let versionsOpen = $state(false);

	let publicNotesCount = $state(0);
	let privateNotesCount = $state(0);
	let isAdminLoggedIn = $state(false);
	let adminApiKey = $state<string | null>(null);
	let adminKeyInput = $state("");
	let adminModalOpen = $state(false);
	let clerkLoaded = $state(false);

	const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

	if (!CLERK_PUBLISHABLE_KEY) {
		throw new Error('Missing Clerk publishable key. Set VITE_CLERK_PUBLISHABLE_KEY in env');
	}
	let userName = $state<string | null>(null);
	let createNoteModalOpen = $state(false);
	let createPublicNote = $state(true);
	let editingNote = $state<any>(null);
	let userToken = $state<string | null>(null);
	const toBasePath = (path: string) => `${base}${path}`;

	const SVELTE_NAV_CODE = `// +layout.svelte – SvelteKit top nav, auth, and admin wiring
let publicNotesCount = $state(0);
let privateNotesCount = $state(0);
let isAdminLoggedIn = $state(false);
let adminApiKey = $state<string | null>(null);
let adminKeyInput = $state("");
let clerkLoaded = $state(false);
let userName = $state<string | null>(null);
let userToken = $state<string | null>(null);

// Fetch public + private note counts
async function fetchNoteCounts() {
  const publicResponse = await fetch('/api/public-notes');
  if (publicResponse.ok) {
    const publicData = await publicResponse.json();
    publicNotesCount = Array.isArray(publicData) ? publicData.length : 0;
  }

  // Admin: use /api/notes/all with X-API-Key
  if (isAdminLoggedIn && adminApiKey) {
    const adminResponse = await fetch('/api/notes/all', {
      headers: { 'X-API-Key': adminApiKey },
    });
    if (adminResponse.ok) {
      const allNotes = await adminResponse.json();
      if (Array.isArray(allNotes)) {
        const publicCount = allNotes.filter((note) => note.isPublic === 'true').length;
        privateNotesCount = allNotes.length - publicCount;
        publicNotesCount = publicCount;
      }
    }
    return;
  }

  // Signed-in user: count private notes via Clerk token
  if (typeof window !== 'undefined' && clerkLoaded) {
    const clerk = (window as any).Clerk;
    if (clerk?.session) {
      const token = await clerk.session.getToken();
      if (token) {
        const privateResponse = await fetch('/api/private-notes', {
          headers: { Authorization: 'Bearer ' + token },
        });
        if (privateResponse.ok) {
          const privateData = await privateResponse.json();
          const trulyPrivate = Array.isArray(privateData)
            ? privateData.filter((note) => note.isPublic !== 'true')
            : [];
          privateNotesCount = trulyPrivate.length;
        }
      }
    }
  }
}

// Restore admin key and Clerk context on mount (Svelte 5)
$effect(() => {
  const storedApiKey = localStorage.getItem('adminApiKey');
  if (storedApiKey) {
    adminApiKey = storedApiKey;
    isAdminLoggedIn = true;
  }
  versionStore.fetchVersion();
  clerkLoaded = true;
  fetchNoteCounts();
});

function handleAdminLogin() {
  const apiKey = adminKeyInput;
  adminApiKey = apiKey || null;
  isAdminLoggedIn = true;
  localStorage.setItem('adminApiKey', apiKey || '');
  adminModalOpen = false;
  fetchNoteCounts();
  window.location.reload();
}

function handleAdminLogout() {
  adminApiKey = null;
  isAdminLoggedIn = false;
  localStorage.removeItem('adminApiKey');
  fetchNoteCounts();
  window.location.reload();
}`;

	// Fetch note counts
	async function fetchNoteCounts() {
		try {
			// Fetch public notes count first - always available
			const publicResponse = await fetch('/api/public-notes');
			if (publicResponse.ok) {
				const publicData = await publicResponse.json();
				publicNotesCount = Array.isArray(publicData) ? publicData.length : 0;
			}

			// If admin is logged in, get admin counts
			if (isAdminLoggedIn && adminApiKey) {
				const adminResponse = await fetch('/api/notes/all', {
					headers: {
						'X-API-Key': adminApiKey
					}
				});

				if (adminResponse.ok) {
					const allNotes = await adminResponse.json();
					if (Array.isArray(allNotes)) {
						const publicCount = allNotes.filter(note => note.isPublic === 'true').length;
						privateNotesCount = allNotes.length - publicCount;
						// Update public count from admin data
						publicNotesCount = publicCount;
					}
				}
				return;
			}

			// For regular users, if they're signed in, get their private notes
			if (typeof window !== 'undefined' && clerkLoaded) {
				try {
					// @ts-ignore - Clerk types handling
					const clerk = window.Clerk;
					if (clerk && clerk.session) {
						const token = await clerk.session.getToken();
						
						if (token) {
							const privateResponse = await fetch('/api/private-notes', {
								headers: {
									'Authorization': `Bearer ${token}`
								}
							});
							
							if (privateResponse.ok) {
								const privateData = await privateResponse.json();
								
								// Filter to only include truly private notes (not public)
								const trulyPrivateNotes = Array.isArray(privateData)
									? privateData.filter(note => note.isPublic !== 'true')
									: [];
									
								privateNotesCount = trulyPrivateNotes.length;
							}
						}
					}
				} catch (err) {
					console.error('Error fetching private notes count:', err);
				}
			}
		} catch (err) {
			console.error('Error fetching note counts:', err);
		}
	}

	let layoutInitDone = false;
	$effect(() => {
		if (layoutInitDone) return;
		layoutInitDone = true;
		let intervalId: ReturnType<typeof setInterval> | undefined;
		const onClerkUserUpdate = async () => {
			try {
				// @ts-ignore - Clerk types handling
				const clerk = window.Clerk;
				if (clerk && clerk.user) {
					userName = clerk.user.firstName || clerk.user.username || 'User';
					console.log('User name updated to:', userName);
				}

				if (clerk && clerk.session) {
					try {
						const token = await clerk.session.getToken();
						if (token) {
							userToken = token;
							console.log('User token refreshed');
						}
					} catch (err) {
						console.error('Error refreshing token:', err);
					}
				}
			} catch (err) {
				console.error('Error updating user data from Clerk:', err);
			}
		};

		const initialize = async () => {
			const storedApiKey = localStorage.getItem('adminApiKey');
			if (storedApiKey) {
				adminApiKey = storedApiKey;
				isAdminLoggedIn = true;
			}

			versionStore.fetchVersion();

			if (typeof window !== 'undefined') {
				clerkLoaded = true;

				try {
					// @ts-ignore - Clerk types handling
					const clerk = window.Clerk;
					if (clerk && clerk.user) {
						userName = clerk.user.firstName || clerk.user.username || 'User';
						console.log('User name set to:', userName);
					}

					if (clerk && clerk.session) {
						try {
							const token = await clerk.session.getToken();
							if (token) {
								userToken = token;
								console.log('User token retrieved in layout');
							}
						} catch (err) {
							console.error('Error getting user token:', err);
						}
					}
				} catch (err) {
					console.error('Error getting user data from Clerk:', err);
				}

				fetchNoteCounts();
				intervalId = setInterval(fetchNoteCounts, 60000);
				document.addEventListener('clerk-user-update', onClerkUserUpdate);
			}
		};

		void initialize();

		return () => {
			if (intervalId) clearInterval(intervalId);
			document.removeEventListener('clerk-user-update', onClerkUserUpdate);
		};
	});

	function handleAdminLogin() {
		const apiKey = adminKeyInput;
		adminApiKey = apiKey || null;
		isAdminLoggedIn = true;
		localStorage.setItem('adminApiKey', apiKey || '');
		adminModalOpen = false;
		// Refresh counts after login
		fetchNoteCounts();
		window.location.reload();
	}

	function handleAdminLogout() {
		adminApiKey = null;
		isAdminLoggedIn = false;
		localStorage.removeItem('adminApiKey');
		// Refresh counts after logout
		fetchNoteCounts();
		window.location.reload();
	}
	
	// Handle form submission
	function handleFormSubmit(e: Event) {
		e.preventDefault();
		handleAdminLogin();
	}
	
	// Handle create note button click
	async function handleCreateNote(isPublic: boolean) {
		console.log('handleCreateNote called with isPublic:', isPublic);
		
		// Get fresh token if needed
		if (!userToken && typeof window !== 'undefined') {
			try {
				// @ts-ignore - Clerk types handling
				const clerk = window.Clerk;
				if (clerk && clerk.session) {
					userToken = await clerk.session.getToken();
					console.log('Token retrieved:', userToken ? 'Yes' : 'No');
				}
			} catch (err) {
				console.error('Error getting token:', err);
			}
		}
		
		createPublicNote = isPublic;
		editingNote = null;
		createNoteModalOpen = true;
		console.log('Modal state set - createPublicNote:', createPublicNote, 'createNoteModalOpen:', createNoteModalOpen);
	}
</script>

{#if typeof window !== 'undefined'}
<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
	<div class="min-h-screen bg-gray-100 flex flex-col">
		<!-- Header - Tailored to match the React app -->
		<header class="bg-white shadow-sm border-b">
			<div class="container mx-auto px-4 flex justify-between items-center h-[60px]" style="max-width: 1320px;">
				<!-- Logo/Brand -->
				<a href={toBasePath('/')} class="text-xl font-bold text-gray-900 hover:text-teal-600 transition-colors shrink-0">Elysia Notes - Svelte</a>

				<!-- Global search - right of title, left of nav -->
				<GlobalSearch adminApiKey={adminApiKey} />

				<!-- Main Navigation Links - No hamburger, always visible -->
				<div class="flex items-center gap-4 shrink-0">
					<a href={toBasePath('/')} class="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Home</a>
					<!-- Public badge: signed-out only (standalone) -->
					<SignedOut>
						<span class="text-xs font-medium py-0.5 px-2 rounded bg-green-100 text-green-800">Public: {publicNotesCount}</span>
					</SignedOut>
					<!-- My Notes + both badges: only when signed in -->
					<SignedIn>
						<a href={toBasePath('/notes')} class="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1.5 transition-colors">
							{isAdminLoggedIn ? 'All Notes' : 'My Notes'}
							<span class="text-xs font-medium py-0.5 px-2 rounded bg-green-100 text-green-800">Public: {publicNotesCount}</span>
							<span class="text-xs font-medium py-0.5 px-2 rounded bg-purple-100 text-purple-800">Private: {privateNotesCount}</span>
						</a>
					</SignedIn>

					<!-- User Authentication -->
					<SignedIn>
						<span class="text-sm text-gray-700">Hello, {isAdminLoggedIn ? 'Admin' : (userName || 'User')}</span>
						<button
							type="button"
							class="text-sm font-medium text-gray-600 hover:text-gray-900 bg-transparent border-none cursor-pointer p-0 transition-colors"
							onclick={() => (window as any).Clerk?.signOut()}
						>Sign Out</button>
						<button
							type="button"
							class={`text-sm font-medium text-white px-3 py-1.5 rounded border-none cursor-pointer transition-colors ${isAdminLoggedIn ? 'bg-red-600 hover:bg-red-700' : 'bg-teal-600 hover:bg-teal-700'}`}
							style={isAdminLoggedIn ? 'background:#dc2626' : 'background:#0d9488'}
							onclick={isAdminLoggedIn ? handleAdminLogout : () => (adminModalOpen = true)}
						>
							{isAdminLoggedIn ? "Admin Logout" : "Admin Login"}
						</button>
					</SignedIn>

					<SignedOut>
						<SignInButton mode="modal">
							<button type="button" class="text-sm font-medium text-white px-4 py-2 rounded-lg border-none cursor-pointer transition-colors" style="background:#0d9488" onmouseover={(e: MouseEvent) => ((e.currentTarget as HTMLElement).style.background = '#0f766e')} onmouseout={(e: MouseEvent) => ((e.currentTarget as HTMLElement).style.background = '#0d9488')}
							>Sign In</button>
						</SignInButton>
						<button
							type="button"
							class="text-sm font-medium text-white px-3 py-1.5 rounded border-none cursor-pointer transition-colors"
							style="background:#0d9488"
							onmouseover={(e: MouseEvent) => ((e.currentTarget as HTMLElement).style.background = '#0f766e')}
							onmouseout={(e: MouseEvent) => ((e.currentTarget as HTMLElement).style.background = '#0d9488')}
							onclick={() => (adminModalOpen = true)}
						>Admin Login</button>
					</SignedOut>
				</div>
			</div>
		</header>

		<!-- Top nav / auth / admin code sample (full width of content area, left-aligned) -->
		<div class="w-full max-w-[1320px] mx-auto px-4 mt-3 box-border">
			<CodeExpander code={SVELTE_NAV_CODE} id="svelte-nav-code" label="Svelte nav & auth code" />
		</div>

		<!-- Main Content - match HTMX/React: 1320px container, 2rem vertical / 1rem horizontal padding -->
		<main class="flex-grow">
			<div class="mx-auto px-4 py-8" style="max-width: 1320px;">
				{@render children()}
			</div>
		</main>

		<!-- Footer - match HTMX dark footer; Versions inline with other links -->
		<footer class="bg-gray-800 text-gray-400 py-6 mt-12 relative">
			{#if versionsOpen}
				<div class="versions-panel absolute bottom-full right-4 mb-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-left max-w-sm max-h-[70vh] overflow-auto z-50">
					<div class="flex justify-between items-center mb-3">
						<span class="font-semibold text-gray-800">Versions</span>
						<button type="button" class="text-gray-500 hover:text-gray-700 text-lg leading-none" onclick={() => (versionsOpen = false)} aria-label="Close">×</button>
					</div>
					{#if $versionStore.loading}
						<p class="text-sm text-gray-500">Loading…</p>
					{:else if $versionStore.error}
						<p class="text-sm text-red-600">{$versionStore.error.message}</p>
					{:else if $versionStore.data}
						{@const d = $versionStore.data}
						<dl class="text-sm space-y-2">
							<div><dt class="text-gray-500">App</dt><dd class="font-medium">{d.name} @ {d.version}</dd></div>
							{#if d.elysia}<div><dt class="text-gray-500">Elysia</dt><dd class="font-medium">{d.elysia}</dd></div>{/if}
							{#if d.commitSha}<div><dt class="text-gray-500">Commit</dt><dd class="font-mono text-xs break-all">{d.commitSha}</dd></div>{/if}
							<div><dt class="text-gray-500">Environment</dt><dd>{d.environment}</dd></div>
							{#if Object.keys(d.frameworks).length > 0}
								<div><dt class="text-gray-500 mt-2">Frameworks</dt>
									<dd class="mt-1 space-y-1">
										{#each Object.entries(d.frameworks) as [name, info]}
											<div class="pl-2 border-l-2 border-gray-200">
												<span class="font-medium">{info.name}</span> <span class="text-gray-600">{info.version}</span>
												{#if Object.keys(info.dependencies).length > 0}
													<ul class="text-xs text-gray-500 mt-0.5">
														{#each Object.entries(info.dependencies) as [dep, ver]}
															<li>{dep}: {ver}</li>
														{/each}
													</ul>
												{/if}
											</div>
										{/each}
									</dd>
								</div>
							{/if}
							{#if d.config || d.rootDependencies || (d.workspaces && Object.keys(d.workspaces).length > 0)}
								<div class="mt-3 pt-3 border-t border-gray-200">
									<dt class="text-gray-500 font-semibold mb-1">Configuration &amp; dependencies</dt>
									<dd class="space-y-2">
										{#if d.config?.packageManager}
											<div><span class="text-gray-500">packageManager</span> <span class="font-mono text-xs">{d.config.packageManager}</span></div>
										{/if}
										{#if d.config?.engines && Object.keys(d.config.engines).length > 0}
											<div><span class="text-gray-500">engines</span>
												<ul class="text-xs text-gray-500 mt-0.5 pl-3">
													{#each Object.entries(d.config.engines) as [k, v]}
														<li>{k}: {v}</li>
													{/each}
												</ul>
											</div>
										{/if}
										{#if d.config?.overrides && Object.keys(d.config.overrides).length > 0}
											<div><span class="text-gray-500">overrides</span>
												<ul class="text-xs text-gray-500 mt-0.5 pl-3">
													{#each Object.entries(d.config.overrides) as [k, v]}
														<li>{k}: {v}</li>
													{/each}
												</ul>
											</div>
										{/if}
										{#if d.rootDependencies && (Object.keys(d.rootDependencies.dependencies || {}).length > 0 || Object.keys(d.rootDependencies.devDependencies || {}).length > 0)}
											<div><span class="text-gray-500">Root deps</span>
												<ul class="text-xs text-gray-500 mt-0.5 pl-3">
													{#each Object.entries(d.rootDependencies.dependencies || {}) as [k, v]}
														<li>{k}: {v}</li>
													{/each}
													{#each Object.entries(d.rootDependencies.devDependencies || {}) as [k, v]}
														<li>{k}: {v} <span class="text-gray-400">(dev)</span></li>
													{/each}
												</ul>
											</div>
										{/if}
										{#if d.workspaces && Object.keys(d.workspaces).length > 0}
											<div class="mt-2"><span class="text-gray-500 block mb-1">Workspaces</span>
												{#each Object.entries(d.workspaces) as [key, ws]}
													<div class="pl-2 border-l-2 border-gray-200 mb-2">
														<span class="font-medium">{ws.name}</span> <span class="text-gray-600">{ws.version}</span>
														<ul class="text-xs text-gray-500 mt-0.5 pl-4">
															{#each Object.entries(ws.dependencies || {}) as [dep, ver]}
																<li>{dep}: {ver}</li>
															{/each}
															{#each Object.entries(ws.devDependencies || {}) as [dep, ver]}
																<li>{dep}: {ver} <span class="text-gray-400">(dev)</span></li>
															{/each}
														</ul>
													</div>
												{/each}
											</div>
										{/if}
									</dd>
								</div>
							{/if}
						</dl>
					{:else}
						<p class="text-sm text-gray-500">No version data</p>
					{/if}
				</div>
			{/if}
			<div class="mx-auto px-4" style="max-width: 1320px;">
				<div class="flex justify-between items-center">
					<span class="text-sm">© 2024 Notes App</span>
					<div class="flex gap-4 text-sm items-center flex-wrap">
						<a href={toBasePath('/')} class="hover:text-white transition-colors">Privacy Policy</a>
						<a href={toBasePath('/')} class="hover:text-white transition-colors">Terms of Service</a>
						<a href={toBasePath('/')} class="hover:text-white transition-colors">Contact Us</a>
						<button type="button" class="text-sm text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0" onclick={() => (versionsOpen = !versionsOpen)}>Versions</button>
					</div>
				</div>
			</div>
		</footer>

		<!-- Admin Login Modal -->
		<Modal bind:open={adminModalOpen} title="Admin Login" autoclose={false}>
			<form class="space-y-4" onsubmit={handleFormSubmit}>
				<div>
					<Label for="apiKey">Admin API Key</Label>
					<Input id="apiKey" type="text" placeholder="Enter your admin API key" bind:value={adminKeyInput} />
					<p class="mt-2 text-sm text-gray-500">Enter the admin API key to access admin features</p>
				</div>
				<Button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-white border-none">Login</Button>
			</form>
		</Modal>

		<!-- Note creation modal -->
		<NoteModal 
			bind:open={createNoteModalOpen} 
			onClose={() => createNoteModalOpen = false} 
			onSuccess={() => {
				createNoteModalOpen = false;
				fetchNoteCounts();
				// Small delay before reload to ensure counts are updated
				setTimeout(() => window.location.reload(), 100);
			}}
			userToken={userToken}
			initialNote={editingNote}
			isEditing={false}
			initialPublic={createPublicNote}
		/>

	</div>
</ClerkProvider>
{:else}
<div class="min-h-screen bg-gray-100 flex flex-col">
	<!-- Simple SSR-compatible layout -->
	<header class="bg-white shadow-sm border-b">
		<div class="container mx-auto px-4 flex justify-between items-center h-16">
			<a href={toBasePath('/')} class="text-xl font-bold text-gray-900 hover:text-teal-600 transition-colors">Elysia Notes - Svelte</a>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-grow">
		<div class="mx-auto px-4 py-8" style="max-width: 1320px;">
			{@render children()}
		</div>
	</main>
</div>
{/if}

<style>
	/* No custom styles needed - using Flowbite components */
</style>
