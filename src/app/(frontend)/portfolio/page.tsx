import type { Metadata } from 'next'

import { BlackHoleBackground } from '@/components/BlackHole'
import { ContactStrip } from '@/components/landing/ContactStrip'
import { ProjectGrid } from '@/components/portfolio/ProjectGrid'
import { SkillGroups } from '@/components/portfolio/SkillGroups'
import { WorkIntro } from '@/components/portfolio/WorkIntro'

export const metadata: Metadata = {
  description:
    'Selected work, skills, and projects by Benjamin Antonio Huerta Torres — full-stack developer behind Awinel.',
  title: 'Work — Awinel',
}

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen text-ink">
      <BlackHoleBackground />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <WorkIntro />
        <SkillGroups />
        <ProjectGrid />
        <ContactStrip />
      </div>
    </div>
  )
}
