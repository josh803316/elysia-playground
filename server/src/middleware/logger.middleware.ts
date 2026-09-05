import { createPinoLogger } from '@bogeychan/elysia-logger'
import type { AnyElysia } from 'elysia'
import * as util from 'util'

// Explicitly check for development mode - default to development if not set
const isProductionMode = process.env.NODE_ENV === 'production'

util.inspect.defaultOptions = {
  depth: 5,
  maxArrayLength: 30,
  maxStringLength: 500,
  compact: isProductionMode,
  breakLength: 80,
}

export function useLogger(app: AnyElysia) {
  const logger = createPinoLogger({
    redact: {
      paths: [
        'body.password',
        'body.token',
        'body.authenticationToken',
        'body.*.password',
        'body.*.token',
        'params.password',
        'params.token',
        'query.password',
        'query.token',
        'headers.authorization',
      ],
      censor: '[Redacted]',
    },
    // pino-pretty transport is for local development only.
    // In serverless production environments, use default JSON logger.
    ...(isProductionMode
      ? {}
      : {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              singleLine: false,
              translateTime: 'HH:MM:ss.l',
              ignore: 'pid,hostname',
              level: 'debug',
            },
          },
        }),
    level: isProductionMode ? 'info' : 'debug',
  })

  // Override console methods globally
  console.log = (...args: unknown[]) => {
    const formattedArgs = args.map((arg) => (typeof arg === 'object' ? util.inspect(arg) : arg))
    logger.info(formattedArgs.join(' '))
  }

  console.debug = (...args: unknown[]) => {
    const formattedArgs = args.map((arg) => (typeof arg === 'object' ? util.inspect(arg) : arg))
    logger.debug(formattedArgs.join(' '))
  }

  console.error = (...args: unknown[]) => {
    const formattedArgs = args.map((arg) => (typeof arg === 'object' ? util.inspect(arg) : arg))
    logger.error(formattedArgs.join(' '))
  }

  console.warn = (...args: unknown[]) => {
    const formattedArgs = args.map((arg) =>
      typeof arg === 'object' && !isProductionMode ? util.inspect(arg) : arg
    )
    logger.warn(formattedArgs.join(' '))
  }

  // @bogeychan/elysia-logger 0.1.10 still registers Elysia 1 lifecycle
  // methods (onRequest / onError / onAfterResponse). Skip logger.into()
  // until that plugin ships an Elysia 2 build; keep Pino for console.
  const requestTimes = new Map<string, number>()

  app.request(({ request }) => {
    requestTimes.set(request.url, performance.now())
  })

  app.afterResponse(({ request }) => {
    const startTime = requestTimes.get(request.url)
    if (startTime) {
      requestTimes.delete(request.url)
      logger.debug(
        `${request.method} ${request.url} ${Math.round(performance.now() - startTime)}ms`
      )
    }
  })

  app.decorate('logger', logger)

  return logger
}
