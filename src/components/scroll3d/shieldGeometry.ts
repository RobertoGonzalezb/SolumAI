import * as THREE from 'three'
import { SHIELD_BOX, SHIELD_HOLE, SHIELD_OUTER } from '../../lib/shieldSpec'

// Mismo mapeo a espacio local que se usó para la nube de puntos del hero anterior,
// para que el tamaño del escudo se sienta consistente en todo el sitio.
function toLocal([x, y]: [number, number]): [number, number] {
  return [((x - 50) / SHIELD_BOX.width) * 2.7, -((y - 54) / SHIELD_BOX.height) * 2.7]
}

let cached: THREE.ExtrudeGeometry | null = null

/**
 * Un solo ExtrudeGeometry del escudo — silueta + galón como agujero real
 * (THREE.Path en shape.holes, no relleno, no textura). ~200–400 triángulos.
 * Memoizado a nivel de módulo: la spec pide "una malla", así que todas las
 * instancias comparten la misma geometría.
 */
export function getShieldGeometry(): THREE.ExtrudeGeometry {
  if (cached) return cached

  const outer = SHIELD_OUTER.map(toLocal)
  const hole = SHIELD_HOLE.map(toLocal)

  const shape = new THREE.Shape()
  outer.forEach(([x, y], i) => (i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)))
  shape.closePath()

  const holePath = new THREE.Path()
  hole.forEach(([x, y], i) => (i === 0 ? holePath.moveTo(x, y) : holePath.lineTo(x, y)))
  holePath.closePath()
  shape.holes.push(holePath)

  const height = 2.7 // alto local del escudo tras toLocal
  const depth = 0.18 * height
  const bevelThickness = Math.min(0.02 * height, depth * 0.4)

  cached = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness,
    bevelSize: bevelThickness,
    bevelSegments: 2,
    curveSegments: 1, // el contorno es todo recto — sin segmentos de curva que gastar
  })
  cached.center()
  return cached
}
