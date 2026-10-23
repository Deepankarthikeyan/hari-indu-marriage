import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'
import BrideAvatar3D from '../avatars/BrideAvatar3D'
import GroomAvatar3D from '../avatars/GroomAvatar3D'
import RopeTube3D from './RopeTube3D'

type Props = {
  ropeProgress: number
  visible: boolean
}

export default function RopeBandCanvas({ ropeProgress, visible }: Props) {
  const p = Math.min(1, Math.max(0, visible ? ropeProgress : 0))
  const united = p >= 0.96
  const spread = 2.2 * (1 - p * 0.88)
  const groomPos = useMemo(() => new THREE.Vector3(-spread, -0.2, 0), [spread])
  const bridePos = useMemo(() => new THREE.Vector3(spread, -0.2, 0), [spread])
  const groomHand = useMemo(() => new THREE.Vector3(-spread + 0.38, 0.08, 0.28), [spread])
  const brideHand = useMemo(() => new THREE.Vector3(spread - 0.38, 0.08, 0.28), [spread])

  if (!visible) return null

  return (
    <div className="rope-band-canvas" aria-hidden>
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <OrthographicCamera makeDefault position={[0, 0, 8]} zoom={90} />
        <ambientLight intensity={0.85} />
        <directionalLight position={[2, 4, 5]} intensity={1.1} color="#fff5d6" />
        <directionalLight position={[-2, 2, 3]} intensity={0.4} color="#90c695" />

        <Suspense fallback={null}>
          <group position={groomPos}>
            <GroomAvatar3D pull={p} united={united} side="left" />
          </group>
          <group position={bridePos}>
            <BrideAvatar3D pull={p} united={united} side="right" />
          </group>
          <RopeTube3D left={groomHand} right={brideHand} united={united} />
          {united && (
            <mesh position={[0, 0.2, 0.3]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color="#ffd700" emissive="#ffaa00" emissiveIntensity={0.4} />
            </mesh>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
