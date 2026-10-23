import { useCallback, useEffect, useState } from 'react'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay, formatCeremonyTimeDisplay } from '../../utils/datetime'

type Props = {
  siteEntered: boolean
  onEnterSite: () => void
}

export default function MandapPalaceHero({ siteEntered, onEnterSite }: Props) {
  const { couple, intro, palace, traditional } = weddingConfig
  const [doorsOpen, setDoorsOpen] = useState(siteEntered)
  const [revealed, setRevealed] = useState(siteEntered)
  const date = formatCeremonyDateDisplay()
  const time = formatCeremonyTimeDisplay()

  const openDoors = useCallback(() => {
    if (doorsOpen) return
    setDoorsOpen(true)
    window.setTimeout(() => setRevealed(true), 950)
  }, [doorsOpen])

  const enterHall = useCallback(() => {
    onEnterSite()
    document.body.classList.remove('is-landing', 'is-curtain-opening')
    document.body.classList.add('is-entered')
    window.setTimeout(() => {
      document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
    }, 200)
  }, [onEnterSite])

  const skip = useCallback(() => {
    setDoorsOpen(true)
    setRevealed(true)
    enterHall()
  }, [enterHall])

  useEffect(() => {
    if (siteEntered) {
      setDoorsOpen(true)
      setRevealed(true)
    }
  }, [siteEntered])

  useEffect(() => {
    if (siteEntered) {
      document.body.classList.add('is-entered')
      document.body.classList.remove('is-landing')
      return
    }
    document.body.classList.add('is-landing')
    document.body.classList.remove('is-entered')
    return () => {
      document.body.classList.remove('is-landing', 'is-entered', 'is-curtain-opening')
    }
  }, [siteEntered])

  const namesScript = `${couple.groom.nameEn} & ${couple.bride.nameEn}`

  return (
    <section id="hero" className={`palace-hero${siteEntered ? ' palace-hero--entered' : ''}`} aria-label="Wedding invitation">
      <div className="palace-hero__texture" aria-hidden />
      <div className="palace-hero__arch-frame">
        <div className="palace-hero__lantern palace-hero__lantern--tl" aria-hidden />
        <div className="palace-hero__lantern palace-hero__lantern--tr" aria-hidden />
        <div className="palace-hero__pillar palace-hero__pillar--l" aria-hidden />
        <div className="palace-hero__pillar palace-hero__pillar--r" aria-hidden />
        <img className="palace-hero__leaf palace-hero__leaf--l" src="/assets/south-indian/banana-leaf-left.webp" alt="" aria-hidden />
        <img className="palace-hero__leaf palace-hero__leaf--r" src="/assets/south-indian/banana-leaf-right.webp" alt="" aria-hidden />

        <div className={`palace-hero__inner${revealed || siteEntered ? ' is-revealed' : ''}`}>
          <img className="palace-hero__ganesha" src="/assets/south-indian/ganesha.png" alt="Lord Ganesha" />
          <p className="palace-hero__mantra">{palace.ganeshaya || traditional.ganeshaya}</p>
          <p className="palace-hero__tagline">{palace.taglineEn}</p>
          <div className="palace-hero__divider" aria-hidden><span /></div>
          <h1 className="palace-hero__names">{namesScript}</h1>
          <p className="palace-hero__date">{date.en}</p>
          <p className="palace-hero__time">Muhurtham · {time.en.replace('Between ', '')}</p>
          <p className="palace-hero__venue">{weddingConfig.ceremony.venueName}</p>
          <div className="palace-hero__divider" aria-hidden><span /></div>
          <p className="palace-hero__closing">{palace.closingEn}</p>
        </div>

        <div className={`palace-hero__doors${doorsOpen || siteEntered ? ' is-open' : ''}${siteEntered ? ' is-gone' : ''}`} aria-hidden={doorsOpen || siteEntered}>
          <div className="palace-hero__door palace-hero__door--left" />
          <div className="palace-hero__door palace-hero__door--right" />
        </div>
      </div>

      <div className="palace-hero__footer-art" aria-hidden>
        <img className="palace-hero__elephant palace-hero__elephant--l" src="/assets/south-indian/twin-elephants-clean.png" alt="" />
        <div className="palace-hero__doli">
          <img src="/assets/wedding-stage-banner.jpg" alt="" />
        </div>
        <img className="palace-hero__elephant palace-hero__elephant--r" src="/assets/south-indian/twin-elephants-clean.png" alt="" />
      </div>

      {!siteEntered && (
        <div className="palace-hero__actions">
          {!doorsOpen && (
            <button type="button" className="palace-hero__btn" onClick={openDoors}>
              {palace.doorCtaEn}
            </button>
          )}
          {doorsOpen && !revealed && <p className="palace-hero__opening-label">Opening temple doors…</p>}
          {revealed && (
            <button type="button" className="palace-hero__btn" onClick={enterHall}>
              {palace.enterCtaEn}
            </button>
          )}
          <button type="button" className="palace-hero__skip" onClick={skip}>{intro.skipLabel}</button>
        </div>
      )}

      {siteEntered && (
        <p className="palace-hero__scroll-hint">Scroll to explore our celebration ↓</p>
      )}
    </section>
  )
}
