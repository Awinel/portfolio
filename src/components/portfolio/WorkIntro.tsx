import Image from 'next/image'

import type { CmsMedia } from '@/lib/cms'

const primaryClassName =
  'inline-flex w-full items-center justify-center rounded-sm bg-zinc-200 px-5 py-3 font-body text-sm font-medium text-zinc-900 transition-[background-color,transform] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 active:scale-[0.98] sm:w-auto sm:py-2.5'

const secondaryClassName =
  'inline-flex w-full items-center justify-center rounded-sm border border-border-dark bg-panel/40 px-5 py-3 font-body text-sm font-medium text-ink transition-colors hover:border-zinc-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 sm:w-auto sm:py-2.5'

const FALLBACK_WIDTH = 1200
const FALLBACK_HEIGHT = 1600

export function WorkIntro({
  ctas,
  description,
  heading,
  image,
  subheading,
  title,
}: {
  ctas?: { label: string; href: string; style: 'primary' | 'secondary' }[] | null
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

  if (!title && !heading && !subheading && !description && !image && !ctas) return null

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
          {ctas ? (
            <div className="mt-8 flex flex-col gap-3 animate-fade-in animate-delay-700 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {ctas.map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  className={cta.style === 'primary' ? primaryClassName : secondaryClassName}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mx-auto w-full max-w-xs animate-fade-in animate-delay-100 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none sm:max-w-sm md:mx-0 md:w-64 md:max-w-none lg:w-72 xl:w-80">
          <Image
            alt={portrait.alt}
            className="h-auto w-full"
            height={portrait.height}
            priority
            quality={75}
            sizes="(max-width: 768px) 384px, (max-width: 1024px) 288px, 320px"
            src={portrait.url}
            width={portrait.width}
          />
        </div>
      </div>
    </section>
  )
}
