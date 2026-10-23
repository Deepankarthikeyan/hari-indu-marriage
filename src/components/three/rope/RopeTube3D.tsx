import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type Props = {
  left: THREE.Vector3
  right: THREE.Vector3
  united?: boolean
}

export default function RopeTube3D({ left, right, united = false }: Props) {
  const meshRef = useRef<THREE.Mesh>(null)
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    left.clone(),
    new THREE.Vector3(0, (left.y + right.y) / 2 - 0.08, (left.z + right.z) / 2),
    right.clone(),
  ]), [left, right])

  const geo = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([left, new THREE.Vector3(0, left.y - 0.05, 0), right])
    return new THREE.TubeGeometry(c, 24, 0.035, 8, false)
  }, [left, right])

  useFrame(() => {
    if (united || !meshRef.current) return
    const mid = new THREE.Vector3(0, (left.y + right.y) / 2 - 0.06, 0)
    curve.points[0].copy(left)
    curve.points[1].copy(mid)
    curve.points[2].copy(right)
    meshRef.current.geometry.dispose()
    meshRef.current.geometry = new THREE.TubeGeometry(curve, 24, 0.035, 8, false)
  })

  if (united) return null

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshStandardMaterial color="#c9a227" roughness={0.6} metalness={0.35} />
    </mesh>
  )
}
