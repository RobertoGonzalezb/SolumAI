import type { Ref } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

interface TextColumnProps {
  rightRef?: Ref<HTMLDivElement>
  trackRef?: Ref<HTMLDivElement>
  registerCounter: (key: string, el: HTMLSpanElement | null) => void
}

function CounterLabel({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  )
}

/**
 * Los cinco bloques de texto, copy desde i18n/translations.ts. El track se
 * traslada verticalmente vía transform (escrito por ScrollNarrative en cada
 * tick de rAF) — nunca con estado de React, para que el scroll siga al dedo
 * del usuario sin el retraso de un render.
 */
export default function TextColumn({ rightRef, trackRef, registerCounter }: TextColumnProps) {
  const { t } = useLanguage()

  return (
    <div className="narrative-right" ref={rightRef}>
      <div className="narrative-track" ref={trackRef}>
        {t.acts.map((act, i) => (
          <div className="narrative-block" key={i}>
            <p className="eyebrow">{act.eyebrow}</p>
            <h2>{act.headline}</h2>

            {act.body && <p className="narrative-body">{act.body}</p>}

            {act.bullets && (
              <ul className="narrative-bullets">
                {act.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}

            {act.counters && (
              <div className="narrative-counters">
                {act.counters.map((c) => (
                  <div className="counter" key={c.key}>
                    <span className="counter-value" ref={(el) => registerCounter(c.key, el)}>
                      0
                    </span>
                    <span className="counter-label">
                      <CounterLabel text={c.label} />
                    </span>
                  </div>
                ))}
                {act.cta && (
                  <a className="narrative-cta" href="#contacto">
                    {act.cta}
                  </a>
                )}
              </div>
            )}

            {act.fineprint && <p className="narrative-fineprint">{act.fineprint}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
