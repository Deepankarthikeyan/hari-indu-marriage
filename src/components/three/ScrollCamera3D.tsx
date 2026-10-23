import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  active: boolean
}

export default function ScrollCamera3D({ active }: Props) {
  const { camera } = useThree()

  useEffect(() => {
    if (!active) {
      camera.position.set(0, 1.4, 6.2)
      camera.lookAt(0, 1.2, 0)
      return
    }

    const ctx = gsap.context(() => {
      gsap.to(camera.position, {
        z: 14,
        y: 3.2,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })
      gsap.to(camera.rotation, {
        x: -0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })
    })

    return () => ctx.revert()
  }, [active, camera])

  return null
}
