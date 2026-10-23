import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrthographicCamera } from '@react-three/drei'
import Character3DBillboard from '../shared/Character3DBillboard'
import type { CoupleHalf } from '../shared/useCoupleHalfTexture'

type Props = {
  half: CoupleHalf
  className?: string
  label?: string
}

function Scene({ half }: { half: CoupleHalf }) {
  const side = half === 'groom' ? 'left' : 'right'
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0.15, 6]} zoom={118} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[2, 4, 5]} intensity={1.05} color="#fff8e8" />
      <directionalLight position={[-2, 2, 3]} intensity={0.35} color="#90c695" />
      <Environment preset="studio" />
      <Character3DBillboard half={half} scale={1.05} side={side} showPedestal />
      <ContactShadows position={[0, -0.52, 0]} opacity={0.45} scale={2.2} blur={2} />
    </>
  )
}

export default function CouplePortrait3DCanvas({ half, className = '', label }: Props) {
  const aria =
    label ?? (half === 'groom' ? 'Groom in traditional veshti — 3D' : 'Bride in Kanjeevaram saree — 3D')

  return (
    <div className={`couple-portrait-3d ${className}`} role="img" aria-label={aria}>
      <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <Scene half={half} />
        </Suspense>
      </Canvas>
    </div>
  )
}
