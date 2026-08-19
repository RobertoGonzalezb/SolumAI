import SolumMark from './SolumMark'

type LockupVariant = 'primary-dark' | 'primary-light' | 'ink' | 'bone' | 'copper-full'

const WORDMARK_COLOR: Record<LockupVariant, { solum: string; ai: string }> = {
  'primary-dark': { solum: '#EFE7DC', ai: '#C79063' },
  'primary-light': { solum: '#0E0D0A', ai: '#C79063' },
  ink: { solum: '#0E0D0A', ai: '#0E0D0A' },
  bone: { solum: '#EFE7DC', ai: '#EFE7DC' },
  'copper-full': { solum: '#C79063', ai: '#C79063' },
}

const MARK_VARIANT: Record<LockupVariant, 'primary-dark' | 'primary-light' | 'ink' | 'bone' | 'copper-full'> = {
  'primary-dark': 'primary-dark',
  'primary-light': 'primary-light',
  ink: 'ink',
  bone: 'bone',
  'copper-full': 'copper-full',
}

interface SolumLogoProps {
  /** Alto del símbolo en px. El wordmark y el gap escalan en proporción (spec: 82px de referencia). */
  height?: number
  variant?: LockupVariant
  className?: string
}

/**
 * Lockup horizontal — ruta 1a. Gap = 0.24 × alto del símbolo.
 * "SOLUM" + "AI" como una sola cadena, sin espacio (corrige el error del logo anterior).
 */
export default function SolumLogo({ height = 82, variant = 'primary-dark', className }: SolumLogoProps) {
  const gap = height * 0.24
  const fontSize = height * (38 / 82)
  const colors = WORDMARK_COLOR[variant]

  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', gap: `${gap}px` }}
    >
      <SolumMark height={height} variant={MARK_VARIANT[variant]} />
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: `${fontSize}px`,
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        <span style={{ color: colors.solum }}>SOLUM</span>
        <span style={{ color: colors.ai }}>AI</span>
      </span>
    </div>
  )
}
