import {describe, expect, it} from 'bun:test';
import {readFileSync} from 'fs';
import {resolve} from 'path';

/**
 * UX conformance tests for the HTML5 SPA (html5/index.html).
 * Asserts structure matches the notes app spec:
 * - Public Notes, Your Notes, Admin sections
 * - Native <dialog>, <template>, <details>/<summary>
 * - Same nav/auth pattern as vanilla-js
 */

const html5IndexPath = resolve(import.meta.dir, '../../../html5/index.html');

function getHtml(): string {
  return readFileSync(html5IndexPath, 'utf-8');
}

describe('HTML5 SPA UX conformance (html5/index.html)', () => {
  it('includes correct page title', () => {
    const html = getHtml();
    expect(html).toContain('<title>Elysia Notes - HTML5</title>');
  });

  it('renders Public Notes section with data-testid', () => {
    const html = getHtml();
    expect(html).toContain('data-testid="section-public-notes"');
    expect(html).toContain('Public Notes');
    expect(html).toContain('Visible to everyone');
  });

  it('renders Your Notes section with data-testid', () => {
    const html = getHtml();
    expect(html).toContain('data-testid="section-your-notes"');
    expect(html).toContain('Your Notes');
    expect(html).toContain('Only you can see these notes');
  });

  it('renders Admin section with data-testid', () => {
    const html = getHtml();
    expect(html).toContain('data-testid="section-admin-table"');
    expect(html).toContain('All Notes (Admin View)');
  });

  it('uses native <dialog> for create public note modal', () => {
    const html = getHtml();
    expect(html).toContain('id="dialog-create-public"');
    expect(html).toContain('<dialog');
  });

  it('uses native <dialog> for create private note modal', () => {
    const html = getHtml();
    expect(html).toContain('id="dialog-create-private"');
  });

  it('uses native <dialog> for edit note modal', () => {
    const html = getHtml();
    expect(html).toContain('id="dialog-edit-note"');
  });

  it('uses native <dialog> for admin login modal', () => {
    const html = getHtml();
    expect(html).toContain('id="dialog-admin-login"');
  });

  it('uses <template> elements for note card rendering', () => {
    const html = getHtml();
    expect(html).toContain('id="tpl-public-note"');
    expect(html).toContain('id="tpl-private-note"');
    expect(html).toContain('id="tpl-admin-row"');
  });

  it('uses <details>/<summary> for code expanders (not custom buttons)', () => {
    const html = getHtml();
    expect(html).toContain('details class="vjs-code-expander"');
    expect(html).toContain('<summary>');
    // Should NOT use the old vanilla-js button toggle pattern
    expect(html).not.toContain('class="vjs-code-toggle"');
  });

  it('loads /html5/env.js for Clerk configuration', () => {
    const html = getHtml();
    expect(html).toContain('/html5/env.js');
  });

  it('loads /html5/app.js as ES module entry point', () => {
    const html = getHtml();
    expect(html).toContain('src="/html5/app.js"');
    expect(html).toContain('type="module"');
  });

  it('includes footer with versions button and copyright', () => {
    const html = getHtml();
    expect(html).toContain('versions-btn');
    expect(html).toContain('2024 Notes App');
  });

  it('includes sign-in prompt for unauthenticated users', () => {
    const html = getHtml();
    expect(html).toContain('Sign In to Get Started');
  });

  it('includes required nav auth buttons', () => {
    const html = getHtml();
    expect(html).toContain('id="btn-sign-in"');
    expect(html).toContain('id="btn-sign-out"');
    expect(html).toContain('id="btn-admin-login"');
    expect(html).toContain('id="btn-admin-logout"');
  });

  it('body starts with signed-out class', () => {
    const html = getHtml();
    expect(html).toContain('class="signed-out"');
  });

  it('uses HTML5 orange brand color variable in CSS link', () => {
    const html = getHtml();
    expect(html).toContain('/html5/styles.css');
  });

  it('includes Prism.js for syntax highlighting', () => {
    const html = getHtml();
    expect(html).toContain('prismjs');
  });

  it('does not use tailwindcss CDN', () => {
    const html = getHtml();
    expect(html).not.toContain('tailwindcss.com');
  });

  it('does not use jQuery or HTMX', () => {
    const html = getHtml();
    expect(html).not.toContain('jquery');
    expect(html).not.toContain('htmx.org');
  });

  it('includes admin-regex-input and delete-by-regex controls', () => {
    const html = getHtml();
    expect(html).toContain('id="admin-regex-input"');
    expect(html).toContain('id="btn-delete-by-regex"');
  });

  it('includes public and private notes grids', () => {
    const html = getHtml();
    expect(html).toContain('id="public-notes-grid"');
    expect(html).toContain('id="private-notes-grid"');
  });
});
