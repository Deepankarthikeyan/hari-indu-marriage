import { weddingConfig } from '../config/wedding'
import {
  formatCeremonyDateDisplay,
  formatEventCalendarParts,
  formatEventTimeRange,
} from '../utils/datetime'
import MuruganVisual from '../components/art/MuruganVisual'
import VelMotif from '../components/art/VelMotif'
import type { StoryChapterId } from './hooks/useStoryScroll'
import { localChapterProgress } from './hooks/useStoryScroll'

type Props = {
  chapter: StoryChapterId
  progress: number
}

function panelOpacity(progress: number, id: StoryChapterId) {
  const local = localChapterProgress(progress, id)
  const fade = 0.12
  if (local < fade) return local / fade
  if (local > 1 - fade) return (1 - local) / fade
  return 1
}

export default function StoryChapterPanels({ chapter, progress }: Props) {
  const { murugan, couple, traditions, events, ceremony, venue, traditional, invitation } = weddingConfig
  const date = formatCeremonyDateDisplay()
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent([ceremony.venueName, ceremony.address].filter(Boolean).join(', '))}&output=embed`

  if (chapter === 'finale') {
    const op = panelOpacity(progress, 'finale')
    return (
      <article
        id="story-finale"
        className="ws-chapter ws-chapter--finale-tease is-active"
        style={{ opacity: op }}
      >
        <h2 className="ws-chapter__title script">{couple.groom.nameEn} & {couple.bride.nameEn}</h2>
        <p className="ws-chapter__body">{invitation.lineEn}</p>
        <p className="ws-chapter__meta">Scroll on for memories, countdown & RSVP</p>
      </article>
    )
  }

  return (
    <div className="ws-chapter-stack">
      <article
        id="blessings"
        className={`ws-chapter ws-chapter--blessings ${chapter === 'blessings' ? 'is-active' : ''}`}
        style={{ opacity: chapter === 'blessings' ? panelOpacity(progress, 'blessings') : 0 }}
        aria-hidden={chapter !== 'blessings'}
      >
        <VelMotif size="md" glow />
        <h2 className="ws-chapter__title">{murugan.blessingTitleEn}</h2>
        <p className="ws-chapter__title-ta tamil">{murugan.blessingTitleTa}</p>
        <MuruganVisual variant="intro" className="ws-chapter__murugan" />
        <p className="ws-chapter__body">{murugan.blessingEn}</p>
        <p className="ws-chapter__body-ta tamil">{murugan.blessingTa}</p>
      </article>

      <article
        id="couple"
        className={`ws-chapter ws-chapter--couple ${chapter === 'couple' ? 'is-active' : ''}`}
        style={{ opacity: chapter === 'couple' ? panelOpacity(progress, 'couple') : 0 }}
        aria-hidden={chapter !== 'couple'}
      >
        <h2 className="ws-chapter__title">{traditional.coupleHeading}</h2>
        <div className="ws-couple-mini">
          <div className="ws-couple-mini__person">
            {couple.groom.photoSrc ? (
              <img src={couple.groom.photoSrc} alt={couple.groom.nameEn} className="ws-couple-mini__photo" />
            ) : (
              <div className="ws-couple-mini__photo ws-couple-mini__photo--ph">{couple.groom.nameEn.charAt(0)}</div>
            )}
            <h3>{couple.groom.nameEn}</h3>
            <p className="tamil">{couple.groom.nameTa}</p>
            <p className="ws-couple-mini__sub">{couple.groom.subtitle}</p>
            <p className="ws-couple-mini__parents">{couple.groom.parents}</p>
          </div>
          <div className="ws-couple-mini__person">
            {couple.bride.photoSrc ? (
              <img src={couple.bride.photoSrc} alt={couple.bride.nameEn} className="ws-couple-mini__photo" />
            ) : (
              <div className="ws-couple-mini__photo ws-couple-mini__photo--ph">{couple.bride.nameEn.charAt(0)}</div>
            )}
            <h3>{couple.bride.nameEn}</h3>
            <p className="tamil">{couple.bride.nameTa}</p>
            <p className="ws-couple-mini__sub">{couple.bride.subtitle}</p>
            <p className="ws-couple-mini__parents">{couple.bride.parents}</p>
          </div>
        </div>
      </article>

      <article
        id="traditions"
        className={`ws-chapter ws-chapter--traditions ${chapter === 'traditions' ? 'is-active' : ''}`}
        style={{ opacity: chapter === 'traditions' ? panelOpacity(progress, 'traditions') : 0 }}
        aria-hidden={chapter !== 'traditions'}
      >
        <h2 className="ws-chapter__title">{traditions.titleEn}</h2>
        <p className="ws-chapter__title-ta tamil">{traditions.titleTa}</p>
        <p className="ws-chapter__body">{traditions.introEn}</p>
        <ul className="ws-tradition-list">
          {traditions.items.map((item, i) => {
            const local = localChapterProgress(progress, 'traditions')
            const show = local > i * 0.18
            return (
              <li key={item.en} className={show ? 'is-visible' : ''} style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="ws-tradition-list__icon wh-kolam-dot" aria-hidden />
                <span>{item.en}</span>
                <span className="tamil ws-tradition-list__ta">{item.ta}</span>
              </li>
            )
          })}
        </ul>
        <div className="ws-tradition-deco" aria-hidden>
          <img src="/assets/south-indian/toran-type-1.png" alt="" loading="lazy" />
          <img src="/assets/south-indian/kalash-pot.png" alt="" loading="lazy" />
          <img src="/assets/south-indian/lotus.png" alt="" loading="lazy" />
        </div>
      </article>

      <article
        id="events"
        className={`ws-chapter ws-chapter--events ${chapter === 'events' ? 'is-active' : ''}`}
        style={{ opacity: chapter === 'events' ? panelOpacity(progress, 'events') : 0 }}
        aria-hidden={chapter !== 'events'}
      >
        <h2 className="ws-chapter__title">{traditional.eventsHeading}</h2>
        <div className="ws-timeline">
          {events.map((ev) => {
            const parts = formatEventCalendarParts(ev)
            return (
              <div key={ev.id} className="ws-timeline__item">
                <div className="ws-timeline__dot" aria-hidden />
                <div className="ws-timeline__card">
                  <h3>{ev.nameEn}</h3>
                  <p className="tamil">{ev.nameTa}</p>
                  <p>{parts.weekday}, {parts.day} {parts.month}</p>
                  <p>{formatEventTimeRange(ev)}</p>
                  <p>{ev.venueName || ceremony.venueName}</p>
                  {ev.mapsUrl?.trim() && (
                    <a href={ev.mapsUrl} target="_blank" rel="noopener noreferrer">Directions</a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </article>

      <article
        id="venue"
        className={`ws-chapter ws-chapter--venue ${chapter === 'venue' ? 'is-active' : ''}`}
        style={{ opacity: chapter === 'venue' ? panelOpacity(progress, 'venue') : 0 }}
        aria-hidden={chapter !== 'venue'}
      >
        <h2 className="ws-chapter__title">{venue.journeyTitleEn}</h2>
        <p className="ws-chapter__body">{venue.subtitleEn}</p>
        <h3 className="ws-venue-name">{ceremony.venueName}</h3>
        <p className="ws-venue-address">{ceremony.address}</p>
        {ceremony.mapsUrl?.trim() && (
          <a className="ws-btn ws-btn--gold" href={ceremony.mapsUrl} target="_blank" rel="noopener noreferrer">
            Get Directions
          </a>
        )}
        <div className="ws-venue-map">
          <iframe title="Venue map" src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <p className="ws-chapter__meta">Muhurtham · {date.en}</p>
      </article>
    </div>
  )
}
