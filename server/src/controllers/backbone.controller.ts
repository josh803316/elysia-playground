import {Elysia} from 'elysia';
import {backbonePage} from '../views/backbone-templates.js';

export const backboneController = new Elysia({prefix: '/backbone'}).get(
  '/',
  () =>
    new Response(backbonePage(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
