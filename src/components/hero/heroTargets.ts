import * as THREE from 'three'

export interface TargetField {
  positions: THREE.Vector3[]
  edges: [number, number][]
}

// Geometría autoritativa del escudo — 01-logo-principal-1a.md, caja 100×108.
const OUTER: [number, number][] = [
  [50, 0],
  [100, 21.6],
  [100, 64.8],
  [50, 108],
  [0, 64.8],
  [0, 21.6],
]
const HOLE: [number, number][] = [
  [50, 28.08],
  [82, 60.48],
  [66, 60.48],
  [50, 44.28],
  [34, 60.48],
  [18, 60.48],
]

function toLocal(x: number, y: number): [number, number] {
  return [((x - 50) / 50) * 1.35, -((y - 54) / 54) * 1.35]
}

function polygonPerimeterPoints(poly: [number, number][], count: number): [number, number][] {
  const edges = poly.map((a, i) => {
    const b = poly[(i + 1) % poly.length]
    return { a, b, len: Math.hypot(b[0] - a[0], b[1] - a[1]) }
  })
  const total = edges.reduce((s, e) => s + e.len, 0)
  const step = total / count
  const pts: [number, number][] = []
  let edgeIdx = 0
  let edgeProgress = 0
  for (let i = 0; i < count; i++) {
    while (edgeProgress > edges[edgeIdx].len) {
      edgeProgress -= edges[edgeIdx].len
      edgeIdx = (edgeIdx + 1) % edges.length
    }
    const e = edges[edgeIdx]
    const t = e.len === 0 ? 0 : edgeProgress / e.len
    pts.push([e.a[0] + (e.b[0] - e.a[0]) * t, e.a[1] + (e.b[1] - e.a[1]) * t])
    edgeProgress += step
  }
  return pts
}

function pointInPolygon(pt: [number, number], poly: [number, number][]): boolean {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0]
    const yi = poly[i][1]
    const xj = poly[j][0]
    const yj = poly[j][1]
    const intersect = yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

function buildEdgesByProximity(positions: THREE.Vector3[], k: number, maxDist?: number): [number, number][] {
  const edgeSet = new Set<string>()
  const edges: [number, number][] = []
  const maxDistSq = maxDist ? maxDist * maxDist : Infinity
  for (let i = 0; i < positions.length; i++) {
    const dists: { j: number; d: number }[] = []
    for (let j = 0; j < positions.length; j++) {
      if (i === j) continue
      const d = positions[i].distanceToSquared(positions[j])
      if (d <= maxDistSq) dists.push({ j, d })
    }
    dists.sort((a, b) => a.d - b.d)
    for (let n = 0; n < Math.min(k, dists.length); n++) {
      const a = i
      const b = dists[n].j
      const key = a < b ? `${a}-${b}` : `${b}-${a}`
      if (!edgeSet.has(key)) {
        edgeSet.add(key)
        edges.push([a, b])
      }
    }
  }
  return edges
}

/** El escudo — nodos distribuidos sobre la silueta y el agujero del galón (geometría exacta del spec). */
export function buildShieldTargets(count: number): TargetField {
  const outerCount = Math.round(count * 0.42)
  const holeCount = Math.round(count * 0.28)
  const fillCount = count - outerCount - holeCount

  const outerPts = polygonPerimeterPoints(OUTER, outerCount)
  const holePts = polygonPerimeterPoints(HOLE, holeCount)

  const fillPts: [number, number][] = []
  let guard = 0
  while (fillPts.length < fillCount && guard < fillCount * 50) {
    guard++
    const x = Math.random() * 100
    const y = Math.random() * 108
    if (pointInPolygon([x, y], OUTER) && !pointInPolygon([x, y], HOLE)) {
      fillPts.push([x, y])
    }
  }

  const all = [...outerPts, ...holePts, ...fillPts]
  const positions = all.map(([x, y]) => {
    const [lx, ly] = toLocal(x, y)
    return new THREE.Vector3(lx, ly, (Math.random() - 0.5) * 0.12)
  })
  return { positions, edges: buildEdgesByProximity(positions, 2) }
}

/**
 * El túnel — campo disperso de nodos entre la cámara y el escudo, estático en el
 * mundo (es la cámara la que avanza a través de él). radius crece con la distancia
 * para dar sensación de vacío que se abre, no de tubo cerrado.
 */
export function buildTunnelField(count: number, zNear: number, zFar: number, radius: number): TargetField {
  const positions: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    const z = zNear + Math.random() * (zFar - zNear)
    const depthFrac = (zNear - z) / (zNear - zFar)
    const r = radius * (0.3 + depthFrac * 0.9) * (0.4 + Math.random() * 0.9)
    const angle = Math.random() * Math.PI * 2
    positions.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r * 0.6, z))
  }
  return { positions, edges: buildEdgesByProximity(positions, 2, radius * 0.9) }
}
