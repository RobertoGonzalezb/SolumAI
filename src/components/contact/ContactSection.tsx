import CalEmbed from './CalEmbed'

export default function ContactSection() {
  return (
    <section id="contacto" className="section contact-section">
      <p className="eyebrow">Contacto</p>
      <h2 className="contact-heading">Agenda tu diagnóstico gratuito</h2>
      <p className="contact-sub">
        30 minutos para ver dónde tu negocio está perdiendo tiempo y qué automatizar primero.
        Sin compromiso.
      </p>

      <div className="cal-embed-frame">
        <CalEmbed />
      </div>

      <p className="contact-direct">
        ¿Prefieres escribir? <a href="mailto:robertogonzalezb4@gmail.com">robertogonzalezb4@gmail.com</a>
      </p>
    </section>
  )
}
