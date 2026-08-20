import type { MutableRefObject } from 'react'
import { Canvas } from '@react-three/fiber'
import ScrollScene from './ScrollScene'
import type { Frame } from './narrativeMath'

interface NarrativeCanvasProps {
  frameRef: MutableRefObject<Frame>
  invalidateRef: MutableRefObject<(() => void) | null>
}

// Default export propio para que App.tsx pueda cargarlo con React.lazy() y el
// bundle de three.js/R3F nunca se descargue cuando no hace falta (spec §8).
// frameloop="demand" + invalidate expuesto hacia afuera: la escena solo
// renderiza cuando el scroll realmente cambia p, nunca en un bucle perpetuo.
export default function NarrativeCanvas({ frameRef, invalidateRef }: NarrativeCanvasProps) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={(state) => {
        invalidateRef.current = state.invalidate
        state.invalidate()
      }}
    >
      <ScrollScene frameRef={frameRef} />
    </Canvas>
  )
}
