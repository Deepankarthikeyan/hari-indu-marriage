import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { weddingConfig } from '../../config/wedding'
import { useCeremonyCountdown } from '../../hooks/useCountdown'
import { useIntroSeen } from '../../hooks/useIntroSeen'
import {
  formatCeremonyDateDisplay,
  formatEventCalendarParts,
  formatEventTimeRange,
  formatInvitationDateLine,
} from '../../utils/datetime'
import { shareInvitation } from '../../utils/share'
import AudioToggle from '../ui/AudioToggle'
import EnvelopeOverlay from './EnvelopeOverlay'
import { SplitLetters } from './SplitLetters'

function useGuestName() {
  return useMemo(() => {
    const to = new URLSearchParams(window.location.search).get('to')
    return to?.trim() || ''
  }, [])
}

function GoldLine() {
  return <div className="si-gold-line" />
}

export default function TraditionalInvitation() {
  const { entered, markSeen } = useIntroSeen()
  const [closing, setClosing] = useState(false)
  const guestName = useGuestName()
  const cd = useCeremonyCountdown()
  const { couple, traditional, invitation, gallery, ceremony, events, rsvp, contact, footer } = weddingConfig
  const dateLine = formatInvitationDateLine()
  const date = formatCeremonyDateDisplay()

  const openInvitation = useCallback(() => {
    setClosing(true)
    window.setTimeout(() => {
      markSeen()
      document.getElementById('si-hero')?.scrollIntoView({ behavior: 'smooth' })
    }, 550)
  }, [markSeen])

  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [entered])

  const onRsvp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const attending = String(fd.get('attending') ?? '')
    const body = [
      `RSVP — ${couple.groom.nameEn} & ${couple.bride.nameEn}`,
      `Guest: ${String(fd.get('name') ?? '').trim()}`,
      `Attending: ${attending === 'yes' ? 'Joyfully Accept' : attending === 'no' ? 'Respectfully Decline' : '—'}`,
      fd.get('message') ? `Message: ${String(fd.get('message')).trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    const email = weddingConfig.rsvp.email?.trim()
    const wa = contact.whatsappNumber?.trim()
    if (email) {
      window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Wedding RSVP')}&body=${encodeURIComponent(body)}`
      return
    }
    if (wa) {
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer')
    }
  }

  const groomDisplay = couple.groom.nameEn.replace(/^\S+\s/, '') || couple.groom.nameEn
  const brideDisplay = couple.bride.nameEn.replace(/^\S+\s/, '') || couple.bride.nameEn

  return (
    <div className="traditional-invitation">
      {!entered && <EnvelopeOverlay guestName={guestName} closing={closing} onOpen={openInvitation} />}

      <div className={entered ? '' : 'si-main--hidden'}>
        <section id="si-hero" className="si-hero si-section">
          <div className="si-hero__content">
            <p className="si-hero__blessing">{traditional.quoteEn}</p>
            <div className="si-hero__ornament">
              <img className="si-hero__ornament-img" src="/assets/south-indian/gold-divider.svg" alt="" />
            </div>
            {guestName && <p className="si-hero__guest-greeting">Dear {guestName},</p>}
            <p className="si-hero__formal">{traditional.togetherEn}</p>
            <div className="si-hero__names">
              <h1 className="si-hero__name">
                <SplitLetters text={brideDisplay} />
              </h1>
              <span className="si-hero__ampersand">&</span>
              <h1 className="si-hero__name">
                <SplitLetters text={groomDisplay} />
              </h1>
            </div>
            <p className="si-hero__invite-text">{invitation.lineEn}</p>
            <p className="si-hero__date">{dateLine}</p>
            <p className="si-hero__venue">{ceremony.venueName}{ceremony.address ? `, ${ceremony.address}` : ''}</p>
          </div>
        </section>

        <section id="couple" className="si-section si-couple">
          <h2 className="si-couple__heading">{traditional.coupleHeading}</h2>
          <GoldLine />
          <div className="si-couple__cards">
            <article className="si-couple__card">
              <div className="si-couple__photo-wrapper">
                <img className="si-couple__wreath" src="/assets/south-indian/marigold-wreath.png" alt="" aria-hidden />
                <div className="si-couple__photo-frame">
                  {couple.groom.photoSrc ? (
                    <img className="si-couple__photo" src={couple.groom.photoSrc} alt={couple.groom.nameEn} />
                  ) : (
                    <div className="si-couple__photo si-couple__photo--placeholder">{couple.groom.nameEn.charAt(0)}</div>
                  )}
                </div>
              </div>
              <h3 className="si-couple__name">{couple.groom.nameEn}</h3>
              <p className="si-couple__parent-label">Son of</p>
              <p className="si-couple__parents">{couple.groom.parents}</p>
            </article>
            <div className="si-couple__divider" aria-hidden>&</div>
            <article className="si-couple__card">
              <div className="si-couple__photo-wrapper">
                <img className="si-couple__wreath" src="/assets/south-indian/marigold-wreath.png" alt="" aria-hidden />
                <div className="si-couple__photo-frame">
                  {couple.bride.photoSrc ? (
                    <img className="si-couple__photo" src={couple.bride.photoSrc} alt={couple.bride.nameEn} />
                  ) : (
                    <div className="si-couple__photo si-couple__photo--placeholder">{couple.bride.nameEn.charAt(0)}</div>
                  )}
                </div>
              </div>
              <h3 className="si-couple__name">{couple.bride.nameEn}</h3>
              <p className="si-couple__parent-label">Daughter of</p>
              <p className="si-couple__parents">{couple.bride.parents}</p>
            </article>
          </div>
        </section>

        <section id="events" className="si-section si-events">
          <h2 className="si-events__heading">{traditional.eventsHeading}</h2>
          <GoldLine />
          <div className="si-events__grid">
            {events.map((event) => {
              const parts = formatEventCalendarParts(event)
              const maps = event.mapsUrl?.trim() || ceremony.mapsUrl?.trim()
              return (
                <article key={event.id} className="si-event-card">
                  <div className="si-event-card__accent" />
                  <h3 className="si-event-card__name">{event.nameEn}</h3>
                  <p className="si-event-card__date">{parts.weekday}, {parts.day} {parts.month}</p>
                  <p className="si-event-card__time">{formatEventTimeRange(event)}</p>
                  <p className="si-event-card__venue">{event.venueName || ceremony.venueName}</p>
                  {maps && (
                    <a href={maps} className="si-event-card__directions" target="_blank" rel="noopener noreferrer">
                      Get Directions
                    </a>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        <section id="countdown" className="si-section si-countdown">
          <h2 className="si-countdown__heading">{traditional.countdownHeading}</h2>
          <p className="si-countdown__subheading">{traditional.countdownSub}</p>
          <div className="si-countdown__timer">
            {cd.isPast ? (
              <p className="si-countdown__subheading tamil">இன்று நம் திருமண நாள்!</p>
            ) : (
              <>
                <div className="si-countdown__unit">
                  <span className="si-countdown__number">{String(cd.days).padStart(2, '0')}</span>
                  <span className="si-countdown__label">Days</span>
                </div>
                <span className="si-countdown__sep">:</span>
                <div className="si-countdown__unit">
                  <span className="si-countdown__number">{String(cd.hours).padStart(2, '0')}</span>
                  <span className="si-countdown__label">Hours</span>
                </div>
                <span className="si-countdown__sep">:</span>
                <div className="si-countdown__unit">
                  <span className="si-countdown__number">{String(cd.minutes).padStart(2, '0')}</span>
                  <span className="si-countdown__label">Minutes</span>
                </div>
                <span className="si-countdown__sep">:</span>
                <div className="si-countdown__unit">
                  <span className="si-countdown__number">{String(cd.seconds).padStart(2, '0')}</span>
                  <span className="si-countdown__label">Seconds</span>
                </div>
              </>
            )}
          </div>
          <p className="si-countdown__subheading" style={{ marginTop: '1rem' }}>
            Muhurtham · {date.en}
          </p>
        </section>

        <section id="gallery" className="si-section si-gallery">
          <h2 className="si-gallery__heading">{traditional.galleryHeading}</h2>
          <GoldLine />
          <div className="si-gallery__grid">
            {gallery.images.map((img) => (
              <figure key={img.src} className="si-gallery__item">
                <img className="si-gallery__image" src={img.src} alt={img.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section id="venue" className="si-section si-venue">
          <h2 className="si-venue__heading">{traditional.venueHeading}</h2>
          <GoldLine />
          <div className="si-venue__card">
            <h3 className="si-venue__name">{ceremony.venueName}</h3>
            <p className="si-venue__address">{ceremony.address}</p>
            {ceremony.mapsUrl?.trim() && (
              <a href={ceremony.mapsUrl} className="si-event-card__directions" target="_blank" rel="noopener noreferrer">
                Get Directions
              </a>
            )}
          </div>
        </section>

        <section id="rsvp" className="si-section si-rsvp">
          <h2 className="si-rsvp__heading">{traditional.rsvpHeading}</h2>
          <GoldLine />
          <form className="si-rsvp__form" onSubmit={onRsvp}>
            <div className="si-rsvp__field">
              <label htmlFor="rsvp-name" className="si-rsvp__label">Your Name</label>
              <input id="rsvp-name" name="name" type="text" className="si-rsvp__input" required placeholder="Enter your full name" defaultValue={guestName} />
            </div>
            <div className="si-rsvp__field">
              <span className="si-rsvp__label">Will You Attend?</span>
              <div className="si-rsvp__radio-group">
                <label className="si-rsvp__radio">
                  <input type="radio" name="attending" value="yes" required />
                  <span className="si-rsvp__radio-label">Joyfully Accept</span>
                </label>
                <label className="si-rsvp__radio">
                  <input type="radio" name="attending" value="no" />
                  <span className="si-rsvp__radio-label">Respectfully Decline</span>
                </label>
              </div>
            </div>
            <div className="si-rsvp__field">
              <label htmlFor="rsvp-message" className="si-rsvp__label">Message (optional)</label>
              <textarea id="rsvp-message" name="message" className="si-rsvp__input si-rsvp__textarea" placeholder="Send your wishes..." rows={3} />
            </div>
            <button type="submit" className="si-rsvp__submit">Confirm Attendance</button>
            <p className="si-rsvp__note">{rsvp.deadlineNote}</p>
          </form>
          <div className="si-share">
            <p className="si-share__label">Share This Invitation</p>
            <button
              type="button"
              className="si-share__btn"
              onClick={() => void shareInvitation(`${couple.groom.nameEn} & ${couple.bride.nameEn}`, invitation.lineEn)}
            >
              Share link
            </button>
          </div>
        </section>

        <footer className="si-footer">
          <p>{footer.thanksEn}</p>
          <p className="tamil">{footer.thanksTa}</p>
          <p className="si-footer__names">{couple.groom.nameEn} & {couple.bride.nameEn}</p>
        </footer>
      </div>

      <div className="si-music-btn">
        <AudioToggle />
      </div>
    </div>
  )
}
