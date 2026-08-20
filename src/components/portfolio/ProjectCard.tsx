export type Project = {
  href?: string
  role?: string
  stack: string[]
  summary: string
  title: string
}

export function ProjectCard({ project }: { project: Project }) {
  const { title, summary, stack, href, role } = project

  return (
    <article className="group flex h-full flex-col rounded-sm border border-border-dark bg-panel/50 p-4 transition-[border-color,box-shadow] duration-300 hover:border-zinc-500 hover:shadow-[0_4px_24px_rgba(255,255,255,0.04)] sm:p-5 md:p-6">
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
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center rounded-sm border border-border-dark bg-panel/40 px-3 py-1.5 font-body text-xs font-medium text-ink transition-colors hover:border-zinc-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 sm:text-sm"
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            View live
          </a>
        </div>
      ) : null}
    </article>
  )
}
