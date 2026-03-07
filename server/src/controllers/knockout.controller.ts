import {Elysia} from 'elysia';
import {knockoutPage} from '../views/knockout-templates.js';

export const knockoutController = new Elysia({prefix: '/knockout'}).get(
  '/',
  () =>
    new Response(knockoutPage(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
