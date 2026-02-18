import { Component, inject, OnInit } from '@angular/core';
import { AuthHeaderComponent } from './components/auth-header/auth-header';
import { PublicNotesComponent } from './components/public-notes/public-notes';
import { PrivateNotesComponent } from './components/private-notes/private-notes';
import { AdminComponent } from './components/admin/admin';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AuthHeaderComponent,
    PublicNotesComponent,
    PrivateNotesComponent,
    AdminComponent,
  ],
  template: `
    <nav class="navbar">
      <div class="navbar-inner">
        <div class="navbar-brand">
          <h1>Elysia Notes - Angular</h1>
          <span class="subtitle">Angular Edition</span>
        </div>

        <div class="nav-links">
          <a href="#public-notes">Public</a>
          <a href="#private-notes">My Notes</a>
          <a href="#admin-notes">Admin</a>
        </div>

        <div class="nav-auth">
          <app-auth-header />
        </div>
      </div>
    </nav>

    <main class="container">
      <section class="hero">
        <h2>Welcome to Notes App</h2>
        <p>A simple app for creating and sharing notes — Angular Edition</p>
      </section>

      <section class="section" id="public-notes">
        <div class="section-box">
          <app-public-notes />
        </div>
      </section>

      <section class="section" id="private-notes">
        <div class="section-box">
          <app-private-notes />
        </div>
      </section>

      <section class="section" id="admin-notes">
        <div class="section-box">
          <app-admin />
        </div>
      </section>
    </main>

    <footer class="footer">
      Built with Angular — powered by Elysia + Bun
    </footer>
  `,
  styles: [],
})
export class App implements OnInit {
  private auth = inject(AuthService);

  ngOnInit() {
    this.auth.init();
  }
}
