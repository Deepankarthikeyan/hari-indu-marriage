import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#blessings', label: 'Blessings' },
  { href: '#couple', label: 'Couple' },
  { href: '#traditions', label: 'Traditions' },
  { href: '#events', label: 'Events' },
  { href: '#venue', label: 'Venue' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#countdown', label: 'Countdown' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#finale', label: 'Finale' },
]

export default function StoryNavigation({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <header className={`ws-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#si-story-top" className="ws-nav__brand script">H & I</a>
      <button
        type="button"
        className="ws-nav__toggle"
        aria-expanded={open}
        aria-controls="ws-nav-menu"
        onClick={() => setOpen((o) => !o)}
      >
        Menu
      </button>
      <nav id="ws-nav-menu" className={`ws-nav__menu ${open ? 'is-open' : ''}`} aria-label="Wedding sections">
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
