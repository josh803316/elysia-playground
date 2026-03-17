import {Elysia} from 'elysia';
import {stimulusPage} from '../views/stimulus-templates.js';

export const stimulusController = new Elysia({prefix: '/stimulus'}).get(
  '/',
  () =>
    new Response(stimulusPage(), {
      headers: {'Content-Type': 'text/html'},
    }),
);
