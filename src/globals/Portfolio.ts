import type { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidate'

export const Portfolio: GlobalConfig = {
  slug: 'portfolio',
  hooks: {
    afterChange: [revalidateGlobal([{ path: '/portfolio' }])],
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
  ],
}
