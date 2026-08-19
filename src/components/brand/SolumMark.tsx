type Variant = 'primary-dark' | 'primary-light' | 'ink' | 'bone' | 'copper-full'

const VARIANT_FILL: Record<Variant, string> = {
  'primary-dark': '#C79063',
  'primary-light': '#C79063',
  ink: '#0E0D0A',
  bone: '#EFE7DC',
  'copper-full': '#C79063',
}

interface SolumMarkProps {
  height?: number
  variant?: Variant
  className?: string
}

/**
 * Símbolo "Escudo" — ruta 1a, geometría autoritativa en
 * design_handoff_solum_identity/01-logo-principal-1a.md.
 * Un solo path, fill-rule evenodd (silueta + galón como agujero real).
 * Por debajo de 20px de alto usa el galón engrosado (ajuste óptico del spec).
 */
export default function SolumMark({ height = 82, variant = 'primary-dark', className }: SolumMarkProps) {
  const width = (76 / 82) * height
  const thin = height < 20
  const chevron = thin
    ? 'M50,28.08 L82,60.48 L63,60.48 L50,44.28 L37,60.48 L18,60.48 Z'
    : 'M50,28.08 L82,60.48 L66,60.48 L50,44.28 L34,60.48 L18,60.48 Z'

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 100 108"
      fill={VARIANT_FILL[variant]}
      fillRule="evenodd"
      aria-hidden="true"
    >
      <path d={`M50,0 L100,21.6 L100,64.8 L50,108 L0,64.8 L0,21.6 Z ${chevron}`} />
    </svg>
  )
}
