import { useLanguage } from '../../i18n/LanguageContext'

export default function CaseStudySection() {
  const { t } = useLanguage()
  const cs = t.caseStudy

  return (
    <section id="caso-de-estudio" className="section case-study-section">
      <p className="eyebrow">{cs.eyebrow}</p>
      <p className="case-study-meta">{cs.meta}</p>
      <h2 className="case-study-heading">{cs.headline}</h2>

      <div className="case-study-grid">
        <div className="case-study-block">
          <p className="case-study-label">{cs.labels[0]}</p>
          <p>{cs.problem}</p>
        </div>
        <div className="case-study-block">
          <p className="case-study-label">{cs.labels[1]}</p>
          <p>{cs.approach}</p>
        </div>
        <div className="case-study-block">
          <p className="case-study-label">{cs.labels[2]}</p>
          <p>{cs.result}</p>
        </div>
      </div>

      <p className="case-study-link">
        {cs.linkLabel}{' '}
        <a href="https://www.vidasaludisapre.cl/" target="_blank" rel="noopener noreferrer">
          vidasaludisapre.cl ↗
        </a>
      </p>
    </section>
  )
}
