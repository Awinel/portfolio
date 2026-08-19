export const CONTACT_EMAIL = 'awinel.dev@gmail.com'

export const BRAND_TAGLINE = 'Websites and web apps, built as one system.'

export const BRAND_DESCRIPTION =
  'Awinel designs and ships websites, web applications, and the technology behind them — from interface to infrastructure.'

export const STACK_LAYERS = [
  {
    label: 'Interface',
    items: ['React', 'Next.js', 'Tailwind'],
    description:
      'Websites and product UIs with design systems that stay consistent as your business grows.',
  },
  {
    label: 'Contract',
    items: ['Node.js', 'Payload', 'APIs'],
    description:
      'Application logic, CMS schemas, and API layers that keep your frontend and backend aligned.',
  },
  {
    label: 'Store',
    items: ['Postgres', 'MongoDB'],
    description: 'Data models and storage chosen for your workload, not the trend.',
  },
] as const
