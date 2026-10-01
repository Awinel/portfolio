import Image from 'next/image'

import type { CmsMedia } from '@/lib/cms'

export type Project = {
  href?: string
  image?: CmsMedia | null
  role?: string
  stack: string[]
  summary: string
  title: string
}

export function ProjectCard({ project }: { project: Project }) {
  const { href, image, role, stack, summary, title } = project

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-border-dark bg-panel/50 transition-[border-color,box-shadow] duration-300 hover:border-zinc-500 hover:shadow-[0_4px_24px_rgba(255,255,255,0.04)]">
      {image ? (
        <div className="relative aspect-2/1 overflow-hidden bg-zinc-900">
          <Image
            alt={image.alt || title}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            fill
            quality={90}
            sizes="(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 560px"
            src={image.url}
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-body text-base font-medium text-ink sm:text-lg">{title}</h3>
          {role ? (
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">{role}</span>
          ) : null}
        </div>

        {summary ? (
          <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-muted">{summary}</p>
        ) : null}

        {stack.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
            {stack.map((item) => (
              <li className="font-mono text-xs text-zinc-400" key={item}>
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {href ? (
          <div className="mt-5 flex flex-wrap gap-3 justify-center">
            <a
              className="inline-flex items-center rounded-sm border border-border-dark bg-panel/40 px-3 py-1.5 font-body text-xs font-medium text-ink transition-colors hover:border-zinc-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 sm:text-sm"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              Ver en vivo
            </a>
          </div>
        ) : null}
      </div>
    </article>
  )
}
