import type { ReactNode } from 'react'
import { SilkCorners } from './Ornaments'
import './SectionShell.css'

type Variant = 'mandap' | 'parchment' | 'silk' | 'timeline' | 'gallery' | 'peacock' | 'maroon' | 'ivory'

type Props = {
  id?: string
  variant: Variant
  className?: string
  framed?: boolean
  children: ReactNode
}

export default function SectionShell({ id, variant, className = '', framed, children }: Props) {
  return (
    <section id={id} className={`w-section w-${variant} ${className}`}>
      {framed && (
        <div className="w-frame">
          <SilkCorners />
          {children}
        </div>
      )}
      {!framed && children}
    </section>
  )
}
