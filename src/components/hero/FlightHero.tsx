import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { buildShieldTargets, buildTunnelField } from './heroTargets'

const SHIELD_NODES = 58
const TUNNEL_NODES = 130
const FLIGHT_MS = 4200
const CAMERA_START_Z = 8
const SHIELD_Z = -2.6

export const FLIGHT_DURATION_MS = FLIGHT_MS

export default function FlightHero() {
  const { camera, scene } = useThree()
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null)
  const shieldLineRef = useRef<THREE.LineSegments>(null)
  const tunnelMeshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const shieldField = useMemo(() => buildShieldTargets(SHIELD_NODES), [])
  const tunnelField = useMemo(
    () => buildTunnelField(TUNNEL_NODES, CAMERA_START_Z, SHIELD_Z - 1.4, 2.1),
    []
  )

  const shieldLineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(shieldField.edges.length * 2 * 3), 3))
    return geo
  }, [shieldField])

  const tunnelLineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(tunnelField.edges.length * 2 * 3)
    tunnelField.edges.forEach(([a, b], idx) => {
      const pa = tunnelField.positions[a]
      const pb = tunnelField.positions[b]
      positions.set([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z], idx * 6)
    })
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [tunnelField])

  useEffect(() => {
    scene.fog = new THREE.FogExp2('#0e0d0a', 0.11)
    // El túnel es estático — solo la cámara se mueve — así que las matrices se fijan una vez.
    tunnelField.positions.forEach((p, i) => {
      dummy.position.copy(p)
      dummy.scale.setScalar(0.7 + Math.random() * 0.6)
      dummy.updateMatrix()
      tunnelMeshRef.current?.setMatrixAt(i, dummy.matrix)
    })
    if (tunnelMeshRef.current) tunnelMeshRef.current.instanceMatrix.needsUpdate = true
    return () => {
      scene.fog = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, tunnelField])

  const startRef = useRef<number | null>(null)

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime() * 1000
    if (startRef.current === null) startRef.current = elapsed
    const t = reduced ? FLIGHT_MS : elapsed - startRef.current
    const p = Math.min(1, t / FLIGHT_MS)
    const e = 1 - Math.pow(1 - p, 2.2)

    const camZ = CAMERA_START_Z + (SHIELD_Z + 2.1 - CAMERA_START_Z) * e
    const driftAmount = reduced ? 0 : 1
    const driftX = Math.sin(elapsed * 0.00023) * 0.16 * driftAmount
    const driftY = Math.sin(elapsed * 0.00017 + 1.4) * 0.09 * driftAmount

    camera.position.set(driftX, driftY, camZ)
    camera.lookAt(driftX * 0.5, driftY * 0.5, SHIELD_Z)

    for (let i = 0; i < shieldField.positions.length; i++) {
      const target = shieldField.positions[i]
      dummy.position.set(target.x, target.y, SHIELD_Z + target.z)
      dummy.scale.setScalar(0.8 + 0.3 * e)
      dummy.updateMatrix()
      shieldMeshRef.current?.setMatrixAt(i, dummy.matrix)
    }
    if (shieldMeshRef.current) shieldMeshRef.current.instanceMatrix.needsUpdate = true

    if (shieldLineRef.current) {
      const posAttr = shieldLineRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
      shieldField.edges.forEach(([a, b], idx) => {
        const pa = shieldField.positions[a]
        const pb = shieldField.positions[b]
        posAttr.setXYZ(idx * 2, pa.x, pa.y, SHIELD_Z + pa.z)
        posAttr.setXYZ(idx * 2 + 1, pb.x, pb.y, SHIELD_Z + pb.z)
      })
      posAttr.needsUpdate = true
      ;(shieldLineRef.current.material as THREE.LineBasicMaterial).opacity = 0.15 + 0.35 * e
    }
  })

  return (
    <>
      <instancedMesh ref={tunnelMeshRef} args={[undefined, undefined, TUNNEL_NODES]}>
        <sphereGeometry args={[0.032, 8, 8]} />
        <meshStandardMaterial
          color="#c79063"
          emissive="#c79063"
          emissiveIntensity={0.6}
          roughness={0.5}
          metalness={0.4}
        />
      </instancedMesh>
      <lineSegments geometry={tunnelLineGeometry}>
        <lineBasicMaterial color="#5e4a36" transparent opacity={0.16} />
      </lineSegments>

      <instancedMesh ref={shieldMeshRef} args={[undefined, undefined, SHIELD_NODES]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#c79063" roughness={0.45} metalness={0.6} />
      </instancedMesh>
      <lineSegments ref={shieldLineRef} geometry={shieldLineGeometry}>
        <lineBasicMaterial color="#5e4a36" transparent opacity={0.2} />
      </lineSegments>
    </>
  )
}
