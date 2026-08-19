import { Big_Shoulders, IBM_Plex_Mono, Source_Sans_3 } from 'next/font/google'
import React from 'react'

import { SiteHeader } from '@/components/SiteHeader'
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

export const metadata = {
  description:
    'Awinel builds websites, web applications, and full-stack technology solutions for teams that need reliable digital products.',
  title: 'Awinel — Websites & web applications',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      className={`${bigShoulders.variable} ${sourceSans.variable} ${ibmPlexMono.variable}`}
      lang="en"
    >
      <body className="min-h-screen bg-black font-body antialiased">
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  )
}
