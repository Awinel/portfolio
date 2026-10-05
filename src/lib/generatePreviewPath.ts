const collectionPrefixMap = {
  posts: '/posts',
} as const

export function generatePreviewPath({
  collection,
  slug,
}: {
  collection: keyof typeof collectionPrefixMap
  slug?: string | null
}): string | null {
  if (!slug) return null

  const params = new URLSearchParams({
    collection,
    path: `${collectionPrefixMap[collection]}/${encodeURIComponent(slug)}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
    slug,
  })

  return `/next/preview?${params.toString()}`
}
