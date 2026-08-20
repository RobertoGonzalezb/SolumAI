import type { Ref } from 'react'

interface NodeOverlayProps {
  ref?: Ref<HTMLDivElement>
}

/**
 * Sistema de ilustración "Nodo". La versión original del spec conecta las
 * 4 posiciones con dos líneas rectas que se cruzan en el centro (una cruz
 * literal). Aquí las mismas 4 posiciones se conectan en cadena -- entrada→
 * izquierda→salida→derecha→entrada -- formando el contorno de un rombo con
 * diagonales de 45°, no un cruce central. Sigue leyéndose como entrada→
 * proceso→salida (spec §4), pero como una red conectada, no como una cruz.
 */
export default function NodeOverlay({ ref }: NodeOverlayProps) {
  return (
    <div className="act-overlay-position" aria-hidden="true">
      <div ref={ref} className="act-overlay">
        <svg viewBox="-4 -12 88 88" width="100%" height="100%">
          <g className="node-connectors" stroke="#5e4a36" strokeWidth="2" fill="none" strokeLinecap="round">
            <line x1="40" y1="4" x2="10" y2="34" />
            <line x1="10" y1="34" x2="40" y2="64" />
            <line x1="40" y1="64" x2="70" y2="34" />
            <line x1="70" y1="34" x2="40" y2="4" />
          </g>
          <g className="node-joints" fill="#5e4a36">
            <circle cx="40" cy="4" r="2" />
            <circle cx="10" cy="34" r="2" />
            <circle cx="40" cy="64" r="2" />
            <circle cx="70" cy="34" r="2" />
          </g>

          <g className="node-shapes">
            {/* Entrada — cobre, paso automatizado */}
            <rect x="30" y="-6" width="20" height="20" rx="5" fill="#c79063" />
            <path
              d="M34,8.5 L40,2.5 L46,8.5"
              stroke="#131209"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Izquierda — hueso, sistema del cliente */}
            <rect x="2" y="26" width="16" height="16" rx="4" fill="#efe7dc" />
            <rect
              x="5.7"
              y="29.7"
              width="7"
              height="7"
              rx="1.5"
              transform="rotate(45 9.2 33.2)"
              fill="none"
              stroke="#131209"
              strokeWidth="1.6"
            />

            {/* Salida — cobre, paso automatizado */}
            <rect x="30" y="54" width="20" height="20" rx="5" fill="#c79063" />
            <path
              d="M34,68.5 L40,62.5 L46,68.5"
              stroke="#131209"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Derecha — hueso, sistema del cliente */}
            <rect x="62" y="26" width="16" height="16" rx="4" fill="#efe7dc" />
            <rect
              x="65.7"
              y="29.7"
              width="7"
              height="7"
              rx="1.5"
              transform="rotate(45 69.2 33.2)"
              fill="none"
              stroke="#131209"
              strokeWidth="1.6"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
