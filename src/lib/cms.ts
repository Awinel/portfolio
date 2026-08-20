import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Media } from '@/payload-types'

const getPayloadClient = cache(async () => getPayload({ config }))

export const getSettings = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'settings', depth: 1 })
})

export const getLandingPage = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'landing-page', depth: 1 })
})

export const getPortfolio = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'portfolio', depth: 1 })
})

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
