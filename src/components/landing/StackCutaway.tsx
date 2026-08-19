import { STACK_LAYERS } from './constants'
import { SectionHeading } from './SectionHeading'

export function StackCutaway() {
  return (
    <section
      aria-labelledby="stack-heading"
      className="border-t border-border-dark py-12 sm:py-16 md:py-20"
    >
      <SectionHeading id="stack-heading">System cutaway</SectionHeading>

      <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
        {STACK_LAYERS.map((layer) => (
          <article
            className="group rounded-sm border border-border-dark bg-panel/50 p-4 transition-[border-color,box-shadow] duration-300 hover:border-zinc-500 hover:shadow-[0_4px_24px_rgba(255,255,255,0.04)] animate-fade-in-up timeline-view animate-range-entry motion-reduce:animate-none sm:p-5 md:p-6"
            key={layer.label}
          >
            <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-ink sm:text-sm">
              {layer.label}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {layer.items.map((item) => (
                <li className="font-mono text-xs text-zinc-400" key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted sm:mt-4">
              {layer.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
