import { revalidatePath, revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  Payload,
  RequestContext,
} from 'payload'

import { CACHE_TAGS, postTag } from '@/lib/cacheTags'
import type { Post } from '@/payload-types'

type RevalidateTargets = {
  paths: Array<{ path: string; type?: 'layout' | 'page' }>
  tags: string[]
}

function revalidate(
  { paths, tags }: RevalidateTargets,
  { context, payload }: { context: RequestContext; payload: Payload },
) {
  if (context.disableRevalidate) return

  for (const tag of tags) {
    payload.logger.info(`Revalidating tag ${tag}`)
    revalidateTag(tag, { expire: 0 })
  }

  for (const { path, type } of paths) {
    payload.logger.info(`Revalidating path ${path}`)
    if (type) {
      revalidatePath(path, type)
    } else {
      revalidatePath(path)
    }
  }
}

export function revalidateGlobal(targets: RevalidateTargets): GlobalAfterChangeHook {
  return ({ doc, req: { context, payload } }) => {
    revalidate(targets, { context, payload })
    return doc
  }
}

type PostLike = Pick<Post, '_status' | 'id' | 'slug'>

function postTargets(slugs: Array<string | null | undefined>): RevalidateTargets {
  const unique = [...new Set(slugs.filter((slug): slug is string => Boolean(slug)))]
  return {
    paths: [{ path: '/posts' }, ...unique.map((slug) => ({ path: `/posts/${slug}` }))],
    tags: [CACHE_TAGS.posts, ...unique.map(postTag)],
  }
}

export const revalidatePostChange: CollectionAfterChangeHook<PostLike> = ({
  doc,
  previousDoc,
  req: { context, payload },
}) => {
  const isPublished = doc._status === 'published'
  const wasPublished = previousDoc?._status === 'published'
  if (!isPublished && !wasPublished) return doc

  revalidate(postTargets([doc.slug, previousDoc?.slug]), { context, payload })
  return doc
}

export const revalidatePostDelete: CollectionAfterDeleteHook<PostLike> = ({
  doc,
  req: { context, payload },
}) => {
  revalidate(postTargets([doc?.slug]), { context, payload })
  return doc
}

export function revalidateCollection(targets: RevalidateTargets): {
  afterChange: CollectionAfterChangeHook
  afterDelete: CollectionAfterDeleteHook
} {
  return {
    afterChange: ({ doc, req: { context, payload } }) => {
      revalidate(targets, { context, payload })
      return doc
    },
    afterDelete: ({ doc, req: { context, payload } }) => {
      revalidate(targets, { context, payload })
      return doc
    },
  }
}
