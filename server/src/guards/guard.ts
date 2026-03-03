import {Elysia, t} from 'elysia';

const API_KEY = 'test-api-key'; // In a real app, this would be stored securely

export const checkApiKey = (ctx: any) => {
  const hasRequestHeaders = typeof ctx.request?.headers?.get === 'function' || ctx.request?.headers;

  const apiKey = hasRequestHeaders
    ? typeof ctx.request.headers.get === 'function'
      ? ctx.request.headers.get('x-api-key')
      : (ctx.request.headers as Record<string, string | undefined>)['x-api-key']
    : ctx.headers?.['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    return ctx.status(401, 'Unauthorized - Invalid API Key');
  }
};

export const apiKeyGuard = new Elysia()
  .model({
    error: t.Object({
      success: t.Boolean(),
      message: t.String(),
    }),
  })
  .guard({
    beforeHandle: checkApiKey,
  });
