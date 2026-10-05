import {
  defaultEditorFeatures,
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig, slugField } from 'payload'

import { revalidatePostChange, revalidatePostDelete } from '@/hooks/revalidate'
import { generatePreviewPath } from '@/lib/generatePreviewPath'

export const Post: CollectionConfig = {
  slug: 'posts',
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { _status: { equals: 'published' } }
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => generatePreviewPath({ collection: 'posts', slug: data?.slug }),
    },
    preview: (data) => generatePreviewPath({ collection: 'posts', slug: data?.slug as string }),
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [revalidatePostChange],
    afterDelete: [revalidatePostDelete],
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 10,
  },
  fields: [
    slugField(),
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: [...defaultEditorFeatures, FixedToolbarFeature()],
      }),
    },
  ],
}
