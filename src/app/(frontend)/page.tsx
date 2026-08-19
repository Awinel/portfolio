import { BlackHoleBackground } from '@/components/BlackHole'
import { ContactStrip } from '@/components/landing/ContactStrip'
import { Hero } from '@/components/landing/Hero'
import { StackCutaway } from '@/components/landing/StackCutaway'
import { Wordmark } from '@/components/landing/Wordmark'

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-ink">
      <BlackHoleBackground />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <Wordmark />
        <Hero />
        <StackCutaway />
        <ContactStrip />
      </div>
    </div>
  )
}
