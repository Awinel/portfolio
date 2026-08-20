export function Wordmark({ heading }: { heading?: string | null }) {
  if (!heading) return null

  return (
    <section aria-label={heading} className="relative overflow-hidden pt-24 pb-2 sm:pt-28 md:pt-32">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-ink animate-fade-in animate-duration-1000 animate-fill-mode-both motion-reduce:animate-none sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
        {heading}
      </h1>
    </section>
  )
}
