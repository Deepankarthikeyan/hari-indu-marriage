import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

type Props = {
  scrollProgress: number
}

/** Thaali, nadaswaram, melam drums — appear mid-scroll */
export default function TraditionalProps3D({ scrollProgress }: Props) {
  const group = useRef<Group>(null)
  const show = scrollProgress > 0.12 && scrollProgress < 0.75
  const opacity = show ? Math.min(1, (scrollProgress - 0.12) * 4) : 0

  useFrame((s) => {
    if (group.current && show) {
      group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.4) * 0.15
    }
  })

  if (!show || opacity < 0.05) return null

  return (
    <group ref={group} position={[0, 2.5, -3 - scrollProgress * 4]} scale={0.7}>
      {/* Thaali */}
      <group position={[-1.5, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.2, 0.025, 12, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <coneGeometry args={[0.12, 0.2, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Nadaswaram (simplified) */}
      <group position={[0, 0, 0]} rotation={[0.3, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.07, 1.4, 12]} />
          <meshStandardMaterial color="#5c4030" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} />
        </mesh>
      </group>

      {/* Melam / thavil drums */}
      <group position={[1.4, -0.1, 0]}>
        <mesh rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.35, 0.38, 0.25, 24]} />
          <meshStandardMaterial color="#8b1a2a" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.04, 24]} />
          <meshStandardMaterial color="#f4d03f" metalness={0.5} />
        </mesh>
      </group>
    </group>
  )
}
