import { SectionHeading } from '@/components/landing/SectionHeading'

import { ProjectCard, type Project } from './ProjectCard'

export function ProjectGrid({
  projects,
  title,
}: {
  projects?: Project[] | null
  title?: string | null
}) {
  const items = projects ?? []

  if (!title && items.length === 0) return null

  return (
    <section
      aria-labelledby={title ? 'projects-heading' : undefined}
      className="border-t border-border-dark py-12 sm:py-16 md:py-20"
    >
      {title ? <SectionHeading id="projects-heading">{title}</SectionHeading> : null}

      {items.length > 0 ? (
        <div className={`grid gap-4 sm:gap-5 sm:grid-cols-2 ${title ? 'mt-8 sm:mt-10' : ''}`}>
          {items.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      ) : title ? (
        <p className="mt-8 max-w-lg font-body text-sm leading-relaxed text-muted sm:mt-10">
          Project write-ups are on the way. Check back soon, or reach out via the contact section
          below.
        </p>
      ) : null}
    </section>
  )
}
