import {Elysia} from 'elysia';
import {jqueryPage} from '../views/jquery-templates.js';

const CLERK_KEY = process.env.CLERK_PUBLISHABLE_KEY ?? '';

export const jqueryController = new Elysia({prefix: '/jquery'}).get(
  '/',
  () =>
    new Response(jqueryPage(CLERK_KEY), {
      headers: {'Content-Type': 'text/html'},
    }),
);
