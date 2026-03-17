import {Elysia} from 'elysia';
import {alpinePage} from '../views/alpine-templates.js';

export const alpineController = new Elysia({prefix: '/alpine'}).get(
  '/',
  () =>
    new Response(alpinePage(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
