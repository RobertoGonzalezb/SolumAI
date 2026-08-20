import { ACTS } from './narrativeMath'
import { useLanguage } from '../../i18n/LanguageContext'

interface ActRailProps {
  activeAct: number
}

export default function ActRail({ activeAct }: ActRailProps) {
  const { t } = useLanguage()

  return (
    <ul className="act-rail">
      {ACTS.map((act, i) => (
        <li key={act.key} className={i === activeAct ? 'active' : undefined}>
          <span className="act-rail-dot" aria-hidden="true" />
          {t.actRail[i]}
        </li>
      ))}
    </ul>
  )
}
