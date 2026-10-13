import type { CollectionConfig } from 'payload'

import { revalidateCollection } from '@/hooks/revalidate'
import { CACHE_TAGS } from '@/lib/cacheTags'

const { afterChange, afterDelete } = revalidateCollection({
  paths: [{ path: '/', type: 'layout' }, { path: '/portfolio' }],
  tags: [CACHE_TAGS.settings, CACHE_TAGS.landingPage, CACHE_TAGS.portfolio],
})

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'card', width: 1200, height: 600, position: 'center' },
      { name: 'portrait', width: 800 },
    ],
    adminThumbnail: 'card',
  },
}
