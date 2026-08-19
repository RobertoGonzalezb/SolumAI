import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import AssemblingField from './AssemblingField'

interface HeroPlaceholderProps {
  mode: 'shield' | 'crystal'
}

export default function HeroPlaceholder({ mode }: HeroPlaceholderProps) {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 42 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[3, 2.5, 4]} intensity={1.3} color="#efe7dc" />
          <directionalLight position={[-3, -1, -2]} intensity={0.4} color="#c79063" />
          <AssemblingField mode={mode} />
        </Suspense>
      </Canvas>
    </div>
  )
}
