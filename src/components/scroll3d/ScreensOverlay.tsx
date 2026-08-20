import type { Ref } from 'react'

interface ScreensOverlayProps {
  ref?: Ref<HTMLDivElement>
}

/**
 * Acto 04 — tres rectángulos de solo contorno (escritorio, móvil, app interna).
 * Son un diagrama, nunca mockups reales (spec §5, §9).
 */
export default function ScreensOverlay({ ref }: ScreensOverlayProps) {
  return (
    <div className="act-overlay-position" aria-hidden="true">
      <div ref={ref} className="act-overlay act-overlay--screens">
        <div className="screen-rect screen-rect--desktop" />
        <div className="screen-rect screen-rect--app" />
        <div className="screen-rect screen-rect--mobile" />
      </div>
    </div>
  )
}
