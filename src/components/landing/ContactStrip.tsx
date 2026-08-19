import { CONTACT_EMAIL } from './constants'
import { SectionHeading } from './SectionHeading'

export function ContactStrip() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="scroll-mt-[4.25rem] border-t border-border-dark py-12 sm:scroll-mt-24 sm:py-16 md:py-20"
      id="contact"
    >
      <div className="rounded-sm border border-border-dark bg-panel/50 p-5 sm:p-6 md:p-8">
        <SectionHeading id="contact-heading">Contact</SectionHeading>

        <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
          Tell us what you are building — a marketing site, a web app, or a full product stack.
          Awinel will reply with next steps.
        </p>

        <a
          className="mt-5 inline-flex max-w-full break-all font-mono text-xs text-zinc-300 underline decoration-zinc-500 decoration-2 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 sm:mt-6 sm:text-sm"
          href={`mailto:${CONTACT_EMAIL}`}
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </section>
  )
}
