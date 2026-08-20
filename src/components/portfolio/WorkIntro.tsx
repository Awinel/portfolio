import Image from 'next/image'

import type { CmsMedia } from '@/lib/cms'

const FALLBACK_WIDTH = 1200
const FALLBACK_HEIGHT = 1600

export function WorkIntro({
  description,
  heading,
  image,
  subheading,
  title,
}: {
  description?: string | null
  heading?: string | null
  image?: CmsMedia | null
  subheading?: string | null
  title?: string | null
}) {
  const portrait = image ?? {
    alt: heading || 'Portrait',
    height: FALLBACK_HEIGHT,
    url: '/me.png',
    width: FALLBACK_WIDTH,
  }

  if (!title && !heading && !subheading && !description && !image) return null

  return (
    <section
      aria-labelledby={heading ? 'work-intro-heading' : undefined}
      className="pb-12 pt-24 sm:pb-16 sm:pt-28 md:pb-20 md:pt-32"
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:gap-12 xl:gap-16">
        <div className="min-w-0 md:flex md:min-h-full md:flex-col md:justify-center">
          {title ? (
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted animate-fade-in animate-duration-700 animate-fill-mode-both motion-reduce:animate-none">
              {title}
            </p>
          ) : null}

          {heading ? (
            <h1
              className={`font-display text-3xl font-bold uppercase tracking-wide text-ink animate-slide-in-bottom animate-delay-200 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none sm:text-4xl md:text-5xl ${title ? 'mt-4' : ''}`}
              id="work-intro-heading"
            >
              {heading}
            </h1>
          ) : null}

          {subheading ? (
            <p
              className={`font-mono text-sm uppercase tracking-widest text-zinc-400 animate-fade-in animate-delay-300 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none ${heading || title ? 'mt-3 sm:mt-4' : ''}`}
            >
              {subheading}
            </p>
          ) : null}

          {description ? (
            <p
              className={`max-w-xl font-body text-sm leading-relaxed text-muted animate-fade-in animate-delay-400 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none sm:text-base ${heading || title || subheading ? 'mt-5 sm:mt-6' : ''}`}
            >
              {description}
            </p>
          ) : null}
        </div>

        <div className="mx-auto w-full max-w-xs animate-fade-in animate-delay-100 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none sm:max-w-sm md:mx-0 md:w-64 md:max-w-none lg:w-72 xl:w-80">
          <Image
            alt={portrait.alt}
            className="h-auto w-full"
            height={portrait.height}
            priority
            quality={90}
            sizes="(max-width: 768px) 384px, (max-width: 1024px) 288px, 320px"
            src={portrait.url}
            width={portrait.width}
          />
        </div>
      </div>
    </section>
  )
}
