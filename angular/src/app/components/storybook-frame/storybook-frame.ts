import { Component } from '@angular/core';

@Component({
  selector: 'app-storybook-frame',
  standalone: true,
  template: `
    <main class="storybook-page">
      <h1 class="storybook-title">Angular Storybook (Chromatic)</h1>

      @if (!storybookUrl) {
        <p class="storybook-hint">
          Storybook URL is not configured. Set
          <code>window.ANGULAR_STORYBOOK_URL</code> in a global script to the Chromatic-hosted
          Angular Storybook URL.
        </p>
      } @else {
        <div class="storybook-frame-wrapper">
          <iframe [src]="storybookUrl" title="Angular Storybook" class="storybook-iframe"></iframe>
        </div>
      }
    </main>
  `,
  styles: [
    `
      .storybook-page {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        height: 100vh;
        box-sizing: border-box;
      }

      .storybook-title {
        font-size: 1.5rem;
        font-weight: 600;
      }

      .storybook-hint {
        color: #6b7280;
      }

      .storybook-frame-wrapper {
        flex: 1;
        min-height: 0;
      }

      .storybook-iframe {
        width: 100%;
        height: 100%;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        background: #fff;
      }
    `,
  ],
})
export class StorybookFrameComponent {
  storybookUrl: string | null;

  constructor() {
    if (typeof window !== 'undefined' && (window as any).ANGULAR_STORYBOOK_URL) {
      this.storybookUrl = (window as any).ANGULAR_STORYBOOK_URL as string;
    } else {
      this.storybookUrl = null;
    }
  }
}
