import type { Metadata } from 'next'

import { BlackHoleBackground } from '@/components/BlackHole'
import { ProjectGrid } from '@/components/portfolio/ProjectGrid'
import { SkillGroups } from '@/components/portfolio/SkillGroups'
import { WebsiteGrid } from '@/components/portfolio/WebsiteGrid'
import { WorkIntro } from '@/components/portfolio/WorkIntro'
import { getMedia, getPortfolio, splitTokens } from '@/lib/cms'

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
  const portfolio = await getPortfolio()

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
      image: getMedia(project.projectImage),
      stack: splitTokens(project.projectStack),
      summary: project.projectDescription ?? '',
      title: project.projectName,
    }))

  const websites = (portfolio.websites?.websiteSet ?? []).flatMap((website) => {
    const href = liveUrl(website.url)
    if (!website.name || !href) return []

    return [
      {
        host: websiteHost(href),
        href,
        image: getMedia(website.image),
        role: website.role ?? undefined,
        stack: splitTokens(website.stack),
        summary: website.description ?? '',
        title: website.name,
      },
    ]
  })

  return (
    <div className="relative min-h-screen text-ink">
      <BlackHoleBackground />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <WorkIntro
          description={portfolio.hero?.description}
          heading={portfolio.hero?.heading}
          image={getMedia(portfolio.hero?.profileImage)}
          subheading={portfolio.hero?.subheading}
          title={portfolio.hero?.title}
        />
        <SkillGroups groups={skillGroups} title={portfolio.skills?.title} />
        <ProjectGrid projects={projects} title={portfolio.projects?.title} />
        <WebsiteGrid
          description={portfolio.websites?.description}
          title={portfolio.websites?.title}
          websites={websites}
        />
      </div>
    </div>
  )
}

function liveUrl(value?: string | null) {
  if (!value) return null

  try {
    const url = new URL(value)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    return url.toString()
  } catch {
    return null
  }
}

function websiteHost(href: string) {
  return new URL(href).host.replace(/^www\./, '')
}
