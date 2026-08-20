// Geometría autoritativa del escudo (logo 1a) — caja 100×108, puntos en unidades
// absolutas de esa caja. Fuente única para el SVG del logo y el ExtrudeGeometry 3D.
export const SHIELD_BOX = { width: 100, height: 108 }

export const SHIELD_OUTER: [number, number][] = [
  [50, 0],
  [100, 21.6],
  [100, 64.8],
  [50, 108],
  [0, 64.8],
  [0, 21.6],
]

export const SHIELD_HOLE: [number, number][] = [
  [50, 28.08],
  [82, 60.48],
  [66, 60.48],
  [50, 44.28],
  [34, 60.48],
  [18, 60.48],
]
