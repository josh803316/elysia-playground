/**
 * Re-export server App type for the API client.
 * In tests, Vitest aliases this module to a stub so the real server is never loaded.
 */
export type { App } from "../../../../server/src/index";
