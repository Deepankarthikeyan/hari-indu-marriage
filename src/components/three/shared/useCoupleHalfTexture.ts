import { useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { weddingConfig } from '../../../config/wedding'

export type CoupleHalf = 'bride' | 'groom'

export function useCoupleHalfTexture(half: CoupleHalf) {
  const src = weddingConfig.assets.couple3dHero
  const base = useTexture(src)
  return useMemo(() => {
    const map = base.clone()
    map.colorSpace = THREE.SRGBColorSpace
    map.wrapS = THREE.ClampToEdgeWrapping
    map.wrapT = THREE.ClampToEdgeWrapping
    map.repeat.set(0.5, 1)
    map.offset.set(half === 'bride' ? 0 : 0.5, 0)
    map.needsUpdate = true
    return map
  }, [base, half])
}
