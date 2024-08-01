'use client'
import RichText from '@/components/rich-text'
import { Section } from '@/components/section'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { createPage } from '@/lib/create-page'
import { prependServerUrl } from '@/lib/prepend-server-url'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const data = {
  id: '66ab69a40a48513d5cc6d816',
  loop: true,
  dots: true,
  blockName: null,
  slides: [
    {
      id: '66ab69af0a48513d5cc6d817',
      richText: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              tag: 'h4',
              type: 'heading',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'This is slide one',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
          ],
          direction: 'ltr',
        },
      },
      image: {
        id: 9,
        alt: 'modern office building',
        updatedAt: '2024-07-31T12:01:20.939Z',
        createdAt: '2024-07-31T12:01:20.939Z',
        url: '/api/media/file/modern office building',
        thumbnailURL: null,
        filename: 'modern office building',
        mimeType: 'image/jpeg',
        filesize: 290275,
        width: 1740,
        height: 1160,
        focalX: 50,
        focalY: 50,
      },
    },
    {
      id: '66ab69d50a48513d5cc6d818',
      richText: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              tag: 'h4',
              type: 'heading',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'This is slide two',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
          ],
          direction: 'ltr',
        },
      },
      image: {
        id: 4,
        alt: 'Auditorium',
        updatedAt: '2024-07-30T12:29:05.423Z',
        createdAt: '2024-07-30T12:29:05.423Z',
        url: '/api/media/file/photo-1583062434105-9bef71509685q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        thumbnailURL: null,
        filename:
          'photo-1583062434105-9bef71509685q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        mimeType: 'image/jpeg',
        filesize: 390474,
        width: 1548,
        height: 1161,
        focalX: 50,
        focalY: 50,
      },
    },
    {
      id: '66ab69ee0a48513d5cc6d819',
      richText: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              tag: 'h4',
              type: 'heading',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'This is slide three',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
          ],
          direction: 'ltr',
        },
      },
      image: {
        id: 10,
        alt: 'office recreation area',
        updatedAt: '2024-07-31T12:02:03.871Z',
        createdAt: '2024-07-31T12:02:03.871Z',
        url: '/api/media/file/office rec area',
        thumbnailURL: null,
        filename: 'office rec area',
        mimeType: 'image/jpeg',
        filesize: 380603,
        width: 1740,
        height: 1160,
        focalX: 50,
        focalY: 50,
      },
    },
    {
      id: '66ab6a040a48513d5cc6d81a',
      richText: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              tag: 'h4',
              type: 'heading',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'This is slide four',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
          ],
          direction: 'ltr',
        },
      },
      image: {
        id: 6,
        alt: 'modern outdoor building',
        updatedAt: '2024-07-31T11:58:26.354Z',
        createdAt: '2024-07-31T11:58:26.354Z',
        url: '/api/media/file/modern outdoor building',
        thumbnailURL: null,
        filename: 'modern outdoor building',
        mimeType: 'image/jpeg',
        filesize: 664509,
        width: 1527,
        height: 2714,
        focalX: 50,
        focalY: 50,
      },
    },
  ],
  blockType: 'carousel',
}

type Props = {}
const Page: React.FC<Props> = ({}) => {
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

  console.log('current::: ', current)
  return (
    <Section className="flex-col gap-4 flex">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {data.slides.map((slide, index) => (
            <CarouselItem className="basis-2/3" key={slide.id}>
              <div className="w-full rounded-lg shadow bg-accent aspect-video relative overflow-hidden">
                <Image
                  src={prependServerUrl(slide.image.url)}
                  alt={slide.image.alt}
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
              content={data.slides?.[api?.selectedScrollSnap() ?? 0]?.richText}
              enableGutter={false}
            />
          </div>
          <div className="flex items-center gap-1.5 justify-center">
            {data.slides.map((slide, index) => (
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
    </Section>
  )
}
export default Page
