'use client'

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

import { GEAR_RADIUS, GEAR_TEETH, useGearMesh, type GearMeshNode } from '@/components/GearMesh'

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

const GEAR_SPEED_DEG_PER_MS = 360 / 4000

function Tooth({ className }: { className: string }) {
  return (
    <div
      className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-t-md corner-top-shape-bevel ${metal} ${className}`}
    />
  )
}

function SolidGear({
  variant,
  rotation,
}: {
  variant: keyof typeof SOLID_VARIANTS
  rotation: number
}) {
  const config = SOLID_VARIANTS[variant]

  return (
    <div className="relative h-32 w-32" style={{ transform: `rotate(${rotation}deg)` }}>
      {config.angles.map((angle) => (
        <div key={angle} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
          <Tooth className={config.tooth} />
        </div>
      ))}

      <div className={`absolute rounded-full ${metal} ${config.body}`} />
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#331a05] ${config.ring}`}
      />
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${metal} ${config.hub}`}
      />
    </div>
  )
}

function SpokeGear({ rotation }: { rotation: number }) {
  return (
    <div className="relative h-36 w-36" style={{ transform: `rotate(${rotation}deg)` }}>
      {SPOKE_TOOTH_ANGLES.map((angle) => (
        <div key={angle} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
          <div
            className={`absolute left-1/2 top-0 h-5 w-3.5 -translate-x-1/2 rounded-t-sm corner-top-shape-bevel ${metal}`}
          />
        </div>
      ))}

      <div
        className={`absolute inset-[14%] rounded-full shadow-[inset_0_2px_4px_rgba(255,220,160,0.25),inset_0_-3px_6px_rgba(0,0,0,0.45)] ${metal}`}
      />
      <div className="absolute inset-[26%] rounded-full bg-gray-950" />

      {SPOKE_ANGLES.map((angle) => (
        <div key={angle} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
          <div
            className={`absolute left-1/2 top-[27%] h-[23%] w-2 -translate-x-1/2 rounded-sm shadow-[inset_1px_0_0_rgba(255,220,160,0.2)] ${metal}`}
          />
        </div>
      ))}

      <div
        className={`absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[inset_0_2px_3px_rgba(255,220,160,0.3),0_2px_4px_rgba(0,0,0,0.5)] ${metal}`}
      />
      <div
        className={`absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[inset_0_1px_2px_rgba(255,220,160,0.45),0_1px_2px_rgba(0,0,0,0.4)] ${metal}`}
      />
    </div>
  )
}

function pointerAngle(el: HTMLElement, clientX: number, clientY: number) {
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI
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
  const mesh = useGearMesh()
  const reactId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef(0)
  const dragOffsetRef = useRef(0)
  const [rotation, setRotation] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!mesh || !el) return

    const node: GearMeshNode = {
      id: reactId,
      el,
      teeth: GEAR_TEETH[variant],
      radius: GEAR_RADIUS[variant],
      getRotation: () => rotationRef.current,
      applyDelta: (delta) => {
        rotationRef.current += delta
        setRotation(rotationRef.current)
      },
      setPaused,
    }

    return mesh.register(node)
  }, [mesh, reactId, variant])

  useEffect(() => {
    if (dragging || paused) return

    let frame = 0
    let last = performance.now()
    const direction = inverted ? -1 : 1

    const tick = (now: number) => {
      const dt = now - last
      last = now
      const delta = direction * GEAR_SPEED_DEG_PER_MS * dt
      rotationRef.current += delta
      setRotation(rotationRef.current)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [dragging, paused, inverted])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = rootRef.current
    if (!el) return

    event.preventDefault()
    el.setPointerCapture(event.pointerId)
    dragOffsetRef.current = rotationRef.current - pointerAngle(el, event.clientX, event.clientY)
    setDragging(true)
    mesh?.beginDrag(reactId)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || !rootRef.current) return

    const next = pointerAngle(rootRef.current, event.clientX, event.clientY) + dragOffsetRef.current
    const delta = next - rotationRef.current
    rotationRef.current = next
    setRotation(next)
    mesh?.driveFrom(reactId, delta)
  }

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    if (rootRef.current?.hasPointerCapture(event.pointerId)) {
      rootRef.current.releasePointerCapture(event.pointerId)
    }
    setDragging(false)
    mesh?.endDrag()
  }

  return (
    <div
      ref={rootRef}
      className={`inline-flex w-fit touch-none select-none rounded-full ${dragging ? 'cursor-grabbing' : 'cursor-grab'} ${className ?? ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="slider"
      aria-label="Interactive gear"
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={Math.round(((rotation % 360) + 360) % 360)}
    >
      {variant === 'spoke' ? (
        <SpokeGear rotation={rotation} />
      ) : (
        <SolidGear variant={variant} rotation={rotation} />
      )}
    </div>
  )
}
