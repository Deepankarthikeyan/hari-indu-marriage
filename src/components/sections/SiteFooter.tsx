import { weddingConfig } from '../../config/wedding'
import './SiteFooter.css'

export default function SiteFooter() {
  const { footer, couple } = weddingConfig

  return (
    <footer className="footer-trad">
      <div className="footer-kolam" aria-hidden />
      <p className="footer-thanks tamil">{footer.thanksTa}</p>
      <p className="footer-thanks">{footer.thanksEn}</p>
      <p className="footer-names tamil">
        {couple.bride.nameTa} · {couple.groom.nameTa}
      </p>
      <p className="footer-copy">© {new Date().getFullYear()}</p>
    </footer>
  )
}
