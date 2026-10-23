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
          <p className="invite-3d-gate-ui__label">South Indian Temple Entrance</p>
          <p className="invite-3d-gate-ui__blessing">{hero.blessingEn}</p>
          <p className="tamil invite-3d-gate-ui__blessing">{hero.blessingTa}</p>
          <button type="button" className="ci-btn ci-btn--gold invite-3d-gate-ui__btn" onClick={onOpenGate}>
            {palace.enterCtaEn}
          </button>
        </div>
      )}

      {gateOpening && <p className="invite-3d-gate-ui__opening">Opening the temple doors…</p>}

      {showCard && (
        <div className="invite-3d-card ci-reveal">
          <p className="ci-hero__blessing">{hero.blessingEn}</p>
          <p className="ci-hero__label">{intro.revealEn}</p>
          <h1 className="ci-hero__names script">{couple.bride.nameEn} & {couple.groom.nameEn}</h1>
          <p className="ci-hero__subtitle">{hero.subtitleEn}</p>
          <p className="ci-hero__date">{date.en}</p>
          <p className="ci-hero__time">Muhurtham · {time.en.replace('Between ', '')}</p>
          <p className="ci-hero__venue">{weddingConfig.ceremony.venueName}</p>
          <p className="tamil ci-hero__blessing">{traditional.togetherEn}</p>
        </div>
      )}

      <div className="invite-3d-hero__tools">
        <button type="button" className="ci-hero__skip" onClick={onSkip}>{intro.skipLabel}</button>
        <AudioToggle className="ci-audio" />
      </div>

      {siteEntered && (
        <p className="ci-hero__scroll">
          Scroll — pull the sacred rope as their story unfolds ↓
        </p>
      )}
    </section>
  )
}
