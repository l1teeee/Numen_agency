import { expect, it, vi } from 'vitest'
import { GET } from '@/app/api/project-status/route'
import { MONITORED_URLS } from '@/lib/project-status'

it('reports a project online only when its URL answers with a success status', async () => {
  const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input)
    if (url === MONITORED_URLS[0]) return new Response(null, { status: 200 })
    if (url === MONITORED_URLS[1]) throw new TypeError('fetch failed')
    return new Response(null, { status: 503 })
  })
  vi.stubGlobal('fetch', fetchMock)

  const res = await GET()

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual(
    Object.fromEntries(MONITORED_URLS.map((url, index) => [url, index === 0])),
  )
  expect(fetchMock).toHaveBeenCalledTimes(MONITORED_URLS.length)
})
