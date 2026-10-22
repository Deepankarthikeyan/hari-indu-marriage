import { weddingConfig } from '../../config/wedding'

export default function WxStorySection() {
  const { story, couple } = weddingConfig

  return (
    <section id="story" className="wx-section wx-section--story" data-transition="petals">
      <div className="container">
        <header className="wx-header wx-reveal">
          <span className="wx-header__ornament" aria-hidden>
            <i className="fa-solid fa-spa wx-header__ornament fa-icon" />
            <i className="fa-solid fa-gem wx-header__ornament fa-icon" />
            <i className="fa-solid fa-spa wx-header__ornament fa-icon" />
          </span>
          <h2 className="wx-header__title">{story.titleEn}</h2>
          <p className="wx-header__subtitle">{story.subtitleEn}</p>
        </header>
        <div className="wx-story__grid">
          <figure className="wx-story__heart-figure wx-reveal">
            <svg className="wx-story__heart-svg" viewBox="0 0 400 360" role="img" aria-label={`${couple.groom.nameEn} and ${couple.bride.nameEn}`}>
              <defs>
                <clipPath id="couple-heart-clip">
                  <path d="M200,328 C200,328 36,248 36,148 C36,78 92,28 142,28 C172,28 196,58 200,88 C204,58 228,28 258,28 C308,28 364,78 364,148 C364,248 200,328 200,328 Z" />
                </clipPath>
              </defs>
              <g clipPath="url(#couple-heart-clip)">
                <image href="/assets/invitation.jpg" x="0" y="-18" width="400" height="400" preserveAspectRatio="xMidYMin slice" />
              </g>
            </svg>
          </figure>
          <div className="wx-story__text wx-reveal">
            {story.paragraphsEn.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="wx-story__signature">{story.signatureEn}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
