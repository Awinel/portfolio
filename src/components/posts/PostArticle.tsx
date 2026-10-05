import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Post } from '@/payload-types'

import { formatPostDate } from './formatPostDate'

export function PostArticle({ post }: { post: Post }) {
  return (
    <article>
      <header className="border-b border-border-dark pb-8 sm:pb-10">
        <time
          className="font-mono text-xs uppercase tracking-[0.25em] text-muted"
          dateTime={post.createdAt}
        >
          {formatPostDate(post.createdAt)}
        </time>
        <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
          {post.title || 'Untitled'}
        </h1>
      </header>

      {post.content ? (
        <RichText className="post-content mt-8 sm:mt-10" data={post.content} />
      ) : null}
    </article>
  )
}
