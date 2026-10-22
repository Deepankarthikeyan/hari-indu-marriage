import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MelamDecor from './MelamDecor'
import './MainSite.css'

const WEDDING_DATE = new Date('2026-12-13T07:35:00+05:30')

function useCountdown(target: Date) {
  const [parts, setParts] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now())
      setParts({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return parts
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function MainSite() {
  const countdown = useCountdown(WEDDING_DATE)

  return (
    <div className="main-site">
      <header className="site-header">
        <p className="header-tamil tamil">திருமண அழைப்பிதழ்</p>
        <nav className="site-nav">
          <a href="#couple">Couple</a>
          <a href="#details">Details</a>
          <a href="#tradition">Tradition</a>
          <a href="#invite">Invitation</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-kolam" aria-hidden />
        <motion.div className="hero-inner" {...fadeUp}>
          <p className="hero-blessing tamil">ஶ்ரீ கணேசாய நம:</p>
          <h1 className="hero-names">
            <span>V. Hariharan</span>
            <span className="hero-amp">&</span>
            <span>N. Indhumathi</span>
          </h1>
          <p className="hero-tamil-names tamil">
            வ. ஹரிஹரன் · ந. இந்துமதி
          </p>
          <p className="hero-tagline">
            With hearts full of joy, we invite you to celebrate our sacred union
          </p>
          <div className="countdown">
            {[
              ['Days', countdown.days],
              ['Hours', countdown.hours],
              ['Mins', countdown.minutes],
              ['Secs', countdown.seconds],
            ].map(([label, value]) => (
              <div key={label} className="countdown-box">
                <span className="countdown-num">{String(value).padStart(2, '0')}</span>
                <span className="countdown-label">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="hero-silk-border" aria-hidden />
      </section>

      <section id="couple" className="section couple-section">
        <motion.h2 className="section-title tamil" {...fadeUp}>
          மணமக்கள்
        </motion.h2>
        <motion.p className="section-sub" {...fadeUp}>
          The Couple
        </motion.p>
        <div className="couple-cards">
          <motion.article className="person-card groom" {...fadeUp} transition={{ delay: 0.1 }}>
            <div className="person-avatar groom-avatar" aria-hidden>
              <span className="avatar-icon">🤵</span>
            </div>
            <h3 className="person-name tamil">வ. ஹரிஹரன்</h3>
            <p className="person-name-en">V. Hariharan</p>
            <p className="person-degree">B.E., (EEE)</p>
            <p className="person-dress">Traditional silk veshti & angavastram</p>
          </motion.article>
          <motion.div className="couple-mid" {...fadeUp} transition={{ delay: 0.15 }}>
            <div className="thali-symbol" aria-hidden>∞</div>
            <p className="tamil couple-mid-text">தாலி கட்டும் திருமணம்</p>
          </motion.div>
          <motion.article className="person-card bride" {...fadeUp} transition={{ delay: 0.2 }}>
            <div className="person-avatar bride-avatar" aria-hidden>
              <span className="avatar-icon">👰</span>
            </div>
            <h3 className="person-name tamil">ந. இந்துமதி</h3>
            <p className="person-name-en">N. Indhumathi</p>
            <p className="person-degree">D.E.C.E.,</p>
            <p className="person-dress">Kanchipuram silk saree & temple jewellery</p>
          </motion.article>
        </div>
      </section>

      <section id="details" className="section details-section">
        <motion.h2 className="section-title tamil" {...fadeUp}>
          மணநாள் & நேரம்
        </motion.h2>
        <motion.div className="details-grid" {...fadeUp}>
          <div className="detail-card">
            <span className="detail-label tamil">மணநாள்</span>
            <p className="detail-value">13 December 2026</p>
            <p className="detail-sub tamil">ஞாயிற்றுக்கிழமை</p>
          </div>
          <div className="detail-card highlight">
            <span className="detail-label tamil">முகூர்த்த நேரம்</span>
            <p className="detail-value tamil">காலை 7.35 மணிக்குமேல்</p>
            <p className="detail-value tamil">9.00 மணிக்குள்</p>
            <p className="detail-sub">Between 7:35 AM – 9:00 AM</p>
          </div>
        </motion.div>
        <MelamDecor />
      </section>

      <section id="tradition" className="section tradition-section">
        <motion.h2 className="section-title tamil" {...fadeUp}>
          தமிழ் திருமண மரபு
        </motion.h2>
        <motion.p className="section-sub" {...fadeUp}>
          Temple bells, nadaswaram melam, and timeless grace
        </motion.p>
        <div className="tradition-grid">
          {[
            {
              title: 'Temple Gopuram',
              tamil: 'கோயில் கோபுரம்',
              text: 'Our celebration is rooted in devotion — like the towering gopuram, a gateway to a new beginning together.',
            },
            {
              title: 'Melam & Nadaswaram',
              tamil: 'மேளம் & நாதஸ்வரம்',
              text: 'The auspicious thavil beats and nadaswaram notes that herald every Tamil wedding muhurtham.',
            },
            {
              title: 'Silk & Flowers',
              tamil: 'பட்டு & மலர்',
              text: 'Kanchipuram silks, jasmine garlands, and kolam patterns — colours of joy in maroon and gold.',
            },
          ].map((item, i) => (
            <motion.article
              key={item.title}
              className="tradition-card"
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
            >
              <h3 className="tamil">{item.tamil}</h3>
              <p className="tradition-en">{item.title}</p>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="invite" className="section invite-section">
        <motion.h2 className="section-title tamil" {...fadeUp}>
          அழைப்பிதழ்
        </motion.h2>
        <motion.div className="invite-frame" {...fadeUp}>
          <img
            src="/assets/invitation.jpg"
            alt="Wedding invitation card for V. Hariharan and N. Indhumathi"
            className="invite-image"
            loading="lazy"
          />
        </motion.div>
        <motion.p className="invite-note" {...fadeUp}>
          Your presence and blessings will make our day complete. நன்றி!
        </motion.p>
      </section>

      <footer className="site-footer">
        <p className="tamil">ஹரிஹரன் & இந்துமதி · 2026</p>
        <p className="footer-en">Made with love · South Indian wedding celebration</p>
      </footer>
    </div>
  )
}
