import { Elysia, t } from "elysia";

const API_KEY = "test-api-key"; // In a real app, this would be stored securely

type Context = {
  headers: Record<string, string | undefined>;
  status: (code: number, message: string) => Response;
};

export const checkApiKey = ({ headers, status }: Context) => {
  const apiKey = headers["x-api-key"];
  if (!apiKey || apiKey !== API_KEY) {
    return status(401, "Unauthorized - Invalid API Key");
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
