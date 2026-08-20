type Cta = {
  href?: string | null
  id?: string | null
  label?: string | null
  style?: 'primary' | 'secondary' | null
}

const primaryClassName =
  'inline-flex w-full items-center justify-center rounded-sm bg-zinc-200 px-5 py-3 font-body text-sm font-medium text-zinc-900 transition-[background-color,transform] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 active:scale-[0.98] sm:w-auto sm:py-2.5'

const secondaryClassName =
  'inline-flex w-full items-center justify-center rounded-sm border border-border-dark bg-panel/40 px-5 py-3 font-body text-sm font-medium text-ink transition-colors hover:border-zinc-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 sm:w-auto sm:py-2.5'

export function Hero({
  ctas,
  description,
  subheading,
}: {
  ctas?: Cta[] | null
  description?: string | null
  subheading?: string | null
}) {
  const visibleCtas = (ctas ?? []).filter(
    (cta): cta is Cta & { href: string; label: string } => Boolean(cta.label && cta.href),
  )

  if (!subheading && !description && visibleCtas.length === 0) return null

  return (
    <section className="pb-12 pt-8 sm:pb-16 sm:pt-10 md:pb-20 md:pt-14">
      {subheading ? (
        <p className="max-w-2xl font-body text-xl font-medium leading-snug text-ink sm:text-2xl md:text-[2rem] md:leading-tight animate-slide-in-bottom animate-delay-400 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none">
          {subheading}
        </p>
      ) : null}

      {description ? (
        <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-muted sm:mt-5 sm:text-base animate-fade-in animate-delay-500 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none">
          {description}
        </p>
      ) : null}

      {visibleCtas.length > 0 ? (
        <div className="mt-8 flex flex-col gap-3 animate-fade-in animate-delay-700 animate-duration-700 animate-fill-mode-both motion-reduce:animate-none sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          {visibleCtas.map((cta) => (
            <a
              className={cta.style === 'secondary' ? secondaryClassName : primaryClassName}
              href={cta.href}
              key={cta.id ?? `${cta.label}-${cta.href}`}
            >
              {cta.label}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  )
}
