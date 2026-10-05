import type { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidate'
import { CACHE_TAGS } from '@/lib/cacheTags'

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  hooks: {
    afterChange: [
      revalidateGlobal({
        paths: [{ path: '/' }, { path: '/portfolio' }],
        tags: [CACHE_TAGS.landingPage],
      }),
    ],
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'subheading',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'ctas',
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
            {
              name: 'style',
              type: 'select',
              options: ['primary', 'secondary'],
            },
          ],
        },
      ],
    },
    {
      name: 'systemLayers',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'subheading',
              type: 'text',
            },
            {
              name: 'stack',
              type: 'text',
              admin: {
                description: 'eg: HTML CSS JavaScript React Next.js',
              },
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'subheading',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
