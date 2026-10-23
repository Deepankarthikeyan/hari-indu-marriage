import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import type { Group } from 'three'

function ThaaliMesh() {
  const g = useRef<Group>(null)
  useFrame((s) => {
    if (g.current) {
      g.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.35) * 0.25
      g.current.position.y = Math.sin(s.clock.elapsedTime * 0.9) * 0.02
    }
  })

  return (
    <group ref={g}>
      <mesh>
        <torusGeometry args={[0.22, 0.028, 16, 40]} />
        <meshStandardMaterial color="#c9a24d" metalness={0.92} roughness={0.18} emissive="#5c4010" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0, -0.18, 0]}>
        <coneGeometry args={[0.14, 0.22, 20]} />
        <meshStandardMaterial color="#c9a24d" metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh position={[0, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.5, 8]} />
        <meshStandardMaterial color="#f2c94c" roughness={0.4} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[(i - 1) * 0.12, 0.12, 0.08]}>
          <sphereGeometry args={[0.04, 10, 10]} />
          <meshStandardMaterial color="#fffef5" emissive="#ffffee" emissiveIntensity={0.15} />
        </mesh>
      ))}
      <pointLight position={[0, 0.2, 0.6]} intensity={1.2} color="#ffddb0" distance={3} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 6]} zoom={130} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[1, 3, 4]} intensity={0.9} color="#fff7e8" />
      <ThaaliMesh />
    </>
  )
}

type Props = { className?: string }

export default function ThaaliCeremonyScene({ className = '' }: Props) {
  return (
    <div className={`wx-scene-canvas wx-scene-canvas--thaali ${className}`}>
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
