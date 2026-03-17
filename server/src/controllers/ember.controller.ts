import {Elysia} from 'elysia';
import {emberPage} from '../views/ember-templates.js';

export const emberController = new Elysia({prefix: '/ember'}).get(
  '/',
  () =>
    new Response(emberPage(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
