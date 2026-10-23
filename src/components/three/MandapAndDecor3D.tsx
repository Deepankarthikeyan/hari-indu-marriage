import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import type { Mesh } from 'three'

export default function MandapAndDecor3D({ scrollProgress }: { scrollProgress: number }) {
  const mandap = useTexture('/assets/wedding-stage-banner.jpg')
  mandap.colorSpace = 'srgb'
  const toran = useTexture('/assets/south-indian/garland-header.png')
  toran.colorSpace = 'srgb'
  const floatRef = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (floatRef.current) {
      floatRef.current.rotation.y = Math.sin(t * 0.2) * 0.08
      floatRef.current.position.y = -0.8 + scrollProgress * 0.5 + Math.sin(t * 0.5) * 0.05
    }
  })

  const gold = useMemo(
    () => ({ color: '#c9a227', roughness: 0.4, metalness: 0.8 }),
    [],
  )

  return (
    <group position={[0, -0.5 - scrollProgress * 2, -4 - scrollProgress * 6]}>
      <mesh ref={floatRef} position={[0, -0.8, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[4.2, 0.15, 2.8]} />
        <meshStandardMaterial {...gold} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <planeGeometry args={[4, 1.4]} />
        <meshBasicMaterial map={mandap} toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.4, 0.2]} rotation={[0.15, 0, 0]}>
        <planeGeometry args={[5, 1.2]} />
        <meshBasicMaterial map={toran} transparent alphaTest={0.1} toneMapped={false} />
      </mesh>
      {[-1.8, 1.8].map((x) => (
        <mesh key={x} position={[x, 0.6, 0.3]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 1.6, 10]} />
          <meshStandardMaterial {...gold} />
        </mesh>
      ))}
    </group>
  )
}
