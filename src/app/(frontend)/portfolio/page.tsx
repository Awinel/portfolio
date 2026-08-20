import type { Metadata } from 'next'

import { BlackHoleBackground } from '@/components/BlackHole'
import { ContactStrip } from '@/components/landing/ContactStrip'
import { ProjectGrid } from '@/components/portfolio/ProjectGrid'
import { SkillGroups } from '@/components/portfolio/SkillGroups'
import { WorkIntro } from '@/components/portfolio/WorkIntro'
import { getLandingPage, getMedia, getPortfolio, getSettings, splitTokens } from '@/lib/cms'

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolio()

  return {
    description:
      portfolio.hero?.description?.trim() ||
      'Selected work, skills, and projects — full-stack developer behind Awinel.',
    title: portfolio.hero?.title?.trim() || 'Work',
  }
}

export default async function PortfolioPage() {
  const [portfolio, landing, settings] = await Promise.all([
    getPortfolio(),
    getLandingPage(),
    getSettings(),
  ])

  const skillGroups = (portfolio.skills?.skillSet ?? []).map((group) => ({
    description: group.description,
    id: group.id,
    items: splitTokens(group.skills),
    name: group.name,
  }))

  const projects = (portfolio.projects?.projectSet ?? [])
    .filter((project): project is typeof project & { projectName: string } =>
      Boolean(project.projectName),
    )
    .map((project) => ({
      href: project.projectUrl ?? undefined,
      role: project.projectSubheading ?? undefined,
      stack: splitTokens(project.projectStack),
      summary: project.projectDescription ?? '',
      title: project.projectName,
    }))

  return (
    <div className="relative min-h-screen text-ink">
      <BlackHoleBackground />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <WorkIntro
          description={portfolio.hero?.description}
          heading={portfolio.hero?.heading}
          image={getMedia(portfolio.hero?.profileImage)}
          subheading={portfolio.hero?.subheading}
          title={portfolio.hero?.title}
        />
        <SkillGroups groups={skillGroups} title={portfolio.skills?.title} />
        <ProjectGrid projects={projects} title={portfolio.projects?.title} />
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
