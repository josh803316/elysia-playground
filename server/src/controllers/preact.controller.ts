import {Elysia} from 'elysia';
import {preactPage} from '../views/preact-templates.js';

export const preactController = new Elysia({prefix: '/preact'}).get(
  '/',
  () =>
    new Response(preactPage(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
