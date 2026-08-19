import Image from 'next/image'

import { PERSON_BIO, PERSON_NAME, PERSON_TITLE } from './constants'

const PORTRAIT_WIDTH = 1200
const PORTRAIT_HEIGHT = 1600

export function WorkIntro() {
  return (
    <section
      aria-labelledby="work-intro-heading"
      className="pb-12 pt-24 sm:pb-16 sm:pt-28 md:pb-20 md:pt-32"
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:gap-12 xl:gap-16">
        <div className="min-w-0 md:flex md:min-h-full md:flex-col md:justify-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted animate-fade-in animate-duration-700 animate-fill-mode-both motion-reduce:animate-none">
            Portfolio
          </p>

          <h1
            className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-ink animate-slide-in-bottom animate-delay-200 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none sm:text-4xl md:text-5xl"
            id="work-intro-heading"
          >
            {PERSON_NAME}
          </h1>

          <p className="mt-3 font-mono text-sm uppercase tracking-widest text-zinc-400 animate-fade-in animate-delay-300 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none sm:mt-4">
            {PERSON_TITLE}
          </p>

          <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-muted animate-fade-in animate-delay-400 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none sm:mt-6 sm:text-base">
            {PERSON_BIO}
          </p>
        </div>

        <div className="mx-auto w-full max-w-xs animate-fade-in animate-delay-100 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none sm:max-w-sm md:mx-0 md:w-64 md:max-w-none lg:w-72 xl:w-80">
          <Image
            alt={PERSON_NAME}
            className="h-auto w-full"
            height={PORTRAIT_HEIGHT}
            priority
            quality={90}
            sizes="(max-width: 768px) 384px, (max-width: 1024px) 288px, 320px"
            src="/me.png"
            width={PORTRAIT_WIDTH}
          />
        </div>
      </div>
    </section>
  )
}
