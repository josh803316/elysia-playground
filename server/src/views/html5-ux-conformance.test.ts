import {describe, expect, it} from 'bun:test';
import {html5Page} from './html5-templates';

/**
 * UX conformance tests for HTML5 showcase templates.
 * Mirrors jquery-ux-conformance.test.ts — asserts structure matches expectations.
 */
describe('HTML5 templates UX conformance', () => {
  it('html5Page includes correct page title', () => {
    const html = html5Page();
    expect(html).toContain('<title>Elysia Notes - HTML5</title>');
  });

  it('html5Page renders hero section with required testid and heading', () => {
    const html = html5Page();
    expect(html).toContain('data-testid="hero"');
    expect(html).toContain('HTML5');
    expect(html).toContain('Features That Replace JavaScript');
  });

  it('html5Page renders demos-container testid', () => {
    const html = html5Page();
    expect(html).toContain('data-testid="demos-container"');
  });

  it('html5Page renders all 9 demo section testids', () => {
    const html = html5Page();
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

  it('html5Page includes 9 code expander toggles', () => {
    const html = html5Page();
    const count = (html.match(/class="html5-code-toggle/g) ?? []).length;
    expect(count).toBe(9);
  });

  it('html5Page nav height and container max-width match UX spec tokens', () => {
    const html = html5Page();
    expect(html).toContain('h-[60px]');
    expect(html).toContain('max-w-[1320px]');
  });

  it('html5Page nav includes Playground Home link to root', () => {
    const html = html5Page();
    expect(html).toContain('href="/"');
    expect(html).toContain('Playground Home');
  });

  it('html5Page includes footer with versions button', () => {
    const html = html5Page();
    expect(html).toContain('versions-btn');
    expect(html).toContain('2024 Notes App');
  });

  it('html5Page includes Prism.js and Tailwind CDN — not jQuery or HTMX', () => {
    const html = html5Page();
    expect(html).toContain('prismjs');
    expect(html).toContain('tailwindcss.com');
    expect(html).not.toContain('jquery');
    expect(html).not.toContain('htmx.org');
  });

  it('html5Page dialog demo includes showModal and confirmDialog', () => {
    const html = html5Page();
    expect(html).toContain('showModal');
    expect(html).toContain('confirmDialog');
  });

  it('html5Page template demo includes addTemplateCard and template-output', () => {
    const html = html5Page();
    expect(html).toContain('addTemplateCard');
    expect(html).toContain('template-output');
  });

  it('html5Page progress demo includes jobProgress and simulateProgress', () => {
    const html = html5Page();
    expect(html).toContain('jobProgress');
    expect(html).toContain('simulateProgress');
  });
});
