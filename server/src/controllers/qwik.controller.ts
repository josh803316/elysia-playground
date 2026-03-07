import {Elysia} from 'elysia';
import {qwikPage} from '../views/qwik-templates.js';

export const qwikController = new Elysia({prefix: '/qwik'}).get(
  '/',
  () =>
    new Response(qwikPage(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
