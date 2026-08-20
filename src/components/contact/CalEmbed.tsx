const CAL_LINK = 'robertito-g-az0gey'

/**
 * iframe directo en vez del widget JS de @calcom/embed-react. Ese widget se
 * comunica con el iframe vía postMessage para redimensionarse -- justo el
 * tipo de cosa que Safari bloquea con más facilidad bajo su protección de
 * rastreo entre sitios (ITP). Un iframe simple no depende de esa
 * comunicación: carga la página de reserva tal cual, funciona igual en
 * cualquier navegador.
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
