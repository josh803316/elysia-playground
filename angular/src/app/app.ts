import { Component, inject, OnInit, OnDestroy, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PublicNotesComponent } from './components/public-notes/public-notes';
import { PrivateNotesComponent } from './components/private-notes/private-notes';
import { AdminComponent } from './components/admin/admin';
import { GlobalSearchComponent } from './components/global-search/global-search';
import { AuthService } from './services/auth.service';
import { CodeExpanderComponent } from './components/code-expander/code-expander';
import { NAV_AUTH_TEST_SNIPPET } from './lib/e2e-snippets';

interface VersionsPayload {
  version: string;
  name: string;
  environment: string;
  commitSha: string | null;
  timestamp: string;
  elysia: string | null;
  frameworks: Record<
    string,
    { name: string; version: string; dependencies: Record<string, string> }
  >;
  config?: {
    packageManager?: string;
    engines?: Record<string, string>;
    overrides?: Record<string, string>;
  };
  rootDependencies?: {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };
  workspaces?: Record<
    string,
    {
      name: string;
      version: string;
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    }
  >;
}

const ANGULAR_NAV_CODE_SRC = `// app.ts – Angular top nav, auth, and admin wiring
const auth = inject(AuthService);

// Signals for counts and admin state
publicCount = signal(0);
privateCount = signal(0);
isAdminLoggedIn = signal(false);
adminApiKey = signal<string | null>(null);

// Restore admin API key on init
ngOnInit() {
  const storedKey = localStorage.getItem('adminApiKey');
  if (storedKey) {
    this.adminApiKey.set(storedKey);
    this.isAdminLoggedIn.set(true);
  }
  this.refreshCounts();
}

// Fetch counts for nav badges
async refreshCounts() {
  // Always fetch public notes count
  const pubRes = await fetch('/api/public-notes');
  const pubData = await pubRes.json();
  this.publicCount.set(Array.isArray(pubData) ? pubData.length : 0);

  // When admin, use /api/notes/all with X-API-Key
  if (this.isAdminLoggedIn() && this.adminApiKey()) {
    const res = await fetch('/api/notes/all', {
      headers: { 'X-API-Key': this.adminApiKey()! },
    });
    const allNotes = await res.json();
    if (Array.isArray(allNotes)) {
      const publicOnly = allNotes.filter((n) => n.isPublic === 'true').length;
      this.publicCount.set(publicOnly);
      this.privateCount.set(allNotes.length - publicOnly);
    }
    return;
  }

  // Regular signed-in flow: fetch private notes via AuthService token
  if (this.auth.isSignedIn()) {
    const token = await this.auth.getToken();
    if (token) {
      const privRes = await fetch('/api/private-notes', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const privData = await privRes.json();
      const trulyPrivate = Array.isArray(privData)
        ? privData.filter((n) => n.isPublic !== 'true')
        : [];
      this.privateCount.set(trulyPrivate.length);
    }
  }
}

// Admin login/logout handlers used by nav buttons
adminLogin(apiKey: string) {
  this.adminApiKey.set(apiKey);
  this.isAdminLoggedIn.set(true);
  localStorage.setItem('adminApiKey', apiKey);
  this.refreshCounts();
}

adminLogout() {
  this.adminApiKey.set(null);
  this.isAdminLoggedIn.set(false);
  localStorage.removeItem('adminApiKey');
  this.refreshCounts();
}`;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    PublicNotesComponent,
    PrivateNotesComponent,
    AdminComponent,
    GlobalSearchComponent,
    CodeExpanderComponent,
  ],
  template: `
    <!-- Navigation - matches HTMX exactly -->
    <nav class="navbar">
      <div class="navbar-inner">
        <!-- Brand -->
        <a href="/angular" class="navbar-brand-link">
          <span class="navbar-brand-text">Elysia Notes - Angular</span>
        </a>

        <!-- Global search - right of title, left of nav -->
        <app-global-search [adminApiKey]="adminApiKey()" />

        <!-- Right side nav: links + auth in single flex container -->
        <div class="nav-right">
          <div class="nav-links">
            <a href="/angular" class="nav-home-link">Home</a>
            <!-- Public badge: signed-out only (standalone) -->
            @if (!auth.isSignedIn()) {
              <span class="nav-badge-green">Public: {{ publicCount() }}</span>
            }
            <!-- My Notes + both badges: only when signed in -->
            @if (auth.isSignedIn()) {
              <a href="/angular/notes" class="nav-notes-link">
                {{ isAdminLoggedIn() ? 'All Notes' : 'My Notes' }}
                <span class="nav-count-badges">
                  <span class="nav-badge-green">Public: {{ publicCount() }}</span>
                  <span class="nav-badge-purple">Private: {{ privateCount() }}</span>
                </span>
              </a>
            }
          </div>

          <!-- Auth area -->
          <div class="nav-auth">
            @if (auth.isLoading()) {
              <span class="nav-loading">Loading...</span>
            } @else if (auth.isSignedIn()) {
              <span class="nav-user">Hello, {{ auth.user()?.firstName ?? 'User' }}</span>
              <button class="btn-text-link" (click)="auth.signOut()">Sign Out</button>
            } @else {
              <button class="btn-sign-in" (click)="auth.signIn()">Sign In</button>
            }

            <!-- Admin buttons -->
            @if (isAdminLoggedIn()) {
              <button class="btn-admin-red" (click)="adminLogout()">Admin Logout</button>
            } @else {
              <button class="btn-admin-teal" (click)="showAdminModal = true">Admin Login</button>
            }
          </div>
        </div>
      </div>
    </nav>

    <!-- Top nav / auth / admin code sample -->
    <div class="nav-code-row">
      <app-code-expander
        [code]="ANGULAR_NAV_CODE"
        id="angular-nav-code"
        label="Angular nav &amp; auth code"
        [testCode]="NAV_AUTH_TEST_SNIPPET"
        testLabel="E2E test (Playwright)"
      />
    </div>

    <!-- Main content -->
    <main class="container">
      <!-- Admin section (only when admin logged in) -->
      @if (isAdminLoggedIn()) {
        <section class="section" data-testid="section-admin-table">
          <div class="section-box">
            <app-admin [apiKey]="adminApiKey()" (onLogout)="adminLogout()" />
          </div>
        </section>
      }

      <!-- Public Notes -->
      <section class="section" data-testid="section-public-notes">
        <div class="section-box">
          <app-public-notes (notesChanged)="refreshCounts()" />
        </div>
      </section>

      <!-- Your Notes (signed in) or sign-in prompt -->
      @if (auth.isSignedIn()) {
        <section class="section" data-testid="section-your-notes">
          <div class="section-box">
            <app-private-notes [token]="auth.token()" (notesChanged)="refreshCounts()" />
          </div>
        </section>
      } @else if (!auth.isLoading()) {
        <section class="section">
          <div class="section-box sign-in-prompt">
            <h2 class="sign-in-title">Want to create private notes?</h2>
            <p>Sign in to create and manage your own private notes.</p>
            <button class="btn-sign-in mt-4" (click)="auth.signIn()">Sign In to Get Started</button>
          </div>
        </section>
      }
    </main>

    <!-- Footer - matches HTMX dark footer; Versions inline with other links -->
    <footer class="dark-footer dark-footer--with-versions">
      @if (versionsOpen()) {
        <div class="versions-panel versions-panel--above-footer">
          <div class="versions-panel-header">
            <span>Versions</span>
            <button
              type="button"
              class="versions-close"
              (click)="versionsOpen.set(false)"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          @if (versionsError()) {
            <p class="versions-error">{{ versionsError() }}</p>
          } @else if (versionsData(); as d) {
            <dl class="versions-dl">
              <div>
                <dt>App</dt>
                <dd>{{ d.name }} @ {{ d.version }}</dd>
              </div>
              @if (d.elysia) {
                <div>
                  <dt>Elysia</dt>
                  <dd>{{ d.elysia }}</dd>
                </div>
              }
              @if (d.commitSha) {
                <div>
                  <dt>Commit</dt>
                  <dd class="versions-commit">{{ d.commitSha }}</dd>
                </div>
              }
              <div>
                <dt>Environment</dt>
                <dd>{{ d.environment }}</dd>
              </div>
              @if (Object.keys(d.frameworks).length) {
                <div>
                  <dt class="versions-frameworks-dt">Frameworks</dt>
                  <dd>
                    @for (entry of frameworkEntries(d.frameworks); track entry.key) {
                      <div class="versions-framework">
                        <span class="versions-fw-name">{{ entry.info.name }}</span>
                        <span class="versions-fw-ver">{{ entry.info.version }}</span>
                        @if (Object.keys(entry.info.dependencies).length) {
                          <ul class="versions-deps">
                            @for (
                              dep of dependencyEntries(entry.info.dependencies);
                              track dep.key
                            ) {
                              <li>{{ dep.key }}: {{ dep.value }}</li>
                            }
                          </ul>
                        }
                      </div>
                    }
                  </dd>
                </div>
              }
              @if (
                d.config || d.rootDependencies || (d.workspaces && Object.keys(d.workspaces).length)
              ) {
                <div class="versions-config-section">
                  <dt class="versions-frameworks-dt">Configuration &amp; dependencies</dt>
                  <dd>
                    @if (d.config?.packageManager; as pkgManager) {
                      <div class="versions-config-item">
                        <span class="versions-dt-muted">packageManager</span>
                        <span class="versions-mono">{{ pkgManager }}</span>
                      </div>
                    }
                    @if (d.config?.engines; as engines) {
                      @if (Object.keys(engines).length) {
                        <div class="versions-config-item">
                          <span class="versions-dt-muted">engines</span>
                          <ul class="versions-deps">
                            @for (e of dependencyEntries(engines); track e.key) {
                              <li>{{ e.key }}: {{ e.value }}</li>
                            }
                          </ul>
                        </div>
                      }
                    }
                    @if (d.config?.overrides; as overrides) {
                      @if (Object.keys(overrides).length) {
                        <div class="versions-config-item">
                          <span class="versions-dt-muted">overrides</span>
                          <ul class="versions-deps">
                            @for (o of dependencyEntries(overrides); track o.key) {
                              <li>{{ o.key }}: {{ o.value }}</li>
                            }
                          </ul>
                        </div>
                      }
                    }
                    @if (
                      d.rootDependencies &&
                      (Object.keys(d.rootDependencies.dependencies || {}).length ||
                        Object.keys(d.rootDependencies.devDependencies || {}).length)
                    ) {
                      <div class="versions-config-item">
                        <span class="versions-dt-muted">Root deps</span>
                        <ul class="versions-deps">
                          @for (
                            r of dependencyEntries(d.rootDependencies.dependencies || {});
                            track r.key
                          ) {
                            <li>{{ r.key }}: {{ r.value }}</li>
                          }
                          @for (
                            r of dependencyEntries(d.rootDependencies.devDependencies || {});
                            track r.key
                          ) {
                            <li>
                              {{ r.key }}: {{ r.value }} <span class="versions-dev">(dev)</span>
                            </li>
                          }
                        </ul>
                      </div>
                    }
                    @if (d.workspaces && Object.keys(d.workspaces).length) {
                      <div class="versions-config-item">
                        <span class="versions-dt-muted">Workspaces</span>
                        @for (entry of workspaceEntries(d.workspaces); track entry.key) {
                          <div class="versions-framework">
                            <span class="versions-fw-name">{{ entry.ws.name }}</span>
                            <span class="versions-fw-ver">{{ entry.ws.version }}</span>
                            <ul class="versions-deps">
                              @for (
                                dep of dependencyEntries(entry.ws.dependencies || {});
                                track dep.key
                              ) {
                                <li>{{ dep.key }}: {{ dep.value }}</li>
                              }
                              @for (
                                dep of dependencyEntries(entry.ws.devDependencies || {});
                                track dep.key
                              ) {
                                <li>
                                  {{ dep.key }}: {{ dep.value }}
                                  <span class="versions-dev">(dev)</span>
                                </li>
                              }
                            </ul>
                          </div>
                        }
                      </div>
                    }
                  </dd>
                </div>
              }
            </dl>
          } @else {
            <p class="versions-loading">Loading…</p>
          }
        </div>
      }
      <div class="dark-footer-inner">
        <span>© 2024 Notes App</span>
        <div class="dark-footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
          <button
            type="button"
            class="dark-footer-link-btn"
            (click)="versionsOpen.set(!versionsOpen())"
          >
            Versions
          </button>
        </div>
      </div>
    </footer>

    <!-- Admin Login Modal -->
    @if (showAdminModal) {
      <div class="modal-overlay" (click)="closeAdminModal($event)">
        <div class="modal">
          <div class="modal-header">
            <h3>🔑 Admin Login</h3>
            <button class="modal-close" (click)="showAdminModal = false">×</button>
          </div>
          <div class="modal-body">
            <form (submit)="submitAdminLogin($event)">
              <div class="form-group">
                <label class="label">Admin API Key</label>
                <input
                  type="password"
                  [(ngModel)]="adminKeyInput"
                  name="adminKey"
                  class="input"
                  placeholder="Enter your admin API key"
                  required
                />
              </div>
              <div class="modal-actions">
                <button type="button" class="btn btn-secondary" (click)="showAdminModal = false">
                  Cancel
                </button>
                <button type="submit" class="btn btn-amber">Log in as Admin</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .navbar-brand-link {
      text-decoration: none;
      color: inherit;
    }
    .navbar-brand-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text);
      transition: color 0.15s;
    }
    .navbar-brand-link:hover .navbar-brand-text {
      color: #0d9488;
    }

    /* Nav right wrapper: single flex container for all right-side nav items */
    .nav-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    /* Home link (color-only hover, match HTMX) */
    .nav-home-link {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      text-decoration: none;
      transition: color 0.15s;
    }
    .nav-home-link:hover {
      color: #111827;
    }

    .nav-notes-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      text-decoration: none;
      transition: color 0.15s;
    }
    .nav-notes-link:hover {
      color: #111827;
    }

    .nav-count-badges {
      display: flex;
      gap: 0.375rem;
      align-items: center;
    }
    .nav-badge-green {
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      border-radius: 0.25rem;
      background: #dcfce7;
      color: #166534;
      font-weight: 600;
    }
    .nav-badge-purple {
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      border-radius: 0.25rem;
      background: #f3e8ff;
      color: #7e22ce;
      font-weight: 600;
    }

    .nav-loading {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .btn-text-link {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      color: #4b5563;
      font-weight: 500;
      padding: 0;
      transition: color 0.15s;
    }
    .btn-text-link:hover {
      color: #111827;
    }

    /* Sign In button (larger, rounded-lg, match HTMX) */
    .btn-sign-in {
      background: #0d9488;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background 0.15s;
    }
    .btn-sign-in:hover {
      background: #0f766e;
    }

    /* Admin buttons (smaller, match HTMX px-3 py-1.5 rounded) */
    .btn-admin-teal {
      background: #0d9488;
      color: white;
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background 0.15s;
    }
    .btn-admin-teal:hover {
      background: #0f766e;
    }

    .btn-admin-red {
      background: #dc2626;
      color: white;
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background 0.15s;
    }
    .btn-admin-red:hover {
      background: #b91c1c;
    }

    .btn-amber {
      background: #d97706;
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: var(--radius);
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background 0.15s;
    }
    .btn-amber:hover {
      background: #b45309;
    }

    .mt-4 {
      margin-top: 1rem;
    }

    .sign-in-prompt {
      text-align: center;
      padding: 2rem;
    }
    .sign-in-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 0.5rem;
    }
    .sign-in-prompt p {
      color: var(--text-secondary);
    }

    .nav-code-row {
      max-width: 1320px;
      margin: 0 auto;
      padding: 0 1rem;
      margin-top: 0.75rem;
    }

    /* Dark footer - matches HTMX */
    .dark-footer {
      background: #1f2937;
      color: #9ca3af;
      padding: 1.5rem 0;
      margin-top: 3rem;
    }
    .dark-footer--with-versions {
      position: relative;
    }
    .dark-footer-inner {
      max-width: 1320px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dark-footer span {
      font-size: 0.875rem;
    }
    .dark-footer-links {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    .dark-footer-links a {
      font-size: 0.875rem;
      color: #9ca3af;
      text-decoration: none;
      transition: color 0.15s;
    }
    .dark-footer-links a:hover {
      color: white;
    }
    .dark-footer-link-btn {
      font-size: 0.875rem;
      color: #9ca3af;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      transition: color 0.15s;
    }
    .dark-footer-link-btn:hover {
      color: white;
    }
    .versions-panel--above-footer {
      position: absolute;
      bottom: 100%;
      right: 1rem;
      margin-bottom: 4px;
      z-index: 50;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      padding: 1rem;
    }
    .modal {
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 28rem;
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e5e7eb;
      padding: 1rem 1.5rem;
      background: #fffbeb;
      border-radius: 0.75rem 0.75rem 0 0;
    }
    .modal-header h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
    }
    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #6b7280;
      cursor: pointer;
      padding: 0.25rem;
      line-height: 1;
    }
    .modal-close:hover {
      color: #111827;
    }
    .modal-body {
      padding: 1.5rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .versions-widget {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 50;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
    }
    .versions-panel {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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
    .versions-panel-header span {
      font-weight: 600;
      color: #1f2937;
    }
    .versions-close {
      background: none;
      border: none;
      font-size: 1.25rem;
      color: #6b7280;
      cursor: pointer;
    }
    .versions-error {
      font-size: 0.875rem;
      color: #dc2626;
      margin: 0;
    }
    .versions-loading {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0;
    }
    .versions-dl {
      font-size: 0.875rem;
      margin: 0;
    }
    .versions-dl div {
      margin-bottom: 0.5rem;
    }
    .versions-dl dt {
      color: #6b7280;
    }
    .versions-dl dd {
      font-weight: 500;
      margin: 0;
    }
    .versions-commit {
      font-family: monospace;
      font-size: 0.75rem;
      word-break: break-all;
    }
    .versions-frameworks-dt {
      margin-top: 0.75rem;
      margin-bottom: 0.25rem;
    }
    .versions-framework {
      margin-bottom: 0.5rem;
      padding-left: 0.5rem;
      border-left: 2px solid #e5e7eb;
    }
    .versions-fw-name {
      font-weight: 500;
    }
    .versions-fw-ver {
      color: #4b5563;
    }
    .versions-deps {
      font-size: 0.75rem;
      color: #6b7280;
      margin: 0.25rem 0 0 0;
      padding-left: 1rem;
    }
    .versions-config-section {
      margin-top: 0.75rem;
      padding-top: 0.75rem;
      border-top: 1px solid #e5e7eb;
    }
    .versions-config-section .versions-frameworks-dt {
      font-weight: 600;
    }
    .versions-config-item {
      margin-bottom: 0.5rem;
    }
    .versions-dt-muted {
      color: #6b7280;
    }
    .versions-mono {
      font-family: monospace;
      font-size: 0.75rem;
    }
    .versions-dev {
      color: #9ca3af;
    }
    .versions-btn {
      font-size: 0.75rem;
      font-weight: 500;
      color: #4b5563;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid #d1d5db;
      border-radius: 4px;
      padding: 6px 12px;
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
  `,
})
export class App implements OnInit, OnDestroy {
  readonly auth = inject(AuthService);
  readonly ANGULAR_NAV_CODE = ANGULAR_NAV_CODE_SRC;
  readonly NAV_AUTH_TEST_SNIPPET = NAV_AUTH_TEST_SNIPPET;
  /** Expose global Object for template (Object.keys, etc.) */
  readonly Object = Object;

  showAdminModal = false;
  adminKeyInput = '';
  adminApiKey = signal<string | null>(null);
  isAdminLoggedIn = computed(() => !!this.adminApiKey());

  publicCount = signal(0);
  privateCount = signal(0);

  versionsData = signal<VersionsPayload | null>(null);
  versionsOpen = signal(false);
  versionsError = signal<string | null>(null);

  /** Clear any polling when the component is destroyed to avoid memory leaks. */
  private countRefreshIntervalId: ReturnType<typeof setInterval> | null = null;

  /** Refresh counts when auth token or admin key changes instead of polling every 5s. */
  private readonly refreshCountsEffect = effect(() => {
    this.auth.token();
    this.adminApiKey();
    this.refreshCounts();
  });

  frameworkEntries(
    frameworks: VersionsPayload['frameworks'],
  ): { key: string; info: VersionsPayload['frameworks'][string] }[] {
    return Object.entries(frameworks).map(([key, info]) => ({ key, info }));
  }

  dependencyEntries(deps: Record<string, string>): { key: string; value: string }[] {
    return Object.entries(deps).map(([key, value]) => ({ key, value }));
  }

  workspaceEntries(
    workspaces: NonNullable<VersionsPayload['workspaces']>,
  ): { key: string; ws: (typeof workspaces)[string] }[] {
    return Object.entries(workspaces).map(([key, ws]) => ({ key, ws }));
  }

  ngOnInit() {
    this.auth.init();
    const storedKey = localStorage.getItem('adminApiKey');
    if (storedKey) {
      this.adminApiKey.set(storedKey);
    }
    this.refreshCounts();
    // Fallback: refresh counts periodically so nav badges stay in sync if data changes elsewhere.
    this.countRefreshIntervalId = setInterval(() => this.refreshCounts(), 5000);
    // Fetch versions once on load (all frameworks from Elysia endpoint)
    fetch('/versions')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: VersionsPayload) => this.versionsData.set(data))
      .catch((err) => this.versionsError.set(err?.message ?? 'Failed to load versions'));
  }

  ngOnDestroy() {
    if (this.countRefreshIntervalId != null) {
      clearInterval(this.countRefreshIntervalId);
      this.countRefreshIntervalId = null;
    }
  }

  adminLogout() {
    this.adminApiKey.set(null);
    localStorage.removeItem('adminApiKey');
  }

  submitAdminLogin(event: Event) {
    event.preventDefault();
    const key = this.adminKeyInput.trim();
    if (!key) return;
    this.adminApiKey.set(key);
    localStorage.setItem('adminApiKey', key);
    this.adminKeyInput = '';
    this.showAdminModal = false;
    this.refreshCounts();
  }

  closeAdminModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.showAdminModal = false;
    }
  }

  async refreshCounts() {
    const adminKey = this.adminApiKey();
    if (adminKey) {
      try {
        const res = await fetch('/api/notes/all', { headers: { 'X-API-Key': adminKey } });
        if (res.ok) {
          const notes = await res.json();
          if (Array.isArray(notes)) {
            this.publicCount.set(notes.filter((n: any) => n.isPublic === 'true').length);
            this.privateCount.set(notes.filter((n: any) => n.isPublic !== 'true').length);
          }
        }
      } catch (_) {}
      return;
    }
    // Always fetch public count (visible even when signed out)
    try {
      const pubRes = await fetch('/api/public-notes');
      const pub = pubRes.ok ? await pubRes.json() : [];
      this.publicCount.set(Array.isArray(pub) ? pub.length : 0);
    } catch (_) {}
    // Only fetch private count when signed in
    const token = this.auth.token();
    if (!token) {
      this.privateCount.set(0);
      return;
    }
    try {
      const privRes = await fetch('/api/private-notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const priv = privRes.ok ? await privRes.json() : [];
      this.privateCount.set(
        Array.isArray(priv) ? priv.filter((n: any) => n.isPublic !== 'true').length : 0,
      );
    } catch (_) {}
  }
}
