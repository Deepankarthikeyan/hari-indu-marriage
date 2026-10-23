import { weddingConfig } from '../../config/wedding'

export default function WxVenueSection() {
  const { ceremony, venue } = weddingConfig
  const maps = ceremony.mapsUrl?.trim()

  return (
    <section id="venue" className="wx-section wx-section--venue" data-transition="silk">
      <div className="container">
        <header className="wx-header wx-reveal">
          <span className="wx-header__ornament" aria-hidden>
            <i className="fa-solid fa-place-of-worship fa-icon" />
            <i className="fa-solid fa-gem fa-icon" />
            <i className="fa-solid fa-place-of-worship fa-icon" />
          </span>
          <h2 className="wx-header__title">Venue</h2>
          <p className="wx-header__subtitle">{venue.subtitleEn}</p>
        </header>
        <div className="wx-venue__experience">
          <div className="wx-venue__journey wx-reveal">
            <p className="wx-venue__journey-tag">
              <i className="fa-solid fa-route" /> Your journey
            </p>
            <h3 className="wx-venue__journey-title">{venue.journeyTitleEn}</h3>
            <p className="wx-venue__journey-route">{venue.routeEn}</p>
            {venue.landmarks.length > 0 && (
              <ul className="wx-venue__landmarks" aria-label="Nearby landmarks">
                {venue.landmarks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            <div className="wx-venue__actions">
              {maps ? (
                <a href={maps} className="wx-btn wx-btn--outline wx-venue__maps-link" target="_blank" rel="noopener noreferrer">
                  Open Live Map
                </a>
              ) : (
                <p className="wx-venue__hint">Add <code>ceremony.mapsUrl</code> in config for directions.</p>
              )}
            </div>
            <div className="wx-venue__mandapam-card">
              <i className="fa-solid fa-temple-hindu wx-venue__mandapam-icon" aria-hidden />
              <div>
                <p className="wx-venue__mandapam-name">{ceremony.venueName}</p>
                <p className="wx-venue__mandapam-address">{ceremony.address}</p>
              </div>
            </div>
          </div>
          <div className="wx-venue__map-stage wx-reveal">
            <div className="wx-venue__map-frame" aria-hidden>
              <span className="wx-venue__map-arch" />
              <span className="wx-venue__map-glow" />
            </div>
            <div className="wx-venue__map-canvas wx-venue__map-canvas--illustrated">
              <div className="wx-venue__illustrated-map wx-venue__illustrated-map--placeholder">
                <p className="tamil">{venue.mapCaptionTa}</p>
                <p>{venue.mapCaptionEn}</p>
              </div>
            </div>
            {maps && (
              <a href={maps} className="wx-venue__map-live-link" target="_blank" rel="noopener noreferrer">
                Open Live Satellite Map
              </a>
            )}
            <p className="wx-venue__map-caption">
              <span className="wx-venue__map-caption-tamil tamil">{venue.mapCaptionTa}</span>
              <span>{venue.mapCaptionEn}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
