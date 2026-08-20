import { CONTACT_EMAIL, BRAND_DESCRIPTION, BRAND_TAGLINE } from './constants'

export function Hero() {
  return (
    <section className="pb-12 pt-8 sm:pb-16 sm:pt-10 md:pb-20 md:pt-14">
      <p className="max-w-2xl font-body text-xl font-medium leading-snug text-ink sm:text-2xl md:text-[2rem] md:leading-tight animate-slide-in-bottom animate-delay-400 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none">
        {BRAND_TAGLINE}
      </p>

      <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-muted sm:mt-5 sm:text-base animate-fade-in animate-delay-500 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none">
        {BRAND_DESCRIPTION}
      </p>

      <div className="mt-8 flex flex-col gap-3 animate-fade-in animate-delay-700 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <a
          className="inline-flex w-full items-center justify-center rounded-sm bg-zinc-200 px-5 py-3 font-body text-sm font-medium text-zinc-900 transition-[background-color,transform] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 active:scale-[0.98] sm:w-auto sm:py-2.5"
          href="/portfolio#projects-heading"
        >
          View projects
        </a>
        <a
          className="inline-flex w-full items-center justify-center rounded-sm border border-border-dark bg-panel/40 px-5 py-3 font-body text-sm font-medium text-ink transition-colors hover:border-zinc-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 sm:w-auto sm:py-2.5"
          href={`mailto:${CONTACT_EMAIL}`}
        >
          Start a project
        </a>
      </div>
    </section>
  )
}
