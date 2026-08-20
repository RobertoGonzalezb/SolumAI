import SolumMark from '../brand/SolumMark'

/**
 * Sin WebGL: el escudo es una imagen estática y los cinco actos son secciones
 * normales apiladas, mismo orden y mismo texto, contadores en su valor final
 * (spec §8). Se usa con prefers-reduced-motion o ancho de viewport < 900px.
 */
export default function StaticFallback() {
  return (
    <div className="narrative-fallback">
      <div className="narrative-fallback-mark">
        <SolumMark height={96} />
      </div>

      <section className="narrative-fallback-block">
        <p className="eyebrow">01 · El problema</p>
        <h2>
          Tu negocio no tiene un problema de esfuerzo. Tiene un problema de piezas
          sueltas.
        </h2>
        <div className="narrative-counters">
          <div className="counter">
            <span className="counter-value">6</span>
            <span className="counter-label">
              Herramientas que
              <br />
              no se hablan
            </span>
          </div>
          <div className="counter">
            <span className="counter-value">11</span>
            <span className="counter-label">
              Horas/semana en
              <br />
              tareas repetidas
            </span>
          </div>
        </div>
      </section>

      <section className="narrative-fallback-block">
        <p className="eyebrow">02 · La respuesta</p>
        <h2>Las unimos en un solo sistema, y ese sistema tiene un dueño: nosotros.</h2>
        <p className="narrative-body">
          Diagnóstico, construcción y mantenimiento en un mismo contrato. Nada de tres
          proveedores culpándose entre ellos.
        </p>
      </section>

      <section className="narrative-fallback-block">
        <p className="eyebrow">03 · Automatización con IA</p>
        <h2>Quitamos de tu día el trabajo que una máquina ya puede hacer.</h2>
        <ul className="narrative-bullets">
          <li>Presupuestos, facturas y seguimientos que se escriben solos</li>
          <li>Atención al cliente 24/7 con tu tono, no con el de un robot</li>
          <li>Tus herramientas actuales conectadas entre sí, sin cambiarlas</li>
        </ul>
      </section>

      <section className="narrative-fallback-block">
        <p className="eyebrow">04 · Webs y apps</p>
        <h2>Y construimos el producto donde vive tu negocio.</h2>
        <ul className="narrative-bullets">
          <li>Web que explica lo que vendes y capta al que ya está listo</li>
          <li>App interna para que tu equipo deje de trabajar en hojas de cálculo</li>
          <li>Todo sobre el mismo sistema, no como islas separadas</li>
        </ul>
      </section>

      <section className="narrative-fallback-block">
        <p className="eyebrow">05 · Empezar</p>
        <h2>Diagnóstico gratuito. Te decimos qué automatizar primero.</h2>
        <div className="narrative-counters">
          <div className="counter">
            <span className="counter-value">14</span>
            <span className="counter-label">
              Días hasta el
              <br />
              primer proceso vivo
            </span>
          </div>
          <a className="narrative-cta" href="#contacto">
            Pedir diagnóstico
          </a>
        </div>
        <p className="narrative-fineprint">Cifras de ejemplo — sustituir por datos reales.</p>
      </section>
    </div>
  )
}
