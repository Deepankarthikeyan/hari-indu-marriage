import { Fragment } from 'react'
import { weddingConfig, type WeddingEvent } from '../../config/wedding'
import { formatEventCalendarParts, formatEventTimeRange } from '../../utils/datetime'
import { downloadIcsForEvent } from '../../utils/calendar'

function WxEventCard({ event, variant }: { event: WeddingEvent; variant: 'wedding' | 'reception' | 'default' }) {
  const parts = formatEventCalendarParts(event)
  const time = formatEventTimeRange(event)
  const cls = variant === 'wedding' ? 'wx-cal-event--wedding' : variant === 'reception' ? 'wx-cal-event--reception' : ''

  return (
    <article className={`wx-cal-event ${cls} wx-reveal`}>
      <div className="wx-cal-event__icon-badge" aria-hidden>
        <span className="wx-cal-event__icon-ring" />
        <i className={`fa-solid ${variant === 'wedding' ? 'fa-ring' : 'fa-champagne-glasses'}`} />
      </div>
      <div className="wx-cal-event__sheet">
        <div className="wx-cal-event__date-tile">
          <span className="wx-cal-event__weekday">{parts.weekday}</span>
          <span className="wx-cal-event__date-num">{parts.day}</span>
          <span className="wx-cal-event__month">{parts.month}</span>
        </div>
        <div className="wx-cal-event__body">
          <span className="wx-cal-event__tag">
            <i className="fa-solid fa-om" />
            {event.nameEn}
          </span>
          <h3 className="wx-cal-event__title tamil">{event.nameTa}</h3>
          <ul className="wx-cal-event__details">
            <li>
              <span className="wx-cal-event__detail-icon"><i className="fa-regular fa-clock" /></span>
              <span>{time}</span>
            </li>
            <li>
              <span className="wx-cal-event__detail-icon"><i className="fa-solid fa-location-dot" /></span>
              <span>{event.venueName}{event.address ? `, ${event.address}` : ''}</span>
            </li>
          </ul>
          <button type="button" className="wx-cal-event__calendar-btn" onClick={() => downloadIcsForEvent(event)}>
            <i className="fa-solid fa-calendar-plus" aria-hidden />
            <span>Add to Calendar</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default function WxEventsSection() {
  const { events } = weddingConfig
  if (!events.length) return null

  return (
    <section id="events" className="wx-section wx-section--events" data-transition="rangoli">
      <div className="wx-rangoli-bg" aria-hidden />
      <div className="container">
        <header className="wx-header wx-reveal">
          <span className="wx-header__ornament" aria-hidden>
            <i className="fa-solid fa-fire-flame-curved fa-icon" />
            <i className="fa-solid fa-star fa-icon" />
            <i className="fa-solid fa-fire-flame-curved fa-icon" />
          </span>
          <h2 className="wx-header__title">Wedding Events</h2>
          <p className="wx-header__subtitle">Mark your calendar for our auspicious day</p>
        </header>
        <div className="wx-events__timeline">
          {events.map((event, i) => (
            <Fragment key={event.id}>
              {i > 0 && (
                <div className="wx-events__connector wx-reveal" aria-hidden>
                  <span className="wx-events__connector-line" />
                  <span className="wx-events__connector-heart"><i className="fa-solid fa-heart" /></span>
                  <span className="wx-events__connector-line" />
                </div>
              )}
              <WxEventCard event={event} variant={event.id === 'muhurtham' ? 'wedding' : 'default'} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
