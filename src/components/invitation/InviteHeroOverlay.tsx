import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay, formatCeremonyTimeDisplay } from '../../utils/datetime'
import AudioToggle from '../ui/AudioToggle'

type Props = {
  gateOpen: boolean
  gateOpening: boolean
  siteEntered: boolean
  onOpenGate: () => void
  onSkip: () => void
}

export default function InviteHeroOverlay({ gateOpen, gateOpening, siteEntered, onOpenGate, onSkip }: Props) {
  const { couple, intro, hero, traditional, palace } = weddingConfig
  const date = formatCeremonyDateDisplay()
  const time = formatCeremonyTimeDisplay()

  const showGateButton = !siteEntered && !gateOpen && !gateOpening
  const showCard = gateOpen || siteEntered

  return (
    <section id="invitation" className={`invite-3d-hero${showCard ? ' is-revealed' : ''}`}>
      {showGateButton && (
        <div className="invite-3d-gate-ui">
          <p className="invite-3d-gate-ui__label">3D Temple Entrance</p>
          <p className="invite-3d-gate-ui__blessing">{hero.blessingEn}</p>
          <p className="tamil invite-3d-gate-ui__blessing">{hero.blessingTa}</p>
          <button type="button" className="ci-btn ci-btn--gold invite-3d-gate-ui__btn" onClick={onOpenGate}>
            {palace.doorCtaEn}
          </button>
        </div>
      )}

      {gateOpening && <p className="invite-3d-gate-ui__opening">Opening temple gate…</p>}

      {showCard && (
        <div className="invite-3d-card ci-reveal">
          <p className="ci-hero__blessing">{traditional.togetherEn}</p>
          <p className="ci-hero__label">{intro.revealEn}</p>
          <h1 className="ci-hero__names script">{couple.bride.nameEn} & {couple.groom.nameEn}</h1>
          <p className="ci-hero__date">{date.en}</p>
          <p className="ci-hero__time">Muhurtham · {time.en.replace('Between ', '')}</p>
          <p className="ci-hero__venue">{weddingConfig.ceremony.venueName}</p>
        </div>
      )}

      <div className="invite-3d-hero__tools">
        <button type="button" className="ci-hero__skip" onClick={onSkip}>{intro.skipLabel}</button>
        <AudioToggle className="ci-audio" />
      </div>

      {siteEntered && <p className="ci-hero__scroll">Scroll — the 3D scene moves with you ↓</p>}
    </section>
  )
}
