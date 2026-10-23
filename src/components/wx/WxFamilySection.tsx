import { weddingConfig } from '../../config/wedding'

function Portrait({
  role,
  name,
  parents,
  photoSrc,
}: {
  role: 'groom' | 'bride'
  name: string
  parents: string
  photoSrc?: string
}) {
  const hasPhoto = Boolean(photoSrc?.trim())
  const modifier = role === 'groom' ? 'wx-family-portrait--groom' : 'wx-family-portrait--bride'

  return (
    <article className={`wx-family-portrait ${modifier} wx-reveal`}>
      <div className="wx-family-portrait__card">
        <div className="wx-family-portrait__frame" aria-hidden>
          <span className="wx-family-portrait__arch" />
          <span className="wx-family-portrait__ring" />
          <span className="wx-family-portrait__sparkle wx-family-portrait__sparkle--1" />
          <span className="wx-family-portrait__sparkle wx-family-portrait__sparkle--2" />
        </div>
        <div className={`wx-family-portrait__avatar${hasPhoto ? ' wx-family-portrait__avatar--photo' : ''}`}>
          {hasPhoto ? (
            <img src={photoSrc} alt={name} loading="lazy" width={512} height={512} />
          ) : (
            <span className="wx-family-portrait__initial" aria-hidden>{name.charAt(0)}</span>
          )}
        </div>
        <div className="wx-family-portrait__badge">{role === 'groom' ? 'Groom' : 'Bride'}</div>
      </div>
      <div className="wx-family-portrait__details">
        <h3 className="wx-family-portrait__name">{name}</h3>
        <div className="wx-family-portrait__parents">
          <p>{parents}</p>
        </div>
      </div>
    </article>
  )
}

export default function WxFamilySection() {
  const { couple } = weddingConfig

  return (
    <section id="family" className="wx-section wx-section--family" data-transition="bells">
      <div className="wx-family__bg" aria-hidden>
        <span className="wx-family__petal wx-family__petal--1" />
        <span className="wx-family__petal wx-family__petal--2" />
        <span className="wx-family__petal wx-family__petal--3" />
        <span className="wx-family__petal wx-family__petal--4" />
      </div>
      <div className="container">
        <header className="wx-header wx-reveal">
          <span className="wx-header__ornament" aria-hidden>
            <i className="fa-solid fa-bell fa-icon" />
            <i className="fa-solid fa-gem fa-icon" />
            <i className="fa-solid fa-bell fa-icon" />
          </span>
          <h2 className="wx-header__title">Family Details</h2>
          <p className="wx-header__subtitle">With love and blessings of our families</p>
        </header>
        <div className="wx-family__stage">
          <Portrait
            role="groom"
            name={couple.groom.nameEn}
            parents={couple.groom.parents ?? ''}
            photoSrc={couple.groom.photoSrc}
          />
          <div className="wx-family__union wx-reveal" aria-hidden>
            <span className="wx-family__union-vine" />
            <span className="wx-family__union-heart"><i className="fa-solid fa-heart" /></span>
            <span className="wx-family__union-vine wx-family__union-vine--r" />
            <p className="wx-family__union-text">Blessed Union</p>
          </div>
          <Portrait
            role="bride"
            name={couple.bride.nameEn}
            parents={couple.bride.parents ?? ''}
            photoSrc={couple.bride.photoSrc}
          />
        </div>
      </div>
    </section>
  )
}
