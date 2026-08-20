import { SectionHeading } from './SectionHeading'

export function ContactStrip({
  description,
  email,
  subheading,
  title,
}: {
  description?: string | null
  email?: string | null
  subheading?: string | null
  title?: string | null
}) {
  if (!title && !subheading && !description && !email) return null

  return (
    <section
      aria-labelledby={title ? 'contact-heading' : undefined}
      className="scroll-mt-[4.25rem] border-t border-border-dark py-12 sm:scroll-mt-24 sm:py-16 md:py-20"
      id="contact"
    >
      <div className="rounded-sm border border-border-dark bg-panel/50 p-5 sm:p-6 md:p-8">
        {title ? <SectionHeading id="contact-heading">{title}</SectionHeading> : null}

        {subheading ? (
          <p className={`max-w-lg font-mono text-xs uppercase tracking-widest text-zinc-400 ${title ? 'mt-5 sm:mt-6' : ''}`}>
            {subheading}
          </p>
        ) : null}

        {description ? (
          <p
            className={`max-w-lg font-body text-sm leading-relaxed text-muted ${title || subheading ? 'mt-5 sm:mt-6' : ''} sm:text-base`}
          >
            {description}
          </p>
        ) : null}

        {email ? (
          <a
            className={`inline-flex max-w-full break-all font-mono text-xs text-zinc-300 underline decoration-zinc-500 decoration-2 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 ${title || subheading || description ? 'mt-5 sm:mt-6' : ''} sm:text-sm`}
            href={`mailto:${email}`}
          >
            {email}
          </a>
        ) : null}
      </div>
    </section>
  )
}
