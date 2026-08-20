import CalEmbed from './CalEmbed'
import { useLanguage } from '../../i18n/LanguageContext'

export default function ContactSection() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <section id="contacto" className="section contact-section">
      <p className="eyebrow">{c.eyebrow}</p>
      <h2 className="contact-heading">{c.heading}</h2>
      <p className="contact-sub">{c.sub}</p>

      <div className="cal-embed-frame">
        <CalEmbed />
      </div>

      <p className="contact-direct">
        {c.directPrefix} <a href="mailto:robertogonzalezb4@gmail.com">robertogonzalezb4@gmail.com</a>
      </p>
    </section>
  )
}
