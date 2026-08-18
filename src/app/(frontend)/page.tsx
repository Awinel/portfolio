import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'

import config from '@/payload.config'
import './styles.css'
import BlackHole from '@/components/BlackHole'
import { Gear } from '@/components/Gear'
import { GearMesh } from '@/components/GearMesh'
import { Lever } from '@/components/Lever'
import { PipeCard } from '@/components/PipeCard'
import { Steam } from '@/components/Steam'
import { Meter } from '@/components/Meter'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const panelCopy = user ? `Signal locked for ${user.email}` : 'Awaiting operator credentials.'

  return (
    <BlackHole>
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <div className="flex flex-col items-center justify-center">
          <picture className="animate-iteration-count-infinite animate-float animate-duration-3000">
            <source srcSet="/logo.png" />
            <Image
              alt="Payload Logo"
              height={100}
              src="/logo.png"
              width={150}
              className="w-37.5 h-25 object-cover"
              loading="eager"
            />
          </picture>
          {!user && <h1>Welcome to your new PayloadCMS project.</h1>}
          {user && <h1>Welcome back, {user.email}</h1>}
        </div>
        <div className="text-center mb-4">
          <h3 className="my-4">This template includes:</h3>
        </div>

        <PipeCard className="my-4 w-full max-w-md" title="Dispatch Panel">
          <div className="content space-y-2 text-center">
            <h1 className={`text-xl text-[#f0e0c4]`}>Your Website Text</h1>
            <p className={`text-sm text-[#c4a574]`}>{panelCopy}</p>
            <div className="flex items-end justify-center gap-4 pt-6">
              {([1, 2, 3, 4, 5] as const).map((level) => (
                <div key={level} className="group flex items-end gap-1">
                  <Steam variant={level} />
                  <Meter level={level} />
                </div>
              ))}
            </div>
          </div>
        </PipeCard>

        <div className="flex gap-4">
          <a
            className="bg-gray-900 my-3 px-4 py-2 rounded-md"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="bg-green-500 my-3 px-4 py-2 rounded-md"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>

        <GearMesh>
          <div className="flex items-end gap-2">
            <Lever className="relative top-4" />
            <Gear className="relative top-9 left-17" variant="default" />
            <Gear className="" inverted variant="spoke" />
          </div>
        </GearMesh>
      </div>
    </BlackHole>
  )
}
