import type { CSSProperties } from 'react'

type SteamVariant = 1 | 2 | 3 | 4 | 5

const metal =
  'bg-[linear-gradient(145deg,#c4a574_0%,#8a6a42_42%,#5c4528_78%,#a88855_100%)] border border-[#3d2e1a]'

const pipeY =
  'bg-[linear-gradient(90deg,#d4b896_0%,#8a6a42_35%,#5c4528_70%,#b89560_100%)] border border-[#3d2e1a]'

const VARIANT_CONFIG = {
  1: { puffs: 3, wheelSec: 2.8, needleDeg: 18, piston: 2, label: 'Trace steam' },
  2: { puffs: 5, wheelSec: 2.2, needleDeg: 32, piston: 3, label: 'Light steam' },
  3: { puffs: 7, wheelSec: 1.6, needleDeg: 48, piston: 4, label: 'Steady steam' },
  4: { puffs: 9, wheelSec: 1.1, needleDeg: 64, piston: 5, label: 'Heavy steam' },
  5: { puffs: 12, wheelSec: 0.7, needleDeg: 78, piston: 6, label: 'Full steam' },
} as const satisfies Record<
  SteamVariant,
  { puffs: number; wheelSec: number; needleDeg: number; piston: number; label: string }
>

const PUFF_LAYOUT = [
  { left: '38%', delay: '0ms', duration: '1.6s', drift: -6, scale: 1 },
  { left: '54%', delay: '180ms', duration: '1.9s', drift: 8, scale: 0.85 },
  { left: '30%', delay: '360ms', duration: '1.5s', drift: -10, scale: 1.1 },
  { left: '62%', delay: '90ms', duration: '2s', drift: 12, scale: 0.9 },
  { left: '44%', delay: '480ms', duration: '1.7s', drift: 4, scale: 1.2 },
  { left: '24%', delay: '260ms', duration: '2.1s', drift: -14, scale: 0.75 },
  { left: '70%', delay: '400ms', duration: '1.4s', drift: 10, scale: 1.05 },
  { left: '36%', delay: '620ms', duration: '1.8s', drift: -5, scale: 0.95 },
  { left: '58%', delay: '220ms', duration: '1.65s', drift: 7, scale: 1.15 },
  { left: '48%', delay: '700ms', duration: '2.2s', drift: -8, scale: 1.3 },
  { left: '34%', delay: '540ms', duration: '1.55s', drift: 9, scale: 0.8 },
  { left: '60%', delay: '320ms', duration: '1.95s', drift: -11, scale: 1.05 },
] as const

export function Steam({ className, variant = 3 }: { className?: string; variant?: SteamVariant }) {
  const config = VARIANT_CONFIG[variant]
  const puffs = PUFF_LAYOUT.slice(0, config.puffs)

  return (
    <div
      className={`group relative inline-flex h-24 w-16 items-end justify-center ${className ?? ''}`}
      title={config.label}
      aria-label={config.label}
    >
      {/* Steam — exits from the pipe mouth */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-40 bottom-20 left-7 h-20 w-14 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        {puffs.map((puff, index) => (
          <span
            key={index}
            className="absolute bottom-0 rounded-full bg-[radial-gradient(circle,rgba(245,235,220,0.9)_0%,rgba(200,190,175,0.4)_40%,transparent_72%)] blur-[2px] group-hover:animate-steam-puff"
            style={
              {
                left: puff.left,
                width: `${0.55 + variant * 0.14 + puff.scale * 0.18}rem`,
                height: `${0.55 + variant * 0.14 + puff.scale * 0.18}rem`,
                animationDelay: puff.delay,
                animationDuration: puff.duration,
                '--steam-drift': `${puff.drift * (0.6 + variant * 0.15)}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Exhaust pipe — steam vents from the top rim */}
      <div
        aria-hidden
        className="absolute bottom-10 left-1/2 z-10 flex w-5 -translate-x-1/2 flex-col items-center"
      >
        {/* Pipe mouth / rim */}
        <div
          className={`relative z-30 h-2.5 w-6 rounded-sm shadow-[inset_0_1px_2px_rgba(255,220,160,0.35),0_1px_2px_rgba(0,0,0,0.4)] ${metal}`}
        >
          <div className="absolute inset-x-1 inset-y-0.5 rounded-sm bg-gray-950 shadow-[inset_0_0_4px_rgba(0,0,0,0.85)]" />
        </div>

        {/* Upper collar */}
        <div
          className={`-mt-0.5 h-2 w-5 z-20 rounded-sm shadow-[inset_0_1px_1px_rgba(255,220,160,0.25)] ${metal}`}
        />

        {/* Pipe shaft */}
        <div
          className={`h-8 w-3.5 rounded-sm shadow-[inset_1px_0_2px_rgba(255,220,160,0.35),inset_-1px_0_2px_rgba(0,0,0,0.4)] group-hover:animate-steam-shake ${pipeY}`}
          style={{ animationDuration: `${0.9 - variant * 0.08}s` }}
        />

        {/* Lower flange joining body */}
        <div
          className={`-mb-1 h-2 w-5 rounded-sm shadow-[inset_0_1px_1px_rgba(255,220,160,0.25)] ${metal}`}
        />
      </div>

      {/* Spinning valve wheel on the pipe */}
      <div
        aria-hidden
        className="absolute bottom-13 right-8 z-20 h-5 w-5 group-hover:animate-steam-wheel"
        style={{ animationDuration: `${config.wheelSec}s` }}
      >
        <div
          className={`absolute inset-0 rounded-full shadow-[inset_0_1px_2px_rgba(255,220,160,0.35)] ${metal}`}
        />
        <div className="absolute inset-[20%] rounded-full bg-gray-950/85" />
        {[0, 45, 90, 135].map((angle) => (
          <div
            key={angle}
            className="absolute inset-0"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <div
              className={`absolute left-1/2 top-[8%] h-[34%] w-0.5 -translate-x-1/2 rounded-sm ${metal}`}
            />
          </div>
        ))}
        <div
          className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${metal}`}
        />
      </div>

      {/* Side release lever */}
      <div
        aria-hidden
        className="absolute bottom-5 left-0 z-20 origin-[85%_50%] group-hover:animate-steam-lever"
        style={{ animationDuration: `${1.4 - variant * 0.12}s` }}
      >
        <div className={`h-1.5 w-5 rounded-sm ${metal}`} />
        <div
          className={`absolute -left-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.4)] ${metal}`}
        />
      </div>

      {/* Pressure gauge */}
      <div
        aria-hidden
        className={`absolute bottom-4 right-0 z-20 h-5 w-5 overflow-hidden rounded-full shadow-[inset_0_1px_2px_rgba(255,220,160,0.3)] ${metal}`}
      >
        <div className={`absolute inset-0.75 rounded-full bg-[#1a1510]`} />
        <div
          className={`absolute bottom-1/2 left-1/2 h-2 w-0.5 origin-bottom -translate-x-1/2 rounded-sm bg-[#e8d5b5] group-hover:animate-steam-needle`}
          style={
            {
              '--needle-swing': `${config.needleDeg}deg`,
              animationDuration: `${1.1 - variant * 0.1}s`,
            } as CSSProperties
          }
        />
        <div
          className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${metal}`}
        />
      </div>

      {/* Body / boiler block */}
      <div
        aria-hidden
        className={`relative z-1 mb-2 h-7 w-8 rounded-sm shadow-[inset_0_2px_3px_rgba(255,220,160,0.28),0_2px_3px_rgba(0,0,0,0.4)] group-hover:animate-steam-shake ${metal}`}
        style={{ animationDuration: `${0.9 - variant * 0.08}s` }}
      >
        <div className="absolute inset-x-1.5 top-1.5 h-3 overflow-hidden rounded-sm bg-gray-950/90">
          <div
            className={`absolute inset-x-0.5 top-0.5 h-2 rounded-sm group-hover:animate-steam-piston ${metal}`}
            style={{ animationDuration: `${0.55 + (6 - config.piston) * 0.08}s` }}
          />
        </div>
        <div className="absolute inset-x-1 bottom-1 flex justify-between">
          <span className={`h-1.5 w-1.5 rounded-full ${metal}`} />
          <span className={`h-1.5 w-1.5 rounded-full ${metal}`} />
        </div>
      </div>

      {/* Base flange */}
      <div
        aria-hidden
        className={`absolute bottom-0 h-2.5 w-16 rounded-sm shadow-[inset_0_1px_1px_rgba(255,220,160,0.3),0_1px_2px_rgba(0,0,0,0.35)] ${metal}`}
      />
      <div aria-hidden className={`absolute bottom-0.5 left-1 h-1.5 w-1.5 rounded-full ${metal}`} />
      <div
        aria-hidden
        className={`absolute bottom-0.5 right-1 h-1.5 w-1.5 rounded-full ${metal}`}
      />
    </div>
  )
}
