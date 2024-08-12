"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { useInView } from "@/hooks/use-in-view"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { BackgroundGradientAnimation } from "../background-gradient-animation"
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
    <BackgroundGradientAnimation containerClassName="mt-[-3.7rem] h-[480px] w-screen">
      <div
        ref={heroRef}
        style={{
          pointerEvents: "none",
        }}
        className="flex gutter absolute h-fit w-full gap-2 max-w-screen-lg text-center z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center flex-col"
      >
        <div
          ref={ref}
          className="absolute inset-x-0 top-[-4rem] h-2 w-full"
        ></div>
        <Title
          style={{ margin: 0 }}
          className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 pointer-events-none select-none font-semibold text-pretty"
        >
          Find your next space now
        </Title>
        <Paragraph className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 pointer-events-none select-none text-pretty">
          Transforming offices, empowering individuals – your workspace
          revolution.
        </Paragraph>
        <div
          style={{
            pointerEvents: "auto",
          }}
          className="w-full flex items-center mt-4"
        >
          <div className="hidden lg:flex items-center p-2 bg-white/40  backdrop-blur rounded-l-lg border-r border-white/35">
            <Select>
              <SelectTrigger
                defaultValue="All"
                variant="ghost"
                sizing="xl"
                className="gap-2 bg-transparent placeholder:text-white/70 border-transparent focus:border-transparent focus:ring-0 text-white/90"
              >
                <SelectValue placeholder="Filters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="nearMe">Near Me</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center grow p-2 bg-white/40 w-full  backdrop-blur rounded-lg lg:rounded-l-none lg:rounded-r-lg">
            <Input
              className="placeholder:text-white/70 border-transparent focus:border-transparent focus:ring-0 text-white/90"
              variant="ghost"
              placeholder="Search your next space..."
              sizing="xl"
            />
            <Button size="xl">Search</Button>
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
    // <div
    //   style={{ width: "100vw" }}
    //   className="card relative mt-[-3.7rem] h-[480px] w-screen bg-stone-900"
    // >
    //   <div
    //     ref={heroRef}
    //     className="absolute inset-x-0 bottom-[4rem] h-1 w-full"
    //   ></div>
    //   <div className="card-content gutter flex h-full w-full items-center justify-normal">
    //     <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center">
    //       <div
    //         ref={ref}
    //         className="absolute inset-x-0 top-[-2rem] h-2 w-full"
    //       ></div>
    //       <Title
    //         className="font-mono text-balance font-bold text-white"
    //         level={2}
    //         showAs={3}
    //       >
    //         Work Smarter, Not Harder – Go Pro!
    //       </Title>

    //       <Paragraph className="text-white text-pretty">
    //         Stand Out, Sign Up. Pro Members Get Noticed First!
    //       </Paragraph>
    //       <Link
    //         href={"/profile"}
    //         className={buttonVariants({ className: "mt-4" })}
    //       >
    //         Go Pro!
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  )
}
