import { SectionHeading } from './SectionHeading'

type Layer = {
  description?: string | null
  heading?: string | null
  id?: string | null
  stack?: string[]
  subheading?: string | null
}

export function StackCutaway({
  items,
  title,
}: {
  items?: Layer[] | null
  title?: string | null
}) {
  const layers = (items ?? []).filter(
    (layer) => layer.heading || layer.subheading || layer.description || (layer.stack?.length ?? 0) > 0,
  )

  if (!title && layers.length === 0) return null

  return (
    <section
      aria-labelledby={title ? 'stack-heading' : undefined}
      className="border-t border-border-dark py-12 sm:py-16 md:py-20"
    >
      {title ? <SectionHeading id="stack-heading">{title}</SectionHeading> : null}

      {layers.length > 0 ? (
        <div className={`grid gap-4 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 ${title ? 'mt-8 sm:mt-10' : ''}`}>
          {layers.map((layer) => (
            <article
              className="group rounded-sm border border-border-dark bg-panel/50 p-4 transition-[border-color,box-shadow] duration-300 hover:border-zinc-500 hover:shadow-[0_4px_24px_rgba(255,255,255,0.04)] animate-fade-in-up timeline-view animate-range-entry motion-reduce:animate-none sm:p-5 md:p-6"
              key={layer.id ?? layer.heading}
            >
              {layer.heading ? (
                <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-ink sm:text-sm">
                  {layer.heading}
                </h3>
              ) : null}
              {layer.subheading ? (
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-zinc-500">{layer.subheading}</p>
              ) : null}
              {layer.stack && layer.stack.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                  {layer.stack.map((item) => (
                    <li className="font-mono text-xs text-zinc-400" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {layer.description ? (
                <p className="mt-3 font-body text-sm leading-relaxed text-muted sm:mt-4">{layer.description}</p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
