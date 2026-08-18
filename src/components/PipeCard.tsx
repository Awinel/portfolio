import type { ReactNode } from 'react'

const metal =
  'bg-[linear-gradient(145deg,#c4a574_0%,#8a6a42_42%,#5c4528_78%,#a88855_100%)] border border-[#3d2e1a]'

const pipeX =
  'bg-[linear-gradient(180deg,#d4b896_0%,#8a6a42_35%,#5c4528_70%,#b89560_100%)] border border-[#3d2e1a]'

const pipeY =
  'bg-[linear-gradient(90deg,#d4b896_0%,#8a6a42_35%,#5c4528_70%,#b89560_100%)] border border-[#3d2e1a]'

function Rivet({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2 w-2 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.45),0_1px_1px_rgba(0,0,0,0.35)] ${metal} ${className ?? ''}`}
    />
  )
}

function Elbow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute z-10 h-7 w-7 rounded-sm shadow-[inset_0_2px_3px_rgba(255,220,160,0.28),inset_0_-2px_4px_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.35)] ${metal} ${className ?? ''}`}
    >
      <Rivet className="left-1 top-1" />
      <Rivet className="right-1 top-1" />
      <Rivet className="left-1 bottom-1" />
      <Rivet className="right-1 bottom-1" />
    </div>
  )
}

function Flange({ className, vertical }: { className?: string; vertical?: boolean }) {
  return (
    <div
      aria-hidden
      className={`absolute z-5 rounded-sm shadow-[inset_0_1px_2px_rgba(255,220,160,0.25),0_1px_2px_rgba(0,0,0,0.35)] ${metal} ${
        vertical ? 'h-5 w-4' : 'h-4 w-5'
      } ${className ?? ''}`}
    />
  )
}

export function PipeCard({
  children,
  className,
  title,
}: {
  children: ReactNode
  className?: string
  title?: string
}) {
  return (
    <div className={`relative p-5 ${className ?? ''}`}>
      {/* Corner fittings */}
      <Elbow className="-left-1 -top-1" />
      <Elbow className="-right-1 -top-1" />
      <Elbow className="-bottom-1 -left-1" />
      <Elbow className="-bottom-1 -right-1" />

      {/* Horizontal pipes */}
      <div
        aria-hidden
        className={`absolute left-5 right-5 top-1.5 h-3 rounded-sm shadow-[inset_0_1px_2px_rgba(255,220,160,0.35),inset_0_-1px_2px_rgba(0,0,0,0.35)] ${pipeX}`}
      />
      <div
        aria-hidden
        className={`absolute bottom-1.5 left-5 right-5 h-3 rounded-sm shadow-[inset_0_1px_2px_rgba(255,220,160,0.35),inset_0_-1px_2px_rgba(0,0,0,0.35)] ${pipeX}`}
      />

      {/* Vertical pipes */}
      <div
        aria-hidden
        className={`absolute bottom-5 left-1.5 top-5 w-3 rounded-sm shadow-[inset_1px_0_2px_rgba(255,220,160,0.3),inset_-1px_0_2px_rgba(0,0,0,0.35)] ${pipeY}`}
      />
      <div
        aria-hidden
        className={`absolute bottom-5 right-1.5 top-5 w-3 rounded-sm shadow-[inset_1px_0_2px_rgba(255,220,160,0.3),inset_-1px_0_2px_rgba(0,0,0,0.35)] ${pipeY}`}
      />

      {/* Mid-span flanges */}
      <Flange className="left-1/2 top-0.5 -translate-x-1/2" />
      <Flange className="bottom-0.5 left-1/2 -translate-x-1/2" />
      <Flange vertical className="left-0.5 top-1/2 -translate-y-1/2" />
      <Flange vertical className="right-0.5 top-1/2 -translate-y-1/2" />

      {/* Inner panel */}
      <div
        className={`relative rounded-sm border border-[#3d2e1a] bg-[linear-gradient(160deg,#2a2218_0%,#1a1510_55%,#241c14_100%)] px-6 py-5 shadow-[inset_0_0_24px_rgba(0,0,0,0.55)]`}
      >
        {title ? (
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden className={`h-2 w-2 rounded-full ${metal}`} />
            <h2 className={`font-serif text-lg tracking-wide text-[#d4b896]`}>{title}</h2>
            <span aria-hidden className={`h-2 w-2 rounded-full ${metal}`} />
          </div>
        ) : null}
        <div className={`text-[#e8d5b5]`}>{children}</div>
      </div>
    </div>
  )
}
