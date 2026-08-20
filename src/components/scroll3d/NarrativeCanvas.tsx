import type { MutableRefObject } from 'react'
import { Canvas } from '@react-three/fiber'
import ScrollScene from './ScrollScene'
import type { Frame } from './narrativeMath'

interface NarrativeCanvasProps {
  frameRef: MutableRefObject<Frame>
  invalidateRef: MutableRefObject<(() => void) | null>
  isCompact?: boolean
}

// Default export propio para que App.tsx pueda cargarlo con React.lazy() y el
// bundle de three.js/R3F nunca se descargue cuando no hace falta (spec §8).
// frameloop="demand" + invalidate expuesto hacia afuera: la escena solo
// renderiza cuando el scroll realmente cambia p, nunca en un bucle perpetuo.
// En compacto (móvil) el dpr se topa en 1.5 y se apaga el antialiasing MSAA
// del contexto -- la geometría ya es liviana, lo caro en gama baja es el
// fill-rate de la pantalla, no el conteo de triángulos.
export default function NarrativeCanvas({ frameRef, invalidateRef, isCompact }: NarrativeCanvasProps) {
  return (
    <Canvas
      frameloop="demand"
      dpr={isCompact ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 5], fov: 38 }}
      gl={{ antialias: !isCompact, alpha: true }}
      onCreated={(state) => {
        invalidateRef.current = state.invalidate
        // Un solo invalidate() aquí a veces pinta antes de que el tamaño real
        // del canvas se asiente (queda en blanco hasta el primer scroll).
        // Reintentar en los siguientes frames garantiza el primer pintado.
        state.invalidate()
        requestAnimationFrame(() => state.invalidate())
        requestAnimationFrame(() => requestAnimationFrame(() => state.invalidate()))
      }}
    >
      <ScrollScene frameRef={frameRef} />
    </Canvas>
  )
}
