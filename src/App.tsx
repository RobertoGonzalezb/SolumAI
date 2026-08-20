import ScrollNarrative from './components/scroll3d/ScrollNarrative'
import SolumLogo from './components/brand/SolumLogo'
import GlobeIcon from './components/brand/GlobeIcon'
import CaseStudySection from './components/case-study/CaseStudySection'
import ContactSection from './components/contact/ContactSection'
import { useLanguage } from './i18n/LanguageContext'
import './App.css'

function App() {
  const { lang, t, toggleLang } = useLanguage()

  return (
    <>
      <header className="nav">
        <SolumLogo height={40} />
        <div className="nav-actions">
          <button
            type="button"
            className="lang-toggle"
            onClick={toggleLang}
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
          >
            <GlobeIcon />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a className="nav-cta" href="#contacto">
            {t.nav.cta}
          </a>
        </div>
      </header>

      <ScrollNarrative />
      <CaseStudySection />
      <ContactSection />
    </>
  )
}

export default App
