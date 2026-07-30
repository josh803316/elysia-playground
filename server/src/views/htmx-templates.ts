/**
 * HTMX HTML Templates for the Notes App
 * These functions generate HTML strings that are returned by the server
 */

import {
  NAV_AUTH_TEST_SNIPPET,
  PUBLIC_NOTES_TEST_SNIPPET,
  PRIVATE_NOTES_TEST_SNIPPET,
  ADMIN_TEST_SNIPPET,
} from '../snippets/e2e-snippets.js';

export interface Note {
  id: number;
  title: string;
  content: string;
  isPublic: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number | null;
  user?: {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
  } | null;
}

export interface User {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  imageUrl?: string | null;
}

/**
 * Base HTML layout with HTMX script, Tailwind CSS, and Clerk JS
 */
export function baseLayout(
  content: string,
  title: string = 'Elysia Notes - HTMX',
  clerkPublishableKey?: string,
  clerkFrontendApi?: string,
): string {
  const clerkScriptSrc = clerkFrontendApi
    ? `https://${clerkFrontendApi}/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`
    : 'https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <script src="https://unpkg.com/htmx.org@1.9.10"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css">
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
  ${
    clerkPublishableKey
      ? `<script
    async
    crossorigin="anonymous"
    data-clerk-publishable-key="${clerkPublishableKey}"
    src="${clerkScriptSrc}"
    type="text/javascript"
  ></script>`
      : ''
  }
  <style>
    .htmx-indicator {
      display: none;
    }
    .htmx-request .htmx-indicator {
      display: inline-block;
    }
    .htmx-request.htmx-indicator {
      display: inline-block;
    }
    /* Fade in animation for new content */
    .htmx-added {
      animation: fadeIn 0.3s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    /* Fade out animation for removed content */
    .htmx-swapping {
      opacity: 0;
      transition: opacity 0.2s ease-out;
    }
    /* Hide elements based on auth state */
    .clerk-loading .show-when-loaded { display: none !important; }
    .clerk-signed-in .show-when-signed-out { display: none !important; }
    .clerk-signed-out .show-when-signed-in { display: none !important; }
    .clerk-signed-in .show-when-signed-in { display: block !important; }
    /* Keep nav "My Notes" + badges in one row when signed in */
    .clerk-signed-in .show-when-signed-in.nav-notes-row { display: flex !important; }
    /* Code expander */
    .htmx-chevron { display: inline-block; transition: transform 0.2s; }
  </style>
</head>
<body class="bg-gray-100 min-h-screen clerk-loading">
  <nav class="bg-white border-b border-gray-200 shadow-sm h-[60px] flex items-center">
    <div class="max-w-[1320px] w-full mx-auto px-4">
      <div class="flex justify-between items-center">
        <a href="/htmx" class="text-xl font-bold text-gray-900 hover:text-teal-700 transition-colors">
          Elysia Notes - HTMX
        </a>
        <div class="flex gap-4 items-center">
          <a href="/htmx" class="text-sm text-gray-700 hover:text-gray-900 font-medium">Home</a>
          <!-- Public badge: always visible when signed out -->
          <span id="nav-public-standalone" class="show-when-signed-out text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium">Public: 0</span>
          <!-- My Notes + Public + Private badges: only when signed in -->
          <span class="show-when-signed-in nav-notes-row flex items-center gap-2 flex-nowrap">
            <a id="nav-notes-label" href="/htmx/notes" class="text-sm text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">My Notes</a>
            <span id="nav-note-counts" class="flex gap-1.5 items-center flex-shrink-0"></span>
          </span>
          <!-- Auth buttons -->
          <div id="auth-container" class="flex items-center gap-3 show-when-loaded">
            <button 
              id="sign-in-btn"
              class="show-when-signed-out text-sm bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
            <div class="show-when-signed-in flex items-center gap-3">
              <span id="user-name" class="text-sm text-gray-700"></span>
              <button 
                id="sign-out-btn"
                class="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
          <span id="admin-nav-area">
            <button type="button" id="admin-login-btn" hx-get="/htmx/admin/login-modal" hx-target="#modal-container" hx-swap="innerHTML" class="text-sm bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded font-medium">
              Admin Login
            </button>
          </span>
        </div>
      </div>
    </div>
  </nav>

  <!-- Top nav / auth / admin code sample -->
  <div class="max-w-[1320px] mx-auto px-4 mt-3">
    ${codeExpander(
      `<!-- HTMX nav: badges, auth, and admin links -->
<nav class="bg-white border-b border-gray-200 shadow-sm h-[60px] flex items-center">
  <div class="max-w-[1320px] w-full mx-auto px-4">
    <div class="flex justify-between items-center">
      <a href="/htmx" class="text-xl font-bold text-gray-900 hover:text-teal-700 transition-colors">
        Elysia Notes - HTMX
      </a>
      <div class="flex gap-4 items-center">
        <a href="/htmx" class="text-sm text-gray-700 hover:text-gray-900 font-medium">Home</a>
        <span id="nav-public-standalone"
          class="show-when-signed-out text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium">
          Public: 0
        </span>
        <span class="show-when-signed-in nav-notes-row flex items-center gap-2 flex-nowrap">
          <a id="nav-notes-label" href="/htmx/notes"
            class="text-sm text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">
            My Notes
          </a>
          <span id="nav-note-counts" class="flex gap-1.5 items-center flex-shrink-0"></span>
        </span>
        <!-- Auth buttons wired up via Clerk + htmx -->
        <div id="auth-container" class="flex items-center gap-3 show-when-loaded">
          <button id="sign-in-btn"
            class="show-when-signed-out text-sm bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Sign In
          </button>
          <div class="show-when-signed-in flex items-center gap-3">
            <span id="user-name" class="text-sm text-gray-700"></span>
            <button id="sign-out-btn" class="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Sign Out
            </button>
          </div>
        </div>
        <!-- Admin login opens HTMX modal; key stored in localStorage -->
        <span id="admin-nav-area">
          <button type="button" id="admin-login-btn"
            hx-get="/htmx/admin/login-modal"
            hx-target="#modal-container"
            hx-swap="innerHTML"
            class="text-sm bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded font-medium">
            Admin Login
          </button>
        </span>
      </div>
    </div>
  </div>
</nav>

<!-- Nav counts and auth are kept in sync by layout script -->
document.body.addEventListener('htmx:configRequest', (evt) => {
  const url = evt.detail.pathInfo?.requestPath ?? '';
  // Inject X-API-Key for /htmx/admin/notes when admin key is present
  if (url.includes('/htmx/admin/notes')) {
    const key = localStorage.getItem('adminApiKey');
    if (key) evt.detail.headers['X-API-Key'] = key;
  }
});`,
      'htmx-nav-code',
      NAV_AUTH_TEST_SNIPPET,
    )}
  </div>
  
  <main class="max-w-[1320px] mx-auto px-4 py-8">
    ${content}
  </main>
  
  <footer class="bg-gray-800 text-gray-400 py-6 mt-12 relative">
    <div id="versions-panel" class="hidden absolute bottom-full right-4 mb-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-left text-sm max-w-sm max-h-[70vh] overflow-auto z-50 text-gray-800" style="width: 360px;"></div>
    <div class="max-w-[1320px] mx-auto px-4 flex justify-between items-center">
      <span class="text-sm">© 2024 Notes App</span>
      <div class="flex gap-4 text-sm items-center">
        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-white transition-colors">Contact Us</a>
        <button type="button" id="versions-btn" class="bg-transparent border-none text-gray-400 hover:text-white transition-colors cursor-pointer p-0 text-sm">Versions</button>
      </div>
    </div>
  </footer>
  
  <script>
    // Admin: API key and nav
    window.getAdminApiKey = function() { return localStorage.getItem('adminApiKey'); };
    // Fetch and display Public/Private note counts in nav
    // - signed out: only the standalone Public badge is visible
    // - signed in: My Notes row shows Public + Private badges
    window.refreshNavNoteCounts = async function(optionalToken) {
      var container = document.getElementById('nav-note-counts');
      var standaloneBadge = document.getElementById('nav-public-standalone');
      var adminKey = window.getAdminApiKey && window.getAdminApiKey();
      if (adminKey) {
        try {
          var r = await fetch('/api/notes/all', { headers: { 'X-API-Key': adminKey } });
          if (!r.ok) { if (container) container.innerHTML = ''; return; }
          var data = await r.json();
          var publicCount = Array.isArray(data) ? data.filter(function(n) { return n.isPublic === 'true'; }).length : 0;
          var privateCount = Array.isArray(data) ? data.length - publicCount : 0;
          if (standaloneBadge) standaloneBadge.textContent = 'Public: ' + publicCount;
          if (container) container.innerHTML = '<span class="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium">Public: ' + publicCount + '</span><span class="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">Private: ' + privateCount + '</span>';
        } catch (e) { if (container) container.innerHTML = ''; }
        return;
      }
      // Always fetch public count for the standalone badge (visible when signed out)
      var publicCount = 0;
      try {
        var pubRes = await fetch('/api/public-notes');
        var pubData = pubRes.ok ? await pubRes.json() : [];
        publicCount = Array.isArray(pubData) ? pubData.length : 0;
        if (standaloneBadge) standaloneBadge.textContent = 'Public: ' + publicCount;
      } catch (e) {}
      if (optionalToken) {
        try {
          var privRes = await fetch('/api/private-notes', { headers: { 'Authorization': 'Bearer ' + optionalToken } });
          var privData = privRes.ok ? await privRes.json() : [];
          var privateCount = Array.isArray(privData) ? privData.filter(function(n) { return n.isPublic !== 'true'; }).length : 0;
          if (container) container.innerHTML = '<span class="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium">Public: ' + publicCount + '</span><span class="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">Private: ' + privateCount + '</span>';
        } catch (e) { if (container) container.innerHTML = ''; }
      } else {
        if (container) container.innerHTML = '';
      }
    };
    window.updateAdminNav = function() {
      var area = document.getElementById('admin-nav-area');
      if (!area) return;
      var notesLabel = document.getElementById('nav-notes-label');
      if (notesLabel) notesLabel.textContent = window.getAdminApiKey() ? 'All Notes' : 'My Notes';
      if (window.getAdminApiKey()) {
        area.innerHTML = '<button type="button" id="admin-logout-btn" class="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded font-medium">Admin Logout</button>';
        document.getElementById('admin-logout-btn')?.addEventListener('click', function() {
          localStorage.removeItem('adminApiKey');
          document.getElementById('admin-section')?.classList.add('hidden');
          window.updateAdminNav();
        });
      } else {
        area.innerHTML = '<button type="button" id="admin-login-btn" hx-get="/htmx/admin/login-modal" hx-target="#modal-container" hx-swap="innerHTML" class="text-sm bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded font-medium">Admin Login</button>';
        htmx.process(document.getElementById('admin-nav-area'));
      }
    };
    document.addEventListener('DOMContentLoaded', function() {
      if (window.getAdminApiKey()) {
        document.getElementById('admin-section')?.classList.remove('hidden');
        setTimeout(function() {
          if (typeof htmx !== 'undefined') htmx.trigger(document.body, 'refreshAdminNotes');
        }, 50);
      }
      window.updateAdminNav();
      // Always fetch public count immediately (shows even before Clerk loads)
      window.refreshNavNoteCounts();
      // Versions: fetch on load, toggle panel on button click
      var versionsData = null;
      var versionsError = null;
      fetch('/versions').then(function(r) { return r.ok ? r.json() : Promise.reject(new Error(r.status)); })
        .then(function(d) { versionsData = d; })
        .catch(function(e) { versionsError = e && e.message ? e.message : 'Failed to load versions'; });
      var versionsPanel = document.getElementById('versions-panel');
      var versionsBtn = document.getElementById('versions-btn');
      function renderVersionsPanel() {
        if (!versionsPanel) return;
        if (versionsError) {
          versionsPanel.innerHTML = '<p class="text-red-600 text-sm">' + versionsError + '</p>';
          return;
        }
        if (!versionsData) {
          versionsPanel.innerHTML = '<p class="text-gray-500 text-sm">Loading…</p>';
          return;
        }
        var d = versionsData;
        var html = '<div class="flex justify-between items-center mb-3"><span class="font-semibold text-gray-800">Versions</span><button type="button" id="versions-close" class="text-gray-500 text-lg leading-none">×</button></div>';
        html += '<dl class="text-sm">';
        html += '<div class="mb-2"><dt class="text-gray-500">App</dt><dd class="font-medium">' + (d.name || '') + ' @ ' + (d.version || '') + '</dd></div>';
        if (d.elysia) html += '<div class="mb-2"><dt class="text-gray-500">Elysia</dt><dd class="font-medium">' + d.elysia + '</dd></div>';
        if (d.commitSha) html += '<div class="mb-2"><dt class="text-gray-500">Commit</dt><dd class="font-mono text-xs break-all">' + d.commitSha + '</dd></div>';
        html += '<div class="mb-2"><dt class="text-gray-500">Environment</dt><dd>' + (d.environment || '') + '</dd></div>';
        if (d.frameworks && Object.keys(d.frameworks).length) {
          html += '<div class="mt-3"><dt class="text-gray-500 mb-1">Frameworks</dt><dd>';
          for (var name in d.frameworks) {
            var info = d.frameworks[name];
            html += '<div class="mb-2 pl-2 border-l-2 border-gray-200"><span class="font-medium">' + (info.name || name) + '</span> <span class="text-gray-600">' + (info.version || '') + '</span>';
            if (info.dependencies && Object.keys(info.dependencies).length) {
              html += '<ul class="text-xs text-gray-500 mt-0.5 pl-4">';
              for (var dep in info.dependencies) html += '<li>' + dep + ': ' + info.dependencies[dep] + '</li>';
              html += '</ul>';
            }
            html += '</div>';
          }
          html += '</dd></div>';
        }
        if (d.config || d.rootDependencies || (d.workspaces && Object.keys(d.workspaces).length > 0)) {
          html += '<div class="mt-3 pt-3 border-t border-gray-200"><dt class="text-gray-500 font-semibold mb-1">Configuration &amp; dependencies</dt><dd>';
          if (d.config && d.config.packageManager) html += '<div class="mb-2"><span class="text-gray-500">packageManager</span> <span class="font-mono text-xs">' + d.config.packageManager + '</span></div>';
          if (d.config && d.config.engines && Object.keys(d.config.engines).length) {
            html += '<div class="mb-2"><span class="text-gray-500">engines</span><ul class="text-xs text-gray-500 mt-0.5 pl-3">';
            for (var k in d.config.engines) html += '<li>' + k + ': ' + d.config.engines[k] + '</li>';
            html += '</ul></div>';
          }
          if (d.config && d.config.overrides && Object.keys(d.config.overrides).length) {
            html += '<div class="mb-2"><span class="text-gray-500">overrides</span><ul class="text-xs text-gray-500 mt-0.5 pl-3">';
            for (var k in d.config.overrides) html += '<li>' + k + ': ' + d.config.overrides[k] + '</li>';
            html += '</ul></div>';
          }
          if (d.rootDependencies && (Object.keys(d.rootDependencies.dependencies || {}).length > 0 || Object.keys(d.rootDependencies.devDependencies || {}).length > 0)) {
            html += '<div class="mb-2"><span class="text-gray-500">Root deps</span><ul class="text-xs text-gray-500 mt-0.5 pl-3">';
            for (var k in (d.rootDependencies.dependencies || {})) html += '<li>' + k + ': ' + d.rootDependencies.dependencies[k] + '</li>';
            for (var k in (d.rootDependencies.devDependencies || {})) html += '<li>' + k + ': ' + d.rootDependencies.devDependencies[k] + ' <span class="text-gray-400">(dev)</span></li>';
            html += '</ul></div>';
          }
          if (d.workspaces && Object.keys(d.workspaces).length > 0) {
            html += '<div class="mt-2"><span class="text-gray-500 block mb-1">Workspaces</span>';
            for (var key in d.workspaces) {
              var ws = d.workspaces[key];
              html += '<div class="mb-2 pl-2 border-l-2 border-gray-200"><span class="font-medium">' + (ws.name || key) + '</span> <span class="text-gray-600">' + (ws.version || '') + '</span><ul class="text-xs text-gray-500 mt-0.5 pl-4">';
              for (var dep in (ws.dependencies || {})) html += '<li>' + dep + ': ' + ws.dependencies[dep] + '</li>';
              for (var dep in (ws.devDependencies || {})) html += '<li>' + dep + ': ' + ws.devDependencies[dep] + ' <span class="text-gray-400">(dev)</span></li>';
              html += '</ul></div>';
            }
            html += '</div>';
          }
          html += '</dd></div>';
        }
        html += '</dl>';
        versionsPanel.innerHTML = html;
        versionsPanel.querySelector('#versions-close')?.addEventListener('click', function() {
          versionsPanel.classList.add('hidden');
        });
      }
      versionsBtn?.addEventListener('click', function() {
        versionsPanel.classList.toggle('hidden');
        if (!versionsPanel.classList.contains('hidden')) renderVersionsPanel();
      });
    });
    document.body.addEventListener('htmx:configRequest', function(evt) {
      var el = evt.detail && evt.detail.elt;
      var getUrl = el && el.getAttribute && el.getAttribute('hx-get');
      var putUrl = el && el.getAttribute && el.getAttribute('hx-put');
      var postUrl = el && el.getAttribute && el.getAttribute('hx-post');
      var deleteUrl = el && el.getAttribute && el.getAttribute('hx-delete');
      var pathInfoUrl = evt.detail.pathInfo && evt.detail.pathInfo.requestPath;
      var url = pathInfoUrl || getUrl || putUrl || postUrl || deleteUrl || '';
      if ((url.indexOf('/htmx/admin/notes') !== -1 || url === '/htmx/admin/notes') && window.getAdminApiKey()) {
        evt.detail.headers['X-API-Key'] = window.getAdminApiKey();
      }
      if (url.indexOf('/htmx/private-notes') !== -1 && window.__clerkToken) {
        evt.detail.headers['Authorization'] = 'Bearer ' + window.__clerkToken;
      }
    });
    document.body.addEventListener('htmx:afterRequest', function(evt) {
      var path = (evt.detail.pathInfo && evt.detail.pathInfo.requestPath) || (evt.detail.elt && evt.detail.elt.getAttribute && evt.detail.elt.getAttribute('hx-get')) || '';
      if (path.indexOf('/htmx/admin/') !== -1 && evt.detail.xhr && evt.detail.xhr.status === 401) {
        localStorage.removeItem('adminApiKey');
        if (window.updateAdminNav) window.updateAdminNav();
      }
    });
    document.addEventListener('click', function(evt) {
      var btn = evt.target.closest && evt.target.closest('.htmx-code-toggle');
      if (!btn) return;
      var panelId = btn.getAttribute('aria-controls');
      var panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;
      var isExpanded = btn.getAttribute('aria-expanded') === 'true';
      panel.style.display = isExpanded ? 'none' : '';
      btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      var chevron = btn.querySelector('.htmx-chevron');
      if (chevron) chevron.style.transform = isExpanded ? '' : 'rotate(180deg)';
    });
    document.body.addEventListener('click', function(evt) {
      if (evt.target && evt.target.id === 'btn-delete-by-regex') {
        var input = document.getElementById('admin-regex-input');
        var regex = input && input.value ? input.value.trim() : '';
        var adminKey = window.getAdminApiKey && window.getAdminApiKey();
        if (!regex || !adminKey) return;
        evt.target.disabled = true;
        fetch('/api/notes/admin/delete-by-regex', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-API-Key': adminKey },
          body: JSON.stringify({ contentRegex: regex }),
        })
          .then(function(r) {
            if (!r.ok) return r.json().then(function(j) { throw new Error(j.error || 'Failed'); });
            return r.json();
          })
          .then(function() {
            input.value = '';
            htmx.trigger(document.body, 'refreshAdminNotes');
          })
          .catch(function(err) {
            alert(err.message || 'Failed to delete by regex');
          })
          .finally(function() {
            evt.target.disabled = false;
          });
      }
    });
  </script>
  ${
    clerkPublishableKey
      ? `<script>
    // Initialize Clerk
    window.addEventListener('load', async () => {
      try {
        await window.Clerk.load();
        
        // Update body class based on auth state
        const updateAuthState = async () => {
          document.body.classList.remove('clerk-loading');
          if (window.Clerk.user) {
            document.body.classList.remove('clerk-signed-out');
            document.body.classList.add('clerk-signed-in');
            
            // Update user info
            const user = window.Clerk.user;
            const userName = document.getElementById('user-name');
            const userAvatar = document.getElementById('user-avatar');
            
            if (userName) {
              userName.textContent = user.firstName || user.emailAddresses?.[0]?.emailAddress || 'User';
            }
            if (userAvatar && user.imageUrl) {
              userAvatar.src = user.imageUrl;
              userAvatar.style.display = 'block';
            }
            
            const token = await window.Clerk.session.getToken();
            window.__clerkToken = token || null;
            // Refresh authenticated UI only after the token is available.
            htmx.trigger('#private-notes-container', 'refreshPrivateNotes');
            // Refresh nav note counts (Public/Private badges)
            if (window.refreshNavNoteCounts) window.refreshNavNoteCounts(token);
          } else {
            window.__clerkToken = null;
            document.body.classList.remove('clerk-signed-in');
            document.body.classList.add('clerk-signed-out');
            if (window.refreshNavNoteCounts) window.refreshNavNoteCounts();
          }
        };
        
        await updateAuthState();
        
        // Sign in button
        document.getElementById('sign-in-btn')?.addEventListener('click', () => {
          window.Clerk.openSignIn({
            afterSignInUrl: window.location.href,
            afterSignUpUrl: window.location.href,
          });
        });
        
        // Sign out button
        document.getElementById('sign-out-btn')?.addEventListener('click', async () => {
          await window.Clerk.signOut();
          window.location.reload();
        });
        
        // Listen for auth changes
        window.Clerk.addListener(() => {
          updateAuthState();
        });
      } catch (e) {
        console.error('Clerk initialization error:', e);
        document.body.classList.remove('clerk-loading');
        document.body.classList.add('clerk-signed-out');
      }
    });
  </script>`
      : ''
  }
</body>
</html>`;
}

/**
 * Notes table page - full page with table of all notes (admin view, requires Admin API Key)
 */
export function notesTablePage(clerkPublishableKey?: string, clerkFrontendApi?: string): string {
  return baseLayout(
    `
    <div class="space-y-6">
      <div id="modal-container"></div>
      <section class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <a href="/htmx" class="text-teal-600 hover:text-teal-800 text-sm font-medium mb-2 inline-block">← Back to Notes home</a>
            <h2 class="text-2xl font-bold text-gray-800">All Notes</h2>
            <p class="text-gray-600 text-sm">Table view – requires Admin Login</p>
          </div>
        </div>
        <div
          id="notes-table-container"
          hx-get="/htmx/admin/notes"
          hx-trigger="notesTableLoad from:body"
          hx-swap="innerHTML"
          class="min-h-[200px]"
        >
          <div class="text-center py-8 text-gray-500">Loading notes...</div>
        </div>
      </section>
    </div>
    <script>
      (function() {
        function loadNotesTable() {
          var container = document.getElementById('notes-table-container');
          if (!container) return;
          if (!window.getAdminApiKey || !window.getAdminApiKey()) {
            container.innerHTML = '<div class="text-center py-8 text-amber-700 bg-amber-50 rounded-lg border border-amber-200"><div class="text-4xl mb-2">🔑</div><p class="font-medium">Invalid or missing admin key</p><p class="text-sm mt-1">Use Admin Login in the nav, enter your Admin API Key, then refresh this page.</p><a href="/htmx" class="inline-block mt-4 text-teal-600 hover:underline">Back to Notes home</a></div>';
            return;
          }
          if (typeof htmx !== 'undefined') htmx.trigger(document.body, 'notesTableLoad');
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', function() { setTimeout(loadNotesTable, 100); });
        } else {
          setTimeout(loadNotesTable, 100);
        }
      })();
    </script>
  `,
    'Notes – Table view',
    clerkPublishableKey,
    clerkFrontendApi,
  );
}

/**
 * Escape HTML entities for safe embedding inside <pre><code> blocks
 */
function escapeCode(code: string): string {
  return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Code expander toggle widget — shows HTMX-specific code for each section.
 * Optional testCode renders a second expander "E2E test (Playwright)" below.
 */
function codeExpander(code: string, id: string, testCode?: string): string {
  let out = `
    <div class="border-t border-gray-100 mt-4">
      <button type="button" class="htmx-code-toggle w-full flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
        aria-controls="${id}-panel" aria-expanded="false">
        <span class="text-gray-400 font-mono">&lt;/&gt;</span> HTMX code
        <span class="htmx-chevron ml-1">▼</span>
      </button>
      <div id="${id}-panel" class="htmx-code-panel" style="display:none">
        <pre class="rounded-lg bg-gray-900 text-gray-100 p-4 overflow-x-auto text-xs mt-1 !m-0"><code class="language-markup">${escapeCode(code)}</code></pre>
      </div>
    </div>`;
  if (testCode != null && testCode !== '') {
    out += `
    <div class="border-t border-gray-100 mt-4">
      <button type="button" class="htmx-code-toggle w-full flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
        aria-controls="${id}-test-panel" aria-expanded="false">
        <span class="text-gray-400">🧪</span> E2E test (Playwright)
        <span class="htmx-chevron ml-1">▼</span>
      </button>
      <div id="${id}-test-panel" class="htmx-code-panel" style="display:none">
        <pre class="rounded-lg bg-gray-900 text-gray-100 p-4 overflow-x-auto text-xs mt-1 !m-0"><code class="language-javascript">${escapeCode(testCode)}</code></pre>
      </div>
    </div>`;
  }
  return out;
}

/**
 * Main notes page content
 */
export function notesPage(notes: Note[], clerkPublishableKey?: string, clerkFrontendApi?: string): string {
  const adminCode = `<!-- Admin notes loaded via HTMX -->
<div
  id="admin-notes-container"
  hx-get="/htmx/admin/notes"
  hx-trigger="refreshAdminNotes from:body"
  hx-swap="innerHTML"
></div>

// X-API-Key injected via htmx:configRequest:
document.body.addEventListener('htmx:configRequest', (evt) => {
  const url = evt.detail.pathInfo?.requestPath ?? '';
  if (url.includes('/htmx/admin/notes')) {
    evt.detail.headers['X-API-Key'] = localStorage.getItem('adminApiKey');
  }
});`;

  const publicCode = `<!-- Public notes server-rendered by Elysia on page load -->
<div id="notes-grid">
  <!-- noteCard() renders each note server-side -->
</div>

<!-- HTMX loads the create-note form into a modal container -->
<button
  hx-get="/htmx/notes/new"
  hx-target="#modal-container"
  hx-swap="innerHTML"
>+ Create Public Note</button>`;

  const privateCode = `<!-- Private notes lazy-loaded after Clerk auth resolves -->
<div
  id="private-notes-container"
  hx-get="/htmx/private-notes"
  hx-trigger="load, refreshPrivateNotes from:body"
  hx-swap="innerHTML"
></div>

// Authorization header injected via htmx:configRequest:
document.body.addEventListener('htmx:configRequest', (evt) => {
  const url = evt.detail.pathInfo?.requestPath ?? '';
  if (url.includes('/htmx/private-notes')) {
    evt.detail.headers['Authorization'] = 'Bearer ' + window.__clerkToken;
  }
});`;

  return baseLayout(
    `
    <div class="space-y-8">
      <!-- Modal container -->
      <div id="modal-container"></div>

      <!-- Admin: All Notes (visible when admin is logged in) -->
      <div id="admin-section" class="hidden" data-testid="section-admin-table">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-800">All Notes (Admin View)</h2>
              <p class="text-gray-600 text-sm">View and manage all notes in the system</p>
            </div>
          </div>
          <div class="flex items-end gap-2 mb-4">
            <input type="text" id="admin-regex-input" placeholder="e.g. e2e- or ^test" class="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md text-sm" />
            <button type="button" id="btn-delete-by-regex" class="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-60 disabled:cursor-not-allowed">Delete matching notes</button>
          </div>
          <p class="text-gray-500 text-sm mb-4">Delete notes whose content or title matches the regex</p>
          <div
            id="admin-notes-container"
            hx-get="/htmx/admin/notes"
            hx-trigger="refreshAdminNotes from:body"
            hx-swap="innerHTML"
            class="min-h-[100px]"
          >
            <div class="text-center py-8 text-gray-500">Loading admin notes...</div>
          </div>
          ${codeExpander(adminCode, 'htmx-admin-code', ADMIN_TEST_SNIPPET)}
        </div>
      </div>

      <!-- Public Notes Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200" data-testid="section-public-notes">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Public Notes</h2>
            <p class="text-gray-600 text-sm">Visible to everyone</p>
          </div>
          <button
            hx-get="/htmx/notes/new"
            hx-target="#modal-container"
            hx-swap="innerHTML"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2 font-medium"
          >
            <span class="text-xl">+</span> Create Public Note
          </button>
        </div>

        <div id="notes-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${notes.length === 0 ? emptyState() : notes.map((note) => noteCard(note)).join('')}
        </div>
        ${codeExpander(publicCode, 'htmx-public-code', PUBLIC_NOTES_TEST_SNIPPET)}
      </div>

      <!-- Your Notes Section (only visible when signed in) -->
      <div class="show-when-signed-in show-when-loaded" data-testid="section-your-notes">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-800">Your Notes</h2>
              <p class="text-gray-600 text-sm">Only you can see these notes</p>
            </div>
            <button
              hx-get="/htmx/private-notes/new"
              hx-target="#modal-container"
              hx-swap="innerHTML"
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2 font-medium"
            >
              <span class="text-xl">+</span> Create Private Note
            </button>
          </div>

          <div
            id="private-notes-container"
            hx-get="/htmx/private-notes"
            hx-trigger="load, refreshPrivateNotes from:body"
            hx-swap="innerHTML"
            class="min-h-[100px]"
          >
            <div class="text-center py-8 text-gray-500">
              <div class="animate-pulse">Loading your notes...</div>
            </div>
          </div>
          ${codeExpander(privateCode, 'htmx-private-code', PRIVATE_NOTES_TEST_SNIPPET)}
        </div>
      </div>
      
      <!-- Sign in prompt (only visible when signed out) -->
      <div class="show-when-signed-out show-when-loaded">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 text-center">
          <h2 class="text-xl font-semibold text-gray-700 mb-2">Want to create private notes?</h2>
          <p class="text-gray-600 mb-4">Sign in to create and manage your own private notes.</p>
          <button 
            id="sign-in-prompt-btn"
            onclick="document.getElementById('sign-in-btn')?.click()"
            class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Sign In to Get Started
          </button>
        </div>
      </div>
    </div>
  `,
    'Elysia Notes - HTMX',
    clerkPublishableKey,
    clerkFrontendApi,
  );
}

/**
 * Empty state when no notes exist
 */
export function emptyState(): string {
  return `
    <div class="col-span-full text-center py-12 bg-white rounded-lg shadow">
      <div class="text-6xl mb-4">📭</div>
      <h3 class="text-xl font-semibold text-gray-600 mb-2">No notes yet</h3>
      <p class="text-gray-500">Create your first note to get started!</p>
    </div>
  `;
}

/**
 * Individual note card component
 */
export function noteCard(note: Note): string {
  const authorName = note.user
    ? `${note.user.firstName || ''} ${note.user.lastName || ''}`.trim() || note.user.email
    : 'Anonymous';

  const createdDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `
    <div id="note-${note.id}" class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div class="p-5">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-lg font-semibold text-gray-800 line-clamp-1">${escapeHtml(note.title)}</h3>
          <span class="text-xs px-2 py-1 rounded-full ${note.isPublic === 'true' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">
            ${note.isPublic === 'true' ? 'Public' : 'Private'}
          </span>
        </div>
        <p class="text-gray-600 text-sm mb-4 line-clamp-3">${escapeHtml(note.content)}</p>
        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>By ${escapeHtml(authorName ?? '')}</span>
          <span>${createdDate}</span>
        </div>
      </div>
      <div class="border-t bg-gray-50 px-5 py-3 flex justify-end gap-2">
        <button 
          hx-get="/htmx/notes/${note.id}/edit" 
          hx-target="#modal-container"
          hx-swap="innerHTML"
          class="text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors"
        >
          Edit
        </button>
        <button 
          hx-delete="/htmx/notes/${note.id}" 
          hx-target="#note-${note.id}"
          hx-swap="outerHTML swap:0.2s"
          hx-confirm="Are you sure you want to delete this note?"
          class="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  `;
}

/**
 * New note form modal
 */
export function newNoteModal(): string {
  return `
    <div id="note-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div class="flex justify-between items-center border-b px-6 py-4">
          <h2 class="text-xl font-semibold text-gray-800">Create New Note</h2>
          <button 
            onclick="document.getElementById('modal-container').innerHTML = ''"
            class="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <form 
          hx-post="/htmx/notes" 
          hx-target="#notes-grid"
          hx-swap="afterbegin"
          hx-on::after-request="if(event.detail.successful) document.getElementById('modal-container').innerHTML = ''"
          class="p-6 space-y-4"
        >
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
              placeholder="Enter note title..."
            />
          </div>
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea 
              id="content" 
              name="content" 
              rows="4"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors resize-none"
              placeholder="Write your note here..."
            ></textarea>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button 
              type="button"
              onclick="document.getElementById('modal-container').innerHTML = ''"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <span class="htmx-indicator">
                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * Edit note form modal
 */
export function editNoteModal(note: Note): string {
  return `
    <div id="note-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div class="flex justify-between items-center border-b px-6 py-4">
          <h2 class="text-xl font-semibold text-gray-800">Edit Note</h2>
          <button 
            onclick="document.getElementById('modal-container').innerHTML = ''"
            class="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <form 
          hx-put="/htmx/notes/${note.id}" 
          hx-target="#note-${note.id}"
          hx-swap="outerHTML"
          hx-on::after-request="if(event.detail.successful) document.getElementById('modal-container').innerHTML = ''"
          class="p-6 space-y-4"
        >
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value="${escapeHtml(note.title)}"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
              placeholder="Enter note title..."
            />
          </div>
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea 
              id="content" 
              name="content" 
              rows="4"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors resize-none"
              placeholder="Write your note here..."
            >${escapeHtml(note.content)}</textarea>
          </div>
          <div class="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="isPublic" 
              name="isPublic" 
              ${note.isPublic === 'true' ? 'checked' : ''}
              class="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label for="isPublic" class="text-sm text-gray-700">Make this note public</label>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button 
              type="button"
              onclick="document.getElementById('modal-container').innerHTML = ''"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <span class="htmx-indicator">
                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * Private notes grid component
 */
export function privateNotesGrid(notes: Note[]): string {
  if (notes.length === 0) {
    return `
      <div class="text-center py-8 text-gray-500">
        <div class="text-4xl mb-2">🔒</div>
        <p>No private notes yet. Create your first one!</p>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${notes.map((note) => privateNoteCard(note)).join('')}
    </div>
  `;
}

/**
 * Individual private note card component
 */
export function privateNoteCard(note: Note): string {
  const createdDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `
    <div id="private-note-${note.id}" class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-purple-500">
      <div class="p-4">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-semibold text-gray-800 line-clamp-1">${escapeHtml(note.title)}</h3>
          <span class="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
            🔒 Private
          </span>
        </div>
        <p class="text-gray-600 text-sm mb-3 line-clamp-2">${escapeHtml(note.content)}</p>
        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>${createdDate}</span>
          <span class="flex gap-3">
            <button
              hx-get="/htmx/private-notes/${note.id}/edit"
              hx-target="#modal-container"
              hx-swap="innerHTML"
              class="text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              Edit
            </button>
            <button
              hx-delete="/htmx/private-notes/${note.id}"
              hx-target="#private-note-${note.id}"
              hx-swap="outerHTML swap:0.2s"
              hx-confirm="Are you sure you want to delete this private note?"
              class="text-red-600 hover:text-red-800 font-medium transition-colors"
            >
              Delete
            </button>
          </span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Edit private note form modal
 */
export function editPrivateNoteModal(note: Note): string {
  return `
    <div id="note-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div class="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-purple-50 to-teal-50">
          <h2 class="text-xl font-semibold text-gray-800">🔒 Edit Private Note</h2>
          <button
            type="button"
            onclick="document.getElementById('modal-container').innerHTML = ''"
            class="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <form
          hx-put="/htmx/private-notes/${note.id}"
          hx-target="#private-note-${note.id}"
          hx-swap="outerHTML"
          hx-on::after-request="if(event.detail.successful) document.getElementById('modal-container').innerHTML = ''"
          class="p-6 space-y-4"
        >
          <div>
            <label for="private-edit-title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="private-edit-title"
              name="title"
              value="${escapeHtml(note.title)}"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label for="private-edit-data" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              id="private-edit-data"
              name="data"
              rows="4"
              required
              placeholder="Write your private note here..."
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors resize-none"
            >${escapeHtml(note.content)}</textarea>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onclick="document.getElementById('modal-container').innerHTML = ''"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * New private note form modal
 */
export function newPrivateNoteModal(): string {
  return `
    <div id="note-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div class="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-purple-50 to-teal-50">
          <h2 class="text-xl font-semibold text-gray-800">🔒 Create Private Note</h2>
          <button 
            onclick="document.getElementById('modal-container').innerHTML = ''"
            class="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <form 
          hx-put="/htmx/private-notes" 
          hx-target="#private-notes-container"
          hx-swap="innerHTML"
          hx-on::after-request="if(event.detail.successful) document.getElementById('modal-container').innerHTML = ''"
          class="p-6 space-y-4"
        >
          <div>
            <label for="private-title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              id="private-title" 
              name="title" 
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
              placeholder="Enter note title..."
            />
          </div>
          <div>
            <label for="data" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea 
              id="data" 
              name="data" 
              rows="4"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors resize-none"
              placeholder="Write your private note here..."
            ></textarea>
          </div>
          <p class="text-sm text-gray-500 flex items-center gap-2">
            <span>🔒</span> This note will only be visible to you
          </p>
          <div class="flex justify-end gap-3 pt-2">
            <button 
              type="button"
              onclick="document.getElementById('modal-container').innerHTML = ''"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <span class="htmx-indicator">
                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Create Private Note
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * Auth required message for private notes
 */
export function authRequiredMessage(): string {
  return `
    <div class="text-center py-8 text-gray-500">
      <div class="text-4xl mb-2">🔐</div>
      <p>Please sign in to view your private notes</p>
    </div>
  `;
}

/**
 * Admin unauthorized message (invalid or missing API key)
 */
export function adminUnauthorizedMessage(): string {
  return `
    <div class="text-center py-8 text-amber-700 bg-amber-50 rounded-lg border border-amber-200">
      <div class="text-4xl mb-2">🔑</div>
      <p class="font-medium">Invalid or missing admin key</p>
      <p class="text-sm mt-1">Use Admin Login in the nav and enter your Admin API Key.</p>
    </div>
  `;
}

/**
 * Admin view: table of all notes (public + private, all users)
 */
export function adminNotesGrid(notes: Note[]): string {
  if (notes.length === 0) {
    return `
      <div class="text-center py-8 text-gray-500" data-testid="admin-notes-table">
        <div class="text-4xl mb-2">📭</div>
        <p>No notes found in the system</p>
      </div>
    `;
  }
  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) +
    ', ' +
    d.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
  const contentPreview = (c: string) =>
    !c ? '(No content)' : c.length > 50 ? escapeHtml(c.slice(0, 50)) + '...' : escapeHtml(c);
  const rows = notes
    .map((note) => {
      const authorName = note.user
        ? `${note.user.firstName || ''} ${note.user.lastName || ''}`.trim() || note.user.email
        : 'Anonymous';
      const createdDate = formatDate(new Date(note.createdAt));
      const updatedDate = note.updatedAt ? formatDate(new Date(note.updatedAt)) : 'N/A';
      return `
    <tr id="admin-note-row-${note.id}" class="border-b border-gray-200 hover:bg-gray-50">
      <td class="px-4 py-3 text-sm text-gray-900">${escapeHtml(note.title || 'Untitled')}</td>
      <td class="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">${contentPreview(note.content || '')}</td>
      <td class="px-4 py-3 text-sm">${note.isPublic === 'true' ? '<span class="px-2 py-0.5 rounded bg-green-100 text-green-700">Public</span>' : '<span class="px-2 py-0.5 rounded bg-gray-100 text-gray-700">Private</span>'}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${escapeHtml(authorName ?? '')}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${createdDate}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${updatedDate}</td>
      <td class="px-4 py-3">
        <div class="flex gap-2">
          <button
            hx-get="/htmx/notes/${note.id}/edit"
            hx-target="#modal-container"
            hx-swap="innerHTML"
            class="text-teal-600 hover:text-teal-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            hx-delete="/htmx/admin/notes/${note.id}"
            hx-target="#admin-note-row-${note.id}"
            hx-swap="outerHTML swap:0.2s"
            hx-confirm="Are you sure you want to delete this note?"
            class="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>`;
    })
    .join('');
  return `
    <div class="overflow-x-auto rounded-lg border border-gray-200" data-testid="admin-notes-table">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Content Preview</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Author</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Created</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Updated</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Admin view: single note table row (used when returning one row for swap)
 */
export function adminNoteCard(note: Note): string {
  const authorName = note.user
    ? `${note.user.firstName || ''} ${note.user.lastName || ''}`.trim() || note.user.email
    : 'Anonymous';
  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) +
    ', ' +
    d.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
  const createdDate = formatDate(new Date(note.createdAt));
  const updatedDate = note.updatedAt ? formatDate(new Date(note.updatedAt)) : 'N/A';
  const contentPreview = !note.content
    ? '(No content)'
    : note.content.length > 50
      ? escapeHtml(note.content.slice(0, 50)) + '...'
      : escapeHtml(note.content);
  return `
    <tr id="admin-note-row-${note.id}" class="border-b border-gray-200 hover:bg-gray-50">
      <td class="px-4 py-3 text-sm text-gray-900">${escapeHtml(note.title || 'Untitled')}</td>
      <td class="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">${contentPreview}</td>
      <td class="px-4 py-3 text-sm">${note.isPublic === 'true' ? '<span class="px-2 py-0.5 rounded bg-green-100 text-green-700">Public</span>' : '<span class="px-2 py-0.5 rounded bg-gray-100 text-gray-700">Private</span>'}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${escapeHtml(authorName ?? '')}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${createdDate}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${updatedDate}</td>
      <td class="px-4 py-3">
        <div class="flex gap-2">
          <button
            hx-get="/htmx/notes/${note.id}/edit"
            hx-target="#modal-container"
            hx-swap="innerHTML"
            class="text-teal-600 hover:text-teal-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            hx-delete="/htmx/admin/notes/${note.id}"
            hx-target="#admin-note-row-${note.id}"
            hx-swap="outerHTML swap:0.2s"
            hx-confirm="Are you sure you want to delete this note?"
            class="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  `;
}

/**
 * Admin login modal (form to enter Admin API Key)
 */
export function adminLoginModal(): string {
  return `
    <div id="admin-login-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="flex justify-between items-center border-b px-6 py-4 bg-amber-50">
          <h2 class="text-xl font-semibold text-gray-800">🔑 Admin Login</h2>
          <button type="button" onclick="window.closeAdminLoginModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <form id="admin-login-form" class="p-6 space-y-4">
          <div>
            <label for="admin-api-key" class="block text-sm font-medium text-gray-700 mb-1">Admin API Key</label>
            <input type="password" id="admin-api-key" name="apiKey" required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              placeholder="Enter your admin API key" />
          </div>
          <div id="admin-login-error" class="text-red-600 text-sm hidden"></div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" onclick="window.closeAdminLoginModal()" class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">Cancel</button>
            <button type="submit" class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium">Log in as Admin</button>
          </div>
        </form>
      </div>
    </div>
    <script>
      (function() {
        window.closeAdminLoginModal = function() {
          var c = document.getElementById('modal-container');
          if (c) c.innerHTML = '';
        };
        var form = document.getElementById('admin-login-form');
        if (form) {
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            var keyInput = document.getElementById('admin-api-key');
            var key = keyInput && keyInput.value ? keyInput.value.trim() : '';
            if (!key) return;
            localStorage.setItem('adminApiKey', key);
            window.closeAdminLoginModal();
            var section = document.getElementById('admin-section');
            if (section) section.classList.remove('hidden');
            if (typeof htmx !== 'undefined') htmx.trigger(document.body, 'refreshAdminNotes');
            if (window.updateAdminNav) window.updateAdminNav();
            if (window.refreshNavNoteCounts) window.refreshNavNoteCounts();
          });
        }
      })();
    </script>
  `;
}

/**
 * Error message component
 */
export function errorMessage(message: string): string {
  return `
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <strong>Error:</strong> ${escapeHtml(message)}
    </div>
  `;
}

/**
 * Success message component (for toast notifications)
 */
export function successMessage(message: string): string {
  return `
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      ${escapeHtml(message)}
    </div>
  `;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}
