const CAL_LINK = 'robertito-g-az0gey'

/**
 * iframe directo en vez del widget JS de @calcom/embed-react. Ese widget se
 * comunica con el iframe vía postMessage para redimensionarse -- justo el
 * tipo de cosa que Safari bloquea con más facilidad bajo su protección de
 * rastreo entre sitios (ITP). Un iframe simple no depende de esa
 * comunicación: carga la página de reserva tal cual, funciona igual en
 * cualquier navegador.
 *
 * theme=dark en la URL es una preferencia por visitante (depende de que el
 * navegador guarde/lea ese estado), justo lo que Safari bloquea para
 * iframes de terceros -- por eso funcionaba en Chrome pero no en Safari.
 * El tema oscuro real viene del ajuste de cuenta en Cal.com (Settings → My
 * Account → Appearance → Theme del booking page = Dark), que renderiza
 * oscuro para todos sin depender de nada del visitante. El parámetro queda
 * aquí solo como respaldo si ese ajuste llegara a cambiar.
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
