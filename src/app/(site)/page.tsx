import { Section, sectionVariants } from '@/components/section'
import { Title } from '@/components/title'
import { Button } from '@/components/ui/button'
import { createPage } from '@/lib/create-page'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import imageOne from '../../../public/images/title1.png'
import imageTwo from '../../../public/images/title2.png'
import imageThree from '../../../public/images/title3.png'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const { Page } = createPage({
  component: () => (
    <div className="">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
})

export default Page
