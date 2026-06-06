import {Elysia} from 'elysia';
import {jqueryPage} from '../views/jquery-templates.js';

// Get Clerk publishable key from environment
const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY || '';
const CLERK_FRONTEND_API = process.env.CLERK_FRONTEND_API || '';

export const jqueryController = new Elysia({prefix: '/jquery'}).get(
  '/',
  () =>
    new Response(jqueryPage(CLERK_PUBLISHABLE_KEY, CLERK_FRONTEND_API), {
      headers: {'Content-Type': 'text/html'},
    }),
);
