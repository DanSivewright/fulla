'use client'
import { useRef } from 'react'
import floating1 from '../../../public/images/floating_1.jpeg'
import floating2 from '../../../public/images/floating_2.jpeg'
import floating3 from '../../../public/images/floating_3.jpeg'
import floating4 from '../../../public/images/floating_4.jpeg'
import floating5 from '../../../public/images/floating_5.jpeg'
import floating6 from '../../../public/images/floating_6.jpeg'
import floating7 from '../../../public/images/floating_7.jpeg'
import floating8 from '../../../public/images/floating_8.jpeg'
import Image from 'next/image'
import gsap from 'gsap'
import { Page } from '@/payload-types'
import RichText from '@/components/rich-text'
import { CMSLink } from '@/components/cms-link'

type Props = Extract<Page['layout'][0], { blockType: 'float-image-gallery' }>
export const FloatingImageGallery: React.FC<Props> = ({ richText, links }) => {
  const plane1 = useRef(null)
  const plane2 = useRef(null)
  const plane3 = useRef(null)

  let requestAnimationFrameId = null
  let xForce = 0
  let yForce = 0
  const easing = 0.08
  const speed = 0.01

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e
    xForce += movementX * speed
    yForce += movementY * speed

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate)
    }
  }

  const lerp = (start, target, amount) => start * (1 - amount) + target * amount

  const animate = () => {
    xForce = lerp(xForce, 0, easing)
    yForce = lerp(yForce, 0, easing)

    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` })
    gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` })
    gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` })

    if (Math.abs(xForce) < 0.01) xForce = 0
    if (Math.abs(yForce) < 0.01) yForce = 0

    if (xForce != 0 || yForce != 0) {
      requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(requestAnimationFrameId)
      requestAnimationFrameId = null
    }
  }

  return (
    <div
      onMouseMove={(e) => {
        manageMouseMove(e)
      }}
      className="w-screen h-[45vh] overflow-hidden bg-black relative"
    >
      <div ref={plane1} className="w-full h-full absolute">
        <Image
          placeholder="blur"
          className="absolute left-[90%] top-[70%]"
          src={floating1}
          alt="image"
          width={300}
        />
        <Image
          placeholder="blur"
          className="absolute left-[5%] top-[65%]"
          src={floating2}
          alt="image"
          width={300}
        />
        <Image
          placeholder="blur"
          className="absolute left-[35%] top-0"
          src={floating7}
          alt="image"
          width={225}
        />
      </div>
      <div ref={plane2} className="w-full h-full absolute brightness-[0.5]">
        <Image
          placeholder="blur"
          className="absolute left-[5%] top-[10%]"
          src={floating4}
          alt="image"
          width={250}
        />
        <Image
          placeholder="blur"
          className="absolute left-[80%] top-[5%]"
          src={floating6}
          alt="image"
          width={200}
        />
        <Image
          placeholder="blur"
          className="absolute left-[60%] top-[60%]"
          src={floating8}
          alt="image"
          width={225}
        />
      </div>
      <div ref={plane3} className="w-full h-full absolute brightness-[0.4]">
        <Image
          placeholder="blur"
          className="absolute left-[65%] top-[2.5%]"
          src={floating3}
          alt="image"
          width={150}
        />
        <Image
          placeholder="blur"
          className="absolute left-[40%] top-[75%]"
          src={floating5}
          alt="image"
          width={200}
        />
      </div>
      <div className="absolute flex flex-col items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <RichText
          className="!text-white text-center"
          content={richText}
          enableProse={false}
          enableGutter={false}
        />

        <div className="flex mt-4 flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            // @ts-ignore
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
