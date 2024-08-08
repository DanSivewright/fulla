"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { useInView } from "@/hooks/use-in-view"
import { useLocalStorage } from "@/hooks/use-local-storage"

import { Paragraph } from "../paragraph"
import { Title } from "../title"
import { buttonVariants } from "../ui/button"

type Props = {}
export const SiteHero: React.FC<Props> = ({}) => {
  const [hasTriggeredHeroScroller, setHasTriggeredHeroScroller] =
    useState(false)

  const [hidden, setHidden] = useLocalStorage({
    key: "nav-hidden",
    defaultValue: false,
  })
  const [background, setBackground] = useLocalStorage({
    key: "nav-background",
    defaultValue: true,
  })
  const [blur, setBlur] = useLocalStorage({
    key: "nav-blur",
    defaultValue: false,
  })

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0,
    initialInView: true,
    onChange(inView) {
      if (inView) {
        if (hidden) {
          setHidden(false)
        }
        console.log(
          "have i triggered scroll state::: ",
          hasTriggeredHeroScroller
        )
        if (hasTriggeredHeroScroller) {
          setBlur(true)
          //   dispatch({ type: 'field', payload: true, field: 'blur' })
        } else {
          setBlur(false)
          //   dispatch({ type: 'field', payload: false, field: 'blur' })
        }
        setBackground(false)
        // dispatch({ type: 'field', payload: false, field: 'background' })
      } else {
        setBlur(false)
        // dispatch({ type: 'field', payload: false, field: 'blur' })
        setBackground(true)
        // dispatch({ type: 'field', payload: true, field: 'background' })
      }
    },
  })

  const { ref } = useInView({
    threshold: 1,
    initialInView: true,
    onChange(inView) {
      if (inView) {
        setBlur(false)
        setBackground(false)
        // dispatch({ type: 'field', payload: false, field: 'blur' })
        // dispatch({ type: 'field', payload: false, field: 'background' })
      } else {
        setBlur(true)
        setBackground(false)
        // dispatch({ type: 'field', payload: true, field: 'blur' })
        // dispatch({ type: 'field', payload: false, field: 'background' })
      }
    },
  })

  useEffect(() => {
    if (!heroInView && !hasTriggeredHeroScroller) {
      setHasTriggeredHeroScroller(true)
    }
  }, [heroInView])

  return (
    <div
      style={{ width: "100vw" }}
      className="card relative mt-[-3.7rem] h-[480px] w-screen bg-stone-900"
    >
      <div
        ref={heroRef}
        className="absolute inset-x-0 bottom-[4rem] h-1 w-full"
      ></div>
      <div className="card-content gutter flex h-full w-full items-center justify-normal">
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center">
          <div
            ref={ref}
            className="absolute inset-x-0 top-[-2rem] h-2 w-full"
          ></div>
          <Title
            className="font-mono text-balance font-bold text-white"
            level={2}
            showAs={3}
          >
            Work Smarter, Not Harder – Go Pro!
          </Title>

          <Paragraph className="text-white text-pretty">
            Stand Out, Sign Up. Pro Members Get Noticed First!
          </Paragraph>
          <Link
            href={"/profile"}
            className={buttonVariants({ className: "mt-4" })}
          >
            Go Pro!
          </Link>
        </div>
      </div>
    </div>
  )
}
