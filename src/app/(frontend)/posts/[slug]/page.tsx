import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { BlackHoleBackground } from '@/components/BlackHole'
import { DraftBanner } from '@/components/posts/DraftBanner'
import { PostArticle } from '@/components/posts/PostArticle'
import { postExcerpt } from '@/components/posts/postExcerpt'
import { RefreshRouteOnSave } from '@/components/posts/RefreshRouteOnSave'
import { getDraftPostBySlug, getPostBySlug, getPosts } from '@/lib/cms'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  const params = posts.filter((post) => Boolean(post.slug)).map((post) => ({ slug: post.slug }))

  // Cache Components rejects an empty list; the placeholder renders the 404.
  return params.length > 0 ? params : [{ slug: '__placeholder__' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    description: postExcerpt(post.content) || undefined,
    title: post.title?.trim() || 'Untitled',
  }
}

export default function PostPage({ params }: Props) {
  return (
    <div className="relative min-h-screen text-ink">
      <BlackHoleBackground />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 md:pt-32">
        <a
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400"
          href="/posts"
        >
          <span aria-hidden>←</span> All notes
        </a>

        <div className="mt-8 sm:mt-10">
          <Suspense fallback={<ArticleFallback />}>
            <PostContent params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

async function PostContent({ params }: Props) {
  const [{ slug }, { isEnabled }] = await Promise.all([params, draftMode()])
  const post = isEnabled ? await getDraftPostBySlug(slug) : await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <>
      {isEnabled ? (
        <>
          <RefreshRouteOnSave />
          <DraftBanner />
        </>
      ) : null}
      <PostArticle post={post} />
    </>
  )
}

function ArticleFallback() {
  return (
    <div aria-hidden className="flex flex-col gap-4">
      <div className="h-3 w-24 animate-pulse rounded-sm bg-panel" />
      <div className="h-12 w-3/4 animate-pulse rounded-sm bg-panel" />
      <div className="mt-6 h-40 animate-pulse rounded-sm bg-panel/60" />
    </div>
  )
}
