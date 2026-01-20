import { Elysia, t } from "elysia";

// Use environment variable for API key or fall back to a default for development
const API_KEY = process.env.ADMIN_API_KEY || "test-api-key";

type Context = {
  headers: Record<string, string | undefined>;
  request: Request;
  status: (code: number, message: string) => Response;
};

export const apiKeyGuard = (ctx: any) => {
  try {
    const typedCtx = ctx as unknown as Context;

    // Check for API key in headers - support both lowercase and standard formats
    const apiKey =
      typedCtx.headers["x-api-key"] ||
      typedCtx.request.headers.get("x-api-key");

    if (!apiKey || apiKey !== API_KEY) {
      return typedCtx.status(401, "Unauthorized - Invalid API Key");
    }

    // Add the API key to the context for potential future use
    ctx.admin = { authenticated: true };
  } catch (e) {
    console.error("API key validation error:", e);
    return ctx.status(500, "Server error validating API key");
  }
};
