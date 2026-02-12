import { createPinoLogger, type InferContext } from "@bogeychan/elysia-logger";
import { Elysia } from "elysia";
import * as util from "util";

// Explicitly check for development mode - default to development if not set
const isProductionMode = process.env.NODE_ENV === "production";
console.log(
  `Logger running in ${isProductionMode ? "production" : "development"} mode`
);

util.inspect.defaultOptions = {
  depth: 5,
  maxArrayLength: 30,
  maxStringLength: 500,
  compact: isProductionMode,
  breakLength: 80,
};

export function useLogger(app: Elysia) {
  const logger = createPinoLogger({
    redact: {
      paths: [
        "body.password",
        "body.token",
        "body.authenticationToken",
        "body.*.password",
        "body.*.token",
        "params.password",
        "params.token",
        "query.password",
        "query.token",
        "headers.authorization",
      ],
      censor: "[Redacted]",
    },
    // pino-pretty transport is for local development only.
    // In serverless production environments, use default JSON logger.
    ...(!isProductionMode
      ? {
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              singleLine: false,
              translateTime: "HH:MM:ss.l",
              ignore: "pid,hostname",
              level: "debug",
            },
          },
        }
      : {}),
    level: isProductionMode ? "info" : "debug",
  });

  // Override console methods globally
  console.log = (...args: unknown[]) => {
    const formattedArgs = args.map((arg) =>
      typeof arg === "object" ? util.inspect(arg) : arg
    );
    logger.info(formattedArgs.join(" "));
  };

  console.debug = (...args: unknown[]) => {
    const formattedArgs = args.map((arg) =>
      typeof arg === "object" ? util.inspect(arg) : arg
    );
    logger.debug(formattedArgs.join(" "));
  };

  console.error = (...args: unknown[]) => {
    const formattedArgs = args.map((arg) =>
      typeof arg === "object" ? util.inspect(arg) : arg
    );
    logger.error(formattedArgs.join(" "));
  };

  console.warn = (...args: unknown[]) => {
    const formattedArgs = args.map((arg) =>
      typeof arg === "object" && !isProductionMode ? util.inspect(arg) : arg
    );
    logger.warn(formattedArgs.join(" "));
  };

  app.use(
    logger.into({
      autoLogging: true,
      customProps: (ctx: InferContext<typeof app>) => {
        if (ctx.isError) {
          return {
            error: ctx.error,
            code: ctx.code,
            path: ctx.path,
            headers: ctx.request.headers,
          };
        }
        return {
          body: ctx.body,
          params: ctx.params,
          query: ctx.query,
          status:
            typeof (ctx as any).response?.status === "number"
              ? (ctx as any).response.status
              : ctx.set.status,
          request: {
            method: ctx.request.method,
            url: ctx.request.url,
            referrer: null,
            headers: ctx.request.headers,
          },
          responseTime: calculateResponseTime(ctx.request),
        };
      },
    })
  );

  // Track request start times
  const requestTimes = new Map<string, number>();

  // Helper to calculate response time
  const calculateResponseTime = (request: Request): number | undefined => {
    const requestId = request.url;
    const startTime = requestTimes.get(requestId);
    if (startTime) {
      requestTimes.delete(requestId);
      return performance.now() - startTime;
    }
    return undefined;
  };

  // Add onRequest hook to track when requests start
  app.onRequest(({ request }) => {
    requestTimes.set(request.url, performance.now());
  });

  app.decorate("logger", logger);

  return logger;
}
