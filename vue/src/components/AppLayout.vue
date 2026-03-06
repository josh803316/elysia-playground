<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useClerk, useUser, useAuth } from '@clerk/vue';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Badge from 'primevue/badge';
import AdminLoginModal from './AdminLoginModal.vue';
import GlobalSearch from './GlobalSearch.vue';
import CodeExpander from './CodeExpander.vue';

interface VersionsPayload {
  version: string;
  name: string;
  environment: string;
  commitSha: string | null;
  timestamp: string;
  elysia: string | null;
  frameworks: Record<string, { name: string; version: string; dependencies: Record<string, string> }>;
}

const { user, isSignedIn } = useUser();
const { getToken } = useAuth();
const clerk = useClerk();

const showAdminModal = ref(false);
const isAdminLoggedIn = ref(false);
const adminApiKey = ref<string | null>(null);
const publicNotesCount = ref(0);
const privateNotesCount = ref(0);

const versionsData = ref<VersionsPayload | null>(null);
const versionsOpen = ref(false);
const versionsError = ref<string | null>(null);

const VUE_NAV_CODE = `// AppLayout.vue – Vue top nav, auth, and admin wiring
const { user, isSignedIn } = useUser();
const { getToken } = useAuth();
const clerk = useClerk();

const showAdminModal = ref(false);
const isAdminLoggedIn = ref(false);
const adminApiKey = ref<string | null>(null);
const publicNotesCount = ref(0);
const privateNotesCount = ref(0);

// Restore admin key and load versions once
onMounted(() => {
  const stored = localStorage.getItem('adminApiKey');
  if (stored) {
    adminApiKey.value = stored;
    isAdminLoggedIn.value = true;
  }
  fetch('/versions')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((data: VersionsPayload) => { versionsData.value = data; })
    .catch((err) => { versionsError.value = err?.message ?? 'Failed to load versions'; });
});

// Keep badge counts in sync with auth state
watch(isSignedIn, async (val) => {
  if (val) await fetchCounts();
  else {
    publicNotesCount.value = 0;
    privateNotesCount.value = 0;
  }
});

// Fetch public + private note counts
async function fetchCounts() {
  if (!isSignedIn.value) return;
  const pubRes = await fetch('/api/public-notes');
  const pubData: unknown = await pubRes.json();
  publicNotesCount.value = Array.isArray(pubData) ? pubData.length : 0;

  const token = await getToken.value();
  if (token) {
    const privRes = await fetch('/api/private-notes', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const privData: unknown = await privRes.json();
    privateNotesCount.value = Array.isArray(privData)
      ? (privData as { isPublic?: string }[]).filter((n) => n.isPublic !== 'true').length
      : 0;
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
}`;

onMounted(() => {
  const stored = localStorage.getItem('adminApiKey');
  if (stored) {
    adminApiKey.value = stored;
    isAdminLoggedIn.value = true;
  }
  fetch('/versions')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((data: VersionsPayload) => { versionsData.value = data; })
    .catch((err) => { versionsError.value = err?.message ?? 'Failed to load versions'; });
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

    <!-- Top nav / auth / admin code sample (directly below title bar, same row as other frameworks) -->
    <div class="nav-code-row">
      <div class="app-container">
        <CodeExpander :code="VUE_NAV_CODE" id="vue-nav-code" label="Vue nav &amp; auth code" />
      </div>
    </div>

    <!-- Main -->
    <main class="app-main">
      <div class="app-container">
        <slot />
      </div>
    </main>

    <!-- Footer: Versions inline with other links -->
    <footer class="app-footer app-footer--with-versions">
      <div v-if="versionsOpen" class="versions-panel versions-panel--above-footer">
        <div class="versions-panel-header">
          <span>Versions</span>
          <button type="button" class="versions-close" aria-label="Close" @click="versionsOpen = false">×</button>
        </div>
        <p v-if="versionsError" class="versions-error">{{ versionsError }}</p>
        <template v-else-if="versionsData">
          <dl class="versions-dl">
            <div><dt>App</dt><dd>{{ versionsData.name }} @ {{ versionsData.version }}</dd></div>
            <div v-if="versionsData.elysia"><dt>Elysia</dt><dd>{{ versionsData.elysia }}</dd></div>
            <div v-if="versionsData.commitSha"><dt>Commit</dt><dd class="versions-commit">{{ versionsData.commitSha }}</dd></div>
            <div><dt>Environment</dt><dd>{{ versionsData.environment }}</dd></div>
            <div v-if="Object.keys(versionsData.frameworks).length">
              <dt class="versions-frameworks-dt">Frameworks</dt>
              <dd>
                <div v-for="(info, key) in versionsData.frameworks" :key="key" class="versions-framework">
                  <span class="versions-fw-name">{{ info.name }}</span> <span class="versions-fw-ver">{{ info.version }}</span>
                  <ul v-if="Object.keys(info.dependencies).length" class="versions-deps">
                    <li v-for="(ver, dep) in info.dependencies" :key="dep">{{ dep }}: {{ ver }}</li>
                  </ul>
                </div>
              </dd>
            </div>
          </dl>
        </template>
        <p v-else class="versions-loading">Loading…</p>
      </div>
      <div class="app-container footer-inner">
        <span>© 2024 Notes App</span>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
          <button type="button" class="footer-link-btn" @click="versionsOpen = !versionsOpen">Versions</button>
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

.nav-code-row {
  margin-top: 60px; /* below fixed header */
  padding-top: 0.75rem;
  padding-bottom: 0;
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
.app-footer--with-versions {
  position: relative;
}
.footer-link-btn {
  font-size: 0.875rem;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.footer-link-btn:hover { color: #d1d5db; }
.versions-panel--above-footer {
  position: absolute;
  bottom: 100%;
  right: 1rem;
  margin-bottom: 4px;
  z-index: 50;
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

.versions-panel {
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  padding: 1rem;
  max-width: 360px;
  max-height: 70vh;
  overflow: auto;
  text-align: left;
}
.versions-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}
.versions-panel-header span { font-weight: 600; color: #1f2937; }
.versions-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6b7280;
  cursor: pointer;
}
.versions-error { font-size: 0.875rem; color: #dc2626; margin: 0; }
.versions-loading { font-size: 0.875rem; color: #6b7280; margin: 0; }
.versions-dl { font-size: 0.875rem; margin: 0; }
.versions-dl div { margin-bottom: 0.5rem; }
.versions-dl dt { color: #6b7280; }
.versions-dl dd { font-weight: 500; margin: 0; }
.versions-commit { font-family: monospace; font-size: 0.75rem; word-break: break-all; }
.versions-frameworks-dt { margin-top: 0.75rem; margin-bottom: 0.25rem; }
.versions-framework {
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
  border-left: 2px solid #e5e7eb;
}
.versions-fw-name { font-weight: 500; }
.versions-fw-ver { color: #4b5563; }
.versions-deps { font-size: 0.75rem; color: #6b7280; margin: 0.25rem 0 0 0; padding-left: 1rem; }
</style>
