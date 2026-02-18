import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-header',
  standalone: true,
  template: `
    <div class="auth-header">
      @if (auth.isLoading()) {
        <span class="auth-loading">Loading...</span>
      } @else if (auth.isSignedIn()) {
        <span class="auth-user">{{ auth.user()?.firstName ?? 'User' }}</span>
        <button class="btn btn-outline" (click)="auth.signOut()">Sign out</button>
      } @else {
        <button class="btn btn-primary" (click)="auth.signIn()">Sign in</button>
      }
    </div>
  `,
  styles: `
    .auth-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .auth-user {
      font-size: 0.9rem;
      color: #94a3b8;
    }
    .auth-loading {
      font-size: 0.85rem;
      color: #64748b;
    }
  `,
})
export class AuthHeaderComponent {
  readonly auth = inject(AuthService);
}
