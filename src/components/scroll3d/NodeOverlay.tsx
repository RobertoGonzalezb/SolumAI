import type { Ref } from 'react'

interface NodeOverlayProps {
  ref?: Ref<HTMLDivElement>
}

/**
 * Sistema de ilustración "Nodo" (1c) — rejilla 80×80, geometría exacta de
 * 02-sistema-ilustracion-1c.md. Cobre = paso automatizado, hueso = sistema
 * del cliente. Conectores dibujados antes que los nodos (quedan debajo).
 */
export default function NodeOverlay({ ref }: NodeOverlayProps) {
  return (
    <div className="act-overlay-position" aria-hidden="true">
      <div ref={ref} className="act-overlay">
        <svg viewBox="-12 -12 104 104" width="100%" height="100%">
          <line x1="36" y1="6" x2="36" y2="42" stroke="#5e4a36" strokeWidth="2" />
          <line x1="36" y1="38" x2="36" y2="72" stroke="#5e4a36" strokeWidth="2" />
          <line x1="10" y1="38" x2="70" y2="38" stroke="#5e4a36" strokeWidth="2" />
          <circle cx="28" cy="0" r="11" fill="#c79063" />
          <circle cx="2" cy="30" r="9" fill="#efe7dc" />
          <circle cx="60" cy="30" r="9" fill="#efe7dc" />
          <circle cx="28" cy="58" r="11" fill="#c79063" />
        </svg>
      </div>
    </div>
  )
}
