import type { CSSProperties } from 'react'
import Hero from './components/hero/Hero'
import { FLIGHT_DURATION_MS } from './components/hero/FlightHero'
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

      <section className="hero">
        <Hero />
        <div className="hero-content" style={{ '--reveal-delay': `${FLIGHT_DURATION_MS - 300}ms` } as CSSProperties}>
          <p className="eyebrow">Solum AI</p>
          <h1>
            Sistemas de IA que sostienen
            <br />
            decisiones reales.
          </h1>
          <p className="hero-sub">
            Construimos infraestructura de IA para negocios que necesitan
            resultados, no demos.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="#contacto">
              Agendar llamada
            </a>
            <a className="btn-secondary" href="#caso-de-estudio">
              Ver caso de estudio
            </a>
          </div>
        </div>
      </section>

      <section id="caso-de-estudio" className="section">
        <p className="eyebrow">01 — Caso de estudio</p>
        <h2>Próximamente</h2>
      </section>

      <section id="metodo" className="section">
        <p className="eyebrow">02 — Método</p>
        <h2>Próximamente</h2>
      </section>

      <section id="contacto" className="section">
        <p className="eyebrow">03 — Contacto</p>
        <h2>Próximamente</h2>
      </section>
    </>
  )
}

export default App
