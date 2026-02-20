<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useClerk, useUser, useAuth } from '@clerk/vue';
import AdminLoginModal from './AdminLoginModal.vue';

const { user, isSignedIn } = useUser();
const { getToken } = useAuth();
const clerk = useClerk();

const showAdminModal = ref(false);
const isAdminLoggedIn = ref(false);
const adminApiKey = ref<string | null>(null);
const publicNotesCount = ref(0);
const privateNotesCount = ref(0);

onMounted(() => {
  const stored = localStorage.getItem('adminApiKey');
  if (stored) {
    adminApiKey.value = stored;
    isAdminLoggedIn.value = true;
  }
});

watch(isSignedIn, async (val) => {
  if (val) await fetchCounts();
  else {
    publicNotesCount.value = 0;
    privateNotesCount.value = 0;
  }
});

async function fetchCounts() {
  if (!isSignedIn.value) return;
  try {
    const pubRes = await fetch('/api/public-notes');
    const pubData: unknown = await pubRes.json();
    publicNotesCount.value = Array.isArray(pubData) ? pubData.length : 0;

    const token = await getToken.value();
    if (token) {
      const privRes = await fetch('/api/private-notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const privData: unknown = await privRes.json();
      privateNotesCount.value = Array.isArray(privData)
        ? (privData as { isPublic?: string }[]).filter((n) => n.isPublic !== 'true').length
        : 0;
    }
  } catch {
    // counts are informational; ignore errors
  }
}

function handleAdminLogin(key: string) {
  adminApiKey.value = key;
  isAdminLoggedIn.value = true;
  localStorage.setItem('adminApiKey', key);
  showAdminModal.value = false;
}

function handleAdminLogout() {
  adminApiKey.value = null;
  isAdminLoggedIn.value = false;
  localStorage.removeItem('adminApiKey');
  window.location.reload();
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Header -->
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      style="height: 60px"
    >
      <div class="max-w-[1320px] mx-auto px-4 h-full flex items-center justify-between">
        <RouterLink to="/" class="text-xl font-bold no-underline" style="color: var(--vue-dark)">
          Elysia Notes – Vue
        </RouterLink>

        <nav class="flex items-center gap-4">
          <RouterLink to="/" class="text-gray-700 hover:text-gray-900 no-underline text-sm">
            Home
          </RouterLink>

          <template v-if="isSignedIn">
            <RouterLink to="/notes" class="text-gray-700 hover:text-gray-900 no-underline text-sm flex items-center gap-2">
              <span>{{ isAdminLoggedIn ? 'All Notes' : 'My Notes' }}</span>
              <span class="inline-flex items-center gap-1">
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Public: {{ publicNotesCount }}
                </span>
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Private: {{ privateNotesCount }}
                </span>
              </span>
            </RouterLink>
          </template>

          <template v-if="isSignedIn">
            <span class="text-sm text-gray-600">Hello, {{ user?.firstName || 'User' }}</span>
            <button
              class="w-8 h-8 rounded-full bg-vue-dark text-white text-sm font-medium overflow-hidden"
              @click="clerk?.openUserProfile()"
            >
              {{ (user?.firstName || 'U')[0].toUpperCase() }}
            </button>
          </template>
          <template v-else>
            <button
              class="px-3 py-1.5 text-sm rounded text-white font-medium"
              style="background: var(--vue-green)"
              @click="clerk?.openSignIn()"
            >
              Sign In
            </button>
          </template>

          <div class="h-4 w-px bg-gray-300" />

          <button
            v-if="isAdminLoggedIn"
            class="px-3 py-1.5 text-sm rounded bg-red-500 text-white font-medium"
            @click="handleAdminLogout"
          >
            Admin Logout
          </button>
          <button
            v-else
            class="px-3 py-1.5 text-sm rounded text-white font-medium"
            style="background: var(--vue-green)"
            @click="showAdminModal = true"
          >
            Admin Login
          </button>
        </nav>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1 mt-[60px] py-8 px-4">
      <div class="max-w-[1320px] mx-auto">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-400 py-4">
      <div class="max-w-[1320px] mx-auto px-4 flex items-center justify-between">
        <span class="text-sm">© 2024 Notes App</span>
        <div class="flex gap-4 text-sm">
          <span class="cursor-pointer hover:text-gray-300">Privacy Policy</span>
          <span class="cursor-pointer hover:text-gray-300">Terms of Service</span>
          <span class="cursor-pointer hover:text-gray-300">Contact Us</span>
        </div>
      </div>
    </footer>

    <!-- Admin login modal -->
    <AdminLoginModal
      v-if="showAdminModal"
      :is-admin-logged-in="isAdminLoggedIn"
      @login="handleAdminLogin"
      @logout="handleAdminLogout"
      @close="showAdminModal = false"
    />
  </div>
</template>
