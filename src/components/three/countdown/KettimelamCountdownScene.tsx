import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrthographicCamera } from '@react-three/drei'
import type { Mesh } from 'three'

function Drum({ x, beat }: { x: number; beat: number }) {
  const ref = useRef<Mesh>(null)
  useFrame(() => {
    if (ref.current) ref.current.position.y = Math.sin(beat) * 0.06
  })
  return (
    <group position={[x, -0.35, 0]}>
      <mesh ref={ref}>
        <cylinderGeometry args={[0.42, 0.45, 0.28, 28]} />
        <meshStandardMaterial color="#8b1a2a" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.05, 28]} />
        <meshStandardMaterial color="#f4d03f" metalness={0.55} roughness={0.35} />
      </mesh>
    </group>
  )
}

type Props = {
  days: string
  hours: string
  minutes: string
  seconds: string
  beat: number
}

function Scene({ days, hours, minutes, seconds, beat }: Props) {
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1} color="#fff8e0" />
      <Drum x={-1.8} beat={beat} />
      <Drum x={1.8} beat={beat + 1} />
      <Text position={[-1.1, 0.1, 0]} fontSize={0.35} color="#f4d03f" anchorX="center">
        {days}
      </Text>
      <Text position={[-0.35, 0.1, 0]} fontSize={0.35} color="#f4d03f" anchorX="center">
        {hours}
      </Text>
      <Text position={[0.4, 0.1, 0]} fontSize={0.35} color="#f4d03f" anchorX="center">
        {minutes}
      </Text>
      <Text position={[1.15, 0.1, 0]} fontSize={0.35} color="#f4d03f" anchorX="center">
        {seconds}
      </Text>
      <Text position={[0, 0.55, 0]} fontSize={0.12} color="#90c695" anchorX="center">
        Kettimelam Countdown
      </Text>
    </>
  )
}

export default function KettimelamCountdownScene(props: Props) {
  return (
    <div className="kettimelam-canvas">
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <Scene {...props} />
        </Suspense>
      </Canvas>
    </div>
  )
}
