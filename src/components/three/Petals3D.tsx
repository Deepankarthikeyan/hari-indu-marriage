import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 48

export default function Petals3D() {
  const ref = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const speeds = useMemo(() => {
    const s = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) s[i] = 0.15 + Math.random() * 0.35
    return s
  }, [])

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    for (let i = 0; i < COUNT; i++) {
      dummy.position.set((Math.random() - 0.5) * 10, Math.random() * 8 + 2, (Math.random() - 0.5) * 6 - 2)
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
      dummy.scale.setScalar(0.08 + Math.random() * 0.12)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }, [dummy])

  useFrame((_, delta) => {
    const mesh = ref.current
    if (!mesh) return
    for (let i = 0; i < COUNT; i++) {
      mesh.getMatrixAt(i, dummy.matrix)
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale)
      dummy.position.y -= speeds[i] * delta
      dummy.rotation.z += delta * 0.8
      if (dummy.position.y < -2) dummy.position.y = 8 + Math.random() * 2
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]}>
      <planeGeometry args={[0.35, 0.35]} />
      <meshStandardMaterial color="#ffb6c1" side={THREE.DoubleSide} transparent opacity={0.85} />
    </instancedMesh>
  )
}
