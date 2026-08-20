const CAL_LINK = 'robertito-g-az0gey'

/**
 * iframe directo en vez del widget JS de @calcom/embed-react. Ese widget se
 * comunica con el iframe vía postMessage para redimensionarse -- justo el
 * tipo de cosa que Safari bloquea con más facilidad bajo su protección de
 * rastreo entre sitios (ITP). Un iframe simple no depende de esa
 * comunicación: carga la página de reserva tal cual, funciona igual en
 * cualquier navegador.
 *
 * Probé la ruta /embed (pensada para incrustar) porque sí respeta
 * theme=dark ahí adentro -- pero sin el protocolo JS de Cal, la tarjeta de
 * reserva nunca termina de cargar contenido real, solo el fondo oscuro. La
 * ruta de perfil normal sí carga el contenido siempre, pero mantiene su
 * tarjeta clara incluso con theme=dark. El marco (.cal-embed-frame) está
 * diseñado a propósito en tono claro para que esa tarjeta se sienta
 * intencional, no como un error de tema.
 */
export default function CalEmbed() {
  return (
    <iframe
      src={`https://cal.com/${CAL_LINK}?theme=dark`}
      title="Agendar llamada"
      style={{ width: '100%', height: '100%', border: 0 }}
      loading="lazy"
    />
  )
}
