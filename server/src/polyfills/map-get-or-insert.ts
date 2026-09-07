/**
 * Elysia 2.0.0-beta.12 compiles named `.model()` schemas with
 * `WeakMap.prototype.getOrInsertComputed` (see dist/type/validator/index.mjs).
 * Bun implements that Stage-3 Map method; Node 24 on Vercel does not, so the
 * first POST to a named-model route returns:
 *   [Elysia] Failed to compile route POST /api/public-notes/:
 *   moduleCache.getOrInsertComputed is not a function
 */
type WeakMapWithGetOrInsert = WeakMap<object, unknown> & {
  getOrInsertComputed?: (key: object, computed: (key: object) => unknown) => unknown
}

export function getOrInsertComputedFallback<K extends object, V>(
  map: WeakMap<K, V>,
  key: K,
  computed: (key: K) => V
): V {
  if (map.has(key)) return map.get(key) as V
  const value = computed(key)
  map.set(key, value)
  return value
}

export function installMapGetOrInsertComputed(): void {
  const proto = WeakMap.prototype as WeakMapWithGetOrInsert
  if (typeof proto.getOrInsertComputed === 'function') return
  proto.getOrInsertComputed = function (key, computed) {
    return getOrInsertComputedFallback(this, key, computed)
  }
}

installMapGetOrInsertComputed()
