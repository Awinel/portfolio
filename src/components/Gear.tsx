const TOOTH_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const

function Tooth() {
  return (
    <div className="absolute left-1/2 top-0 h-8 w-6 -translate-x-1/2 rounded-t-md corner-top-shape-bevel bg-gray-500 border border-black" />
  )
}

export function Gear({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <div className={className}>
      <div className={`relative h-32 w-32 ${inverted ? 'animate-inverted-gear' : 'animate-gear'}`}>
        {/* Teeth — identical tips, rotated around the hub */}
        {TOOTH_ANGLES.map((angle) => (
          <div
            key={angle}
            className="absolute inset-0"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <Tooth />
          </div>
        ))}

        {/* Gear body */}
        <div className="absolute inset-5 rounded-full bg-gray-500" />

        {/* Inner hole */}
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-950" />
      </div>
    </div>
  )
}
