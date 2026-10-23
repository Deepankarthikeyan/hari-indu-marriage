const LINKS = [
  { href: '#welcome', label: 'Welcome' },
  { href: '#story', label: 'Story' },
  { href: '#ceremony', label: 'Ceremony' },
  { href: '#families', label: 'Families' },
  { href: '#venue', label: 'Venue' },
  { href: '#blessings', label: 'Blessings' },
]

export default function ChapterNav({ visible }: { visible: boolean }) {
  if (!visible) return null

  return (
    <nav className="e-nav is-visible" aria-label="Chapters">
      {LINKS.map((l) => (
        <a key={l.href} href={l.href}>{l.label}</a>
      ))}
    </nav>
  )
}
