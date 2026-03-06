import {Elysia} from 'elysia';
import {jqueryPage} from '../views/jquery-templates.js';

export const jqueryController = new Elysia({prefix: '/jquery'}).get(
  '/',
  () =>
    new Response(jqueryPage(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
