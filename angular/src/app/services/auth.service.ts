import { Injectable, signal, computed } from '@angular/core';

/** Injected by index.html / env.js so we can load Clerk from CDN without bundling it. */
declare global {
  interface Window {
    __ANGULAR_ENV__?: {
      clerkPublishableKey: string;
      clerkFrontendApi: string;
    };
    Clerk?: ClerkGlobal;
  }
}

/** Minimal type for window.Clerk to avoid adding @clerk/types; CDN provides the real implementation. */
interface ClerkGlobal {
  load: (opts: { publishableKey: string }) => Promise<void>;
  openSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
  user: { firstName?: string } | null;
  session: { getToken: () => Promise<string | null> };
  addListener: (cb: (payload: { user: { firstName?: string } | null }) => void | Promise<void>) => void;
}

/**
 * Auth state and actions via Clerk (loaded from CDN). We use signals so components
 * stay reactive without subscribing to observables. Script is loaded idempotently
 * to avoid duplicate tags when Angular re-initializes in dev.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private clerk: ClerkGlobal | null = null;

  readonly user = signal<any>(null);
  readonly token = signal<string | null>(null);
  readonly isSignedIn = computed(() => !!this.user());
  readonly isLoading = signal(true);

  async init(): Promise<void> {
    const env = window.__ANGULAR_ENV__;
    if (!env?.clerkPublishableKey || !env?.clerkFrontendApi) {
      console.error('[auth] Missing Clerk env. Ensure /angular/env.js is loaded.');
      this.isLoading.set(false);
      return;
    }

    try {
      await this.loadClerkScript(env.clerkPublishableKey, env.clerkFrontendApi);
    } catch {
      this.isLoading.set(false);
      return;
    }

    if (!window.Clerk) {
      console.error('[auth] Clerk CDN script did not create window.Clerk');
      this.isLoading.set(false);
      return;
    }

    try {
      await window.Clerk.load({ publishableKey: env.clerkPublishableKey });
    } catch (err) {
      console.error('[auth] Clerk.load() failed:', err);
      this.isLoading.set(false);
      return;
    }

    this.clerk = window.Clerk;

    if (this.clerk.user) {
      this.user.set(this.clerk.user);
      this.token.set(await this.clerk.session.getToken());
    }
    this.isLoading.set(false);

    const clerkRef = this.clerk;
    this.clerk.addListener(async ({ user }: { user: { firstName?: string } | null }) => {
      if (user && clerkRef?.session) {
        this.user.set(user);
        this.token.set(await clerkRef.session.getToken());
      } else {
        this.user.set(null);
        this.token.set(null);
      }
    });
  }

  async signIn(): Promise<void> {
    if (!this.clerk) return;
    await this.clerk.openSignIn();
  }

  async signOut(): Promise<void> {
    if (!this.clerk) return;
    await this.clerk.signOut();
    this.user.set(null);
    this.token.set(null);
  }

  async refreshToken(): Promise<string | null> {
    if (this.clerk?.session) {
      const t = await this.clerk.session.getToken();
      this.token.set(t);
      return t;
    }
    return null;
  }

  private loadClerkScript(publishableKey: string, frontendApi: string): Promise<void> {
    const existing = document.querySelector('script[data-clerk-publishable-key]');
    if (existing) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.type = 'text/javascript';
      script.src = `https://${frontendApi}/npm/@clerk/clerk-js@5/dist/clerk.browser.js`;
      script.setAttribute('data-clerk-publishable-key', publishableKey);
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.head.appendChild(script);
    });
  }
}
