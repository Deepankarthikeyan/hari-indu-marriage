import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import * as THREE from 'three'

type Props = {
  openProgress: number
}

export default function TempleGate3D({ openProgress }: Props) {
  const leftRef = useRef<Group>(null)
  const rightRef = useRef<Group>(null)

  const wood = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3d1410',
        roughness: 0.65,
        metalness: 0.15,
      }),
    [],
  )
  const gold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d4af37',
        roughness: 0.35,
        metalness: 0.85,
        emissive: '#5c4010',
        emissiveIntensity: 0.15,
      }),
    [],
  )
  const stone = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e0d4c0',
        roughness: 0.9,
        metalness: 0.05,
      }),
    [],
  )

  useFrame(() => {
    const angle = openProgress * (Math.PI / 2) * 0.92
    if (leftRef.current) leftRef.current.rotation.y = -angle
    if (rightRef.current) rightRef.current.rotation.y = angle
  })

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, -0.05, 0]} receiveShadow material={stone}>
        <boxGeometry args={[8, 0.2, 4]} />
      </mesh>

      {[-2.8, 2.8].map((x) => (
        <mesh key={x} position={[x, 1.6, 0]} castShadow material={stone}>
          <boxGeometry args={[0.45, 3.4, 0.45]} />
        </mesh>
      ))}

      <mesh position={[0, 3.2, -0.3]} castShadow material={gold}>
        <boxGeometry args={[6.5, 1.2, 0.35]} />
      </mesh>

      <group ref={leftRef} position={[-1.35, 1.5, 0.15]}>
        <group position={[0.65, 0, 0]}>
          <mesh castShadow receiveShadow material={wood}>
            <boxGeometry args={[1.3, 3, 0.14]} />
          </mesh>
          <mesh position={[0, 0.4, 0.08]} material={gold}>
            <boxGeometry args={[0.7, 0.7, 0.04]} />
          </mesh>
          <mesh position={[0.5, 0, 0.1]} material={gold}>
            <cylinderGeometry args={[0.04, 0.04, 0.35, 12]} />
          </mesh>
        </group>
      </group>

      <group ref={rightRef} position={[1.35, 1.5, 0.15]}>
        <group position={[-0.65, 0, 0]}>
          <mesh castShadow receiveShadow material={wood}>
            <boxGeometry args={[1.3, 3, 0.14]} />
          </mesh>
          <mesh position={[0, 0.4, 0.08]} material={gold}>
            <boxGeometry args={[0.7, 0.7, 0.04]} />
          </mesh>
          <mesh position={[-0.5, 0, 0.1]} material={gold}>
            <cylinderGeometry args={[0.04, 0.04, 0.35, 12]} />
          </mesh>
        </group>
      </group>

      <pointLight position={[0, 2, -1.5]} intensity={openProgress * 2.5} color="#ffddb0" distance={8} />
      <mesh position={[0, 1.5, -1.2]}>
        <planeGeometry args={[3.5, 2.8]} />
        <meshStandardMaterial color="#fff5e8" emissive="#ffcc88" emissiveIntensity={0.08 + openProgress * 0.35} />
      </mesh>
    </group>
  )
}
