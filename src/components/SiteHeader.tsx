'use client'

import { useState } from 'react'

import { AwinelLogo } from '@/components/AwinelLogo'
import type { CmsMedia } from '@/lib/cms'

export type NavLink = {
  href: string
  label: string
}

const DEFAULT_NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Work' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader({
  links,
  logo,
  title,
}: {
  links?: NavLink[]
  logo?: CmsMedia | null
  title?: string | null
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navLinks = links && links.length > 0 ? links : DEFAULT_NAV_LINKS
  const brand = title?.trim() || 'Awinel'

  return (
    <>
      <div
        aria-hidden
        className="nav-scroll-blur pointer-events-none fixed top-0 right-0 left-0 z-40 h-[4.25rem] sm:h-24"
      />

      <header className="glass-nav fixed top-0 right-0 left-0 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.22)]">
        <div
          aria-hidden
          className="absolute inset-0 backdrop-blur-2xl supports-[backdrop-filter]:backdrop-blur-3xl"
        />
        <div aria-hidden className="absolute inset-0 bg-white/10" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/15" />

        <nav
          aria-label="Primary"
          className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5"
        >
          <a
            className="flex min-w-0 items-center gap-2 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 sm:gap-3"
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            <AwinelLogo
              alt={logo?.alt ?? brand}
              height={logo?.height}
              size="header"
              src={logo?.url}
              width={logo?.width}
            />
            <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.2em] text-zinc-100 sm:inline">
              {brand}
            </span>
          </a>

          <ul className="hidden items-center gap-6 md:flex md:gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={`${label}-${href}`}>
                <a
                  className="group relative font-body text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400"
                  href={href}
                >
                  {label}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-full"
                  />
                </a>
              </li>
            ))}
          </ul>

          <button
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            className="inline-flex items-center justify-center rounded-sm border border-white/15 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-zinc-200 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </nav>

        {menuOpen ? (
          <div
            className="relative border-t border-white/10 px-4 py-4 sm:px-6 md:hidden"
            id="mobile-nav"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <li key={`${label}-${href}`}>
                  <a
                    className="block rounded-sm px-3 py-2.5 font-body text-sm text-zinc-200 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400"
                    href={href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </header>
    </>
  )
}
