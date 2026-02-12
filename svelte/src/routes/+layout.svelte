<script lang="ts">
	import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from 'svelte-clerk/client';
	import { onMount } from 'svelte';
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
		Badge,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import NoteModal from '$lib/components/NoteModal.svelte';

    let { children } = $props();

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

	onMount(() => {
		let intervalId: ReturnType<typeof setInterval> | undefined;
		const onClerkUserUpdate = async () => {
			try {
				// @ts-ignore - Clerk types handling
				const clerk = window.Clerk;
				if (clerk && clerk.user) {
					userName = clerk.user.firstName || clerk.user.username || 'User';
					console.log('User name updated to:', userName);
				}
				
				// Refresh token when user updates
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
		// Check for existing admin API key
		const storedApiKey = localStorage.getItem('adminApiKey');
		if (storedApiKey) {
			adminApiKey = storedApiKey;
			isAdminLoggedIn = true;
		}

		// Fetch API version
		versionStore.fetchVersion();
		
		// Mark Clerk as loaded when we're in the browser
		if (typeof window !== 'undefined') {
			clerkLoaded = true;
			
			// Get user data if available from Clerk
			try {
				// @ts-ignore - Clerk types handling
				const clerk = window.Clerk;
				if (clerk && clerk.user) {
					userName = clerk.user.firstName || clerk.user.username || 'User';
					console.log('User name set to:', userName);
				}
				
				// Get user token if session is available
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

			// Initial fetch of note counts
			fetchNoteCounts();
			
			// Set up an interval to refresh counts every minute
			intervalId = setInterval(fetchNoteCounts, 60000);
			
			// Set up an event listener for when clerk loads/changes
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
	<div class="min-h-screen bg-gray-50 flex flex-col">
		<!-- Header - Tailored to match the React app -->
		<header class="bg-white shadow-sm border-b">
			<div class="container mx-auto px-4 flex justify-between items-center h-16">
				<!-- Logo/Brand -->
				<a href={toBasePath('/')} class="text-lg font-semibold">Elysia Notes - Svelte</a>
				
				<!-- Main Navigation Links - No hamburger, always visible -->
				<div class="flex items-center space-x-6">
					<button type="button" class="text-gray-700 hover:text-gray-900" onclick={() => goto(toBasePath('/'))}>Home</button>
					<SignedIn>
						<a href={toBasePath('/notes')} class="text-gray-700 hover:text-gray-900 flex items-center">
							{isAdminLoggedIn ? 'All Notes' : 'My Notes'}
							<div class="flex space-x-1 ml-2">
								<Badge color="green" rounded class="text-xs py-0.5 px-1.5 bg-green-200 text-green-800">Public: {publicNotesCount}</Badge>
								<Badge color="purple" rounded class="text-xs py-0.5 px-1.5 bg-purple-200 text-purple-800">Private: {privateNotesCount}</Badge>
							</div>
						</a>
					</SignedIn>
					<SignedOut>
						<span class="text-sm text-gray-600">Anonymous</span>
					</SignedOut>
					
					<!-- User Authentication -->
					<SignedIn>
						<span class="text-sm text-gray-700">Hello, {isAdminLoggedIn ? 'Admin' : (userName || 'User')}</span>
						<UserButton />
					</SignedIn>
					
					<SignedOut>
						<span class="text-sm text-gray-700">Hello, Anonymous</span>
						<SignInButton mode="modal">
							<Button size="xs" color="primary" class="bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
						</SignInButton>
					</SignedOut>
					
					<!-- Admin Button - Styled like in the screenshot -->
					<Button 
						size="xs" 
						color={isAdminLoggedIn ? "red" : "blue"}
						class={isAdminLoggedIn ? "bg-red-600 hover:bg-red-700 text-white font-semibold px-4" : "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4"}
						onclick={isAdminLoggedIn ? handleAdminLogout : () => (adminModalOpen = true)}
					>
						{isAdminLoggedIn ? "Admin Logout" : "Admin Login"}
					</Button>
				</div>
			</div>
		</header>

		<!-- Main Content -->
		<main class="flex-grow">
			<div class="container mx-auto px-4 py-6">
				{@render children()}
			</div>
		</main>

		<!-- Footer -->
		<Footer class="mt-auto border-t border-gray-200">
			<div class="container mx-auto px-4">
				<div class="flex justify-between items-center py-4">
					<span class="text-sm text-gray-500">© 2024 Notes App</span>
					<div class="flex gap-4 text-sm text-gray-500">
						<a href={toBasePath('/')} class="hover:text-gray-700">Privacy Policy</a>
						<a href={toBasePath('/')} class="hover:text-gray-700">Terms of Service</a>
						<a href={toBasePath('/')} class="hover:text-gray-700">Contact Us</a>
					</div>
				</div>
			</div>
		</Footer>

		<!-- Admin Login Modal -->
		<Modal bind:open={adminModalOpen} title="Admin Login" autoclose={false}>
			<form class="space-y-4" onsubmit={handleFormSubmit}>
				<div>
					<Label for="apiKey">Admin API Key</Label>
					<Input id="apiKey" type="text" placeholder="Enter your admin API key" bind:value={adminKeyInput} />
					<p class="mt-2 text-sm text-gray-500">Enter the admin API key to access admin features</p>
				</div>
				<Button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white">Login</Button>
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
<div class="min-h-screen bg-gray-50 flex flex-col">
	<!-- Simple SSR-compatible layout -->
	<header class="bg-white shadow-sm border-b">
		<div class="container mx-auto px-4 flex justify-between items-center h-16">
			<a href={toBasePath('/')} class="text-lg font-semibold">Elysia Notes - Svelte</a>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-grow">
		<div class="container mx-auto px-4 py-6">
			{@render children()}
		</div>
	</main>
</div>
{/if}

<style>
	/* No custom styles needed - using Flowbite components */
</style>
