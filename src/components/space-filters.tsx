"use client"

import Link from "next/link"
import { Company, Media, Space } from "@/payload-types"

import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { SpaceCard } from "./cards/space-card"
import { Icon } from "./icon"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { Separator } from "./ui/separator"

type Props = {
  spaces: Space[]
}
const SpaceFilters: React.FC<Props> = ({ spaces }) => {
  const { ref: firstFilterRef, inView: firstFilterInView } = useInView({
    threshold: 0.9,
  })
  const { ref: lastFilterRef, inView: lastFilterInView } = useInView({
    threshold: 0.9,
  })
  return (
    <>
      <section className="sticky top-[3.6rem] z-10 flex items-center bg-background pb-1 md:pb-2 lg:pb-4 xl:pb-6 gap-2">
        <Button
          size="xs"
          rounded="full"
          variant="secondary"
          //   onClick={() => setOpen(true)}
        >
          <Icon
            name="SlidersHorizontal"
            className="w-3 h-3 text-muted-foreground"
          />
          <span>Filters</span>
        </Button>
        <Separator
          orientation="vertical"
          className="h-4 rotate-[10deg] mx-2 bg-foreground/10"
        />
        <ScrollArea className="relative w-full whitespace-nowrap no-scrollbar">
          <div
            className={cn(
              "absolute top-0 bottom-0 no-scrollbar left-0 w-16 transition-opacity bg-gradient-to-r from-background to-transparent",
              {
                "opacity-0": firstFilterInView,
                "opacity-100": !firstFilterInView,
              }
            )}
          ></div>
          <div
            className={cn(
              "absolute top-0 bottom-0 right-0 w-16 transition-opacity bg-gradient-to-l from-background to-transparent",
              {
                "opacity-0": lastFilterInView,
                "opacity-100": !lastFilterInView,
              }
            )}
          ></div>
          <div className="flex items-center gap-2 w-max ">
            {spaces?.map((space, i) => (
              <Link
                href={`/search?company=${(space.company as Company).id}`}
                ref={
                  i === 0
                    ? firstFilterRef
                    : i === 99
                    ? lastFilterRef
                    : undefined
                }
                key={space.id}
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      size="xs"
                      rounded={"full"}
                      variant="outline"
                      // variant={data.orgId === org.id ? "default" : "outline"}
                      onClick={() => {
                        //   setQuery("orgId", org.id)
                      }}
                      className="flex items-center gap-2"
                      // ref={(node) => onNodeUpdate(node, org.id)}
                    >
                      <Avatar size={"xs"}>
                        <AvatarFallback>
                          {(space.company as Company).name?.[0]}
                        </AvatarFallback>
                        <AvatarImage
                          src={
                            ((space.company as Company).logo as Media)?.url ??
                            undefined
                          }
                          alt={(space.company as Company).name + " logo"}
                        />
                      </Avatar>
                      <span className="line-clamp-1">
                        {(space.company as Company).name}
                      </span>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="p-2">
                    <SpaceCard space={space} />
                  </HoverCardContent>
                </HoverCard>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </>
  )
}

export default SpaceFilters
