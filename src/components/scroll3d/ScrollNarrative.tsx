import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { NarrativeDriver, type Frame } from './narrativeMath'
import NodeOverlay from './NodeOverlay'
import ScreensOverlay from './ScreensOverlay'
import ActRail from './ActRail'
import TextColumn from './TextColumn'
import StaticFallback from './StaticFallback'
import CanvasErrorBoundary from './CanvasErrorBoundary'
import './narrative.css'

const LazyNarrativeCanvas = lazy(() => import('./NarrativeCanvas'))

const INITIAL_FRAME: Frame = new NarrativeDriver().update(0)
const COMPACT_BREAKPOINT = 780

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

// prefers-reduced-motion o falta de soporte real de WebGL sacan el 3D por
// completo. El ancho ya no decide "3D sí/no" -- decide qué tan liviana es
// la escena (ver isCompact).
function computeEnable3D(): boolean {
  if (typeof window === 'undefined') return false
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const webgl = hasWebGL()
  if (reduced || !webgl) {
    console.info(
      `[Solum] Vista estática activa — reduce motion: ${reduced}, WebGL disponible: ${webgl}. ` +
        'Esto es intencional (spec 03-PROMPT-scroll-3d.md §8), no un error.'
    )
  }
  return !reduced && webgl
}

function computeIsCompact(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < COMPACT_BREAKPOINT
}

export default function ScrollNarrative() {
  const [enable3D, setEnable3D] = useState<boolean>(computeEnable3D)
  const [isCompact, setIsCompact] = useState<boolean>(computeIsCompact)
  const [activeAct, setActiveAct] = useState(0)

  const containerRef = useRef<HTMLElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const textTrackRef = useRef<HTMLDivElement>(null)
  const nodeOverlayRef = useRef<HTMLDivElement>(null)
  const screensOverlayRef = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<Record<string, HTMLSpanElement | null>>({})

  const driverRef = useRef(new NarrativeDriver())
  const frameRef = useRef<Frame>(INITIAL_FRAME)
  const invalidateRef = useRef<(() => void) | null>(null)
  const inViewRef = useRef(true)
  const scheduledRef = useRef(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setEnable3D(computeEnable3D())
      setIsCompact(computeIsCompact())
    }
    update()
    mql.addEventListener('change', update)
    window.addEventListener('resize', update)
    return () => {
      mql.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    if (!enable3D) return

    const tick = () => {
      scheduledRef.current = false
      const container = containerRef.current
      if (!container || !inViewRef.current) return

      const rect = container.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0

      const frame = driverRef.current.update(p)
      frameRef.current = frame
      invalidateRef.current?.()

      if (textTrackRef.current) {
        const trackHeight = rightColRef.current?.clientHeight || window.innerHeight
        textTrackRef.current.style.transform = `translateY(-${frame.p * 4 * trackHeight}px)`
      }
      if (nodeOverlayRef.current) {
        nodeOverlayRef.current.style.opacity = String(frame.nodesOpacity)
        nodeOverlayRef.current.style.transform = `scale(${0.86 + 0.14 * frame.nodesEntry}) rotate(${-8 * (1 - frame.nodesEntry)}deg)`
      }
      if (screensOverlayRef.current) {
        screensOverlayRef.current.style.opacity = String(frame.screensOpacity)
        screensOverlayRef.current.style.transform = `scale(${0.9 + 0.1 * frame.screensEntry}) translateY(${14 * (1 - frame.screensEntry)}px)`
      }
      for (const key of Object.keys(counterRefs.current)) {
        const el = counterRefs.current[key]
        if (el) el.textContent = String(frame.counters[key] ?? 0)
      }
      setActiveAct((prev) => (prev === frame.activeAct ? prev : frame.activeAct))
    }

    const requestTick = () => {
      if (!scheduledRef.current) {
        scheduledRef.current = true
        requestAnimationFrame(tick)
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        if (entry.isIntersecting) requestTick()
      },
      { threshold: 0 }
    )
    if (containerRef.current) io.observe(containerRef.current)

    window.addEventListener('scroll', requestTick, { passive: true })
    requestTick()

    return () => {
      window.removeEventListener('scroll', requestTick)
      io.disconnect()
    }
  }, [enable3D])

  if (!enable3D) return <StaticFallback />

  return (
    <section className={`narrative${isCompact ? ' is-compact' : ''}`} ref={containerRef}>
      <div className="narrative-sticky">
        <div className="narrative-left">
          <CanvasErrorBoundary>
            <Suspense fallback={null}>
              <LazyNarrativeCanvas frameRef={frameRef} invalidateRef={invalidateRef} isCompact={isCompact} />
            </Suspense>
          </CanvasErrorBoundary>
          <NodeOverlay ref={nodeOverlayRef} />
          <ScreensOverlay ref={screensOverlayRef} />
          <ActRail activeAct={activeAct} />
        </div>
        <TextColumn
          rightRef={rightColRef}
          trackRef={textTrackRef}
          registerCounter={(key, el) => (counterRefs.current[key] = el)}
        />
      </div>
    </section>
  )
}
