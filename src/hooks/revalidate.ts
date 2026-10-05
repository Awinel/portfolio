import { revalidatePath, revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  Payload,
  RequestContext,
} from 'payload'

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
