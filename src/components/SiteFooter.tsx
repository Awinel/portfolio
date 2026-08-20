type SocialLink = {
  href: string
  label: string
}

export function SiteFooter({
  copyright,
  socialLinks,
}: {
  copyright?: string | null
  socialLinks?: SocialLink[]
}) {
  const links = socialLinks ?? []

  if (!copyright && links.length === 0) return null

  return (
    <footer className="relative border-t border-border-dark text-ink">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        {copyright ? (
          <p className="font-mono text-xs text-muted">{copyright}</p>
        ) : null}

        {links.length > 0 ? (
          <ul className="flex flex-wrap gap-4">
            {links.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <a
                  className="font-body text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400"
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  )
}
