import { motion, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { formatInvitationDateLine } from '../../utils/datetime'
import { firstName, lowerDateLine } from './helpers'
import { SplitLetters } from './SplitLetters'
import ToranRow from './ToranRow'

const ease = [0.22, 1, 0.36, 1] as const

export default function HeroTraditional() {
  const { couple, traditional, ceremony } = weddingConfig
  const dateLine = lowerDateLine(formatInvitationDateLine())
  const cityLine = [ceremony.venueName, ceremony.address].filter(Boolean).join(', ')
  const reduce = useReducedMotion()

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.9, ease },
      }

  return (
    <section id="si-hero" className="si-hero">
      <ToranRow variant="hero" />
      <motion.div className="si-hero__content" {...fade}>
        <motion.div
          className="si-hero__ganesha"
          {...(reduce ? {} : { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, delay: 0.1, ease } })}
        >
          <img className="si-hero__ganesha-img" src="/assets/south-indian/ganesha.png" alt="Lord Ganesha" />
        </motion.div>
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
      </motion.div>
      <div className="si-hero__leaf si-hero__leaf--left" aria-hidden>
        <img className="si-hero__leaf-img" src="/assets/south-indian/banana-leaf-left.webp" alt="" />
      </div>
      <div className="si-hero__leaf si-hero__leaf--right" aria-hidden>
        <img className="si-hero__leaf-img si-hero__leaf-img--mirror" src="/assets/south-indian/banana-leaf-right.webp" alt="" />
      </div>
    </section>
  )
}
