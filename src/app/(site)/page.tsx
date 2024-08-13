import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Space } from "@/payload-types"

import { getCollection } from "@/lib/get-collection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Await } from "@/components/await"
import { SpaceCard } from "@/components/cards/space-card"
import Empty from "@/components/empty"
import { Grid } from "@/components/grid"
import { Paragraph } from "@/components/paragraph"
// import SiteHero from "@/components/hero/site-hero"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

const SpaceFilters = dynamic(() => import("@/components/space-filters"), {
  loading: () => (
    <Skeleton className="sticky w-full top-[3.6rem] z-10  mb-1 md:mb-2 lg:mb-4 xl:mb-6 h-8" />
  ),
})
const SiteHero = dynamic(() => import("@/components/hero/site-hero"), {
  loading: () => (
    <div className="mt-[-3.7rem] h-[480px] w-screen relative overflow-hidden top-0 left-0 bg-gradient-to-r from-[#6C00A2] to-[#001152]">
      <div className="flex gutter absolute h-fit w-full gap-2 max-w-screen-lg text-center z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center flex-col">
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
    </div>
  ),
  ssr: false,
})

type Props = {}
const Root: React.FC<Props> = async ({}) => {
  return (
    <>
      <SiteHero />

      <div className="gutter relative z-0">
        <Title level={1} showAs={3}>
          Browse
        </Title>

        <Suspense
          fallback={
            <Skeleton className="sticky w-full top-[3.6rem] z-10  mb-1 md:mb-2 lg:mb-4 xl:mb-6 h-8" />
          }
        >
          <Await
            promise={getCollection({
              collection: "spaces",
              depth: 2,
              where: {
                and: [
                  {
                    _status: {
                      equals: "published",
                    },
                  },
                  {
                    featured: {
                      equals: true,
                    },
                  },
                ],
              },
            })()}
          >
            {(spaces) => <SpaceFilters spaces={spaces.docs} />}
          </Await>
        </Suspense>

        <Section side="b">
          <Suspense
            fallback={
              <Grid gap="xs" className="w-full">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="group col-span-12 flex w-full flex-col gap-3 md:col-span-6 xl:col-span-4"
                  >
                    <Skeleton className="aspect-[16/11] w-full rounded-lg" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-7 w-1/3" />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-3 w-1/6" />
                      <Skeleton className="h-3 w-1/6" />
                    </div>
                  </div>
                ))}
              </Grid>
            }
          >
            <Await
              promise={getCollection({
                collection: "spaces",
                depth: 1,
                where: {
                  _status: {
                    equals: "published",
                  },
                },
              })()}
            >
              {(spaces) => (
                <>
                  {spaces.docs.length ? (
                    <Grid gap={"xs"} className="w-full">
                      {spaces?.docs?.map((space: Space) => (
                        <SpaceCard key={space.id} space={space} />
                      ))}
                    </Grid>
                  ) : (
                    <Empty />
                  )}
                </>
              )}
            </Await>
          </Suspense>
        </Section>
      </div>
    </>
  )
}
export default Root
