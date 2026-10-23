import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import * as THREE from 'three'

type Props = {
  pull: number
  united?: boolean
  side: 'left' | 'right'
}

/** 3D South Indian groom — veshti, angavastram, subtle idle */
export default function GroomAvatar3D({ pull, united = false, side }: Props) {
  const root = useRef<Group>(null)
  const arm = useRef<Group>(null)

  const gold = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d4af37', metalness: 0.75, roughness: 0.3 }), [])
  const veshti = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f4e4a6', roughness: 0.55 }), [])
  const angav = useMemo(() => new THREE.MeshStandardMaterial({ color: '#8b1a2a', roughness: 0.5 }), [])
  const skin = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e8b896', roughness: 0.65 }), [])

  useFrame((s) => {
    if (root.current) root.current.position.y = Math.sin(s.clock.elapsedTime * 1.2) * 0.03
    if (arm.current) {
      const lean = united ? 0.15 : pull * 0.45
      arm.current.rotation.z = -lean
    }
  })

  const x = side === 'left' ? 1 : -1

  return (
    <group ref={root} scale={0.55}>
      <mesh position={[0, 0.35, 0]} material={veshti} castShadow>
        <cylinderGeometry args={[0.35, 0.42, 0.9, 16]} />
      </mesh>
      <mesh position={[0, 0.75, 0]} material={angav} castShadow>
        <boxGeometry args={[0.38, 0.45, 0.22]} />
      </mesh>
      <mesh position={[0, 1.15, 0]} material={skin} castShadow>
        <sphereGeometry args={[0.22, 20, 20]} />
      </mesh>
      <mesh position={[0, 1.28, 0]} material={gold}>
        <torusGeometry args={[0.12, 0.02, 8, 20]} />
      </mesh>
      <group ref={arm} position={[x * 0.22, 0.85, 0.1]}>
        <mesh position={[x * 0.25, 0, 0]} material={skin}>
          <capsuleGeometry args={[0.06, 0.28, 6, 10]} />
        </mesh>
        <mesh position={[x * 0.48, 0.02, 0]} material={skin}>
          <sphereGeometry args={[0.07, 12, 12]} />
        </mesh>
      </group>
    </group>
  )
}
