import { Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { weddingConfig } from '../../../config/wedding'

const FRUIT_PLATES: { pos: [number, number, number]; col: string }[] = [
  { pos: [-1.2, 0.15, 0.5], col: '#e8a838' },
  { pos: [0, 0.12, 0.6], col: '#c45c5c' },
  { pos: [1.2, 0.15, 0.5], col: '#3d6b35' },
]

type Props = {
  visible: number
}

export default function WeddingHallInterior3D({ visible }: Props) {
  const leafL = useTexture('/assets/south-indian/banana-leaf-left.webp')
  const leafR = useTexture('/assets/south-indian/banana-leaf-right.webp')
  const toran = useTexture('/assets/south-indian/garland-header.png')
  ;[leafL, leafR, toran].forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace
  })

  if (visible < 0.15) return null

  const op = Math.min(1, (visible - 0.15) * 1.4)

  return (
    <group position={[0, 0.5, -2.2]} scale={1.15}>
      {[-1.8, 1.8].map((x) => (
        <mesh key={x} position={[x, 1.1, 0.15]} castShadow>
          <cylinderGeometry args={[0.14, 0.16, 2.4, 12]} />
          <meshStandardMaterial color="#c6a27e" roughness={0.75} />
        </mesh>
      ))}
      {[-1.5, 1.5].map((x) => (
        <group key={`lamp-${x}`} position={[x, 0.4, 0.55]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.08, 0.45, 10]} />
            <meshStandardMaterial color="#c9a24d" metalness={0.75} roughness={0.3} />
          </mesh>
          <pointLight position={[0, 0.35, 0]} intensity={0.35 * op} color="#ffddb0" distance={2} />
        </group>
      ))}
      <mesh position={[0, 2.2, 0]}>
        <planeGeometry args={[5.5, 1.2]} />
        <meshBasicMaterial map={toran} transparent opacity={op} toneMapped={false} />
      </mesh>
      <mesh position={[-2.4, 0.8, 0.3]} rotation={[0, 0.2, 0]}>
        <planeGeometry args={[1.8, 2.4]} />
        <meshBasicMaterial map={leafL} transparent opacity={op * 0.9} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[2.4, 0.8, 0.3]} rotation={[0, -0.2, 0]} scale={[-1, 1, 1]}>
        <planeGeometry args={[1.8, 2.4]} />
        <meshBasicMaterial map={leafR} transparent opacity={op * 0.9} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {op > 0.45 && (
        <Text position={[0, 1.55, 0.45]} fontSize={0.2} color="#702638" anchorX="center" maxWidth={4}>
          {`${weddingConfig.couple.bride.nameEn} & ${weddingConfig.couple.groom.nameEn}`}
        </Text>
      )}
      <Text position={[0, 1.25, 0.42]} fontSize={0.09} color="#3d6b35" anchorX="center" fillOpacity={op * 0.95}>
        Wedding Hall · Mangala Vaazhthu
      </Text>

      {FRUIT_PLATES.map(({ pos, col }, i) => (
        <group key={i} position={pos}>
          <mesh>
            <cylinderGeometry args={[0.35, 0.38, 0.06, 20]} />
            <meshStandardMaterial color="#d4a574" metalness={0.4} roughness={0.5} />
          </mesh>
          {[0, 1, 2].map((j) => (
            <mesh key={j} position={[(j - 1) * 0.12, 0.12, (j % 2) * 0.08]}>
              <sphereGeometry args={[0.08 + j * 0.02, 12, 12]} />
              <meshStandardMaterial color={col} roughness={0.4} />
            </mesh>
          ))}
        </group>
      ))}

      <mesh position={[0, 0.05, 0.2]} receiveShadow>
        <boxGeometry args={[4.5, 0.08, 2.2]} />
        <meshStandardMaterial color="#f5e6c8" roughness={0.85} />
      </mesh>
    </group>
  )
}
