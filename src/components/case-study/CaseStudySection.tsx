export default function CaseStudySection() {
  return (
    <section id="caso-de-estudio" className="section case-study-section">
      <p className="eyebrow">Caso de estudio</p>
      <p className="case-study-meta">Vida Salud · Asesoría independiente de Isapre · Santiago, Chile</p>
      <h2 className="case-study-heading">
        Cómo Vida Salud pasó de no tener sitio web a un sistema que capta y organiza cada
        cotización sola.
      </h2>

      <div className="case-study-grid">
        <div className="case-study-block">
          <p className="case-study-label">El problema</p>
          <p>
            Vida Salud es la asesoría de Viviana Joustra, con más de 20 años de trayectoria en
            seguros de salud. Dependía por completo de referidos y contacto directo — sin sitio
            propio, no había forma de captar una cotización fuera de una llamada o un mensaje.
          </p>
        </div>
        <div className="case-study-block">
          <p className="case-study-label">El enfoque</p>
          <p>
            Construimos vidasaludisapre.cl desde cero, con un flujo de cotización pensado para
            que un visitante deje sus datos en menos de un minuto. Conectamos ese flujo a las
            herramientas que ella ya usaba para gestionar clientes, para que cada solicitud
            llegue organizada al lugar correcto — no perdida entre WhatsApp, correo y notas
            sueltas.
          </p>
        </div>
        <div className="case-study-block">
          <p className="case-study-label">El resultado</p>
          <p>
            Hoy cada cotización se captura y organiza sola, sin que Viviana tenga que perseguir
            nada a mano. Y el cambio no es solo operativo: un sitio bien construido cambia cómo
            una asesora independiente se percibe frente a un cliente que está comparando
            opciones — de una recomendación de boca en boca a una práctica que se ve establecida
            y seria.
          </p>
        </div>
      </div>

      <p className="case-study-link">
        Ver el sitio:{' '}
        <a href="https://www.vidasaludisapre.cl/" target="_blank" rel="noopener noreferrer">
          vidasaludisapre.cl ↗
        </a>
      </p>
    </section>
  )
}
