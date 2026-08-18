'use client'

import { Gear } from '@/components/Gear'
import { GearMesh } from '@/components/GearMesh'
import { PaperCard } from '@/components/PaperCard'
import { PipeCard } from '@/components/PipeCard'

export default function PortfolioPage() {
  return (
    <div className="bg-zinc-800">
      <PipeCard title="Portfolio">
        <PaperCard>
          <h1 className="text-2xl font-bold text-[#88540B]">Benjamin Antonio Huerta Torres</h1>
          <h2 className="text-lg font-bold text-[#88540B]">Full Stack Web Developer</h2>
          <p>
            I am a full stack web developer with a passion for creating beautiful and functional
            websites.
          </p>
        </PaperCard>

        <GearMesh>
          <div className="relative -left-23 h-65 w-52">
            <Gear className="absolute z-10" />
            <Gear className="absolute top-22 left-15 z-20" inverted />
            <Gear className="absolute top-44 z-10" />
          </div>
        </GearMesh>
      </PipeCard>
    </div>
  )
}
