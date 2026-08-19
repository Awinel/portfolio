export type Project = {
  title: string
  summary: string
  stack: string[]
  href?: string
  repo?: string
  role?: string
}

export const PERSON_NAME = 'Benjamin Antonio Huerta Torres'

export const PERSON_TITLE = 'Full Stack Web Developer'

export const PERSON_BIO =
  'Benjamin builds and ships the websites, web applications, and full-stack systems behind Awinel — from interface to infrastructure.'

export const SKILL_GROUPS = [
  {
    label: 'Interface',
    items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind', 'HTML', 'CSS'],
  },
  {
    label: 'Contract',
    items: ['Node.js', 'PayloadCMS'],
  },
  {
    label: 'Store',
    items: ['MongoDB', 'PostgreSQL'],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'MCP', 'N8N', 'A/B Testing'],
  },
] as const

/** Add entries here as you ship new work — one object per project card. */
export const PROJECTS: Project[] = [
  {
    title: 'Awinel',
    summary:
      'Portfolio and landing site for Awinel — Next.js frontend, Payload CMS admin, Vercel Postgres, and Blob storage in one cohesive stack.',
    stack: ['Next.js', 'Payload CMS', 'Tailwind', 'PostgreSQL', 'Vercel Blob'],
    role: 'Full Stack Developer',
  },
]
