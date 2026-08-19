import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { buildCrystalTargets, buildShieldTargets, scatterPositions, type TargetField } from './heroTargets'

interface AssemblingFieldProps {
  mode: 'shield' | 'crystal'
}

const NODE_COUNT = 58
const ASSEMBLE_MS = 2600
const HOLD_MS = 2600

export default function AssemblingField({ mode }: AssemblingFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const lineRef = useRef<THREE.LineSegments>(null)
  const groupRef = useRef<THREE.Group>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const field: TargetField = useMemo(
    () => (mode === 'shield' ? buildShieldTargets(NODE_COUNT) : buildCrystalTargets(NODE_COUNT)),
    [mode]
  )
  const scatter = useMemo(() => scatterPositions(NODE_COUNT, 2.4), [mode])

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(field.edges.length * 2 * 3), 3))
    return geo
  }, [field])

  const startRef = useRef<number | null>(null)
  useEffect(() => {
    startRef.current = null
  }, [mode])

  useFrame((state) => {
    const elapsedMs = state.clock.getElapsedTime() * 1000
    if (startRef.current === null) startRef.current = elapsedMs
    const cycle = ASSEMBLE_MS + HOLD_MS
    const t = reduced ? ASSEMBLE_MS : (elapsedMs - startRef.current) % cycle
    const p = Math.min(1, t / ASSEMBLE_MS)
    const e = 1 - Math.pow(1 - p, 3)

    const current: THREE.Vector3[] = []
    for (let i = 0; i < field.positions.length; i++) {
      const s = scatter[i]
      const target = field.positions[i]
      const x = s.x + (target.x - s.x) * e
      const y = s.y + (target.y - s.y) * e
      const z = s.z + (target.z - s.z) * e
      current.push(new THREE.Vector3(x, y, z))
      if (meshRef.current) {
        dummy.position.set(x, y, z)
        dummy.scale.setScalar(0.7 + 0.3 * e)
        dummy.updateMatrix()
        meshRef.current.setMatrixAt(i, dummy.matrix)
      }
    }
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true

    if (lineRef.current) {
      const posAttr = lineRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
      field.edges.forEach(([a, b], idx) => {
        const pa = current[a]
        const pb = current[b]
        posAttr.setXYZ(idx * 2, pa.x, pa.y, pa.z)
        posAttr.setXYZ(idx * 2 + 1, pb.x, pb.y, pb.z)
      })
      posAttr.needsUpdate = true
      const mat = lineRef.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.12 + 0.35 * e
    }

    // El escudo no debe leerse mal al girar: tope ±25° por spec. Se aplica igual
    // al cristal para que la comparación sea justa.
    if (groupRef.current && !reduced) {
      groupRef.current.rotation.y = Math.sin(elapsedMs * 0.00015) * 0.42
      groupRef.current.rotation.x = Math.sin(elapsedMs * 0.00011) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#c79063" roughness={0.45} metalness={0.6} />
      </instancedMesh>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#5e4a36" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}
