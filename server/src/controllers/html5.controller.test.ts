import {describe, it, expect} from 'bun:test';
import {readFileSync} from 'fs';
import {resolve} from 'path';

const html5IndexPath = resolve(import.meta.dir, '../../../html5/index.html');

function getHtml(): string {
  return readFileSync(html5IndexPath, 'utf-8');
}

describe('HTML5 SPA (html5/index.html)', () => {
  it('html5/index.html file exists', () => {
    expect(() => getHtml()).not.toThrow();
  });

  it('includes correct page title', () => {
    const html = getHtml();
    expect(html).toContain('<title>Elysia Notes - HTML5</title>');
  });

  it('includes Prism.js CDN for syntax highlighting', () => {
    const html = getHtml();
    expect(html).toContain('prismjs');
  });

  it('renders nav with correct branding', () => {
    const html = getHtml();
    expect(html).toContain('Elysia Notes - HTML5');
  });

  it('loads /html5/env.js for Clerk keys', () => {
    const html = getHtml();
    expect(html).toContain('/html5/env.js');
  });

  it('loads /html5/app.js as ES module', () => {
    const html = getHtml();
    expect(html).toContain('/html5/app.js');
    expect(html).toContain('type="module"');
  });

  it('loads /html5/styles.css', () => {
    const html = getHtml();
    expect(html).toContain('/html5/styles.css');
  });

  it('includes public notes section with correct testid', () => {
    const html = getHtml();
    expect(html).toContain('data-testid="section-public-notes"');
  });

  it('includes your notes section with correct testid', () => {
    const html = getHtml();
    expect(html).toContain('data-testid="section-your-notes"');
  });

  it('includes admin section with correct testid', () => {
    const html = getHtml();
    expect(html).toContain('data-testid="section-admin-table"');
  });

  it('includes native <dialog> elements for modals', () => {
    const html = getHtml();
    expect(html).toContain('id="dialog-create-public"');
    expect(html).toContain('id="dialog-create-private"');
    expect(html).toContain('id="dialog-edit-note"');
    expect(html).toContain('id="dialog-admin-login"');
  });

  it('includes <template> elements for note rendering', () => {
    const html = getHtml();
    expect(html).toContain('id="tpl-public-note"');
    expect(html).toContain('id="tpl-private-note"');
    expect(html).toContain('id="tpl-admin-row"');
  });

  it('includes footer with versions button', () => {
    const html = getHtml();
    expect(html).toContain('versions-btn');
    expect(html).toContain('2024 Notes App');
  });

  it('includes sign-in prompt', () => {
    const html = getHtml();
    expect(html).toContain('Sign In to Get Started');
  });

  it('includes required nav button IDs', () => {
    const html = getHtml();
    expect(html).toContain('id="btn-sign-in"');
    expect(html).toContain('id="btn-sign-out"');
    expect(html).toContain('id="btn-admin-login"');
    expect(html).toContain('id="btn-admin-logout"');
  });

  it('includes public and private note grid IDs', () => {
    const html = getHtml();
    expect(html).toContain('id="public-notes-grid"');
    expect(html).toContain('id="private-notes-grid"');
  });

  it('uses <details>/<summary> for code expanders', () => {
    const html = getHtml();
    expect(html).toContain('details class="vjs-code-expander"');
    expect(html).toContain('<summary>');
  });

  it('does not use tailwindcss CDN (uses custom CSS)', () => {
    const html = getHtml();
    expect(html).not.toContain('tailwindcss.com');
  });
});
