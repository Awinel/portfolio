import { SectionHeading } from '@/components/landing/SectionHeading'

type SkillGroup = {
  description?: string | null
  id?: string | null
  items: string[]
  name?: string | null
}

export function SkillGroups({
  groups,
  title,
}: {
  groups?: SkillGroup[] | null
  title?: string | null
}) {
  const skillGroups = (groups ?? []).filter(
    (group) => group.name || group.description || group.items.length > 0,
  )

  if (!title && skillGroups.length === 0) return null

  return (
    <section
      aria-labelledby={title ? 'skills-heading' : undefined}
      className="border-t border-border-dark py-12 sm:py-16 md:py-20"
    >
      {title ? <SectionHeading id="skills-heading">{title}</SectionHeading> : null}

      {skillGroups.length > 0 ? (
        <div className={`grid gap-4 sm:gap-5 sm:grid-cols-2 ${title ? 'mt-8 sm:mt-10' : ''}`}>
          {skillGroups.map((group) => (
            <article
              className="group rounded-sm border border-border-dark bg-panel/50 p-4 transition-[border-color,box-shadow] duration-300 hover:border-zinc-500 hover:shadow-[0_4px_24px_rgba(255,255,255,0.04)] animate-fade-in-up timeline-view animate-range-entry motion-reduce:animate-none sm:p-5 md:p-6"
              key={group.id ?? group.name}
            >
              {group.name ? (
                <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-ink sm:text-sm">
                  {group.name}
                </h3>
              ) : null}
              {group.description ? (
                <p className="mt-2 font-body text-sm leading-relaxed text-muted">{group.description}</p>
              ) : null}
              {group.items.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                  {group.items.map((item) => (
                    <li className="font-mono text-xs text-zinc-400" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
