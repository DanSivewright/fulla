'use client'

import { useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'
import { titleVariants } from '@/components/title'

import { badgeVariants } from './ui/badge'

type Props = {
  align?: 'start' | 'end'
  imageOne: StaticImageData | string
  imageTwo: StaticImageData | string
  titleOne: string
  titleTwo: string
  badgesOne?: string[]
  badgesTwo?: string[]
}

export const Double: React.FC<Props> = ({
  align = 'end',
  imageOne,
  imageTwo,
  badgesOne,
  badgesTwo,
  titleOne,
  titleTwo,
}) => {
  const firstImage = useRef<HTMLDivElement>(null) // Add type annotation for the ref
  const secondImage = useRef<HTMLDivElement>(null) // Add type annotation for the ref
  let requestAnimationFrameId: number | null = null // Add type annotation for the variable
  let xPercent = 0
  let currentXPercent = 0
  const speed = 0.15

  const manageMouseMove = (e: React.MouseEvent) => {
    const { clientX } = e
    xPercent = (clientX / window.innerWidth) * 100

    if (requestAnimationFrameId === null) {
      requestAnimationFrameId = window.requestAnimationFrame(animate)
    }
  }

  const animate = () => {
    // Add easing to the animation
    const xPercentDelta = xPercent - currentXPercent
    currentXPercent = currentXPercent + xPercentDelta * speed

    // Change width of images between 33.33% and 66.66% based on cursor
    const firstImagePercent = 66.66 - currentXPercent * 0.33
    const secondImagePercent = 33.33 + currentXPercent * 0.33

    // Check if refs are not null before accessing their properties
    if (firstImage.current && secondImage.current) {
      firstImage.current.style.width = `${firstImagePercent}%`
      secondImage.current.style.width = `${secondImagePercent}%`
    }

    if (Math.round(xPercent) === Math.round(currentXPercent)) {
      window.cancelAnimationFrame(requestAnimationFrameId!) // Use the non-null assertion operator
      requestAnimationFrameId = null
    } else {
      window.requestAnimationFrame(animate)
    }
  }

  // const { ref: leftCardTitle, replay: replayLeft } = useScrambler({
  //   text: titleOne,
  // })
  // const { ref: rightCardTitle, replay: replayRight } = useScrambler({
  //   text: titleTwo,
  // })

  return (
    <motion.div
      className={cn('flex h-[45vw] w-full items-end gap-2')}
      onMouseMove={(e) => {
        manageMouseMove(e)
      }}
    >
      <div ref={firstImage} className="relative flex w-[66.66%] cursor-pointer ">
        <div className="w-full h-full flex-col justify-between">
          <div className="relative overflow-hidden pt-[66.66%]">
            <Image className="object-cover brightness-75" src={imageOne} alt={'image'} fill />
          </div>
          <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-between p-3">
            <h2
              className={cn(titleVariants({ level: 6 }), 'text-balance text-white')}
              style={{ margin: 0 }}
            >
              {titleOne}
            </h2>
            {badgesOne?.length ? (
              <ul className="flex items-center gap-3">
                {[...badgesOne.slice(0, 2)].map((badge, i) => (
                  <li
                    key={`${badge}-${i}-${Math.random().toString(36)}`}
                    className={badgeVariants({ variant: 'blur', size: 'lg' })}
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      <div
        ref={secondImage}
        className="relative flex w-[33.33%] cursor-pointer flex-col justify-between"
      >
        <div className="w-full h-full flex-col justify-between">
          <div className="relative pt-[66%]">
            <Image src={imageTwo} className="object-cover" fill alt={'image'} />
          </div>
          <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-between p-3">
            <h2
              className={cn(titleVariants({ level: 6 }), 'text-balance text-white')}
              style={{ margin: 0 }}
            >
              {titleTwo}
            </h2>
            {badgesTwo?.length ? (
              <ul className="flex items-center gap-3">
                {[...badgesTwo.slice(0, 2)].map((badge, i) => (
                  <li
                    key={`${badge}-${i}-${Math.random().toString(36)}`}
                    className={badgeVariants({ variant: 'blur', size: 'lg' })}
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
