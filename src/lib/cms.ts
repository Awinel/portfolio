import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

import { CACHE_TAGS } from '@/lib/cacheTags'
import type { Media } from '@/payload-types'

export async function getSettings() {
  'use cache'
  cacheTag(CACHE_TAGS.settings)
  cacheLife('max')
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'settings', depth: 1 })
}

export async function getLandingPage() {
  'use cache'
  cacheTag(CACHE_TAGS.landingPage)
  cacheLife('max')
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'landing-page', depth: 1 })
}

export async function getPortfolio() {
  'use cache'
  cacheTag(CACHE_TAGS.portfolio)
  cacheLife('max')
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'portfolio', depth: 1 })
}

export function splitTokens(value?: string | null): string[] {
  if (!value) return []
  return value.trim().split(/\s+/).filter(Boolean)
}

export type CmsMedia = {
  alt: string
  height: number
  url: string
  width: number
}

export function getMedia(value: number | Media | null | undefined): CmsMedia | null {
  if (!value || typeof value !== 'object' || !value.url) return null

  return {
    alt: value.alt,
    height: value.height ?? 1,
    url: value.url,
    width: value.width ?? 1,
  }
}
