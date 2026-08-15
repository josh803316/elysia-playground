import {describe, expect, it} from 'bun:test';
import {baseLayout, jqueryPage} from './jquery-templates';

/**
 * UX conformance tests for jQuery templates.
 * Mirrors htmx-ux-conformance.test.ts — asserts structure and copy match docs/UX-SPEC.md.
 */
describe('jQuery templates UX conformance', () => {
  const requiredPageTitle = 'Elysia Notes - jQuery';

  it('baseLayout includes page title with framework name', () => {
    const html = baseLayout('<p>test</p>', requiredPageTitle);
    expect(html).toContain(`<title>${requiredPageTitle}</title>`);
  });

  it('jqueryPage includes section data-testids', () => {
    const html = jqueryPage(undefined);
    expect(html).toContain('data-testid="section-public-notes"');
    expect(html).toContain('data-testid="section-your-notes"');
    expect(html).toContain('data-testid="section-admin-table"');
  });

  it('jqueryPage includes required section subtitles', () => {
    const html = jqueryPage(undefined);
    expect(html).toContain('Visible to everyone');
    expect(html).toContain('Only you can see these notes');
    expect(html).toContain('View and manage all notes in the system');
  });

  it('jqueryPage admin section includes all required table column headers', () => {
    const html = jqueryPage(undefined);
    for (const header of ['Title', 'Content Preview', 'Status', 'Author', 'Created', 'Updated', 'Actions']) {
      expect(html).toContain(header);
    }
  });

  it('jqueryPage includes nav height and container max-width tokens from UX spec', () => {
    const html = jqueryPage(undefined);
    expect(html).toContain('h-[60px]'); // 60px nav height
    expect(html).toContain('max-w-[1320px]'); // 1320px container
  });

  it('jqueryPage includes admin login copy from UX spec', () => {
    const html = jqueryPage(undefined);
    expect(html).toContain('Admin Login');
  });

  it('jqueryPage includes sign-in prompt for unauthenticated users', () => {
    const html = jqueryPage(undefined);
    expect(html).toContain('Sign In to Get Started');
  });

  it('jqueryPage uses jQuery CDN and Prism CDN — not HTMX', () => {
    const html = jqueryPage(undefined);
    expect(html).toContain('jquery');
    expect(html).toContain('prismjs');
    expect(html).not.toContain('htmx.org');
  });

  it('jqueryPage has 6 code expanders (code + E2E test per section)', () => {
    const html = jqueryPage(undefined);
    const count = (html.match(/class="jq-code-toggle/g) ?? []).length;
    expect(count).toBe(6);
  });

  it('code expanders reference correct REST API endpoints', () => {
    const html = jqueryPage(undefined);
    expect(html).toContain('/api/public-notes');
    expect(html).toContain('/api/private-notes');
    expect(html).toContain('/api/notes/all');
  });
});
