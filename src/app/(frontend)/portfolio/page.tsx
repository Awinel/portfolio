'use client'

import { Gear } from '@/components/Gear'
import { GearMesh } from '@/components/GearMesh'
import { Meter } from '@/components/Meter'
import { PaperCard } from '@/components/PaperCard'
import { PipeCard } from '@/components/PipeCard'
import { Steam } from '@/components/Steam'

const SKILLS = [
  { name: 'JavaScript', level: 5 },
  { name: 'TypeScript', level: 5 },
  { name: 'React', level: 5 },
  { name: 'Next.js', level: 4 },
  { name: 'Node.js', level: 4 },
  { name: 'MongoDB', level: 3 },
  { name: 'PostgreSQL', level: 4 },
  { name: 'Tailwind', level: 5 },
  { name: 'HTML', level: 5 },
  { name: 'CSS', level: 5 },
  { name: 'Git', level: 4 },
  { name: 'GitHub', level: 4 },
  { name: 'MCP', level: 3 },
  { name: 'N8N', level: 2 },
  { name: 'PayloadCMS', level: 3 },
  { name: 'A/B Testing', level: 2 },
] as const

function GearStack({ side }: { side: 'left' | 'right' }) {
  const isRight = side === 'right'

  return (
    <GearMesh>
      <div
        className={`pointer-events-none absolute top-full z-10 w-52 -translate-y-8 ${
          isRight ? '-right-23' : '-left-23'
        }`}
      >
        <Gear className={`pointer-events-auto absolute z-10 ${isRight ? 'right-0' : 'left-0'}`} />
        <Gear
          className={`pointer-events-auto absolute top-22 z-20 ${isRight ? 'right-15' : 'left-15'}`}
          inverted
        />
        <Gear
          className={`pointer-events-auto absolute top-44 z-10 ${isRight ? 'right-0' : 'left-0'}`}
        />
      </div>
    </GearMesh>
  )
}

export default function PortfolioPage() {
  return (
    <div className="overflow-hidden bg-zinc-800">
      <PipeCard title="Portfolio">
        <div className="relative">
          <PaperCard>
            <h1 className="text-2xl font-bold text-[#88540B]">Benjamin Antonio Huerta Torres</h1>
            <h2 className="text-lg font-bold text-[#88540B]">Full Stack Web Developer</h2>
            <p>
              I am a full stack web developer with a passion for creating beautiful and functional
              websites.
            </p>
          </PaperCard>
          <GearStack side="left" />
        </div>

        <div className="relative mt-15">
          <PaperCard className="mb-4">
            <h2 className="text-lg font-bold text-[#88540B] p-5 text-center">Skills</h2>
          </PaperCard>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {SKILLS.map((skill) => (
              <PaperCard key={skill.name} className="p-3">
                <div className="group flex flex-col items-center gap-2 text-center">
                  <h3 className="text-sm font-semibold text-[#88540B]">{skill.name}</h3>
                  <h4 className="text-sm font-semibold text-gray-500">
                    Skill Level: {skill.level}
                  </h4>
                  <div className="flex items-end justify-center gap-1">
                    <Steam variant={skill.level} />
                    <Meter level={skill.level} />
                  </div>
                </div>
              </PaperCard>
            ))}
          </div>
          <GearStack side="right" />
        </div>

        <div className="mt-15">
          <PaperCard className="mb-4">
            <h2 className="text-lg font-bold text-[#88540B] text-center p-5">Projects</h2>
          </PaperCard>
          <div className="flex gap-4">
            <PaperCard>
              <h3 className="text-sm font-semibold text-[#88540B]">Project 1</h3>
              <p>
                I am a full stack web developer with a passion for creating beautiful and functional
                websites.
              </p>
            </PaperCard>

            <PaperCard>
              <h3 className="text-sm font-semibold text-[#88540B]">Project 1</h3>
              <p>
                I am a full stack web developer with a passion for creating beautiful and functional
                websites.
              </p>
            </PaperCard>
          </div>
        </div>
      </PipeCard>
    </div>
  )
}
