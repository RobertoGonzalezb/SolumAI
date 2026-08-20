import { useMemo, useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getShieldGeometry } from './shieldGeometry'
import { LAYER_SCATTER, type Frame } from './narrativeMath'

function createGlowTexture(): THREE.CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(199,144,99,0.9)')
  gradient.addColorStop(1, 'rgba(199,144,99,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

let glowTex: THREE.CanvasTexture | null = null
function getGlowTexture(): THREE.CanvasTexture {
  if (!glowTex) glowTex = createGlowTexture()
  return glowTex
}

interface ScrollSceneProps {
  frameRef: MutableRefObject<Frame>
}

/**
 * Una escena, una malla, dos luces (spec §7). El "una malla" se cumple porque
 * las 4 capas del acto 01 son instancias de la MISMA ExtrudeGeometry — no hay
 * cuatro geometrías separadas.
 */
export default function ScrollScene({ frameRef }: ScrollSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const lightRef = useRef<THREE.DirectionalLight>(null)
  const glowRef = useRef<THREE.Sprite>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const geometry = useMemo(() => getShieldGeometry(), [])
  const glowTexture = useMemo(() => getGlowTexture(), [])

  useFrame(() => {
    const f = frameRef.current
    if (!f) return

    if (groupRef.current) {
      groupRef.current.rotation.x = f.sceneRotX
      groupRef.current.rotation.y = f.sceneRotY
      groupRef.current.scale.setScalar(f.sceneScale)
    }

    if (meshRef.current) {
      const spread = 1 - f.assembly
      for (let i = 0; i < LAYER_SCATTER.length; i++) {
        const layer = LAYER_SCATTER[i]
        dummy.position.set(layer.x * spread, layer.y * spread, layer.zEpsilon * f.assembly)
        dummy.rotation.set(0, ((layer.rotDeg * Math.PI) / 180) * spread, 0)
        dummy.scale.setScalar(1)
        dummy.updateMatrix()
        meshRef.current.setMatrixAt(i, dummy.matrix)
      }
      meshRef.current.instanceMatrix.needsUpdate = true
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = f.layerOpacity
      mat.transparent = f.layerOpacity < 0.999
    }

    if (lightRef.current) {
      const r = 4
      lightRef.current.position.set(Math.cos(f.keyLightAngle) * r, 2.2, Math.sin(f.keyLightAngle) * r)
    }

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.SpriteMaterial
      mat.opacity = f.glowOpacity
      glowRef.current.visible = f.glowOpacity > 0.001
    }
  })

  return (
    <>
      <ambientLight intensity={0.32} />
      <directionalLight ref={lightRef} intensity={1.15} color="#efe7dc" />
      <group ref={groupRef}>
        <sprite ref={glowRef} position={[0, 0, -0.35]} scale={[3.2, 3.2, 1]} visible={false}>
          <spriteMaterial
            map={glowTexture}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
        <instancedMesh ref={meshRef} args={[geometry, undefined, LAYER_SCATTER.length]}>
          <meshStandardMaterial color="#c79063" roughness={0.45} metalness={0.6} />
        </instancedMesh>
      </group>
    </>
  )
}
