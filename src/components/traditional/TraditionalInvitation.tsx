import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { weddingConfig } from '../../config/wedding'
import { useIntroSeen } from '../../hooks/useIntroSeen'
import { downloadIcsForEvent } from '../../utils/calendar'
import {
  formatCeremonyDateDisplay,
  formatEventCalendarParts,
  formatEventTimeRange,
} from '../../utils/datetime'
import { shareInvitation } from '../../utils/share'
import AudioToggle from '../ui/AudioToggle'
import AnimatedCountdown from './AnimatedCountdown'
import EnvelopeOverlay from './EnvelopeOverlay'
import HeroTraditional from './HeroTraditional'
import LoveAmbience from './LoveAmbience'
import PageDecor from './PageDecor'
import SiSection, { SiGoldLine, SiHeading, SiReveal } from './SiSection'
import ToranRow from './ToranRow'

function useGuestName() {
  return useMemo(() => new URLSearchParams(window.location.search).get('to')?.trim() ?? '', [])
}

export default function TraditionalInvitation() {
  const { entered, markSeen } = useIntroSeen()
  const [closing, setClosing] = useState(false)
  const [flash, setFlash] = useState(false)
  const guestName = useGuestName()
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
    <div className={entered ? 'south-indian south-indian--love' : 'south-indian'}>
      <PageDecor />
      <LoveAmbience active={entered} />
      {!entered && <EnvelopeOverlay flash={flash} closing={closing} onOpen={openInvitation} />}

      <div className={entered ? 'si-page' : 'si-main--hidden'}>
        <HeroTraditional />

        <SiSection id="couple" sectionClass="si-couple" transition="petals">
          <SiHeading className="si-couple__heading">{traditional.coupleHeading}</SiHeading>
          <SiGoldLine />
          <SiReveal className="si-couple__cards">
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
          </SiReveal>
        </SiSection>

        <SiSection id="events" sectionClass="si-events" transition="rangoli">
          <SiHeading className="si-events__heading">{traditional.eventsHeading}</SiHeading>
          <SiGoldLine />
          <div className="si-events__grid">
            {events.map((event, i) => {
              const parts = formatEventCalendarParts(event)
              const maps = event.mapsUrl?.trim() || ceremony.mapsUrl?.trim()
              return (
                <SiReveal key={event.id} delay={i * 0.08}>
                  <article className="si-event-card">
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
                </SiReveal>
              )
            })}
          </div>
        </SiSection>

        <SiSection id="countdown" sectionClass="si-countdown" transition="hearts">
          <SiHeading className="si-countdown__heading">{traditional.countdownHeading}</SiHeading>
          <p className="si-countdown__subheading">{traditional.countdownSub}</p>
          <SiReveal className="si-countdown__timer">
            <AnimatedCountdown />
          </SiReveal>
        </SiSection>

        <SiSection id="gallery" sectionClass="si-gallery" transition="bells">
          <SiHeading className="si-gallery__heading">{traditional.galleryHeading}</SiHeading>
          <SiGoldLine />
          <div className="si-gallery__grid">
            {gallery.images.map((img, i) => (
              <SiReveal key={img.src} delay={i * 0.06}>
                <button type="button" className="si-gallery__item">
                  <img className="si-gallery__image" src={img.src} alt={img.alt} loading="lazy" />
                </button>
              </SiReveal>
            ))}
          </div>
        </SiSection>

        <SiSection id="story-video" sectionClass="si-video" transition="silk">
          <SiHeading className="si-video__heading">{traditional.storyHeading}</SiHeading>
          <SiGoldLine />
          <SiReveal className="si-video__wrapper">
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
          </SiReveal>
        </SiSection>

        <SiSection id="venue" sectionClass="si-venue" transition="sparkles">
          <SiHeading className="si-venue__heading">{traditional.venueHeading}</SiHeading>
          <SiGoldLine />
          <SiReveal className="si-venue__content">
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
          </SiReveal>
        </SiSection>

        <SiSection id="rsvp" sectionClass="si-rsvp" transition="petals">
          <SiHeading className="si-rsvp__heading">{traditional.rsvpHeading}</SiHeading>
          <SiGoldLine />
          <SiReveal>
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
          </SiReveal>
        </SiSection>

        <footer className="si-footer">
          <div className="si-footer__scene">
            <SiReveal className="si-footer__text">
              <p className="si-footer__label">The Wedding of</p>
              <p className="si-footer__couple">{couple.groom.nameEn} & {couple.bride.nameEn}</p>
              <SiGoldLine />
              <p className="si-footer__credit">{footer.thanksEn}</p>
              <p className="si-footer__credit tamil">{footer.thanksTa}</p>
              <p className="si-footer__credit">Muhurtham · {date.en}</p>
            </SiReveal>
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
