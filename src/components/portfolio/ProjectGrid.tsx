import { SectionHeading } from '@/components/landing/SectionHeading'

import { PROJECTS } from './constants'
import { ProjectCard } from './ProjectCard'

export function ProjectGrid() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="border-t border-border-dark py-12 sm:py-16 md:py-20"
    >
      <SectionHeading id="projects-heading">Projects</SectionHeading>

      {PROJECTS.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-8 max-w-lg font-body text-sm leading-relaxed text-muted sm:mt-10">
          Project write-ups are on the way. Check back soon, or reach out via the contact section
          below.
        </p>
      )}
    </section>
  )
}
