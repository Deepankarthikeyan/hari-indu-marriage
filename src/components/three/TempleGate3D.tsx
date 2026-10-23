import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import type { Group } from 'three'
import * as THREE from 'three'

type Props = {
  openProgress: number
}

function BananaTree({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0.8]}>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 2.2, 10]} />
        <meshStandardMaterial color="#39764a" roughness={0.7} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 1.6 + i * 0.35, 0.15]} rotation={[0.4, i * 0.8, 0]}>
          <planeGeometry args={[0.9, 0.35]} />
          <meshStandardMaterial color="#39764a" side={THREE.DoubleSide} roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function KuthuVilakku({ x }: { x: number }) {
  return (
    <group position={[x, 0.35, 0.55]}>
      <mesh>
        <cylinderGeometry args={[0.06, 0.1, 0.5, 12]} />
        <meshStandardMaterial color="#c9a24d" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#f2c94c" emissive="#ffaa44" emissiveIntensity={0.35} />
      </mesh>
    </group>
  )
}

export default function TempleGate3D({ openProgress }: Props) {
  const leftRef = useRef<Group>(null)
  const rightRef = useRef<Group>(null)
  const toran = useTexture('/assets/south-indian/garland-header.png')
  toran.colorSpace = THREE.SRGBColorSpace

  const wood = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#68452f', roughness: 0.62, metalness: 0.12 }),
    [],
  )
  const gold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c9a24d',
        roughness: 0.32,
        metalness: 0.88,
        emissive: '#5c4010',
        emissiveIntensity: 0.15,
      }),
    [],
  )
  const stone = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#e8dcc8', roughness: 0.88, metalness: 0.04 }),
    [],
  )

  useFrame(() => {
    const angle = openProgress * (Math.PI / 2) * 0.94
    if (leftRef.current) leftRef.current.rotation.y = -angle
    if (rightRef.current) rightRef.current.rotation.y = angle
  })

  const rim = 0.08 + openProgress * 0.45

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, -0.05, 0]} receiveShadow material={stone}>
        <boxGeometry args={[9, 0.22, 4.5]} />
      </mesh>

      {/* Kolam-inspired floor pattern */}
      <mesh position={[0, 0.01, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 2.2, 48]} />
        <meshStandardMaterial color="#fff7e8" roughness={0.9} transparent opacity={0.85} />
      </mesh>

      {[-3.1, 3.1].map((x) => (
        <group key={x}>
          <mesh position={[x, 1.7, 0]} castShadow material={stone}>
            <boxGeometry args={[0.55, 3.6, 0.55]} />
          </mesh>
          <mesh position={[x, 3.55, -0.15]} castShadow material={gold}>
            <boxGeometry args={[0.7, 0.35, 0.7]} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 3.35, -0.35]} castShadow material={gold}>
        <boxGeometry args={[7, 1.35, 0.4]} />
      </mesh>

      <mesh position={[0, 3.05, 0.25]}>
        <planeGeometry args={[5.5, 0.85]} />
        <meshBasicMaterial map={toran} transparent toneMapped={false} opacity={0.95} />
      </mesh>

      <BananaTree x={-3.6} />
      <BananaTree x={3.6} />
      <KuthuVilakku x={-2.1} />
      <KuthuVilakku x={2.1} />

      {/* Marigold accents */}
      {[-2.5, 0, 2.5].map((x) => (
        <mesh key={x} position={[x, 2.85, 0.35]}>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshStandardMaterial color="#f2c94c" emissive="#e8a838" emissiveIntensity={0.2} />
        </mesh>
      ))}

      <group ref={leftRef} position={[-1.4, 1.55, 0.18]}>
        <group position={[0.68, 0, 0]}>
          <mesh castShadow receiveShadow material={wood}>
            <boxGeometry args={[1.35, 3.05, 0.16]} />
          </mesh>
          <mesh position={[0, 0.45, 0.09]} material={gold}>
            <boxGeometry args={[0.75, 0.75, 0.05]} />
          </mesh>
          <mesh position={[0.52, 0, 0.11]} material={gold} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.045, 0.045, 0.38, 12]} />
          </mesh>
        </group>
      </group>

      <group ref={rightRef} position={[1.4, 1.55, 0.18]}>
        <group position={[-0.68, 0, 0]}>
          <mesh castShadow receiveShadow material={wood}>
            <boxGeometry args={[1.35, 3.05, 0.16]} />
          </mesh>
          <mesh position={[0, 0.45, 0.09]} material={gold}>
            <boxGeometry args={[0.75, 0.75, 0.05]} />
          </mesh>
          <mesh position={[-0.52, 0, 0.11]} material={gold} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.045, 0.045, 0.38, 12]} />
          </mesh>
        </group>
      </group>

      <pointLight position={[0, 2.2, -1.2]} intensity={rim * 3.2} color="#ffddb0" distance={9} />
      <pointLight position={[0, 1.2, 0.8]} intensity={0.4 + openProgress * 0.6} color="#fff7e8" distance={6} />

      <mesh position={[0, 1.55, -1.35]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial
          color="#fff7e8"
          emissive="#f2c94c"
          emissiveIntensity={0.06 + openProgress * 0.42}
        />
      </mesh>
    </group>
  )
}
