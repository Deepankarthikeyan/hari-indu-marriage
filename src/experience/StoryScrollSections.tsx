import { useMemo, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../config/wedding'
import { useCeremonyCountdown } from '../hooks/useCountdown'
import { downloadIcsForEvent } from '../utils/calendar'
import { formatCeremonyDateDisplay } from '../utils/datetime'
import { shareInvitation } from '../utils/share'
import MuruganVisual from '../components/art/MuruganVisual'
import Lightbox from '../components/ui/Lightbox'
import BrideIllustration from './characters/BrideIllustration'
import GroomIllustration from './characters/GroomIllustration'
import { reveal } from '../components/motion'

type Props = {
  staticMode?: boolean
  progress?: number
}

export default function StoryScrollSections({ staticMode = false, progress = 0 }: Props) {
  const reduce = useReducedMotion()
  const { couple, traditional, gallery, rsvp, contact, footer, invitation } = weddingConfig
  const cd = useCeremonyCountdown()
  const date = formatCeremonyDateDisplay()
  const [lightbox, setLightbox] = useState<string | null>(null)
  const guestName = useMemo(() => new URLSearchParams(window.location.search).get('to')?.trim() ?? '', [])
  const [rsvpSent, setRsvpSent] = useState(false)

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
    } else if (wa) {
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer')
    }
    setRsvpSent(true)
  }

  const MotionSection = reduce ? 'section' : motion.section

  if (staticMode) {
    return (
      <div className="ws-static-flow">
        <StaticBlessings />
        <StaticCouple />
        <StaticTraditions />
        <StaticEvents />
        <StaticVenue />
        <GalleryBlock gallery={gallery} setLightbox={setLightbox} />
        <CountdownBlock cd={cd} traditional={traditional} />
        <RsvpBlock guestName={guestName} onRsvp={onRsvp} rsvpSent={rsvpSent} traditional={traditional} />
        <FinaleBlock couple={couple} date={date} invitation={invitation} footer={footer} united />
      </div>
    )
  }

  return (
    <div className="ws-post-pin">
      <MotionSection
        id="gallery"
        className="ws-section ws-section--gallery"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
      >
        <GalleryBlock gallery={gallery} setLightbox={setLightbox} />
      </MotionSection>

      <MotionSection
        id="countdown"
        className="ws-section ws-section--countdown"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <CountdownBlock cd={cd} traditional={traditional} />
      </MotionSection>

      <MotionSection
        id="rsvp"
        className="ws-section ws-section--rsvp"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <RsvpBlock guestName={guestName} onRsvp={onRsvp} rsvpSent={rsvpSent} traditional={traditional} />
      </MotionSection>

      <MotionSection
        id="finale"
        className="ws-section ws-section--finale"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
      >
        <FinaleBlock couple={couple} date={date} invitation={invitation} footer={footer} united={progress >= 0.96} />
      </MotionSection>

      <Lightbox
        src={lightbox}
        alt="Wedding memory"
        onClose={() => setLightbox(null)}
        onPrev={() => {
          const i = gallery.images.findIndex((g) => g.src === lightbox)
          if (i > 0) setLightbox(gallery.images[i - 1].src)
        }}
        onNext={() => {
          const i = gallery.images.findIndex((g) => g.src === lightbox)
          if (i >= 0 && i < gallery.images.length - 1) setLightbox(gallery.images[i + 1].src)
        }}
      />
    </div>
  )
}

function GalleryBlock({
  gallery,
  setLightbox,
}: {
  gallery: typeof weddingConfig.gallery
  setLightbox: (s: string | null) => void
}) {
  return (
    <>
      <h2 className="ws-section__title">{weddingConfig.traditional.galleryHeading}</h2>
      <div className="ws-gallery-mosaic">
        {gallery.images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className={`ws-gallery-item ws-gallery-item--${(i % 3) + 1}`}
            onClick={() => setLightbox(img.src)}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
          </button>
        ))}
      </div>
    </>
  )
}

function CountdownBlock({
  cd,
  traditional,
}: {
  cd: ReturnType<typeof useCeremonyCountdown>
  traditional: typeof weddingConfig.traditional
}) {
  return (
    <>
      <h2 className="ws-section__title">{traditional.countdownHeading}</h2>
      <p className="ws-section__sub">{traditional.countdownSub}</p>
      <div className="ws-countdown">
        {cd.isPast ? (
          <p className="tamil">இன்று நம் திருமண நாள்!</p>
        ) : (
          <>
            {[
              ['Days', cd.days],
              ['Hours', cd.hours],
              ['Minutes', cd.minutes],
              ['Seconds', cd.seconds],
            ].map(([label, val]) => (
              <div key={label} className="ws-countdown__unit">
                <span className="ws-countdown__num">{String(val).padStart(2, '0')}</span>
                <span className="ws-countdown__lbl">{label}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}

function RsvpBlock({
  guestName,
  onRsvp,
  rsvpSent,
  traditional,
}: {
  guestName: string
  onRsvp: (e: FormEvent<HTMLFormElement>) => void
  rsvpSent: boolean
  traditional: typeof weddingConfig.traditional
}) {
  const mainEvent = weddingConfig.events[0]
  return (
    <>
      <h2 className="ws-section__title">{traditional.rsvpHeading}</h2>
      {rsvpSent ? (
        <p className="ws-rsvp-confirm" role="status">Thank you — your response has been prepared. Send via email or WhatsApp if prompted.</p>
      ) : (
        <form className="ws-rsvp-form" onSubmit={onRsvp}>
          <label>
            Your name
            <input name="name" required defaultValue={guestName} placeholder="Full name" />
          </label>
          <fieldset>
            <legend>Will you attend?</legend>
            <label><input type="radio" name="attending" value="yes" required /> Joyfully accept</label>
            <label><input type="radio" name="attending" value="no" /> Respectfully decline</label>
          </fieldset>
          <label>
            Message (optional)
            <textarea name="message" rows={3} placeholder="Your wishes…" />
          </label>
          <button type="submit" className="ws-btn ws-btn--maroon">Confirm attendance</button>
        </form>
      )}
      <div className="ws-share-row">
        {mainEvent && (
          <button type="button" className="ws-btn ws-btn--ghost" onClick={() => downloadIcsForEvent(mainEvent)}>
            Add to calendar
          </button>
        )}
        <button
          type="button"
          className="ws-btn ws-btn--ghost"
          onClick={() => void shareInvitation(`${weddingConfig.couple.groom.nameEn} & ${weddingConfig.couple.bride.nameEn}`, weddingConfig.invitation.lineEn)}
        >
          Share invitation
        </button>
      </div>
    </>
  )
}

function FinaleBlock({
  couple,
  date,
  invitation,
  footer,
  united,
}: {
  couple: typeof weddingConfig.couple
  date: ReturnType<typeof formatCeremonyDateDisplay>
  invitation: typeof weddingConfig.invitation
  footer: typeof weddingConfig.footer
  united: boolean
}) {
  return (
    <div className="ws-finale">
      <div className="ws-finale__petals" aria-hidden />
      <div className="ws-finale__mandapam">
        <img src="/assets/wedding-stage-banner.jpg" alt="Decorated wedding mandapam" loading="lazy" />
      </div>
      <div className="ws-finale__chars">
        <GroomIllustration pull={1} united={united} />
        <BrideIllustration pull={1} united={united} />
      </div>
      <h2 className="ws-finale__names script">{couple.groom.nameEn} & {couple.bride.nameEn}</h2>
      <p className="ws-finale__date">{date.en}</p>
      <p className="ws-finale__invite">{invitation.lineEn}</p>
      <p className="ws-finale__thanks tamil">{footer.thanksTa}</p>
      <p className="ws-finale__thanks">{footer.thanksEn}</p>
      <img className="ws-finale__gopuram" src="/assets/south-indian/gopuram-illustration-cropped.png" alt="" />
    </div>
  )
}

function StaticBlessings() {
  const { murugan } = weddingConfig
  return (
    <section id="blessings" className="ws-section">
      <MuruganVisual variant="hero" />
      <h2>{murugan.blessingTitleEn}</h2>
      <p>{murugan.blessingEn}</p>
    </section>
  )
}

function StaticCouple() {
  const { couple, traditional } = weddingConfig
  return (
    <section id="couple" className="ws-section">
      <h2>{traditional.coupleHeading}</h2>
      <p>{couple.groom.nameEn} & {couple.bride.nameEn}</p>
    </section>
  )
}

function StaticTraditions() {
  const { traditions } = weddingConfig
  return (
    <section id="traditions" className="ws-section">
      <h2>{traditions.titleEn}</h2>
      <ul>{traditions.items.map((i) => <li key={i.en}>{i.en}</li>)}</ul>
    </section>
  )
}

function StaticEvents() {
  return <section id="events" className="ws-section"><h2>Events</h2></section>
}

function StaticVenue() {
  const { ceremony, venue } = weddingConfig
  return (
    <section id="venue" className="ws-section">
      <h2>{venue.journeyTitleEn}</h2>
      <p>{ceremony.venueName}</p>
    </section>
  )
}
