import {describe, it, expect, beforeAll} from 'bun:test';
import {Elysia} from 'elysia';

describe('HTML5 Controller', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let html5Module: any;

  beforeAll(async () => {
    html5Module = await import('./html5.controller');
  });

  function createApp() {
    return new Elysia().use(html5Module.html5Controller);
  }

  describe('GET /html5/', () => {
    it('returns 200', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      expect(res.status).toBe(200);
    });

    it('returns text/html content-type', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      expect(res.headers.get('Content-Type')).toContain('text/html');
    });

    it('includes correct page title', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      const html = await res.text();
      expect(html).toContain('<title>Elysia Notes - HTML5</title>');
    });

    it('includes Prism.js CDN for syntax highlighting', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      const html = await res.text();
      expect(html).toContain('prismjs');
    });

    it('includes Tailwind CDN', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      const html = await res.text();
      expect(html).toContain('tailwindcss.com');
    });

    it('renders nav with correct branding', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      const html = await res.text();
      expect(html).toContain('Elysia Notes - HTML5');
    });

    it('includes Playground Home link in nav', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      const html = await res.text();
      expect(html).toContain('Playground Home');
      expect(html).toContain('href="/"');
    });

    it('renders hero section with correct testid', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      const html = await res.text();
      expect(html).toContain('data-testid="hero"');
      expect(html).toContain('HTML5');
      expect(html).toContain('Features That Replace JavaScript');
    });

    it('renders demos container with correct testid', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      const html = await res.text();
      expect(html).toContain('data-testid="demos-container"');
    });

    it('renders all 9 demo sections', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      const html = await res.text();
      const expectedIds = [
        'demo-dialog',
        'demo-validation',
        'demo-details',
        'demo-datetime',
        'demo-autocomplete',
        'demo-template',
        'demo-dragdrop',
        'demo-progress',
        'demo-semantic',
      ];
      for (const id of expectedIds) {
        expect(html).toContain(`data-testid="${id}"`);
      }
    });

    it('includes 9 code expander toggles', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      const html = await res.text();
      const count = (html.match(/class="html5-code-toggle/g) ?? []).length;
      expect(count).toBe(9);
    });

    it('includes 9 code panels with language-markup class', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      const html = await res.text();
      const count = (html.match(/class="language-markup"/g) ?? []).length;
      expect(count).toBeGreaterThanOrEqual(9);
    });

    it('includes footer with versions button', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      const html = await res.text();
      expect(html).toContain('versions-btn');
      expect(html).toContain('2024 Notes App');
    });

    it('uses nav height and container max-width tokens from UX spec', async () => {
      const res = await createApp().handle(new Request('http://localhost/html5/'));
      const html = await res.text();
      expect(html).toContain('h-[60px]');
      expect(html).toContain('max-w-[1320px]');
    });
  });
});
