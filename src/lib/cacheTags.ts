export const CACHE_TAGS = {
  landingPage: 'global_landing-page',
  portfolio: 'global_portfolio',
  posts: 'collection_posts',
  settings: 'global_settings',
} as const

export function postTag(slug: string) {
  return `${CACHE_TAGS.posts}:${slug}`
}
