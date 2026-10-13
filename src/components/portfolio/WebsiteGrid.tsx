import Image from 'next/image'

import { SectionHeading } from '@/components/landing/SectionHeading'
import type { CmsMedia } from '@/lib/cms'

export type Website = {
  host: string
  href: string
  image?: CmsMedia | null
  role?: string
  stack: string[]
  summary: string
  title: string
}

export function WebsiteGrid({
  description,
  title,
  websites,
}: {
  description?: string | null
  title?: string | null
  websites?: Website[] | null
}) {
  const items = websites ?? []

  if (!title && !description && items.length === 0) return null

  return (
    <section
      aria-labelledby={title ? 'websites-heading' : undefined}
      className="scroll-mt-20 border-t border-border-dark py-12 sm:py-16 md:py-20"
      id="websites"
    >
      {title ? <SectionHeading id="websites-heading">{title}</SectionHeading> : null}

      {description ? (
        <p
          className={`max-w-xl font-body text-sm leading-relaxed text-muted sm:text-base ${title ? 'mt-5 sm:mt-6' : ''}`}
        >
          {description}
        </p>
      ) : null}

      {items.length > 0 ? (
        <div
          className={`flex flex-col gap-4 sm:gap-5 ${title || description ? 'mt-8 sm:mt-10' : ''}`}
        >
          {items.map((website) => (
            <WebsiteRow key={website.href} website={website} />
          ))}
        </div>
      ) : title || description ? (
        <p className="mt-8 max-w-lg font-body text-sm leading-relaxed text-muted sm:mt-10">
          Live sites will appear here once they are added.
        </p>
      ) : null}
    </section>
  )
}

function WebsiteRow({ website }: { website: Website }) {
  const { host, href, image, role, stack, summary, title } = website

  return (
    <a
      className="group grid overflow-hidden rounded-sm border border-border-dark bg-panel/50 transition-[border-color,box-shadow] duration-300 hover:border-zinc-500 hover:shadow-[0_4px_24px_rgba(255,255,255,0.04)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="border-b border-border-dark md:border-r md:border-b-0">
        <div className="flex items-center border-b border-border-dark bg-black/40 px-3 py-2">
          <span className="truncate font-mono text-[11px] text-zinc-500">{host}</span>
        </div>
        <div className="relative aspect-video bg-zinc-900">
          {image ? (
            <Image
              alt={image.alt || title}
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              fill
              quality={75}
              sizes="(max-width: 768px) 100vw, 560px"
              src={image.url}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 font-mono text-xs text-zinc-500">
              {host}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col p-4 sm:p-5 md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-body text-base font-medium text-ink sm:text-lg">{title}</h3>
          {role ? (
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">{role}</span>
          ) : null}
        </div>

        {summary ? (
          <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-muted">{summary}</p>
        ) : (
          <div className="flex-1" />
        )}

        {stack.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
            {stack.map((item) => (
              <li className="font-mono text-xs text-zinc-400" key={item}>
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <span className="mt-5 inline-flex w-fit items-center rounded-sm border border-border-dark bg-panel/40 px-3 py-1.5 font-body text-xs font-medium text-ink transition-colors group-hover:border-zinc-500 group-hover:text-white sm:text-sm">
          Ver en vivo
        </span>
      </div>
    </a>
  )
}
