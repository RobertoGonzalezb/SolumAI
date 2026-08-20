// Toda la coreografía deriva de un único p ∈ [0,1]. Este módulo es la única fuente
// de verdad para esa matemática — la usan tanto la escena 3D como los overlays
// HTML/SVG y la columna de texto, para que nunca se desincronicen entre sí.

export function seg(p: number, a: number, b: number): number {
  return Math.min(1, Math.max(0, (p - a) / (b - a)))
}

export function outCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export const ACTS = [
  { key: 'problema', label: 'Problema', from: 0, to: 0.22 },
  { key: 'sistema', label: 'Sistema', from: 0.22, to: 0.42 },
  { key: 'automatizacion', label: 'Automatización', from: 0.42, to: 0.62 },
  { key: 'webs', label: 'Webs y apps', from: 0.62, to: 0.82 },
  { key: 'empezar', label: 'Empezar', from: 0.82, to: 1.0 },
] as const

export function activeActIndex(p: number): number {
  for (let i = 0; i < ACTS.length; i++) {
    if (p < ACTS[i].to || i === ACTS.length - 1) return i
  }
  return ACTS.length - 1
}

// Cuatro capas dispersas del acto 01 — offsets fijos (no aleatorios en cada
// render) convertidos de "px en pantalla" a unidades de mundo 3D.
const PX_TO_WORLD = 1.15 / 170
export const LAYER_SCATTER = [
  { dx: -170, dy: 90, rotDeg: 40, zEpsilon: 0 },
  { dx: 150, dy: -110, rotDeg: -35, zEpsilon: 0.012 },
  { dx: -120, dy: -140, rotDeg: 28, zEpsilon: 0.024 },
  { dx: 160, dy: 120, rotDeg: -22, zEpsilon: 0.036 },
].map((l) => ({ ...l, x: l.dx * PX_TO_WORLD, y: l.dy * PX_TO_WORLD }))

export interface CounterSpec {
  key: string
  label: string
  max: number
  from: number
  to: number
}

export const COUNTERS: CounterSpec[] = [
  { key: 'tools', label: 'Herramientas que no se hablan', max: 6, from: 0.06, to: 0.2 },
  { key: 'hours', label: 'Horas/semana en tareas repetidas', max: 11, from: 0.1, to: 0.22 },
  { key: 'days', label: 'Días hasta el primer proceso vivo', max: 14, from: 0.86, to: 0.97 },
]

export interface Frame {
  p: number
  sealed: boolean
  assembly: number // 0→1, con easing, irreversible una vez llega a 1
  layerOpacity: number
  sceneRotX: number // radianes
  sceneRotY: number // radianes
  sceneScale: number
  nodesOpacity: number
  nodesEntry: number // 0→1 solo en la entrada — para scale/rotate, no para el fundido de salida
  screensOpacity: number
  screensEntry: number
  glowOpacity: number
  keyLightAngle: number // radianes
  counters: Record<string, number>
  activeAct: number
}

const DEG = Math.PI / 180

/** Mantiene el estado que no puede retroceder: sellado del escudo y contadores. */
export class NarrativeDriver {
  private assemblyPeak = 0
  private counterPeaks: Record<string, number> = Object.fromEntries(COUNTERS.map((c) => [c.key, 0]))

  update(p: number): Frame {
    this.assemblyPeak = Math.max(this.assemblyPeak, seg(p, 0, 0.3))
    const sealed = this.assemblyPeak >= 1
    const a = outCubic(this.assemblyPeak)

    let sceneRotX: number
    let sceneRotY: number
    let sceneScale: number

    if (!sealed) {
      sceneRotX = 14 * (1 - a) * DEG
      // Suaviza el empalme con el acto 02 (-18°) en vez de los -14° literales del
      // doc, para que no haya un salto visible al sellarse.
      sceneRotY = (-24 + 6 * a) * DEG
      sceneScale = 0.8 + 0.2 * a
    } else {
      const q = seg(p, 0.3, 1)
      const closing = outCubic(seg(p, 0.84, 1))
      sceneRotX = 0
      sceneRotY = (-18 + 36 * q) * DEG
      sceneScale = 1 + 0.14 * closing
    }

    const closing = outCubic(seg(p, 0.84, 1))
    const glowFadeIn = seg(p, 0.82, 0.84)
    const glowOpacity = glowFadeIn * (0.2 + 0.1 * closing)
    const keyLightAngle = (120 - 90 * closing) * DEG

    const nodesEntry = seg(p, 0.42, 0.5)
    const screensEntry = seg(p, 0.64, 0.72)
    const nodesOpacity = Math.min(nodesEntry, 1 - seg(p, 0.58, 0.64))
    const screensOpacity = Math.min(screensEntry, 1 - seg(p, 0.8, 0.86))

    const counters: Record<string, number> = {}
    for (const c of COUNTERS) {
      const raw = Math.round(c.max * seg(p, c.from, c.to))
      this.counterPeaks[c.key] = Math.max(this.counterPeaks[c.key], raw)
      counters[c.key] = this.counterPeaks[c.key]
    }

    return {
      p,
      sealed,
      assembly: a,
      layerOpacity: 0.22 + 0.78 * a,
      sceneRotX,
      sceneRotY,
      sceneScale,
      nodesOpacity,
      nodesEntry,
      screensOpacity,
      screensEntry,
      glowOpacity,
      keyLightAngle,
      counters,
      activeAct: activeActIndex(p),
    }
  }
}
