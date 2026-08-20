import { ACTS } from './narrativeMath'

interface ActRailProps {
  activeAct: number
}

export default function ActRail({ activeAct }: ActRailProps) {
  return (
    <ul className="act-rail">
      {ACTS.map((act, i) => (
        <li key={act.key} className={i === activeAct ? 'active' : undefined}>
          <span className="act-rail-dot" aria-hidden="true" />
          {act.label}
        </li>
      ))}
    </ul>
  )
}
