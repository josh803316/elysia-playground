/**
 * Clerk auth that includes the request's origin in authorizedParties.
 * This ensures tokens issued for the same host (e.g. Vercel deployment URL)
 * are accepted even when that origin isn't in env (e.g. VERCEL_URL can differ from custom domain).
 */
import { createClerkClient } from '@clerk/backend'
import { TokenType } from '@clerk/backend/internal'
import { Elysia } from 'elysia'

function patchRequest(request: Request): Request {
  // Use only RequestInit properties that are in strict lib (no cache/redirect)
  const cloned = new Request(request.url, {
    headers: request.headers,
    method: request.method,
    signal: request.signal,
  })
  if (
    cloned.method !== 'GET' &&
    cloned.body !== null &&
    !('duplex' in (cloned as Request & { duplex?: string }))
  ) {
    ;(cloned as Request & { duplex: string }).duplex = 'half'
  }
  return cloned
}

export type ClerkPluginOptions = {
  publishableKey?: string
  secretKey?: string
  authorizedParties: string[]
  protectedRoutes?: (path: string) => boolean
  [key: string]: unknown
}

export function clerkPluginWithRequestOrigin(options: ClerkPluginOptions) {
  const {
    authorizedParties: staticParties,
    publishableKey = process.env.CLERK_PUBLISHABLE_KEY,
    secretKey = process.env.CLERK_SECRET_KEY,
    ...rest
  } = options

  const clerkClient = createClerkClient({
    secretKey: secretKey ?? '',
    // Let Clerk use default apiUrl from publishableKey
  })

  return new Elysia({ name: 'elysia-clerk' })
    .decorate('clerk', clerkClient)
    .derive(async ({ request, set }) => {
      const requestOrigin = (() => {
        try {
          return new URL(request.url).origin
        } catch {
          return null
        }
      })()
      const authorizedParties = [...staticParties, ...(requestOrigin ? [requestOrigin] : [])]

      const requestState = await clerkClient.authenticateRequest(patchRequest(request), {
        ...rest,
        secretKey,
        publishableKey,
        acceptsToken: TokenType.SessionToken,
        authorizedParties,
      } as Parameters<typeof clerkClient.authenticateRequest>[1])

      type AuthOptions = Parameters<typeof requestState.toAuth>[0]
      const auth = (opts?: AuthOptions) => requestState.toAuth(opts)
      requestState.headers.forEach((value, key) => {
        set.headers[key] = value
      })
      if (requestState.headers.get('location')) {
        set.status = 307
        return { auth }
      }
      if (requestState.status === 'handshake') {
        throw new Error('Clerk: handshake status without redirect')
      }
      return { auth }
    })
    .as('plugin')
}
