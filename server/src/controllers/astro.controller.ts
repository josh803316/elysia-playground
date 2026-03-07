import {Elysia} from 'elysia';
import {astroPage} from '../views/astro-templates.js';

export const astroController = new Elysia({prefix: '/astro'}).get(
  '/',
  () =>
    new Response(astroPage(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
