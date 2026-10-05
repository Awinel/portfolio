import config from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'

const PREVIEWABLE = {
  posts: '/posts/',
} as const

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = request.nextUrl
  const collection = searchParams.get('collection')
  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')
  const slug = searchParams.get('slug')

  if (!process.env.PREVIEW_SECRET || previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!collection || !(collection in PREVIEWABLE) || !slug || !path) {
    return new Response('Missing or invalid preview parameters', { status: 400 })
  }

  const prefix = PREVIEWABLE[collection as keyof typeof PREVIEWABLE]
  if (!path.startsWith(prefix) || path.startsWith('//')) {
    return new Response('Preview path must point to this site', { status: 400 })
  }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })

  if (!user) {
    return new Response('Log in to the admin panel to preview drafts', { status: 403 })
  }

  const { docs } = await payload.find({
    collection: collection as keyof typeof PREVIEWABLE,
    depth: 0,
    draft: true,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    user,
    where: { slug: { equals: slug } },
  })

  if (docs.length === 0) {
    return new Response('Document not found', { status: 404 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
