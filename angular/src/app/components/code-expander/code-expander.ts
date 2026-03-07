import { Component, Input, signal, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';

declare const Prism: { highlightAllUnder: (el: Element) => void } | undefined;

@Component({
  selector: 'app-code-expander',
  standalone: true,
  template: `
    <div class="code-expander">
      <button
        type="button"
        class="code-toggle"
        [attr.aria-controls]="id + '-panel'"
        [attr.aria-expanded]="open()"
        (click)="toggle()"
      >
        <span class="code-icon">&lt;/&gt;</span>
        {{ label }}
        <span class="chevron" [class.rotated]="open()">▼</span>
      </button>
      @if (open()) {
        <div [id]="id + '-panel'" #panelEl>
          <pre
            class="language-javascript"
            style="margin:0;border-radius:0.5rem;font-size:0.75rem"
          ><code class="language-javascript">{{ code }}</code></pre>
        </div>
      }
    </div>
    @if (testCode) {
      <div class="code-expander">
        <button
          type="button"
          class="code-toggle"
          [attr.aria-controls]="id + '-test-panel'"
          [attr.aria-expanded]="testOpen()"
          (click)="toggleTest()"
        >
          <span class="code-icon">🧪</span>
          {{ testLabel }}
          <span class="chevron" [class.rotated]="testOpen()">▼</span>
        </button>
        @if (testOpen()) {
          <div [id]="id + '-test-panel'" #testPanelEl>
            <pre
              class="language-javascript"
              style="margin:0;border-radius:0.5rem;font-size:0.75rem"
            ><code class="language-javascript">{{ testCode }}</code></pre>
          </div>
        }
      </div>
    }
  `,
  styles: `
    .code-expander {
      border-top: 1px solid #e5e7eb;
      margin-top: 1rem;
    }
    .code-toggle {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      width: 100%;
      padding: 0.5rem 0.75rem;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      color: #6b7280;
      text-align: left;
      border-radius: 0.375rem;
      transition:
        background 0.15s,
        color 0.15s;
    }
    .code-toggle:hover {
      background: #f9fafb;
      color: #374151;
    }
    .code-icon {
      font-family: monospace;
      color: #9ca3af;
    }
    .chevron {
      margin-left: 0.25rem;
      display: inline-block;
      transition: transform 0.2s;
    }
    .chevron.rotated {
      transform: rotate(180deg);
    }
  `,
})
export class CodeExpanderComponent implements AfterViewChecked {
  @Input() code = '';
  @Input() id = '';
  @Input() label = 'Angular code';
  @Input() testCode = '';
  @Input() testLabel = 'E2E test (Playwright)';
  @ViewChild('panelEl') panelEl?: ElementRef<HTMLDivElement>;
  @ViewChild('testPanelEl') testPanelEl?: ElementRef<HTMLDivElement>;

  open = signal(false);
  testOpen = signal(false);
  private needsHighlight = false;
  private needsTestHighlight = false;

  toggle() {
    this.open.update((v) => !v);
    if (this.open()) this.needsHighlight = true;
  }

  toggleTest() {
    this.testOpen.update((v) => !v);
    if (this.testOpen()) this.needsTestHighlight = true;
  }

  ngAfterViewChecked() {
    if (this.needsHighlight && this.panelEl?.nativeElement) {
      this.needsHighlight = false;
      try {
        if (typeof Prism !== 'undefined') {
          Prism.highlightAllUnder(this.panelEl.nativeElement);
        }
      } catch {}
    }
    if (this.needsTestHighlight && this.testPanelEl?.nativeElement) {
      this.needsTestHighlight = false;
      try {
        if (typeof Prism !== 'undefined') {
          Prism.highlightAllUnder(this.testPanelEl.nativeElement);
        }
      } catch {}
    }
  }
}
