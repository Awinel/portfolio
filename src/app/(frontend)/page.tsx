import type { Metadata } from 'next'

import { BlackHoleBackground } from '@/components/BlackHole'
import { ContactStrip } from '@/components/landing/ContactStrip'
import { Hero } from '@/components/landing/Hero'
import { StackCutaway } from '@/components/landing/StackCutaway'
import { Wordmark } from '@/components/landing/Wordmark'
import { getLandingPage, getSettings, splitTokens } from '@/lib/cms'

export async function generateMetadata(): Promise<Metadata> {
  const [landing, settings] = await Promise.all([getLandingPage(), getSettings()])
  const siteTitle = settings.Title?.trim() || 'Awinel'
  const heading = landing.hero?.heading?.trim()

  return {
    description:
      landing.hero?.description?.trim() ||
      landing.hero?.subheading?.trim() ||
      'Awinel builds websites, web applications, and full-stack technology solutions for teams that need reliable digital products.',
    ...(heading && heading !== siteTitle ? { title: heading } : {}),
  }
}

export default async function HomePage() {
  const [landing, settings] = await Promise.all([getLandingPage(), getSettings()])
  const layers = (landing.systemLayers?.items ?? []).map((item) => ({
    description: item.description,
    heading: item.heading,
    id: item.id,
    stack: splitTokens(item.stack),
    subheading: item.subheading,
  }))

  return (
    <div className="relative min-h-screen text-ink">
      <BlackHoleBackground />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <Wordmark heading={landing.hero?.heading} />
        <Hero
          ctas={landing.hero?.ctas}
          description={landing.hero?.description}
          subheading={landing.hero?.subheading}
        />
        <StackCutaway items={layers} title={landing.systemLayers?.title} />
        <ContactStrip
          description={landing.contact?.description}
          email={settings.email}
          subheading={landing.contact?.subheading}
          title={landing.contact?.title}
        />
      </div>
    </div>
  )
}
