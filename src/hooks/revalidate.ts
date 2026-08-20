import { revalidatePath } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

export function revalidateGlobal(
  paths: Array<{ path: string; type?: 'layout' | 'page' }>,
): GlobalAfterChangeHook {
  return ({ doc, req: { context, payload } }) => {
    if (context.disableRevalidate) return doc

    for (const { path, type } of paths) {
      payload.logger.info(`Revalidating path ${path}`)
      if (type) {
        revalidatePath(path, type)
      } else {
        revalidatePath(path)
      }
    }

    return doc
  }
}
