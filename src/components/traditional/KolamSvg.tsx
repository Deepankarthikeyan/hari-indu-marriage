export default function KolamSvg() {
  return (
    <svg className="si-ec__kolam" viewBox="0 0 300 300" aria-hidden>
      <circle className="si-ec__kolam-dot" cx="150" cy="150" r="0" />
      <circle className="si-ec__kolam-dot" cx="192" cy="108" r="0" />
      <circle className="si-ec__kolam-dot" cx="192" cy="192" r="0" />
      <circle className="si-ec__kolam-dot" cx="108" cy="192" r="0" />
      <circle className="si-ec__kolam-dot" cx="108" cy="108" r="0" />
      <circle className="si-ec__kolam-dot" cx="150" cy="72" r="0" />
      <circle className="si-ec__kolam-dot" cx="228" cy="150" r="0" />
      <circle className="si-ec__kolam-dot" cx="150" cy="228" r="0" />
      <circle className="si-ec__kolam-dot" cx="72" cy="150" r="0" />
      <path className="si-ec__kolam-ring" d="M150,132 A18,18 0 1,1 150,168 A18,18 0 1,1 150,132" />
      <path className="si-ec__kolam-petal" d="M150,132 C162,112 162,82 150,72 C138,82 138,112 150,132" />
      <path className="si-ec__kolam-petal" d="M168,150 C188,138 218,138 228,150 C218,162 188,162 168,150" />
      <path className="si-ec__kolam-petal" d="M150,168 C138,188 138,218 150,228 C162,218 162,188 150,168" />
      <path className="si-ec__kolam-petal" d="M132,150 C112,162 82,162 72,150 C82,138 112,138 132,150" />
      <path className="si-ec__kolam-outer" d="M150,72 Q192,108 228,150 Q192,192 150,228 Q108,192 72,150 Q108,108 150,72" />
    </svg>
  )
}
