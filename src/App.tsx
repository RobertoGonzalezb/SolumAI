import ScrollNarrative from './components/scroll3d/ScrollNarrative'
import SolumLogo from './components/brand/SolumLogo'
import CaseStudySection from './components/case-study/CaseStudySection'
import ContactSection from './components/contact/ContactSection'
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
      <CaseStudySection />
      <ContactSection />
    </>
  )
}

export default App
