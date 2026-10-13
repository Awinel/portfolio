import type { GlobalConfig, TextFieldSingleValidation } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidate'
import { CACHE_TAGS } from '@/lib/cacheTags'

const validateWebsiteUrl: TextFieldSingleValidation = (value) => {
  if (typeof value !== 'string' || !value.trim()) return 'Enter the live site URL'

  try {
    const url = new URL(value)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return 'Enter a URL starting with http:// or https://'
    }
  } catch {
    return 'Enter a full URL, including https://'
  }

  return true
}

export const Portfolio: GlobalConfig = {
  slug: 'portfolio',
  hooks: {
    afterChange: [
      revalidateGlobal({
        paths: [{ path: '/portfolio' }],
        tags: [CACHE_TAGS.portfolio],
      }),
    ],
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
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
          name: 'profileImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'skills',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'skillSet',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'skills',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'projects',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'projectSet',
          type: 'array',
          fields: [
            {
              name: 'projectName',
              type: 'text',
            },
            {
              name: 'projectSubheading',
              type: 'text',
            },
            {
              name: 'projectDescription',
              type: 'textarea',
            },
            {
              name: 'projectStack',
              type: 'text',
              admin: {
                description: 'eg: HTML CSS JavaScript React Next.js',
              },
            },
            {
              name: 'projectImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Cover image shown on the project card',
              },
            },
            {
              name: 'projectUrl',
              type: 'text',
              admin: {
                description: 'eg: https://www.example.com',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'websites',
      type: 'group',
      label: 'Websites',
      admin: {
        description: 'Live sites you have shipped. Each entry needs a public URL.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'websiteSet',
          type: 'array',
          labels: {
            singular: 'Website',
            plural: 'Websites',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              admin: {
                description: 'eg: Design and build',
              },
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'stack',
              type: 'text',
              admin: {
                description: 'eg: HTML CSS JavaScript React Next.js',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Screenshot of the live site',
              },
            },
            {
              name: 'url',
              type: 'text',
              label: 'Live URL',
              required: true,
              admin: {
                description: 'eg: https://www.example.com',
              },
              validate: validateWebsiteUrl,
            },
          ],
        },
      ],
    },
  ],
}
