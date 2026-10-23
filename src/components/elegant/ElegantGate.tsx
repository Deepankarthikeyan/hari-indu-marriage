import { useCallback, useEffect, useState } from 'react'
import { weddingConfig } from '../../config/wedding'
import { formatInvitationDateLine } from '../../utils/datetime'

type Props = {
  siteEntered: boolean
  onEnterSite: () => void
}

export default function ElegantGate({ siteEntered, onEnterSite }: Props) {
  const { couple, intro } = weddingConfig
  const [open, setOpen] = useState(siteEntered)
  const [hideCta, setHideCta] = useState(siteEntered)
  const dateLine = formatInvitationDateLine()

  const unveil = useCallback(() => {
    if (open) return
    setOpen(true)
    setHideCta(true)
    window.setTimeout(() => {
      onEnterSite()
      document.getElementById('welcome')?.scrollIntoView({ behavior: 'smooth' })
    }, 1600)
  }, [open, onEnterSite])

  const skip = useCallback(() => {
    setOpen(true)
    setHideCta(true)
    onEnterSite()
  }, [onEnterSite])

  useEffect(() => {
    if (siteEntered) {
      setOpen(true)
      setHideCta(true)
    }
  }, [siteEntered])

  useEffect(() => {
    const body = document.body
    if (!siteEntered) {
      body.classList.add('elegant-locked')
      body.classList.remove('elegant-entered')
    } else {
      body.classList.remove('elegant-locked')
      body.classList.add('elegant-entered')
    }
    return () => {
      body.classList.remove('elegant-locked', 'elegant-entered')
    }
  }, [siteEntered])

  const gateClass = ['e-gate', open ? 'is-open' : '', siteEntered ? 'is-skipped' : ''].filter(Boolean).join(' ')

  return (
    <section id="gate" className={gateClass} aria-label="Wedding invitation opening">
      <div className="e-gate__mesh" aria-hidden />
      <div className="e-gate__veil e-gate__veil--l" aria-hidden />
      <div className="e-gate__veil e-gate__veil--r" aria-hidden />

      <button type="button" className="e-gate__skip" onClick={skip}>{intro.skipLabel}</button>

      <div className="e-gate__frame">
        <p className="e-gate__eyebrow tamil">{intro.revealTa}</p>
        <p className="e-gate__script">Together</p>
        <h1 className="e-gate__names">
          {couple.groom.nameEn}
          <span className="e-gate__amp">&</span>
          {couple.bride.nameEn}
        </h1>
        <p className="e-gate__date">{dateLine}</p>
        <p className="tamil" style={{ marginTop: '0.75rem', opacity: 0.8 }}>{weddingConfig.hero.subtitleTa}</p>
      </div>

      <div className={`e-gate__cta-wrap${hideCta ? ' is-hidden' : ''}`}>
        <button type="button" className="e-btn e-btn--solid" onClick={unveil}>
          {intro.ctaEn}
        </button>
        <button type="button" className="e-gate__hint" onClick={unveil}>
          {intro.ctaTa}
        </button>
      </div>
    </section>
  )
}
