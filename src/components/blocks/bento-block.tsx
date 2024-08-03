'use client'
import { Media, Page, Post, Space } from '@/payload-types'
import { useRef } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { titleVariants } from '@/components/title'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import { prependServerUrl } from '@/lib/prepend-server-url'
import { useMediaQuery } from '@/hooks/use-media-query'

type Props = Extract<Page['layout'][0], { blockType: 'bento-block' }>

export const BentoBlock: React.FC<Props> = ({ items }) => {
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

  const matches = useMediaQuery('(min-width: 1024px)')
  return (
    <>
      {!matches ? (
        <div className="flex flex-col gap-2">
          {items?.map((result, index) => {
            const { blocks } = result || {}
            let href
            let src
            let desc
            let categories

            if (blocks.relationTo === 'pages') {
              const page = blocks.value as Page
              href = `/${page.slug}`
              src = (page?.meta?.image as Media)?.url
              desc = page?.meta?.description?.replace(/\s/g, ' ')
            } else if (blocks.relationTo === 'posts') {
              const post = blocks.value as Post
              href = `/posts/${post.slug}`
              src = (post?.meta?.image as Media)?.url
              desc = post?.meta?.description?.replace(/\s/g, ' ')
              categories =
                post?.categories && Array.isArray(post?.categories) && post?.categories.length > 0
                  ? post?.categories
                  : null
            } else if (blocks.relationTo === 'spaces') {
              const space = blocks.value as Space
              href = `/spaces/${space.id}`
              src = (space?.featureImage as Media)?.url
              categories =
                space?.categories &&
                Array.isArray(space?.categories) &&
                space?.categories.length > 0
                  ? space?.categories
                  : null
            }
            return (
              <Link
                href={href}
                key={result.id}
                // @ts-ignore
                // ref={index === 0 ? firstImage : secondImage}
                className="relative flex cursor-pointer w-full aspect-video"
              >
                <div className="w-full h-full flex-col justify-between">
                  <div className="relative overflow-hidden bg-gradient-to-tr from-blue-300 to-cyan-400 via-indigo-300 pt-[66.66%]">
                    {src && (
                      <Image
                        className="object-cover brightness-75"
                        src={prependServerUrl(src)}
                        alt={'image'}
                        fill
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-between p-3">
                    <div className="flex flex-col text-white gap-2">
                      <h2
                        className={cn(titleVariants({ level: 5 }), 'line-clamp-1 text-white')}
                        style={{ margin: 0 }}
                      >
                        {blocks.relationTo === 'pages' && (blocks.value as Page).title}
                        {blocks.relationTo === 'posts' && (blocks.value as Post).title}
                        {blocks.relationTo === 'spaces' && (blocks.value as Space).name}
                      </h2>
                      {desc && <p className="line-clamp-1 text-pretty">{desc}</p>}
                    </div>
                    <div className="flex gap-2 items-center flex-wrap">
                      {categories?.map((category, index) => {
                        if (typeof category === 'object') {
                          const { title: titleFromCategory } = category

                          const categoryTitle = titleFromCategory || 'Untitled category'

                          const isLast = index === categories.length - 1

                          return (
                            <Badge variant="blur" size="lg" key={index}>
                              {categoryTitle}
                              {!isLast && <>, &nbsp;</>}
                            </Badge>
                          )
                        }

                        return null
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <motion.div
          // @ts-ignore
          className={cn('flex h-[45vw] w-full items-end gap-2')}
          onMouseMove={(e) => {
            manageMouseMove(e)
          }}
        >
          {items?.map((result, index) => {
            const { blocks } = result || {}
            let href
            let src
            let desc
            let categories

            if (blocks.relationTo === 'pages') {
              const page = blocks.value as Page
              href = `/${page.slug}`
              src = (page?.meta?.image as Media)?.url
              desc = page?.meta?.description?.replace(/\s/g, ' ')
            } else if (blocks.relationTo === 'posts') {
              const post = blocks.value as Post
              href = `/posts/${post.slug}`
              src = (post?.meta?.image as Media)?.url
              desc = post?.meta?.description?.replace(/\s/g, ' ')
              categories =
                post?.categories && Array.isArray(post?.categories) && post?.categories.length > 0
                  ? post?.categories
                  : null
            } else if (blocks.relationTo === 'spaces') {
              const space = blocks.value as Space
              href = `/spaces/${space.id}`
              src = (space?.featureImage as Media)?.url
              categories =
                space?.categories &&
                Array.isArray(space?.categories) &&
                space?.categories.length > 0
                  ? space?.categories
                  : null
            }
            return (
              <Link
                href={href}
                key={result.id}
                // @ts-ignore
                ref={index === 0 ? firstImage : secondImage}
                className={cn('relative flex cursor-pointer', {
                  'w-[66.66%]': index === 0,
                  'w-[33.33%]': index === 1,
                })}
              >
                <div className="w-full h-full flex-col justify-between">
                  <div className="relative overflow-hidden bg-gradient-to-tr from-blue-300 to-cyan-400 via-indigo-300 pt-[66.66%]">
                    {src && (
                      <Image
                        className="object-cover brightness-75"
                        src={prependServerUrl(src)}
                        alt={'image'}
                        fill
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-between p-3">
                    <div className="flex flex-col text-white gap-2">
                      <h2
                        className={cn(titleVariants({ level: 5 }), 'line-clamp-1 text-white')}
                        style={{ margin: 0 }}
                      >
                        {blocks.relationTo === 'pages' && (blocks.value as Page).title}
                        {blocks.relationTo === 'posts' && (blocks.value as Post).title}
                        {blocks.relationTo === 'spaces' && (blocks.value as Space).name}
                      </h2>
                      {desc && <p className="line-clamp-1 text-pretty">{desc}</p>}
                    </div>
                    <div className="flex gap-2 items-center flex-wrap">
                      {categories?.map((category, index) => {
                        if (typeof category === 'object') {
                          const { title: titleFromCategory } = category

                          const categoryTitle = titleFromCategory || 'Untitled category'

                          const isLast = index === categories.length - 1

                          return (
                            <Badge variant="blur" size="lg" key={index}>
                              {categoryTitle}
                              {!isLast && <>, &nbsp;</>}
                            </Badge>
                          )
                        }

                        return null
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </motion.div>
      )}
    </>
  )
}
