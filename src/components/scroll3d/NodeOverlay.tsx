import type { Ref } from 'react'

interface NodeOverlayProps {
  ref?: Ref<HTMLDivElement>
}

/**
 * Sistema de ilustración "Nodo" — mismas posiciones que la rejilla 80×80 del
 * spec (02-sistema-ilustracion-1c.md), pero con más carácter que un círculo
 * plano: caja redondeada + el chevron del escudo como glifo interior en los
 * nodos cobre (entrada/salida), y un rombo en los nodos hueso (sistemas del
 * cliente). Referencia pedida: diagramas de flujo tipo n8n, pero sin salirnos
 * de los dos colores de marca -- el "carácter" viene de la forma y la
 * profundidad, no de introducir un arcoíris de íconos.
 */
export default function NodeOverlay({ ref }: NodeOverlayProps) {
  return (
    <div className="act-overlay-position" aria-hidden="true">
      <div ref={ref} className="act-overlay">
        <svg viewBox="-14 -16 108 108" width="100%" height="100%">
          <g className="node-connectors" stroke="#5e4a36" strokeWidth="2" fill="none">
            <line x1="36" y1="6" x2="36" y2="26" />
            <line x1="36" y1="34" x2="36" y2="52" />
            <line x1="6" y1="38" x2="26" y2="38" />
            <line x1="46" y1="38" x2="66" y2="38" />
          </g>
          <g className="node-joints" fill="#5e4a36">
            <circle cx="36" cy="6" r="2" />
            <circle cx="36" cy="52" r="2" />
            <circle cx="6" cy="38" r="2" />
            <circle cx="66" cy="38" r="2" />
          </g>

          <g className="node-shapes">
            {/* Entrada — cobre, paso automatizado */}
            <rect x="18" y="-10" width="20" height="20" rx="5" fill="#c79063" />
            <path
              d="M22,4.5 L28,-1.5 L34,4.5"
              stroke="#131209"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Izquierda — hueso, sistema del cliente */}
            <rect x="-6" y="30" width="16" height="16" rx="4" fill="#efe7dc" />
            <rect
              x="-0.3"
              y="36.7"
              width="7"
              height="7"
              rx="1.5"
              transform="rotate(45 3.2 40.2)"
              fill="none"
              stroke="#131209"
              strokeWidth="1.6"
            />

            {/* Derecha — hueso, sistema del cliente */}
            <rect x="58" y="30" width="16" height="16" rx="4" fill="#efe7dc" />
            <rect
              x="63.7"
              y="36.7"
              width="7"
              height="7"
              rx="1.5"
              transform="rotate(45 67.2 40.2)"
              fill="none"
              stroke="#131209"
              strokeWidth="1.6"
            />

            {/* Salida — cobre, paso automatizado */}
            <rect x="18" y="52" width="20" height="20" rx="5" fill="#c79063" />
            <path
              d="M22,66.5 L28,60.5 L34,66.5"
              stroke="#131209"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
