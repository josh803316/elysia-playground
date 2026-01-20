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
};

// A simplified auth guard function
export const authGuard = (ctx: any) => {
  try {
    const typedCtx = ctx as unknown as Context;
    const auth = typedCtx.auth();

    console.log({ auth });

    // Check if user is authenticated and has email in claims
    if (!auth?.userId || !auth?.sessionClaims?.email) {
      return typedCtx.status(401, "Unauthorized - Authentication required");
    }
  } catch (e) {
    console.error("Auth error:", e);
    return ctx.status(401, "Unauthorized - Authentication error");
  }
};
