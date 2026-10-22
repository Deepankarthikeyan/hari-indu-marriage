import { useCallback, useEffect, useRef, useState } from 'react'
import { weddingConfig } from '../../config/wedding'
import { formatInvitationDateLine } from '../../utils/datetime'

type Props = {
  siteEntered: boolean
  onEnterSite: () => void
}

const OPEN_MS = 1900
const ENTER_MS = 2100

export default function CurtainHero({ siteEntered, onEnterSite }: Props) {
  const { couple, intro, experience } = weddingConfig
  const [curtainsOpen, setCurtainsOpen] = useState(siteEntered)
  const [loveOpening, setLoveOpening] = useState(siteEntered)
  const [showCta, setShowCta] = useState(!siteEntered)
  const [showScrollHint, setShowScrollHint] = useState(siteEntered)
  const [sweep, setSweep] = useState(false)
  const enteredRef = useRef(siteEntered)

  const dateLine = formatInvitationDateLine()

  const playOpen = useCallback(() => {
    if (curtainsOpen || enteredRef.current) return
    setCurtainsOpen(true)
    setLoveOpening(true)
    setShowCta(false)
    window.setTimeout(() => setShowScrollHint(true), OPEN_MS - 200)
    window.setTimeout(() => {
      enteredRef.current = true
      setSweep(true)
      onEnterSite()
      document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
      window.setTimeout(() => setSweep(false), 1400)
    }, ENTER_MS)
  }, [curtainsOpen, onEnterSite])

  useEffect(() => {
    if (siteEntered) {
      setCurtainsOpen(true)
      setLoveOpening(true)
      setShowCta(false)
      setShowScrollHint(true)
      enteredRef.current = true
    }
  }, [siteEntered])

  useEffect(() => {
    const body = document.body
    if (!siteEntered) {
      body.classList.add('is-landing')
      body.classList.remove('is-entered')
    } else {
      body.classList.remove('is-landing', 'is-curtain-opening')
      body.classList.add('is-entered')
    }
    return () => {
      body.classList.remove('is-landing', 'is-curtain-opening', 'is-entered')
    }
  }, [siteEntered])

  const trackClass = [
    'opening-track',
    curtainsOpen ? 'is-curtains-open' : '',
    siteEntered ? 'is-site-entered' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const stickyClass = ['opening-sticky', loveOpening ? 'is-love-opening' : ''].filter(Boolean).join(' ')

  return (
    <>
      <div id="site-enter-sweep" className={`site-enter-sweep${sweep ? ' is-active' : ''}`} aria-hidden />
      <section id="hero" className={trackClass} aria-label="Wedding curtain opening">
        <div className={stickyClass}>
          <div className="wedding-stage__bg">
            <img
              className="wedding-stage__bg-img"
              id="curtain-bg-img"
              src={experience.stageBannerSrc}
              alt="South Indian wedding stage decorated for celebration"
              fetchPriority="high"
            />
            <div className="wedding-stage__overlay" aria-hidden />
            <div className="wedding-stage__pleated-backdrop" aria-hidden />
            <div className="wedding-stage__warm-glow" aria-hidden />
            <div className="wedding-stage__bokeh" aria-hidden>
              {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
            </div>
          </div>

          <div className="curtain-scene__divine-light" id="divine-light" aria-hidden />

          <div className="wedding-stage__content" id="stage-content">
            <article className="invitation-portal" aria-label={`Wedding invitation for ${couple.groom.nameEn} and ${couple.bride.nameEn}`}>
              <div className="invitation-portal__halo" aria-hidden />
              <header className="invitation-portal__crest">
                <div className="invitation-portal__lotus-placeholder" aria-hidden>🪷</div>
                <p className="invitation-portal__label">{intro.revealEn}</p>
              </header>
              <div className="invitation-portal__couple">
                <div className="invitation-portal__person">
                  <h1 className="invitation-portal__name">{couple.groom.nameEn}</h1>
                </div>
                <div className="invitation-portal__union" aria-hidden>
                  <i className="fa-solid fa-heart invitation-portal__heart" />
                </div>
                <div className="invitation-portal__person">
                  <h1 className="invitation-portal__name">{couple.bride.nameEn}</h1>
                </div>
              </div>
              <p className="invitation-portal__dates">{dateLine}</p>
            </article>
          </div>

          <div className={`curtain-reveal${curtainsOpen ? ' is-open' : ''}`} id="curtain-doors">
            <div
              className={`sheer-curtain sheer-curtain--left${curtainsOpen ? ' is-opening' : ''}`}
              id="curtain-left"
              role="button"
              tabIndex={0}
              aria-label="Open curtains"
              onClick={playOpen}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  playOpen()
                }
              }}
            >
              <div className="sheer-curtain__fabric" />
              <div className="sheer-curtain__fold sheer-curtain__fold--1" />
              <div className="sheer-curtain__fold sheer-curtain__fold--2" />
              <div className="sheer-curtain__tie" aria-hidden />
            </div>
            <div
              className={`sheer-curtain sheer-curtain--right${curtainsOpen ? ' is-opening' : ''}`}
              id="curtain-right"
              role="button"
              tabIndex={0}
              aria-label="Open curtains"
              onClick={playOpen}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  playOpen()
                }
              }}
            >
              <div className="sheer-curtain__fabric" />
              <div className="sheer-curtain__fold sheer-curtain__fold--1" />
              <div className="sheer-curtain__fold sheer-curtain__fold--2" />
              <div className="sheer-curtain__tie" aria-hidden />
            </div>
          </div>

          <div className="floral-arch" id="floral-arch" aria-hidden>
            <div className="floral-arch__rod" />
            <div className="floral-arch__pillar floral-arch__pillar--l">
              <div className="floral-arch__flowers" />
              <div className="floral-arch__pillar-lights" />
            </div>
            <div className="floral-arch__pillar floral-arch__pillar--r">
              <div className="floral-arch__flowers" />
              <div className="floral-arch__pillar-lights" />
            </div>
            <div className="floral-arch__lintel">
              <div className="floral-arch__garland-top" />
            </div>
            <div className="floral-arch__beads">
              {Array.from({ length: 7 }, (_, i) => <span key={i} />)}
            </div>
            <div className="floral-arch__floor-flowers floral-arch__floor-flowers--l" />
            <div className="floral-arch__floor-flowers floral-arch__floor-flowers--r" />
            <div className="floral-arch__lamp floral-arch__lamp--l" aria-hidden>
              <div className="floral-arch__lamp-shade" />
              <div className="floral-arch__lamp-base" />
            </div>
            <div className="floral-arch__lamp floral-arch__lamp--r" aria-hidden>
              <div className="floral-arch__lamp-shade" />
              <div className="floral-arch__lamp-base" />
            </div>
          </div>

          <div className={`curtain-scene__cta${showCta ? '' : ' is-hidden'}`} id="curtain-cta">
            <button id="begin-wedding" className="curtain-scene__btn" type="button" onClick={playOpen}>
              <span>Begin the Wedding</span>
              <i className="fa-solid fa-heart" aria-hidden />
            </button>
            <button type="button" className="curtain-scene__hint" id="begin-wedding-hint" onClick={playOpen}>
              Tap Begin the Wedding to enter our celebration ✨
            </button>
          </div>

          <p className={`wedding-stage__scroll-hint${showScrollHint ? ' is-visible' : ''}`} id="scroll-hint">
            Continue exploring ↓
          </p>
        </div>
      </section>
    </>
  )
}
