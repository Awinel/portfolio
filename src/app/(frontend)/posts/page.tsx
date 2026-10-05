import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'

import { BlackHoleBackground } from '@/components/BlackHole'
import { DraftBanner } from '@/components/posts/DraftBanner'
import { PostList } from '@/components/posts/PostList'
import { postExcerpt } from '@/components/posts/postExcerpt'
import { RefreshRouteOnSave } from '@/components/posts/RefreshRouteOnSave'
import { getDraftPosts, getPosts } from '@/lib/cms'

export const metadata: Metadata = {
  description: 'Notes on building websites, web applications, and full-stack systems.',
  title: 'Notes',
}

export default function PostsPage() {
  return (
    <div className="relative min-h-screen text-ink">
      <BlackHoleBackground />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <header className="pb-10 pt-24 sm:pb-12 sm:pt-28 md:pt-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted animate-fade-in animate-duration-700 animate-fill-mode-both motion-reduce:animate-none">
            Posts
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-ink animate-slide-in-bottom animate-delay-200 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none sm:text-4xl md:text-5xl">
            Notes
          </h1>
        </header>

        <div className="max-w-3xl">
          <Suspense fallback={<PostListFallback />}>
            <PostsContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

async function PostsContent() {
  const { isEnabled } = await draftMode()
  const posts = isEnabled ? await getDraftPosts() : await getPosts()

  const summaries = posts
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      createdAt: post.createdAt,
      excerpt: postExcerpt(post.content),
      slug: post.slug,
      title: post.title?.trim() || 'Untitled',
    }))

  return (
    <>
      {isEnabled ? (
        <>
          <RefreshRouteOnSave />
          <DraftBanner />
        </>
      ) : null}
      <PostList posts={summaries} />
    </>
  )
}

function PostListFallback() {
  return (
    <div aria-hidden className="flex flex-col gap-4">
      {[0, 1, 2].map((item) => (
        <div
          className="h-28 animate-pulse rounded-sm border border-border-dark bg-panel/50"
          key={item}
        />
      ))}
    </div>
  )
}
