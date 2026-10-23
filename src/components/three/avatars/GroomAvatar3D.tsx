import Character3DBillboard from '../shared/Character3DBillboard'

type Props = {
  pull: number
  united?: boolean
  side: 'left' | 'right'
}

export default function GroomAvatar3D({ pull, united = false, side }: Props) {
  return <Character3DBillboard half="groom" scale={0.62} pull={pull} united={united} side={side} />
}
