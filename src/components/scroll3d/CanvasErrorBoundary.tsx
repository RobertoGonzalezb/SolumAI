import { Component, type ReactNode } from 'react'
import SolumMark from '../brand/SolumMark'

interface Props {
  children: ReactNode
}

interface State {
  failed: boolean
}

/**
 * Si WebGL truena en tiempo de ejecución (contexto perdido, driver raro,
 * lo que sea), sin esto el canvas queda en negro para siempre y el resto
 * de la página sigue funcionando como si nada -- exactamente el bug
 * reportado. Con esto, cae a la marca estática en vez de a un vacío.
 */
export default class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Escena 3D falló, mostrando el escudo estático:', error)
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="canvas-fallback-mark" aria-hidden="true">
          <SolumMark height={140} />
        </div>
      )
    }
    return this.props.children
  }
}
