'use client'

import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from 'react'

export type GearMeshNode = {
  id: string
  el: HTMLElement
  teeth: number
  radius: number
  getRotation: () => number
  applyDelta: (delta: number) => void
  setPaused: (paused: boolean) => void
}

type GearMeshContextValue = {
  register: (node: GearMeshNode) => () => void
  beginDrag: (sourceId: string) => void
  endDrag: () => void
  driveFrom: (sourceId: string, delta: number) => void
}

const GearMeshContext = createContext<GearMeshContextValue | null>(null)

function centersDistance(a: HTMLElement, b: HTMLElement) {
  const ra = a.getBoundingClientRect()
  const rb = b.getBoundingClientRect()
  const dx = ra.left + ra.width / 2 - (rb.left + rb.width / 2)
  const dy = ra.top + ra.height / 2 - (rb.top + rb.height / 2)
  return Math.hypot(dx, dy)
}

function areMeshed(a: GearMeshNode, b: GearMeshNode, slack: number) {
  const distance = centersDistance(a.el, b.el)
  // Overlapping or nearly touching counts as connected
  return distance <= a.radius + b.radius + slack
}

export function GearMesh({
  children,
  /** Extra px beyond touching allowed to still count as meshed */
  slack = 28,
}: {
  children: ReactNode
  slack?: number
}) {
  const nodesRef = useRef(new Map<string, GearMeshNode>())
  const activeMeshRef = useRef<Set<string>>(new Set())

  const register = useCallback((node: GearMeshNode) => {
    nodesRef.current.set(node.id, node)
    return () => {
      nodesRef.current.delete(node.id)
    }
  }, [])

  const collectMesh = useCallback(
    (sourceId: string) => {
      const nodes = nodesRef.current
      const source = nodes.get(sourceId)
      if (!source) return new Map<string, number>()

      // id -> rotation ratio relative to source delta
      const ratios = new Map<string, number>([[sourceId, 1]])
      const queue = [sourceId]

      while (queue.length > 0) {
        const currentId = queue.shift()!
        const current = nodes.get(currentId)
        const currentRatio = ratios.get(currentId)
        if (!current || currentRatio === undefined) continue

        for (const candidate of nodes.values()) {
          if (ratios.has(candidate.id)) continue
          if (!areMeshed(current, candidate, slack)) continue

          const edgeRatio = -current.teeth / candidate.teeth
          ratios.set(candidate.id, currentRatio * edgeRatio)
          queue.push(candidate.id)
        }
      }

      return ratios
    },
    [slack],
  )

  const beginDrag = useCallback(
    (sourceId: string) => {
      const mesh = collectMesh(sourceId)
      activeMeshRef.current = new Set(mesh.keys())
      for (const id of activeMeshRef.current) {
        nodesRef.current.get(id)?.setPaused(true)
      }
    },
    [collectMesh],
  )

  const endDrag = useCallback(() => {
    for (const id of activeMeshRef.current) {
      nodesRef.current.get(id)?.setPaused(false)
    }
    activeMeshRef.current.clear()
  }, [])

  const driveFrom = useCallback(
    (sourceId: string, delta: number) => {
      if (Math.abs(delta) < 0.0001) return

      const ratios = collectMesh(sourceId)

      for (const [id, ratio] of ratios) {
        if (id === sourceId) continue

        if (!activeMeshRef.current.has(id)) {
          activeMeshRef.current.add(id)
          nodesRef.current.get(id)?.setPaused(true)
        }

        nodesRef.current.get(id)?.applyDelta(delta * ratio)
      }
    },
    [collectMesh],
  )

  const value = useMemo(
    () => ({ register, beginDrag, endDrag, driveFrom }),
    [register, beginDrag, endDrag, driveFrom],
  )

  return <GearMeshContext.Provider value={value}>{children}</GearMeshContext.Provider>
}

export function useGearMesh() {
  return useContext(GearMeshContext)
}

export const GEAR_TEETH = {
  default: 8,
  fine: 12,
  spoke: 16,
} as const

export const GEAR_RADIUS = {
  default: 64,
  fine: 64,
  spoke: 72,
} as const
