import { lazy, Suspense, useEffect, useState } from 'react'
import FlipCountdownDigits from '../countdown/FlipCountdownDigits'
import KettimelamCountdownScene from '../three/countdown/KettimelamCountdownScene'
import CouplePortrait3DCanvas from '../three/ui/CouplePortrait3DCanvas'
import TraditionIcon3DCanvas from '../three/ui/TraditionIcon3DCanvas'
import CelebrationAudioButton from '../ui/CelebrationAudioButton'
import { weddingConfig } from '../../config/wedding'
import { useCeremonyCountdown } from '../../hooks/useCountdown'
import { downloadIcsForEvent } from '../../utils/calendar'
import {
  formatCeremonyDateDisplay,
  formatEventCalendarParts,
  formatEventTimeRange,
} from '../../utils/datetime'
import { shareInvitation } from '../../utils/share'
import Lightbox from '../ui/Lightbox'

const MangalamVaathiyamScene = lazy(() => import('../three/sections/MangalamVaathiyamScene'))
const ThaaliCeremonyScene = lazy(() => import('../three/sections/ThaaliCeremonyScene'))

const TRADITION_ICONS = [
  '/assets/south-indian/toran-type-1.png',
  '/assets/south-indian/kalash-pot.png',
  '/assets/south-indian/lotus.png',
  '/assets/south-indian/marigold-wreath.png',
]

export default function InvitationSections() {
  const {
    story,
    couple,
    traditions,
    events,
    ceremony,
    venue,
    blessings,
    gallery,
    footer,
    invitation,
    traditional,
    murugan,
    rsvp,
    contact,
  } = weddingConfig
  const cd = useCeremonyCountdown()
  const date = formatCeremonyDateDisplay()
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [melamBeat, setMelamBeat] = useState(0)

  useEffect(() => {
    let frame = 0
    const start = performance.now()
    const tick = () => {
      setMelamBeat((performance.now() - start) * 0.01)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent([ceremony.venueName, ceremony.address].filter(Boolean).join(', '))}&output=embed`

  return (
    <>
      <section id="blessings" className="ci-section wx-section wx-section--blessings">
        <div className="wx-section__ornament" aria-hidden />
        <div className="ci-section__inner">
          <h2 className="ci-section__title ci-reveal">Divine Blessings</h2>
          <p className="ci-section__subtitle ci-reveal tamil">{murugan.blessingTitleTa}</p>
          <p className="ci-line ci-reveal wx-blessing-lead">{murugan.blessingEn}</p>
          <p className="ci-line ci-reveal tamil">{murugan.blessingTa}</p>
          <p className="ci-line ci-reveal">{invitation.lineEn}</p>
        </div>
      </section>

      <section id="story" className="ci-section ci-section--story wx-section--editorial">
        <div className="ci-section__inner">
          <h2 className="ci-section__title ci-reveal">{story.titleEn}</h2>
          <p className="ci-section__subtitle ci-reveal">{story.subtitleEn}</p>
          <div className="ci-story-grid">
            <figure className="ci-story-frame ci-reveal">
              <img src="/assets/invitation.jpg" alt="Our journey" loading="lazy" />
            </figure>
            <div className="ci-story-copy">
              {story.paragraphsEn.map((p) => (
                <p key={p.slice(0, 32)} className="ci-line">{p}</p>
              ))}
              <p className="ci-line ci-story-sign script">{story.signatureEn}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="couple" className="ci-section ci-section--couple wx-section--couple">
        <div className="ci-section__inner">
          <h2 className="ci-section__title ci-reveal">{traditional.coupleHeading}</h2>
          <div className="ci-couple-album">
            <article className="ci-album-card ci-reveal wx-album-card">
              <CouplePortrait3DCanvas half="groom" />
              {couple.groom.photoSrc ? (
                <img className="ci-album-photo" src={couple.groom.photoSrc} alt={couple.groom.nameEn} />
              ) : null}
              <h3>{couple.groom.nameEn}</h3>
              <p className="tamil">{couple.groom.nameTa}</p>
              <p>{couple.groom.parents}</p>
              <p className="ci-album-story">{couple.groom.story}</p>
            </article>
            <article className="ci-album-card ci-reveal wx-album-card">
              <CouplePortrait3DCanvas half="bride" />
              {couple.bride.photoSrc ? (
                <img className="ci-album-photo" src={couple.bride.photoSrc} alt={couple.bride.nameEn} />
              ) : null}
              <h3>{couple.bride.nameEn}</h3>
              <p className="tamil">{couple.bride.nameTa}</p>
              <p>{couple.bride.parents}</p>
              <p className="ci-album-story">{couple.bride.story}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="traditions" className="ci-section ci-section--traditions">
        <div className="ci-section__inner">
          <h2 className="ci-section__title ci-reveal">{traditions.titleEn}</h2>
          <p className="ci-section__subtitle ci-reveal tamil">{traditions.titleTa}</p>
          <p className="ci-line ci-reveal">{traditions.introEn}</p>
          <div className="ci-tradition-grid">
            {traditions.items.map((item, i) => (
              <div key={item.en} className="ci-tradition-card wx-tradition-card">
                <TraditionIcon3DCanvas textureSrc={TRADITION_ICONS[i % TRADITION_ICONS.length]} />
                <p>{item.en}</p>
                <p className="tamil">{item.ta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="music" className="ci-section wx-section wx-section--music">
        <div className="ci-section__inner">
          <h2 className="ci-section__title ci-reveal">Mangalam Vaathiyam</h2>
          <p className="ci-section__subtitle ci-reveal">Nadaswaram & thavil — the heartbeat of our celebration</p>
          <Suspense fallback={<p className="ci-line">Loading musicians…</p>}>
            <MangalamVaathiyamScene className="ci-reveal" />
          </Suspense>
          <p className="ci-line ci-reveal tamil">நாதஸ்வரம், தவில் — மங்கள இசை</p>
        </div>
      </section>

      <section id="thaali" className="ci-section wx-section wx-section--thaali">
        <div className="ci-section__inner">
          <h2 className="ci-section__title ci-reveal">Sacred Thaali</h2>
          <p className="ci-section__subtitle ci-reveal">A golden promise on the auspicious yellow thread</p>
          <Suspense fallback={<p className="ci-line">Loading ceremony…</p>}>
            <ThaaliCeremonyScene className="ci-reveal" />
          </Suspense>
          <p className="ci-line ci-reveal">
            With respect for Tamil Hindu wedding customs, we honour the thaali moment as a symbol of love and commitment.
          </p>
        </div>
      </section>

      <section id="events" className="ci-section ci-section--events wx-section--timeline">
        <div className="ci-section__inner">
          <h2 className="ci-section__title ci-reveal">{traditional.eventsHeading}</h2>
          <p className="ci-section__subtitle ci-reveal">Mark your calendar for our auspicious day</p>
          <div className="ci-timeline">
            <div className="ci-timeline__grow" aria-hidden />
            {events.map((ev) => {
              const parts = formatEventCalendarParts(ev)
              return (
                <article key={ev.id} className="ci-event ci-reveal">
                  <div className="ci-event__date">
                    <span>{parts.weekday}</span>
                    <strong>{parts.day}</strong>
                    <span>{parts.month}</span>
                  </div>
                  <div className="ci-event__body">
                    <h3>{ev.nameEn}</h3>
                    <p className="tamil">{ev.nameTa}</p>
                    <p>{formatEventTimeRange(ev)}</p>
                    <p>{ev.venueName || ceremony.venueName}</p>
                    <button type="button" className="ci-btn ci-btn--ghost" onClick={() => downloadIcsForEvent(ev)}>
                      Add to calendar
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="family" className="ci-section ci-section--family">
        <div className="ci-section__inner">
          <h2 className="ci-section__title ci-reveal">Family Blessings</h2>
          <p className="ci-section__subtitle ci-reveal">{invitation.closingEn}</p>
          <div className="ci-family-blessings">
            <blockquote className="ci-reveal wx-quote">
              <p>{blessings.groomFamilyEn}</p>
              <p className="tamil">{blessings.groomFamilyTa}</p>
            </blockquote>
            <blockquote className="ci-reveal wx-quote">
              <p>{blessings.brideFamilyEn}</p>
              <p className="tamil">{blessings.brideFamilyTa}</p>
            </blockquote>
          </div>
        </div>
      </section>

      <section id="countdown" className="ci-section ci-section--countdown ci-section--kettimelam">
        <div className="ci-section__inner ci-reveal">
          <h2 className="ci-section__title">{traditional.countdownHeading}</h2>
          <p className="ci-section__subtitle">{traditional.countdownSub}</p>
          {cd.isPast ? (
            <p className="tamil ci-kettimelam__past">இன்று நம் திருமண நாள்!</p>
          ) : (
            <>
              <FlipCountdownDigits
                units={[
                  { label: 'Days', value: cd.days },
                  { label: 'Hours', value: cd.hours },
                  { label: 'Minutes', value: cd.minutes },
                  { label: 'Seconds', value: cd.seconds },
                ]}
              />
              <KettimelamCountdownScene
                days={String(cd.days).padStart(2, '0')}
                hours={String(cd.hours).padStart(2, '0')}
                minutes={String(cd.minutes).padStart(2, '0')}
                seconds={String(cd.seconds).padStart(2, '0')}
                beat={melamBeat}
              />
            </>
          )}
          <CelebrationAudioButton />
          <p className="ci-countdown__date">Muhurtham · {date.en}</p>
          <button
            type="button"
            className="ci-btn ci-btn--gold"
            onClick={() => void shareInvitation(`${couple.groom.nameEn} & ${couple.bride.nameEn}`, invitation.lineEn)}
          >
            Share invitation
          </button>
        </div>
      </section>

      <section id="venue" className="ci-section ci-section--venue wx-section--venue">
        <div className="ci-section__inner">
          <h2 className="ci-section__title ci-reveal">{traditional.venueHeading}</h2>
          <p className="ci-section__subtitle ci-reveal">{venue.subtitleEn}</p>
          <div className="ci-venue-card ci-reveal">
            <h3>{venue.journeyTitleEn}</h3>
            <p>{venue.routeEn}</p>
            <ul>{venue.landmarks.map((l) => <li key={l}>{l}</li>)}</ul>
            <p className="ci-venue-name">{ceremony.venueName}</p>
            <p>{ceremony.address}</p>
            {ceremony.mapsUrl?.trim() && (
              <a className="ci-btn ci-btn--gold" href={ceremony.mapsUrl} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
            )}
            <div className="ci-venue-map">
              <iframe title="Venue map" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="ci-section ci-section--gallery">
        <div className="ci-section__inner">
          <h2 className="ci-section__title ci-reveal">{traditional.galleryHeading}</h2>
          <div className="ci-gallery wx-gallery-mosaic">
            {gallery.images.map((img, i) => (
              <button key={img.src} type="button" className={`ci-gallery__item ci-reveal ci-gallery__item--${(i % 3) + 1}`} onClick={() => setLightbox(img.src)}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
        <Lightbox src={lightbox} alt="Wedding memory" onClose={() => setLightbox(null)} />
      </section>

      <section id="rsvp" className="ci-section wx-section wx-section--rsvp">
        <div className="ci-section__inner">
          <h2 className="ci-section__title ci-reveal">{traditional.rsvpHeading}</h2>
          <p className="ci-line ci-reveal">{rsvp.deadlineNote}</p>
          {rsvp.email ? (
            <a className="ci-btn ci-btn--gold ci-reveal" href={`mailto:${rsvp.email}`}>RSVP by email</a>
          ) : (
            <p className="ci-line ci-reveal">Add <code>rsvp.email</code> in wedding config to enable RSVP.</p>
          )}
          {contact.whatsappNumber?.trim() ? (
            <a
              className="ci-btn ci-btn--ghost ci-reveal"
              href={`https://wa.me/${String(contact.whatsappNumber).replace(/\D/g, '')}?text=${encodeURIComponent(contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              RSVP on WhatsApp
            </a>
          ) : null}
        </div>
      </section>

      <section id="finale" className="ci-section ci-section--finale wx-section--finale">
        <div className="ci-finale__petals ci-parallax wx-finale-petals" data-depth="0.15" aria-hidden />
        <div className="ci-section__inner">
          <div className="ci-finale__mandap ci-reveal">
            <img src="/assets/wedding-stage-banner.jpg" alt="Wedding mandapam" loading="lazy" />
          </div>
          <div className="ci-finale__couple ci-reveal">
            <CouplePortrait3DCanvas half="groom" />
            <CouplePortrait3DCanvas half="bride" />
          </div>
          <h2 className="ci-finale__names script">{couple.groom.nameEn} & {couple.bride.nameEn}</h2>
          <p className="wx-finale-date">{date.en}</p>
          <p className="ci-line">{invitation.lineEn}</p>
          <p className="tamil">{footer.thanksTa}</p>
          <p>{footer.thanksEn}</p>
        </div>
      </section>
    </>
  )
}
