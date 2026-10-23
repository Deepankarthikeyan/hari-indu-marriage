import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import MandapAndDecor3D from './MandapAndDecor3D'
import Petals3D from './Petals3D'
import ScrollCamera3D from './ScrollCamera3D'
import TempleGate3D from './TempleGate3D'
import WeddingHallInterior3D from './hall/WeddingHallInterior3D'
import TraditionalProps3D from './props/TraditionalProps3D'

type Props = {
  gateOpenProgress: number
  siteEntered: boolean
}

export default function WeddingSceneCanvas({ gateOpenProgress, siteEntered }: Props) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (!siteEntered) return
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [siteEntered])

  return (
    <Canvas
      className="wedding-scene-canvas"
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#f8f0e4']} />
      <fog attach="fog" args={['#f5ebe0', 8, 22]} />
      <PerspectiveCamera makeDefault position={[0, 1.4, 6.2]} fov={42} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 8, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-3, 4, -2]} intensity={0.35} color="#ffd6a8" />

      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <TempleGate3D openProgress={gateOpenProgress} />
        <WeddingHallInterior3D visible={gateOpenProgress} />
        <TraditionalProps3D scrollProgress={scrollProgress} />
        <MandapAndDecor3D scrollProgress={scrollProgress} />
        <Petals3D />
        <ContactShadows position={[0, 0, 0]} opacity={0.35} scale={12} blur={2.5} />
      </Suspense>

      <ScrollCamera3D active={siteEntered} />
      {!siteEntered && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 2.1}
          target={[0, 1.2, 0]}
        />
      )}
    </Canvas>
  )
}
