// eslint-disable-next-line @typescript-eslint/no-explicit-any
import {describe, it, expect, beforeAll} from 'bun:test';
import {Elysia} from 'elysia';

describe('jQuery Controller', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let jqueryModule: any;

  beforeAll(async () => {
    jqueryModule = await import('./jquery.controller');
  });

  function createApp() {
    return new Elysia().use(jqueryModule.jqueryController);
  }

  describe('GET /jquery/', () => {
    it('returns 200', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      expect(res.status).toBe(200);
    });

    it('returns text/html content-type', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      expect(res.headers.get('Content-Type')).toContain('text/html');
    });

    it('includes correct page title', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('<title>Elysia Notes - jQuery</title>');
    });

    it('includes jQuery CDN script', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('jquery');
    });

    it('includes Prism.js CDN for syntax highlighting', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('prismjs');
    });

    it('includes Tailwind CDN', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('tailwindcss.com');
    });

    it('renders Public Notes section with required testid', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('data-testid="section-public-notes"');
      expect(html).toContain('Public Notes');
      expect(html).toContain('Visible to everyone');
    });

    it('renders Your Notes section with required testid', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('data-testid="section-your-notes"');
      expect(html).toContain('Your Notes');
      expect(html).toContain('Only you can see these notes');
    });

    it('renders Admin section with required testid', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('data-testid="section-admin-table"');
      expect(html).toContain('All Notes (Admin View)');
      expect(html).toContain('View and manage all notes in the system');
    });

    it('admin table includes all required column headers', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      for (const header of ['Title', 'Content Preview', 'Status', 'Author', 'Created', 'Updated', 'Actions']) {
        expect(html).toContain(header);
      }
    });

    it('includes code expander toggles (3 sections)', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      const count = (html.match(/class="jq-code-toggle/g) ?? []).length;
      expect(count).toBe(3);
    });

    it('includes code panels with language-javascript class', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      const count = (html.match(/class="language-javascript"/g) ?? []).length;
      expect(count).toBeGreaterThanOrEqual(3);
    });

    it('code expanders show real jQuery API calls', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('/api/public-notes');
      expect(html).toContain('/api/private-notes');
      expect(html).toContain('/api/notes/all');
    });

    it('renders nav with correct branding', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('Elysia Notes - jQuery');
    });

    it('includes nav auth controls', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('sign-in-btn');
      expect(html).toContain('sign-out-btn');
      expect(html).toContain('Admin Login');
    });

    it('includes Create Public Note button', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('Create Public Note');
    });

    it('includes Create Private Note button', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('Create Private Note');
    });

    it('uses the correct REST API endpoints in scripts', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain("$.get('/api/public-notes'");
      expect(html).toContain('$.ajax(');
    });

    it('includes Clerk auth body class handling', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('clerk-loading');
      expect(html).toContain('show-when-signed-in');
      expect(html).toContain('show-when-signed-out');
    });

    it('includes sign-in prompt for signed-out users', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('Sign In to Get Started');
    });

    it('includes footer with versions button', async () => {
      const res = await createApp().handle(new Request('http://localhost/jquery/'));
      const html = await res.text();
      expect(html).toContain('versions-btn');
      expect(html).toContain('© 2024 Notes App');
    });
  });
});
