import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import * as THREE from 'three'

type Props = {
  pull: number
  united?: boolean
  side: 'left' | 'right'
}

export default function BrideAvatar3D({ pull, united = false, side }: Props) {
  const root = useRef<Group>(null)
  const arm = useRef<Group>(null)

  const saree = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c41e3a', roughness: 0.45 }), [])
  const blouse = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a4a6e', roughness: 0.5 }), [])
  const gold = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d4af37', metalness: 0.8, roughness: 0.25 }), [])
  const skin = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f0c9a8', roughness: 0.65 }), [])
  const jasmine = useMemo(() => new THREE.MeshStandardMaterial({ color: '#fffef5', emissive: '#ffffee', emissiveIntensity: 0.2 }), [])

  useFrame((s) => {
    if (root.current) root.current.position.y = Math.sin(s.clock.elapsedTime * 1.2 + 0.5) * 0.03
    if (arm.current) {
      const lean = united ? -0.15 : -pull * 0.45
      arm.current.rotation.z = -lean
    }
  })

  const x = side === 'left' ? -1 : 1

  return (
    <group ref={root} scale={0.55}>
      <mesh position={[0, 0.3, 0]} material={saree} castShadow>
        <coneGeometry args={[0.42, 1, 20]} />
      </mesh>
      <mesh position={[0, 0.72, 0]} material={blouse} castShadow>
        <boxGeometry args={[0.36, 0.28, 0.2]} />
      </mesh>
      <mesh position={[0, 1.12, 0]} material={skin} castShadow>
        <sphereGeometry args={[0.21, 20, 20]} />
      </mesh>
      <mesh position={[0, 1.22, 0]} material={jasmine}>
        <torusGeometry args={[0.14, 0.035, 6, 16]} />
      </mesh>
      <mesh position={[0, 0.55, 0.12]} material={gold}>
        <boxGeometry args={[0.08, 0.12, 0.02]} />
      </mesh>
      <group ref={arm} position={[x * 0.22, 0.82, 0.1]}>
        <mesh position={[x * 0.25, 0, 0]} material={skin}>
          <capsuleGeometry args={[0.06, 0.26, 6, 10]} />
        </mesh>
        <mesh position={[x * 0.46, 0.02, 0]} material={skin}>
          <sphereGeometry args={[0.07, 12, 12]} />
        </mesh>
      </group>
    </group>
  )
}
