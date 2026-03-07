import {Elysia} from 'elysia';
import {nextjsPage} from '../views/nextjs-templates.js';

export const nextjsController = new Elysia({prefix: '/nextjs'}).get(
  '/',
  () =>
    new Response(nextjsPage(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
