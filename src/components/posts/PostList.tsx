import { formatPostDate } from './formatPostDate'

export type PostSummary = {
  createdAt: string
  excerpt: string
  slug: string
  title: string
}

export function PostList({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-sm border border-border-dark bg-panel/50 p-5 font-body text-sm text-muted sm:p-6">
        No notes published yet.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => (
        <li key={post.slug}>
          <a
            className="group block rounded-sm border border-border-dark bg-panel/50 p-5 transition-[border-color,box-shadow] duration-300 hover:border-zinc-500 hover:shadow-[0_4px_24px_rgba(255,255,255,0.04)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 sm:p-6"
            href={`/posts/${post.slug}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-body text-base font-medium text-ink transition-colors group-hover:text-white sm:text-lg">
                {post.title}
              </h2>
              <time
                className="font-mono text-xs uppercase tracking-wider text-zinc-500"
                dateTime={post.createdAt}
              >
                {formatPostDate(post.createdAt)}
              </time>
            </div>
            {post.excerpt ? (
              <p className="mt-3 font-body text-sm leading-relaxed text-muted">{post.excerpt}</p>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  )
}
