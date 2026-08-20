import SolumMark from '../brand/SolumMark'
import { useLanguage } from '../../i18n/LanguageContext'
import { COUNTERS } from './narrativeMath'

const COUNTER_MAX: Record<string, number> = Object.fromEntries(COUNTERS.map((c) => [c.key, c.max]))

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
 * Sin WebGL: el escudo es una imagen estática y los cinco actos son secciones
 * normales apiladas, mismo orden y mismo texto, contadores en su valor final
 * (spec §8). Se usa con prefers-reduced-motion o cuando WebGL no está
 * disponible.
 */
export default function StaticFallback() {
  const { t } = useLanguage()

  return (
    <div className="narrative-fallback">
      <div className="narrative-fallback-mark">
        <SolumMark height={96} />
      </div>

      {t.acts.map((act, i) => (
        <section className="narrative-fallback-block" key={i}>
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
                  <span className="counter-value">{COUNTER_MAX[c.key] ?? 0}</span>
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
        </section>
      ))}
    </div>
  )
}
