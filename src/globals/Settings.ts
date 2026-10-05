import type { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidate'
import { CACHE_TAGS } from '@/lib/cacheTags'

export const Settings: GlobalConfig = {
  slug: 'settings',
  hooks: {
    afterChange: [
      revalidateGlobal({
        paths: [{ path: '/', type: 'layout' }],
        tags: [CACHE_TAGS.settings],
      }),
    ],
  },
  fields: [
    {
      name: 'Title',
      type: 'text',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'nav',
      type: 'group',
      fields: [
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
            },
            {
              name: 'href',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'copyright',
          type: 'text',
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
            },
            {
              name: 'href',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
