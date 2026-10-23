import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrthographicCamera, useTexture } from '@react-three/drei'
import type { Mesh } from 'three'
import * as THREE from 'three'

type Props = {
  textureSrc: string
  className?: string
}

function IconMesh({ textureSrc }: { textureSrc: string }) {
  const ref = useRef<Mesh>(null)
  const map = useTexture(textureSrc)
  map.colorSpace = THREE.SRGBColorSpace

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.9) * 0.35
      ref.current.position.y = Math.sin(s.clock.elapsedTime * 1.4) * 0.04
    }
  })

  return (
    <group>
      <mesh position={[0, 0, -0.08]}>
        <torusGeometry args={[0.38, 0.04, 12, 40]} />
        <meshStandardMaterial color="#e8c547" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh ref={ref} castShadow>
        <cylinderGeometry args={[0.32, 0.34, 0.1, 32]} />
        <meshStandardMaterial color="#faf6ef" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.06, 0.06]}>
        <planeGeometry args={[0.52, 0.52]} />
        <meshBasicMaterial map={map} transparent toneMapped={false} />
      </mesh>
    </group>
  )
}

function Scene({ textureSrc }: { textureSrc: string }) {
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={145} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 4]} intensity={0.9} />
      <IconMesh textureSrc={textureSrc} />
    </>
  )
}

export default function TraditionIcon3DCanvas({ textureSrc, className = '' }: Props) {
  return (
    <div className={`tradition-icon-3d ${className}`} aria-hidden>
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <Scene textureSrc={textureSrc} />
        </Suspense>
      </Canvas>
    </div>
  )
}
