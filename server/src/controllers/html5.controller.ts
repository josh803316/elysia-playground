import {Elysia} from 'elysia';
import {html5Page} from '../views/html5-templates.js';

export const html5Controller = new Elysia({prefix: '/html5'}).get(
  '/',
  () =>
    new Response(html5Page(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
