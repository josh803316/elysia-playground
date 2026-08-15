// Experiment: Vercel Edge Runtime function, isolated from the main Elysia/Bun app.
// Deliberately has zero dependencies (no DB, no Clerk, no Elysia) so it's a clean
// comparison point against /health (Bun runtime, full app cold start) for cold-start
// and latency. See PR description for what this does/doesn't prove.
export const config = {runtime: 'edge'};

export default function handler(request: Request): Response {
  return new Response(
    JSON.stringify({
      status: 'ok',
      runtime: 'edge',
      timestamp: new Date().toISOString(),
      region: process.env.VERCEL_REGION ?? 'unknown',
    }),
    {headers: {'content-type': 'application/json; charset=utf-8'}},
  );
}
