<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useClerk, useUser, useAuth } from '@clerk/vue';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Badge from 'primevue/badge';
import AdminLoginModal from './AdminLoginModal.vue';
import GlobalSearch from './GlobalSearch.vue';

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
  <div class="app-shell">
    <!-- Header -->
    <header class="app-header">
      <div class="header-inner">
        <RouterLink to="/" class="brand-link">
          Elysia Notes – Vue
        </RouterLink>

        <GlobalSearch :admin-api-key="adminApiKey" />

        <nav class="header-nav">
          <RouterLink to="/" class="nav-link">Home</RouterLink>

          <RouterLink v-if="isSignedIn" to="/notes" class="nav-link nav-link--notes">
            <span>{{ isAdminLoggedIn ? 'All Notes' : 'My Notes' }}</span>
            <span class="note-counts">
              <Badge :value="`Public: ${publicNotesCount}`" severity="success" size="small" />
              <Badge :value="`Private: ${privateNotesCount}`" severity="secondary" size="small" />
            </span>
          </RouterLink>

          <Divider layout="vertical" class="nav-divider" />

          <template v-if="isSignedIn">
            <span class="welcome-text">Hello, {{ user?.firstName || 'User' }}</span>
            <Button
              icon="pi pi-user"
              rounded
              text
              severity="secondary"
              size="small"
              @click="clerk?.openUserProfile()"
            />
          </template>
          <template v-else>
            <Button
              label="Sign In"
              size="small"
              @click="clerk?.openSignIn()"
            />
          </template>

          <Button
            v-if="isAdminLoggedIn"
            label="Admin Logout"
            severity="danger"
            size="small"
            outlined
            @click="handleAdminLogout"
          />
          <Button
            v-else
            label="Admin Login"
            severity="secondary"
            size="small"
            outlined
            @click="showAdminModal = true"
          />
        </nav>
      </div>
    </header>

    <!-- Main -->
    <main class="app-main">
      <div class="app-container">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="app-container footer-inner">
        <span>© 2024 Notes App</span>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>

    <AdminLoginModal
      v-if="showAdminModal"
      :is-admin-logged-in="isAdminLoggedIn"
      @login="handleAdminLogin"
      @logout="handleAdminLogout"
      @close="showAdminModal = false"
    />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f3f4f6;
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  z-index: 100;
}

.header-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-link {
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  color: #35495e;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-link {
  text-decoration: none;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover { color: #111827; }

.note-counts {
  display: flex;
  gap: 0.25rem;
}

.nav-divider {
  height: 1.5rem;
  margin: 0 0.25rem;
}

.welcome-text {
  font-size: 0.875rem;
  color: #6b7280;
}

.app-main {
  flex: 1;
  margin-top: 60px;
  padding: 2rem 1rem;
}

.app-container {
  max-width: 1320px;
  margin: 0 auto;
}

.app-footer {
  background: #1f2937;
  color: #9ca3af;
  padding: 1rem;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  gap: 1rem;
}

.footer-links a {
  color: #9ca3af;
  text-decoration: none;
}

.footer-links a:hover { color: #d1d5db; }
</style>
