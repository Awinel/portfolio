import type { CSSProperties } from 'react'

type MeterLevel = 1 | 2 | 3 | 4 | 5

const metal =
  'bg-[linear-gradient(145deg,#c4a574_0%,#8a6a42_42%,#5c4528_78%,#a88855_100%)] border border-[#3d2e1a]'

const LEVEL_LABELS = ['I', 'II', 'III', 'IV', 'V'] as const

const FILL_HEIGHT = {
  1: '18%',
  2: '36%',
  3: '54%',
  4: '72%',
  5: '90%',
} as const satisfies Record<MeterLevel, string>

export function Meter({ className, level = 3 }: { className?: string; level?: MeterLevel }) {
  return (
    <div
      className={`group/meter relative inline-flex h-24 w-9 flex-col items-center ${className ?? ''}`}
      role="meter"
      aria-label={`Steam level ${level} of 5`}
      aria-valuemin={0}
      aria-valuemax={5}
      aria-valuenow={level}
      title={`Level ${level}`}
      style={
        {
          '--meter-target': FILL_HEIGHT[level],
        } as CSSProperties
      }
    >
      {/* Top cap */}
      <div
        aria-hidden
        className={`z-10 h-2.5 w-7 rounded-sm shadow-[inset_0_1px_2px_rgba(255,220,160,0.35),0_1px_2px_rgba(0,0,0,0.35)] ${metal}`}
      />

      {/* Meter body */}
      <div
        aria-hidden
        className={`relative flex h-full w-7 flex-1 flex-col overflow-hidden rounded-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.55),0_2px_3px_rgba(0,0,0,0.35)] ${metal}`}
      >
        {/* Sight glass */}
        <div
          className={`absolute inset-x-1.5 inset-y-1.5 overflow-hidden rounded-sm bg-[#0c0a08] shadow-[inset_0_0_6px_rgba(0,0,0,0.9)]`}
        >
          {/* Fill starts at 0, rises to target level on hover */}
          <div
            className={`absolute inset-x-0 bottom-0 h-0 bg-[linear-gradient(180deg,#f0d9a8_0%,#c4a574_35%,#8a5a28_100%)] transition-[height] duration-500 ease-out group-hover:h-[var(--meter-target)] group-hover/meter:h-[var(--meter-target)] group-hover:animate-meter-pulse group-hover/meter:animate-meter-pulse`}
          />

          {/* Gloss on glass */}
          <div
            className={`absolute inset-y-0 left-0 w-1 bg-[linear-gradient(90deg,rgba(255,220,160,0.2),transparent)]`}
          />

          {/* Bob sits at bottom, rides up to target on hover */}
          <div
            className={`absolute left-1/2 bottom-0 h-1.5 w-3 -translate-x-1/2 rounded-sm shadow-[0_0_4px_rgba(240,217,168,0.5)] transition-[bottom] duration-500 ease-out group-hover:bottom-[calc(var(--meter-target)-0.2rem)] group-hover/meter:bottom-[calc(var(--meter-target)-0.2rem)] ${metal}`}
          />
        </div>

        {/* Level tick marks — light up through target on hover */}
        <div className="absolute inset-y-2 right-0 flex w-2 flex-col-reverse justify-between py-0.5">
          {LEVEL_LABELS.map((label, index) => {
            const tickLevel = (index + 1) as MeterLevel
            const inRange = tickLevel <= level
            return (
              <div key={label} className="flex items-center gap-0.5">
                <span
                  className={`h-px w-1.5 transition-colors duration-300 ${
                    inRange
                      ? 'bg-[#3d2e1a] group-hover:bg-[#e8d5b5] group-hover/meter:bg-[#e8d5b5]'
                      : 'bg-[#3d2e1a]'
                  }`}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Numerals — target level lights on hover */}
      <div
        aria-hidden
        className="absolute inset-y-3 left-0 flex flex-col-reverse justify-between py-1 text-[7px] leading-none tracking-tighter"
      >
        {LEVEL_LABELS.map((label, index) => {
          const tickLevel = (index + 1) as MeterLevel
          const isTarget = tickLevel === level
          return (
            <span
              key={label}
              className={`transition-colors duration-300 ${
                isTarget
                  ? 'text-[#6b542f] group-hover:text-[#f0e0c4] group-hover/meter:text-[#f0e0c4]'
                  : 'text-[#6b542f]'
              }`}
            >
              {label}
            </span>
          )
        })}
      </div>

      {/* Bottom flange */}
      <div
        aria-hidden
        className={`z-10 h-2.5 w-8 rounded-sm shadow-[inset_0_1px_1px_rgba(255,220,160,0.3),0_1px_2px_rgba(0,0,0,0.35)] ${metal}`}
      />
    </div>
  )
}
