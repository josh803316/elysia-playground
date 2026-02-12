import { Elysia, t } from "elysia";

// Type definitions for context
type AuthData = {
  userId: string | number;
  sessionClaims?: {
    email?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

type Context = {
  auth: () => AuthData;
  status: (code: number, message: string) => Response;
  request?: Request;
};

// A simplified auth guard function
export const authGuard = (ctx: any) => {
  try {
    const typedCtx = ctx as unknown as Context;
    const auth = typedCtx.auth();
    const request = typedCtx.request;
    const rawUrl = request?.url;
    const path =
      typeof rawUrl === "string" && rawUrl.length > 0
        ? new URL(rawUrl).pathname
        : "unknown";
    const hasAuthorizationHeader = !!request?.headers?.get?.("authorization");

    // Check if user is authenticated (userId is set by Clerk when token is valid)
    if (!auth?.userId) {
      console.warn("[AUTH_GUARD] Unauthorized request", {
        path,
        hasAuthorizationHeader,
      });
      return typedCtx.status(401, "Unauthorized - Authentication required");
    }
  } catch (e) {
    console.error("Auth error:", e);
    return ctx.status(401, "Unauthorized - Authentication error");
  }
};
