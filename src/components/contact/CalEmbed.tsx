import Cal from '@calcom/embed-react'

const CAL_LINK = 'robertito-g-az0gey'

export default function CalEmbed() {
  return (
    <Cal
      calLink={CAL_LINK}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{ layout: 'month_view', theme: 'dark' }}
    />
  )
}
