import ScrollNarrative from './components/scroll3d/ScrollNarrative'
import SolumLogo from './components/brand/SolumLogo'
import './App.css'

function App() {
  return (
    <>
      <header className="nav">
        <SolumLogo height={40} />
        <a className="nav-cta" href="#contacto">
          Agendar llamada
        </a>
      </header>

      <ScrollNarrative />

      <section id="caso-de-estudio" className="section">
        <p className="eyebrow">Caso de estudio</p>
        <h2>Próximamente</h2>
      </section>

      <section id="contacto" className="section">
        <p className="eyebrow">Contacto</p>
        <h2>Próximamente</h2>
      </section>
    </>
  )
}

export default App
