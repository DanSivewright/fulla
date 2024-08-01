'use client'

import { Media, Page } from '@/payload-types'
import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { prependServerUrl } from '@/lib/prepend-server-url'
import RichText from '../rich-text'
import { cn } from '@/lib/utils'

type Props = Extract<Page['layout'][0], { blockType: 'carousel' }>
export const CarouselBlock: React.FC<Props> = (props) => {
  const { slides, dots, loop } = props

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <section className="flex-col gap-4 flex">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem className="basis-2/3" key={slide.id}>
              <div className="w-full rounded-lg shadow bg-accent aspect-video relative overflow-hidden">
                <Image
                  src={prependServerUrl((slide.image as Media).url)}
                  alt={(slide.image as Media).alt}
                  className="object-cover"
                  fill
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {api && (
        <>
          <div className="w-full max-w-md mx-auto text-center mt-4">
            <RichText
              content={slides?.[api?.selectedScrollSnap() ?? 0]?.richText}
              enableGutter={false}
            />
          </div>
          <div className="flex items-center gap-1.5 justify-center">
            {slides.map((slide, index) => (
              <button
                onClick={() => {
                  if (api?.selectedScrollSnap() ?? 0 === index) return
                  api?.scrollTo(index)
                }}
                key={slide.id + 'dot-counter'}
                className={cn('w-1.5 h-1.5 rounded-full bg-muted-foreground/20', {
                  'bg-blue-400 animate-pulse border-blue-600': api?.selectedScrollSnap() === index,
                })}
              ></button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
