import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import type { Group } from 'three'

function Nadaswaram({ x }: { x: number }) {
  return (
    <group position={[x, 0.1, 0]} rotation={[0.25, x > 0 ? -0.2 : 0.2, 0]}>
      <mesh>
        <cylinderGeometry args={[0.05, 0.07, 1.2, 14]} />
        <meshStandardMaterial color="#68452f" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.1, 14, 14]} />
        <meshStandardMaterial color="#c9a24d" metalness={0.75} roughness={0.25} />
      </mesh>
    </group>
  )
}

function Thavil({ x }: { x: number }) {
  const ref = useRef<Group>(null)
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 2.2) * 0.04
  })
  return (
    <group ref={ref} position={[x, -0.15, 0]}>
      <mesh>
        <cylinderGeometry args={[0.38, 0.42, 0.22, 28]} />
        <meshStandardMaterial color="#7a3d38" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.05, 28]} />
        <meshStandardMaterial color="#f2c94c" metalness={0.5} roughness={0.35} />
      </mesh>
    </group>
  )
}

function Scene({ reveal }: { reveal: number }) {
  const band = useRef<Group>(null)
  useFrame((s) => {
    if (band.current) band.current.position.y = Math.sin(s.clock.elapsedTime * 0.8) * 0.03 * reveal
  })

  const op = Math.min(1, reveal * 1.2)

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 8]} zoom={95} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 4, 5]} intensity={1} color="#fff7e8" />
      <group ref={band} scale={op}>
        <Nadaswaram x={-1.1} />
        <Thavil x={0} />
        <Nadaswaram x={1.1} />
        <mesh position={[0, -0.55, 0]}>
          <boxGeometry args={[3.2, 0.08, 0.4]} />
          <meshStandardMaterial color="#c6a27e" roughness={0.7} />
        </mesh>
      </group>
    </>
  )
}

type Props = { className?: string }

export default function MangalamVaathiyamScene({ className = '' }: Props) {
  return (
    <div className={`wx-scene-canvas ${className}`} data-reveal="1">
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <Scene reveal={1} />
        </Suspense>
      </Canvas>
    </div>
  )
}
