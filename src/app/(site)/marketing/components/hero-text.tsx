'use client'

import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'

import { sectionVariants } from '@/components/section'
import { titleVariants } from '@/components/title'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { gutterVariants } from '@/components/gutter'

type Props = {}
export const HeroText: React.FC<Props> = ({}) => {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    // @ts-ignore
    target: container,

    offset: ['start 0.9', 'start 0.25'],
  })
  const paragraph =
    'Fulla – Where innovation meets functionality, unlocking your potential in every workspace.'
  const words = paragraph.split(' ')
  return (
    <div
      className={cn(
        sectionVariants({
          spacer: 'p',
          className: 'bg-primary-foreground',
        }),
        gutterVariants(),
      )}
    >
      <Label className="uppercase text-muted-foreground/50">Redefining the Office Landscape</Label>

      <motion.p
        ref={container}
        style={{ opacity: scrollYProgress }}
        // @ts-ignore
        className={titleVariants({ className: 'w-3/4' })}
      ></motion.p>
    </div>
  )
}
