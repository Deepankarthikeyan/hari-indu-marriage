import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { weddingConfig } from '../../config/wedding'
import { useCeremonyCountdown } from '../../hooks/useCountdown'
import { useIntroSeen } from '../../hooks/useIntroSeen'
import { downloadIcsForEvent } from '../../utils/calendar'
import {
  formatCeremonyDateDisplay,
  formatEventCalendarParts,
  formatEventTimeRange,
} from '../../utils/datetime'
import { shareInvitation } from '../../utils/share'
import AudioToggle from '../ui/AudioToggle'
import DecoDivider from './DecoDivider'
import EnvelopeOverlay from './EnvelopeOverlay'
import HeroTraditional from './HeroTraditional'
import PageDecor from './PageDecor'
import ToranRow from './ToranRow'

function useGuestName() {
  return useMemo(() => new URLSearchParams(window.location.search).get('to')?.trim() ?? '', [])
}

function GoldLine() {
  return <div className="si-gold-line" />
}

export default function TraditionalInvitation() {
  const { entered, markSeen } = useIntroSeen()
  const [closing, setClosing] = useState(false)
  const [flash, setFlash] = useState(false)
  const guestName = useGuestName()
  const cd = useCeremonyCountdown()
  const { couple, traditional, gallery, ceremony, events, rsvp, contact, footer } = weddingConfig
  const date = formatCeremonyDateDisplay()
  const mainEvent = events[0]

  const openInvitation = useCallback(() => {
    setFlash(true)
    setClosing(true)
    window.setTimeout(() => {
      markSeen()
      document.getElementById('si-hero')?.scrollIntoView({ behavior: 'smooth' })
    }, 700)
  }, [markSeen])

  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [entered])

  const mapEmbedSrc = useMemo(() => {
    const q = [ceremony.venueName, ceremony.address].filter(Boolean).join(', ')
    return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`
  }, [ceremony.address, ceremony.venueName])

  const onRsvp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const attending = String(fd.get('attending') ?? '')
    const body = [
      `RSVP — ${couple.groom.nameEn} & ${couple.bride.nameEn}`,
      `Name: ${String(fd.get('name') ?? '').trim()}`,
      `Attending: ${attending === 'yes' ? 'Joyfully Accept' : 'Respectfully Decline'}`,
      fd.get('message') ? `Message: ${String(fd.get('message')).trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    const email = rsvp.email?.trim()
    const wa = contact.whatsappNumber?.trim()
    if (email) {
      window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Wedding RSVP')}&body=${encodeURIComponent(body)}`
      return
    }
    if (wa) {
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer')
    }
  }

  const shareWa = () => {
    const text = `${couple.groom.nameEn} & ${couple.bride.nameEn} — ${window.location.href}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="south-indian">
      <PageDecor />
      {!entered && <EnvelopeOverlay flash={flash} closing={closing} onOpen={openInvitation} />}

      <div className={entered ? 'si-page' : 'si-main--hidden'}>
        <HeroTraditional />
        <DecoDivider />

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

        <DecoDivider />

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
              <p className="si-countdown__subheading">Today is our wedding day!</p>
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
        </section>

        <section id="gallery" className="si-section si-gallery">
          <h2 className="si-gallery__heading">{traditional.galleryHeading}</h2>
          <GoldLine />
          <div className="si-gallery__grid">
            {gallery.images.map((img) => (
              <button key={img.src} type="button" className="si-gallery__item">
                <img className="si-gallery__image" src={img.src} alt={img.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </section>

        <section id="story-video" className="si-section si-video">
          <h2 className="si-video__heading">{traditional.storyHeading}</h2>
          <GoldLine />
          <div className="si-video__wrapper">
            {traditional.storyVideoId ? (
              <iframe
                className="si-video__iframe"
                src={`https://www.youtube.com/embed/${traditional.storyVideoId}?rel=0&modestbranding=1`}
                title={traditional.storyHeading}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <img className="si-gallery__image" src="/assets/invitation.jpg" alt="Our story" style={{ width: '100%', display: 'block' }} />
            )}
          </div>
        </section>

        <section id="venue" className="si-section si-venue">
          <h2 className="si-venue__heading">{traditional.venueHeading}</h2>
          <GoldLine />
          <div className="si-venue__content">
            <div className="si-venue__details">
              <h3 className="si-venue__name">{ceremony.venueName}</h3>
              <p className="si-venue__address">{ceremony.address}</p>
              {ceremony.mapsUrl?.trim() && (
                <a href={ceremony.mapsUrl} className="si-venue__directions-btn" target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              )}
            </div>
            <div className="si-venue__map">
              <iframe
                src={mapEmbedSrc}
                className="si-venue__map-iframe"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue location"
              />
            </div>
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
          </form>
          <div className="si-share">
            <p className="si-share__label">Share This Invitation</p>
            <div className="si-share__buttons">
              <button type="button" className="si-share__btn si-share__btn--whatsapp" onClick={shareWa}>WhatsApp</button>
              {mainEvent && (
                <button type="button" className="si-share__btn si-share__btn--calendar" onClick={() => downloadIcsForEvent(mainEvent)}>
                  Add to Calendar
                </button>
              )}
              <button type="button" className="si-share__btn si-share__btn--copy" onClick={() => void copyLink()}>
                Copy link
              </button>
              <button
                type="button"
                className="si-share__btn si-share__btn--copy"
                onClick={() => void shareInvitation(`${couple.groom.nameEn} & ${couple.bride.nameEn}`, weddingConfig.invitation.lineEn)}
              >
                Share
              </button>
            </div>
          </div>
        </section>

        <footer className="si-footer">
          <div className="si-footer__scene">
            <div className="si-footer__text">
              <p className="si-footer__label">The Wedding of</p>
              <p className="si-footer__couple">{couple.groom.nameEn} & {couple.bride.nameEn}</p>
              <GoldLine />
              <p className="si-footer__credit">{footer.thanksEn}</p>
              <p className="si-footer__credit tamil">{footer.thanksTa}</p>
              <p className="si-footer__credit">Muhurtham · {date.en}</p>
            </div>
            <img className="si-footer__gopuram-img" src="/assets/south-indian/gopuram-illustration-cropped.png" alt="South Indian temple gopuram" />
          </div>
          <ToranRow variant="footer" />
        </footer>
      </div>

      <div className="si-music-btn">
        <AudioToggle />
      </div>
    </div>
  )
}
