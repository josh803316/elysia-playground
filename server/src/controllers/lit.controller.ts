import {Elysia} from 'elysia';
import {litPage} from '../views/lit-templates.js';

export const litController = new Elysia({prefix: '/lit'}).get(
  '/',
  () =>
    new Response(litPage(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
