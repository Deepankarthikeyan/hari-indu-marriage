import { weddingConfig } from '../../config/wedding'

export default function WxFooter() {
  const { couple, footer } = weddingConfig
  return (
    <footer className="wx-footer">
      <div className="wx-footer__floral" aria-hidden>
        <i className="fa-solid fa-spa fa-icon" />
        <i className="fa-solid fa-gem fa-icon" />
        <i className="fa-solid fa-spa fa-icon" />
      </div>
      <p className="wx-footer__names">{couple.groom.nameEn} & {couple.bride.nameEn}</p>
      <p className="tamil">{footer.thanksTa}</p>
      <p>{footer.thanksEn}</p>
      <p className="wx-footer__copy">With love · {new Date().getFullYear()}</p>
    </footer>
  )
}
