import { useThree } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type Props = {
  gateOpenProgress: number
  siteEntered: boolean
  scrollProgress: number
}

export default function GateCamera3D({ gateOpenProgress, siteEntered, scrollProgress }: Props) {
  const { camera } = useThree()

  useFrame(() => {
    const baseZ = 6.2
    const baseY = 1.4
    const gateDolly = THREE.MathUtils.lerp(0, 1.35, gateOpenProgress)
    const scrollZ = siteEntered ? scrollProgress * 7.5 : 0
    const scrollY = siteEntered ? scrollProgress * 1.6 : 0

    camera.position.z = baseZ - gateDolly - scrollZ * 0.15
    camera.position.y = baseY + gateOpenProgress * 0.12 + scrollY
    camera.lookAt(0, 1.15 + scrollProgress * 0.4, -0.5 - scrollProgress * 2)
  })

  return null
}
