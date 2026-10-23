import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import type { Group } from 'three'
import type { CoupleHalf } from './useCoupleHalfTexture'
import { useCoupleHalfTexture } from './useCoupleHalfTexture'

type Props = {
  half: CoupleHalf
  /** World scale of the character group */
  scale?: number
  /** Lean toward center when pulling rope (0–1) */
  pull?: number
  united?: boolean
  /** Which side of screen — affects lean direction */
  side?: 'left' | 'right'
  showPedestal?: boolean
}

export default function Character3DBillboard({
  half,
  scale = 1,
  pull = 0,
  united = false,
  side = half === 'bride' ? 'right' : 'left',
  showPedestal = true,
}: Props) {
  const root = useRef<Group>(null)
  const body = useRef<Group>(null)
  const map = useCoupleHalfTexture(half)

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (root.current) root.current.position.y = Math.sin(t * 1.15 + (half === 'bride' ? 0.4 : 0)) * 0.04
    if (body.current) {
      const toward = side === 'left' ? 1 : -1
      const lean = united ? toward * 0.08 : toward * pull * 0.22
      body.current.rotation.z = lean
      body.current.rotation.y = Math.sin(t * 0.6) * 0.04 + toward * 0.06
    }
  })

  const s = scale * 0.95

  return (
    <group ref={root} scale={s}>
      {showPedestal && (
        <mesh position={[0, -0.55, 0]} receiveShadow>
          <cylinderGeometry args={[0.42, 0.48, 0.1, 32]} />
          <meshStandardMaterial color="#e8c547" metalness={0.55} roughness={0.35} />
        </mesh>
      )}
      <group ref={body} position={[0, 0.05, 0]}>
        <RoundedBox args={[0.72, 1.05, 0.12]} radius={0.06} smoothness={4} castShadow>
          <meshStandardMaterial color="#f5ebe0" roughness={0.85} />
        </RoundedBox>
        <mesh position={[0, 0.02, 0.07]} castShadow>
          <planeGeometry args={[0.66, 0.98]} />
          <meshStandardMaterial map={map} transparent roughness={0.45} metalness={0.05} toneMapped={false} />
        </mesh>
        <mesh position={[side === 'left' ? 0.34 : -0.34, -0.05, 0.1]}>
          <sphereGeometry args={[0.07, 14, 14]} />
          <meshStandardMaterial color="#f0c9a8" roughness={0.55} />
        </mesh>
      </group>
    </group>
  )
}
