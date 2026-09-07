import {describe, expect, it} from 'bun:test'
import {getOrInsertComputedFallback, installMapGetOrInsertComputed} from './map-get-or-insert'

describe('WeakMap getOrInsertComputed polyfill', () => {
  it('computes once and reuses the cached value', () => {
    const map = new WeakMap<object, string>()
    const key = {}
    let calls = 0
    const first = getOrInsertComputedFallback(map, key, () => {
      calls += 1
      return 'compiled'
    })
    const second = getOrInsertComputedFallback(map, key, () => {
      calls += 1
      return 'other'
    })
    expect(first).toBe('compiled')
    expect(second).toBe('compiled')
    expect(calls).toBe(1)
  })

  it('installs on WeakMap.prototype when the native method is missing', () => {
    const proto = WeakMap.prototype as WeakMap<object, unknown> & {
      getOrInsertComputed?: (key: object, computed: (key: object) => unknown) => unknown
    }
    const native = proto.getOrInsertComputed
    const descriptor = Object.getOwnPropertyDescriptor(proto, 'getOrInsertComputed')
    if (descriptor && descriptor.configurable === false) {
      expect(typeof proto.getOrInsertComputed).toBe('function')
      return
    }

    try {
      // @ts-expect-error -- simulate Vercel Node, which lacks this method
      delete proto.getOrInsertComputed
      expect(typeof proto.getOrInsertComputed).not.toBe('function')
      installMapGetOrInsertComputed()
      expect(typeof proto.getOrInsertComputed).toBe('function')

      const map = new WeakMap<object, number>()
      const key = {}
      const value = proto.getOrInsertComputed!.call(map, key, () => 42)
      expect(value).toBe(42)
      expect(map.get(key)).toBe(42)
    } finally {
      if (native) proto.getOrInsertComputed = native
    }
  })
})
