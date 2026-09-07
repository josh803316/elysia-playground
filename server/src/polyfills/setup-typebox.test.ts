import {describe, expect, it} from 'bun:test'
import {Elysia, t} from 'elysia'

describe('setupTypebox on Node-like compile', () => {
  it('compiles a named-model POST without throwing', async () => {
    await import('./setup-typebox')
    const app = new Elysia().model({
      publicNote: t.Object({
        title: t.String(),
        content: t.String(),
      }),
    }).post(
      '/',
      {
        body: 'publicNote',
      },
      ({body}) => body,
    )

    const response = await app.handle(
      new Request('http://localhost/', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({title: 'keepalive', content: 'note'}),
      }),
    )
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({title: 'keepalive', content: 'note'})
  })
})
