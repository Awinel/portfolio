type GearVariant = 'default' | 'fine' | 'spoke'

const SOLID_VARIANTS = {
  default: {
    angles: [0, 45, 90, 135, 180, 225, 270, 315],
    tooth: 'h-8 w-6',
    body: 'inset-5',
    ring: 'h-12 w-12',
    hub: 'h-7 w-7',
  },
  fine: {
    angles: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
    tooth: 'h-7 w-4',
    body: 'inset-4',
    ring: 'h-10 w-10',
    hub: 'h-5 w-5',
  },
} as const

const SPOKE_TOOTH_ANGLES = Array.from({ length: 16 }, (_, i) => i * 22.5)
const SPOKE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const

const metal =
  'bg-[linear-gradient(145deg,#c4a574_0%,#8a6a42_42%,#5c4528_78%,#a88855_100%)] border border-[#3d2e1a]'

function Tooth({ className }: { className: string }) {
  return (
    <div
      className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-t-md corner-top-shape-bevel ${metal} ${className}`}
    />
  )
}

function SolidGear({
  variant,
  inverted,
}: {
  variant: keyof typeof SOLID_VARIANTS
  inverted?: boolean
}) {
  const config = SOLID_VARIANTS[variant]

  return (
    <div className={`relative h-32 w-32 ${inverted ? 'animate-inverted-gear' : 'animate-gear'}`}>
      {config.angles.map((angle) => (
        <div key={angle} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
          <Tooth className={config.tooth} />
        </div>
      ))}

      <div className={`absolute rounded-full ${metal} ${config.body}`} />
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-950 ${config.ring}`}
      />
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${metal} ${config.hub}`}
      />
    </div>
  )
}

function SpokeGear({ inverted }: { inverted?: boolean }) {
  return (
    <div className={`relative h-36 w-36 ${inverted ? 'animate-inverted-gear' : 'animate-gear'}`}>
      {/* Dense outer teeth */}
      {SPOKE_TOOTH_ANGLES.map((angle) => (
        <div key={angle} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
          <div
            className={`absolute left-1/2 top-0 h-5 w-3.5 -translate-x-1/2 rounded-t-sm corner-top-shape-bevel ${metal}`}
          />
        </div>
      ))}

      {/* Outer rim */}
      <div
        className={`absolute inset-[14%] rounded-full shadow-[inset_0_2px_4px_rgba(255,220,160,0.25),inset_0_-3px_6px_rgba(0,0,0,0.45)] ${metal}`}
      />
      <div className="absolute inset-[26%] rounded-full bg-gray-950" />

      {/* Spokes */}
      {SPOKE_ANGLES.map((angle) => (
        <div key={angle} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
          <div
            className={`absolute left-1/2 top-[27%] h-[23%] w-2 -translate-x-1/2 rounded-sm shadow-[inset_1px_0_0_rgba(255,220,160,0.2)] ${metal}`}
          />
        </div>
      ))}

      {/* Hub + raised center cap */}
      <div
        className={`absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[inset_0_2px_3px_rgba(255,220,160,0.3),0_2px_4px_rgba(0,0,0,0.5)] ${metal}`}
      />
      <div
        className={`absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[inset_0_1px_2px_rgba(255,220,160,0.45),0_1px_2px_rgba(0,0,0,0.4)] ${metal}`}
      />
    </div>
  )
}

export function Gear({
  className,
  inverted,
  variant = 'default',
}: {
  className?: string
  inverted?: boolean
  variant?: GearVariant
}) {
  return (
    <div className={className}>
      {variant === 'spoke' ? (
        <SpokeGear inverted={inverted} />
      ) : (
        <SolidGear variant={variant} inverted={inverted} />
      )}
    </div>
  )
}
