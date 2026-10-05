import { Big_Shoulders, IBM_Plex_Mono, Source_Sans_3 } from 'next/font/google'
import type { Metadata } from 'next'
import React from 'react'

import { ContactStrip } from '@/components/landing/ContactStrip'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getLandingPage, getMedia, getSettings } from '@/lib/cms'
import './styles.css'

const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  variable: '--font-big-shoulders',
  weight: ['600', '700'],
  adjustFontFallback: false,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500'],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const siteTitle = settings.Title?.trim() || 'Awinel'

  return {
    description:
      'Awinel builds websites, web applications, and full-stack technology solutions for teams that need reliable digital products.',
    title: {
      default: siteTitle,
      template: `%s — ${siteTitle}`,
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const [settings, landing] = await Promise.all([getSettings(), getLandingPage()])
  const links = (settings.nav?.links ?? [])
    .filter((link): link is { href: string; label: string; id?: string | null } =>
      Boolean(link.href && link.label),
    )
    .map((link) => ({ href: link.href, label: link.label }))
  const socialLinks = (settings.footer?.socialLinks ?? [])
    .filter((link): link is { href: string; label: string; id?: string | null } =>
      Boolean(link.href && link.label),
    )
    .map((link) => ({ href: link.href, label: link.label }))

  return (
    <html
      className={`${bigShoulders.variable} ${sourceSans.variable} ${ibmPlexMono.variable}`}
      lang="en"
    >
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="min-h-screen bg-black font-body antialiased">
        <SiteHeader links={links} logo={getMedia(settings.logo)} title={settings.Title} />
        <main>
          {children}
          <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
            <ContactStrip
              description={landing.contact?.description}
              email={settings.email}
              subheading={landing.contact?.subheading}
              title={landing.contact?.title}
            />
          </div>
        </main>
        <SiteFooter copyright={settings.footer?.copyright} socialLinks={socialLinks} />
      </body>
    </html>
  )
}
