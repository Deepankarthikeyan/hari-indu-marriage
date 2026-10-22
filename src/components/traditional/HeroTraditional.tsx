import { weddingConfig } from '../../config/wedding'
import { formatInvitationDateLine } from '../../utils/datetime'
import { firstName, lowerDateLine } from './helpers'
import { SplitLetters } from './SplitLetters'
import ToranRow from './ToranRow'

export default function HeroTraditional() {
  const { couple, traditional, ceremony } = weddingConfig
  const dateLine = lowerDateLine(formatInvitationDateLine())
  const cityLine = [ceremony.venueName, ceremony.address].filter(Boolean).join(', ')

  return (
    <section id="si-hero" className="si-hero">
      <ToranRow variant="hero" />
      <div className="si-hero__content">
        <div className="si-hero__ganesha">
          <img className="si-hero__ganesha-img" src="/assets/south-indian/ganesha.png" alt="Lord Ganesha" />
        </div>
        <p className="si-hero__blessing">{traditional.quoteEn}</p>
        <div className="si-hero__ornament">
          <img className="si-hero__ornament-img" src="/assets/south-indian/gold-divider.svg" alt="" />
        </div>
        <p className="si-hero__formal">{traditional.togetherEn}</p>
        <div className="si-hero__names">
          <h1 className="si-hero__name">
            <SplitLetters text={firstName(couple.groom.nameEn)} />
          </h1>
          <span className="si-hero__ampersand">&amp;</span>
          <h1 className="si-hero__name">
            <SplitLetters text={firstName(couple.bride.nameEn)} />
          </h1>
        </div>
        <p className="si-hero__invite-text">{traditional.inviteText}</p>
        <div className="si-hero__gold-line si-gold-line" />
        <p className="si-hero__date">{dateLine}</p>
        <p className="si-hero__city">{cityLine}</p>
      </div>
      <div className="si-hero__leaf si-hero__leaf--left" aria-hidden>
        <img className="si-hero__leaf-img" src="/assets/south-indian/banana-leaf-left.webp" alt="" />
      </div>
      <div className="si-hero__leaf si-hero__leaf--right" aria-hidden>
        <img className="si-hero__leaf-img si-hero__leaf-img--mirror" src="/assets/south-indian/banana-leaf-right.webp" alt="" />
      </div>
    </section>
  )
}
