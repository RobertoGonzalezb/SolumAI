import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing'
import FlightHero from './FlightHero'

export default function Hero() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 42 }} gl={{ antialias: true }}>
        <color attach="background" args={['#0e0d0a']} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[3, 2.5, 4]} intensity={1.1} color="#efe7dc" />
          <directionalLight position={[-3, -1, -2]} intensity={0.35} color="#c79063" />
          <FlightHero />
          <EffectComposer>
            <DepthOfField focusDistance={0.015} focalLength={0.045} bokehScale={4} />
            <Bloom intensity={0.4} luminanceThreshold={0.2} luminanceSmoothing={0.5} mipmapBlur />
            <Vignette eskil={false} offset={0.25} darkness={0.85} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
