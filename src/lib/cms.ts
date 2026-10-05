import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

import { CACHE_TAGS, postTag } from '@/lib/cacheTags'
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

async function findPosts(draft: boolean) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    draft,
    limit: 100,
    pagination: false,
    sort: '-createdAt',
    where: draft ? undefined : { _status: { equals: 'published' } },
  })
  return docs
}

async function findPostBySlug(slug: string, draft: boolean) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    draft,
    limit: 1,
    pagination: false,
    where: draft
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
  })
  return docs[0] ?? null
}

export async function getPosts() {
  'use cache'
  cacheTag(CACHE_TAGS.posts)
  cacheLife('max')
  return findPosts(false)
}

export async function getPostBySlug(slug: string) {
  'use cache'
  cacheTag(CACHE_TAGS.posts, postTag(slug))
  cacheLife('max')
  return findPostBySlug(slug, false)
}

export function getDraftPosts() {
  return findPosts(true)
}

export function getDraftPostBySlug(slug: string) {
  return findPostBySlug(slug, true)
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
