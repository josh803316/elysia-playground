import './map-get-or-insert.js'
import {setupTypebox} from 'elysia'
import * as compile from 'typebox/compile'
import * as schema from 'typebox/schema'
import * as system from 'typebox/system'
import * as type from 'typebox/type'
import * as value from 'typebox/value'

// Vercel runs this app as Node, which cannot `require()` typebox's ESM-only
// build. Elysia 2 otherwise does that on first named-model POST and returns:
//   require() of ES Module .../typebox/build/type/index.mjs ... not supported
setupTypebox({
  typebox: {type, system, value, schema, compile},
})
