type Props = {
  open: boolean
}

/** Rich red floral curtains — reference invitation aesthetic */
export default function FloralCurtains({ open }: Props) {
  return (
    <div className={`ci-curtains${open ? ' is-open' : ''}`} aria-hidden>
      <div className="ci-curtain ci-curtain--left">
        <div className="ci-curtain__fabric" />
        <div className="ci-curtain__rope" />
        <div className="ci-curtain__tassel" />
      </div>
      <div className="ci-curtain ci-curtain--right">
        <div className="ci-curtain__fabric" />
        <div className="ci-curtain__rope" />
        <div className="ci-curtain__tassel" />
      </div>
    </div>
  )
}
