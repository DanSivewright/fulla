'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { JSX, useState } from 'react'

import { sectionVariants } from '@/components/section'

import { background, blur, height, opacity, translate } from './anim'
import { Header } from '@/payload-types'
import Link from 'next/link'

type Props = {
  header: Header
}

const MarketingHeader: React.FC<Props> = ({ header }) => {
  const links = [
    {
      title: 'Home',
      href: '/',
      src: 'marketing-one.jpg',
    },
    {
      title: 'Shop',
      href: '/shop',
      src: 'marketing-two.jpg',
    },
    {
      title: 'About Us',
      href: '/about',
      src: 'marketing-one.jpg',
    },
    {
      title: 'Lookbook',
      href: '/lookbook',
      src: 'marketing-two.jpg',
    },
    {
      title: 'Contact',
      href: '/contact',
      src: 'marketing-one.jpg',
    },
  ]
  const [isActive, setIsActive] = useState(false)
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  })
  const getChars = (word: string): JSX.Element[] => {
    let chars: JSX.Element[] = []
    word.split('').forEach((char, i) => {
      chars.push(
        <motion.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>,
      )
    })
    return chars
  }

  console.log('selectedLink::: ', selectedLink)

  return (
    <div className="sticky inset-x-0 top-0 z-50 bg-[#f4f0ea] p-3">
      <div className="relative flex justify-center text-xs font-bold uppercase">
        <div
          onClick={() => {
            setIsActive(!isActive)
          }}
          className="flex cursor-pointer items-center justify-center gap-2"
        >
          {isActive ? 'Close' : 'Menu'}
        </div>
      </div>
      <motion.div
        // @ts-ignore
        onClick={() => setIsActive(false)}
        variants={background}
        initial="initial"
        animate={isActive ? 'open' : 'closed'}
        className="absolute inset-x-0 top-[100%] h-full w-full cursor-pointer bg-black opacity-50"
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive ? (
          <motion.div
            variants={height}
            initial="initial"
            animate="enter"
            exit="exit"
            // @ts-ignore
            className="gutter flex flex-col overflow-hidden"
          >
            <div
              className={sectionVariants({
                size: 'sm',
                className: 'flex w-full items-center gap-[50px] justify-between',
              })}
            >
              <div className="flex grow flex-col gap-2 md:gap-4 lg:gap-6 xl:gap-8">
                {/* OPTIONS */}
                <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-6 xl:gap-8">
                  {header?.navItems?.map(({ link: { label, url, reference, type }, id }, index) => {
                    const href =
                      type === 'reference' &&
                      typeof reference?.value === 'object' &&
                      reference.value.slug
                        ? `${
                            reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''
                          }/${reference.value.slug}`
                        : url
                    return (
                      <motion.p
                        key={`l_${index}`}
                        // @ts-ignore
                        className="text-5xl font-light uppercase lg:text-6xl xl:text-[5.5rem]"
                        style={{ margin: 0 }}
                        onMouseOver={() => {
                          setSelectedLink({ isActive: true, index })
                        }}
                        onMouseLeave={() => {
                          setSelectedLink({ isActive: false, index })
                        }}
                        variants={blur}
                        animate={
                          selectedLink.isActive && selectedLink.index != index ? 'open' : 'closed'
                        }
                      >
                        <Link
                          onClick={() => {
                            setSelectedLink({
                              isActive: true,
                              index,
                            })
                            setIsActive(false)
                          }}
                          href={href}
                        >
                          {getChars(label)}
                        </Link>
                      </motion.p>
                    )
                  })}
                </div>

                {/* FOOTER */}
                <div className="flex w-full justify-between gap-4 text-sm uppercase">
                  <p>
                    <span className="text-muted-foreground/50">MADE BY: </span> WIXELS DIGITAL
                  </p>
                  <p>
                    <span className="text-muted-foreground/50">PROUDLY: </span> SOUTH AFRICAN
                  </p>
                </div>
              </div>

              <motion.div
                variants={opacity}
                initial="initial"
                animate={selectedLink.isActive ? 'open' : 'closed'}
                // @ts-ignore
                className="relative bg-red-200 mb-3 aspect-square w-[500px] grow overflow-hidden"
              >
                <Image
                  src={`/images/${links[selectedLink.index].src}`}
                  fill
                  className="object-cover"
                  alt="image"
                />
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default MarketingHeader
