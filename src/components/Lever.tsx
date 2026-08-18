'use client'

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

const metal =
  'bg-[linear-gradient(145deg,#c4a574_0%,#8a6a42_42%,#5c4528_78%,#a88855_100%)] border border-[#3d2e1a]'

const LEVER_TRAVEL_PX = 76
const LEVER_SPEED_PX_PER_MS = (LEVER_TRAVEL_PX * 2) / 2800

export function Lever({ className }: { className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const directionRef = useRef(1)
  const grabDeltaRef = useRef(0)
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (dragging) return

    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = now - last
      last = now

      let next = offsetRef.current + directionRef.current * LEVER_SPEED_PX_PER_MS * dt
      if (next >= LEVER_TRAVEL_PX) {
        next = LEVER_TRAVEL_PX
        directionRef.current = -1
      } else if (next <= 0) {
        next = 0
        directionRef.current = 1
      }

      offsetRef.current = next
      setOffset(next)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [dragging])

  const offsetFromPointer = (clientY: number) => {
    const track = trackRef.current
    if (!track) return offsetRef.current
    const rect = track.getBoundingClientRect()
    return Math.min(LEVER_TRAVEL_PX, Math.max(0, clientY - rect.top - grabDeltaRef.current))
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return

    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)

    const rect = track.getBoundingClientRect()
    grabDeltaRef.current = event.clientY - rect.top - offsetRef.current
    setDragging(true)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return

    const previous = offsetRef.current
    const next = offsetFromPointer(event.clientY)
    if (next > previous) directionRef.current = 1
    else if (next < previous) directionRef.current = -1

    offsetRef.current = next
    setOffset(next)
  }

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setDragging(false)
  }

  return (
    <div className={className}>
      <div ref={trackRef} className="relative h-44 w-20">
        <div
          className={`absolute left-1/2 top-3 h-36 w-8 -translate-x-1/2 rounded-sm shadow-[inset_0_2px_4px_rgba(255,220,160,0.2),inset_0_-3px_6px_rgba(0,0,0,0.45)] ${metal}`}
        />
        <div className="absolute left-1/2 top-5 h-33 w-3.5 -translate-x-1/2 rounded-sm bg-gray-950 shadow-[inset_0_0_6px_rgba(0,0,0,0.8)]" />

        <div
          className={`absolute left-[22%] top-5 h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.35)] ${metal}`}
        />
        <div
          className={`absolute right-[22%] top-5 h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.35)] ${metal}`}
        />
        <div
          className={`absolute left-[22%] bottom-12 h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.35)] ${metal}`}
        />
        <div
          className={`absolute right-[22%] bottom-12 h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.35)] ${metal}`}
        />

        <div
          className={`absolute bottom-0 left-1/2 h-9 w-16 -translate-x-1/2 rounded-sm shadow-[inset_0_2px_3px_rgba(255,220,160,0.25),0_2px_4px_rgba(0,0,0,0.5)] ${metal}`}
        />
        <div
          className={`absolute bottom-2.5 left-[16%] h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.4)] ${metal}`}
        />
        <div
          className={`absolute bottom-2.5 right-[16%] h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,220,160,0.4)] ${metal}`}
        />

        <div
          className={`absolute left-1/2 top-6 h-10 w-28 -translate-x-1/2 touch-none select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ transform: `translate(-50%, ${offset}px)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          role="slider"
          aria-label="Interactive lever"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={LEVER_TRAVEL_PX}
          aria-valuenow={Math.round(offset)}
        >
          <div
            className={`absolute left-2 top-3 h-3 w-11 rounded-sm shadow-[inset_0_1px_2px_rgba(255,220,160,0.3),0_1px_3px_rgba(0,0,0,0.45)] ${metal}`}
          />
          <div
            className={`absolute left-13 top-2.5 h-2.5 w-10 rounded-sm shadow-[inset_0_1px_1px_rgba(255,220,160,0.25)] ${metal}`}
          />
          <div
            className={`absolute left-22 top-0.5 h-7 w-7 rounded-full shadow-[inset_0_2px_3px_rgba(255,220,160,0.4),0_2px_4px_rgba(0,0,0,0.45)] ${metal}`}
          />
          <div
            className={`absolute left-[5.85rem] top-1.5 h-3.5 w-3.5 rounded-full shadow-[inset_0_1px_2px_rgba(255,220,160,0.5)] ${metal}`}
          />
        </div>
      </div>
    </div>
  )
}
