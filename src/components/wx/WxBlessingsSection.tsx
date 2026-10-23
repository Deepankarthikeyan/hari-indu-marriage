import { useCeremonyCountdown } from '../../hooks/useCountdown'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay, formatCeremonyTimeDisplay, formatInvitationDateLine } from '../../utils/datetime'
import { shareInvitation } from '../../utils/share'

const HEART_PATH =
  'M50,88 C50,88 8,58 8,32 C8,16 20,6 34,6 C44,6 50,14 50,14 C50,14 56,6 66,6 C80,6 92,16 92,32 C92,58 50,88 50,88 Z'

function HeartUnit({ id, value, label, gradId, c1, c2 }: { id: string; value: number; label: string; gradId: string; c1: string; c2: string }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className={`wx-countdown__heart${label === 'Seconds' ? ' wx-countdown__heart--seconds' : ''}`}>
      <svg className="wx-countdown__heart-svg" viewBox="0 0 100 92" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <path d={HEART_PATH} fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
      </svg>
      <div className="wx-countdown__heart-inner">
        <span className="wx-countdown__number" id={id}>{text}</span>
        <span className="wx-countdown__label">{label}</span>
      </div>
    </div>
  )
}

export default function WxBlessingsSection() {
  const cd = useCeremonyCountdown()
  const { invitation, couple } = weddingConfig
  const dateBadge = formatInvitationDateLine()
  const date = formatCeremonyDateDisplay()
  const time = formatCeremonyTimeDisplay()

  const onShare = () => {
    void shareInvitation(
      `${couple.groom.nameEn} & ${couple.bride.nameEn} — Wedding`,
      weddingConfig.invitation.lineEn,
    )
  }

  return (
    <section id="rsvp" className="wx-section wx-section--rsvp" data-transition="sparkles">
      <div className="wx-rsvp__ambience" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => <span key={i} className="wx-rsvp__spark" />)}
        <span className="wx-rsvp__diya-glow" />
      </div>
      <div className="container">
        <div className="wx-rsvp__stage">
          <header className="wx-header wx-reveal">
            <span className="wx-header__ornament" aria-hidden>
              <i className="fa-solid fa-sparkles fa-icon" />
              <i className="fa-solid fa-om fa-icon" />
              <i className="fa-solid fa-sparkles fa-icon" />
            </span>
            <h2 className="wx-header__title wx-rsvp__title">Counting Down</h2>
            <p className="wx-header__subtitle">To our sacred wedding day</p>
            <p className="wx-rsvp__date-badge">{dateBadge}</p>
          </header>

          <div className="wx-rsvp__blessing-block wx-reveal">
            <p className="wx-rsvp__blessing-line">{invitation.closingEn}</p>
            <p className="wx-rsvp__blessing-line tamil">{invitation.closingTa}</p>
          </div>

          <div className="wx-countdown-frame wx-reveal">
            <span className="wx-countdown-frame__corner wx-countdown-frame__corner--tl" aria-hidden />
            <span className="wx-countdown-frame__corner wx-countdown-frame__corner--tr" aria-hidden />
            <span className="wx-countdown-frame__corner wx-countdown-frame__corner--bl" aria-hidden />
            <span className="wx-countdown-frame__corner wx-countdown-frame__corner--br" aria-hidden />
            <p className="wx-countdown-frame__caption">
              Muhurtham · {date.en} · {time.en.replace('Between ', '')}
            </p>
            {cd.isPast ? (
              <p className="wx-rsvp__mantra-line tamil">இன்று நம் திருமண நாள் — மங்களம்!</p>
            ) : (
              <div className="wx-countdown wx-countdown--hearts" id="countdown-timer">
                <HeartUnit id="cd-days" value={cd.days} label="Days" gradId="heart-grad-days" c1="#FF8FB8" c2="#C2185B" />
                <span className="wx-countdown__sep" aria-hidden><i className="fa-solid fa-heart" /></span>
                <HeartUnit id="cd-hours" value={cd.hours} label="Hours" gradId="heart-grad-hours" c1="#FFD6E5" c2="#E8437A" />
                <span className="wx-countdown__sep" aria-hidden><i className="fa-solid fa-heart" /></span>
                <HeartUnit id="cd-minutes" value={cd.minutes} label="Minutes" gradId="heart-grad-mins" c1="#FF8FB8" c2="#AD1457" />
                <span className="wx-countdown__sep" aria-hidden><i className="fa-solid fa-heart" /></span>
                <HeartUnit id="cd-seconds" value={cd.seconds} label="Seconds" gradId="heart-grad-secs" c1="#FFE0EC" c2="#C2185B" />
              </div>
            )}
          </div>

          <div className="wx-rsvp__cta wx-reveal">
            <a href="#hero" className="wx-btn wx-btn--gold">
              <span>வாழ்த்துக்கள் · With Blessings</span>
              <i className="fa-solid fa-heart" aria-hidden />
            </a>
            <button type="button" className="wx-btn wx-btn--gold wx-share-invite-btn" onClick={onShare}>
              <i className="fa-solid fa-share-nodes" aria-hidden />
              <span>Share Invitation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
