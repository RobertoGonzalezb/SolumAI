import type { Ref } from 'react'

interface TextColumnProps {
  rightRef?: Ref<HTMLDivElement>
  trackRef?: Ref<HTMLDivElement>
  registerCounter: (key: string, el: HTMLSpanElement | null) => void
}

/**
 * Los cinco bloques de texto, copy exacto de la especificación. El track se
 * traslada verticalmente vía transform (escrito por ScrollNarrative en cada
 * tick de rAF) — nunca con estado de React, para que el scroll siga al dedo
 * del usuario sin el retraso de un render.
 */
export default function TextColumn({ rightRef, trackRef, registerCounter }: TextColumnProps) {
  return (
    <div className="narrative-right" ref={rightRef}>
      <div className="narrative-track" ref={trackRef}>
        <div className="narrative-block">
          <p className="eyebrow">01 · El problema</p>
          <h2>
            Tu negocio no tiene un problema de esfuerzo. Tiene un problema de piezas
            sueltas.
          </h2>
          <div className="narrative-counters">
            <div className="counter">
              <span className="counter-value" ref={(el) => registerCounter('tools', el)}>
                0
              </span>
              <span className="counter-label">
                Herramientas que
                <br />
                no se hablan
              </span>
            </div>
            <div className="counter">
              <span className="counter-value" ref={(el) => registerCounter('hours', el)}>
                0
              </span>
              <span className="counter-label">
                Horas/semana en
                <br />
                tareas repetidas
              </span>
            </div>
          </div>
        </div>

        <div className="narrative-block">
          <p className="eyebrow">02 · La respuesta</p>
          <h2>Las unimos en un solo sistema, y ese sistema tiene un dueño: nosotros.</h2>
          <p className="narrative-body">
            Diagnóstico, construcción y mantenimiento en un mismo contrato. Nada de
            tres proveedores culpándose entre ellos.
          </p>
        </div>

        <div className="narrative-block">
          <p className="eyebrow">03 · Automatización con IA</p>
          <h2>Quitamos de tu día el trabajo que una máquina ya puede hacer.</h2>
          <ul className="narrative-bullets">
            <li>Presupuestos, facturas y seguimientos que se escriben solos</li>
            <li>Atención al cliente 24/7 con tu tono, no con el de un robot</li>
            <li>Tus herramientas actuales conectadas entre sí, sin cambiarlas</li>
          </ul>
        </div>

        <div className="narrative-block">
          <p className="eyebrow">04 · Webs y apps</p>
          <h2>Y construimos el producto donde vive tu negocio.</h2>
          <ul className="narrative-bullets">
            <li>Web que explica lo que vendes y capta al que ya está listo</li>
            <li>App interna para que tu equipo deje de trabajar en hojas de cálculo</li>
            <li>Todo sobre el mismo sistema, no como islas separadas</li>
          </ul>
        </div>

        <div className="narrative-block">
          <p className="eyebrow">05 · Empezar</p>
          <h2>Diagnóstico gratuito. Te decimos qué automatizar primero.</h2>
          <div className="narrative-counters">
            <div className="counter">
              <span className="counter-value" ref={(el) => registerCounter('days', el)}>
                0
              </span>
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
        </div>
      </div>
    </div>
  )
}
