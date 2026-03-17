import {Elysia} from 'elysia';
import {solidPage} from '../views/solid-templates.js';

export const solidController = new Elysia({prefix: '/solid'}).get(
  '/',
  () =>
    new Response(solidPage(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
