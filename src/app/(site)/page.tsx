import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Space } from "@/payload-types"

import { getCollection } from "@/lib/get-collection"
import { Skeleton } from "@/components/ui/skeleton"
import { Await } from "@/components/await"
import { SpaceCard } from "@/components/cards/space-card"
import Empty from "@/components/empty"
import { Grid } from "@/components/grid"
import { SiteHero } from "@/components/hero/site-hero"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

const SpaceFilters = dynamic(() => import("@/components/space-filters"), {
  loading: () => (
    <Skeleton className="sticky w-full top-[3.6rem] z-10  mb-1 md:mb-2 lg:mb-4 xl:mb-6 h-8" />
  ),
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
