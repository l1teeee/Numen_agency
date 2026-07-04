import { NextResponse } from 'next/server'
import { MONITORED_URLS } from '@/lib/project-status'

const TIMEOUT_MS = 6000

async function isOnline(url: string): Promise<boolean> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NumenStatusCheck/1.0)' },
    })
    return res.ok
  } catch {
    return false
  } finally {
    clearTimeout(timeout)
  }
}

export async function GET() {
  const entries = await Promise.all(
    MONITORED_URLS.map(async (url) => [url, await isOnline(url)] as const)
  )
  return NextResponse.json(Object.fromEntries(entries))
}
