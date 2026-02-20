import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PublicNotesComponent } from './components/public-notes/public-notes';
import { PrivateNotesComponent } from './components/private-notes/private-notes';
import { AdminComponent } from './components/admin/admin';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    PublicNotesComponent,
    PrivateNotesComponent,
    AdminComponent,
  ],
  template: `
    <!-- Navigation - matches HTMX exactly -->
    <nav class="navbar">
      <div class="navbar-inner">
        <!-- Brand -->
        <a href="/angular" class="navbar-brand-link">
          <span class="navbar-brand-text">Elysia Notes - Angular</span>
        </a>

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

    <!-- Footer - matches HTMX dark footer -->
    <footer class="dark-footer">
      <div class="dark-footer-inner">
        <span>© 2024 Notes App</span>
        <div class="dark-footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
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
                <button type="button" class="btn btn-secondary" (click)="showAdminModal = false">Cancel</button>
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
    .navbar-brand-link:hover .navbar-brand-text { color: #0d9488; }

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
    .nav-home-link:hover { color: #111827; }

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
    .nav-notes-link:hover { color: #111827; }

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

    .nav-loading { font-size: 0.85rem; color: var(--text-muted); }

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
    .btn-text-link:hover { color: #111827; }

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
    .btn-sign-in:hover { background: #0f766e; }

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
    .btn-admin-teal:hover { background: #0f766e; }

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
    .btn-admin-red:hover { background: #b91c1c; }

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
    .btn-amber:hover { background: #b45309; }

    .mt-4 { margin-top: 1rem; }

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
    .sign-in-prompt p { color: var(--text-secondary); }

    /* Dark footer - matches HTMX */
    .dark-footer {
      background: #1f2937;
      color: #9ca3af;
      padding: 1.5rem 0;
      margin-top: 3rem;
    }
    .dark-footer-inner {
      max-width: 1320px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dark-footer span { font-size: 0.875rem; }
    .dark-footer-links {
      display: flex;
      gap: 1rem;
    }
    .dark-footer-links a {
      font-size: 0.875rem;
      color: #9ca3af;
      text-decoration: none;
      transition: color 0.15s;
    }
    .dark-footer-links a:hover { color: white; }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      padding: 1rem;
    }
    .modal {
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
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
    .modal-close:hover { color: #111827; }
    .modal-body { padding: 1.5rem; }
    .form-group { margin-bottom: 1rem; }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 1rem;
    }
  `,
})
export class App implements OnInit {
  readonly auth = inject(AuthService);

  showAdminModal = false;
  adminKeyInput = '';
  adminApiKey = signal<string | null>(null);
  isAdminLoggedIn = computed(() => !!this.adminApiKey());

  publicCount = signal(0);
  privateCount = signal(0);

  ngOnInit() {
    this.auth.init();
    const storedKey = localStorage.getItem('adminApiKey');
    if (storedKey) {
      this.adminApiKey.set(storedKey);
    }
    this.refreshCounts();

    // Watch auth changes to refresh counts
    setInterval(() => this.refreshCounts(), 5000);
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
    if (!token) { this.privateCount.set(0); return; }
    try {
      const privRes = await fetch('/api/private-notes', { headers: { Authorization: `Bearer ${token}` } });
      const priv = privRes.ok ? await privRes.json() : [];
      this.privateCount.set(Array.isArray(priv) ? priv.filter((n: any) => n.isPublic !== 'true').length : 0);
    } catch (_) {}
  }
}
