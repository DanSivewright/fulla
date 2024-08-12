import { Suspense } from "react"
import Image from "next/image"
import { Space } from "@/payload-types"
import {
  HouseIcon,
  Loader2,
  MapIcon,
  MapPinIcon,
  SearchIcon,
} from "lucide-react"

import { createPage } from "@/lib/create-page"
import { getCollection } from "@/lib/get-collection"
import { getCollectionCount } from "@/lib/get-collection-count"
import { searchPageParamsCache } from "@/lib/search-params"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Await } from "@/components/await"
import { SpaceCard } from "@/components/cards/space-card"
import { Grid, gridVariants } from "@/components/grid"
import { Paragraph } from "@/components/paragraph"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

import { MultiSelect } from "./multi-select"
import SearchMap from "./search-map"
import { TypeFilters } from "./type-filters"

const { Page } = createPage({
  loader: async ({ searchParams }) => {
    const [
      //
      // properties,
      // companies,
      // categories,
      towns,
      spacesTypes,
    ] = await Promise.all([
      // getCollection({
      //   collection: "properties",
      //   limit: 100,
      //   depth: 0,
      // })(),
      // getCollection({
      //   collection: "companies",
      //   limit: 100,
      //   depth: 0,
      // })(),
      // getCollection({
      //   collection: "categories",
      //   limit: 100,
      //   depth: 0,
      // })(),
      getCollection({
        collection: "towns",
        limit: 1000,
        depth: 0,
      })(),
      getCollection({
        collection: "spacesTypes",
        limit: 1000,
        depth: 0,
      })(),
    ])
    return {
      // properties,
      // companies,
      // categories,
      towns,
      spacesTypes,
    }
  },
  component: async ({
    data: {
      //
      towns,
      spacesTypes,
    },
    searchParams,
  }) => {
    const parsedParams = searchPageParamsCache.parse(searchParams)
    const entries = Object.entries(parsedParams).filter(([_, value]) => value)
    return (
      <>
        <Section
          size="sm"
          className={cn([
            gridVariants(),
            "gutter relative max-w-screen-2xl mx-auto w-full",
          ])}
        >
          <div className="absolute inset-x-0 md:top-10 xl:top-40 min-h-0 pl-20 py-24 flex overflow-hidden z-0">
            <span className="block bg-[#ef233c] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span>
            <span className="block bg-[#04868b] w-72 h-72 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Title>Search Fulla</Title>
            <div className="flex items-center gap-10">
              <Paragraph className="text-muted-foreground/70 flex items-center gap-2">
                <MapIcon size={18} />
                <Suspense
                  fallback={
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Properties
                    </>
                  }
                >
                  <Await
                    promise={getCollectionCount({
                      collection: "properties",
                    })()}
                  >
                    {(properties) => (
                      <>{properties.totalDocs || 0} Properties</>
                    )}
                  </Await>
                </Suspense>
              </Paragraph>
              <Paragraph className="text-muted-foreground/70 flex items-center gap-2">
                <HouseIcon size={18} />
                <Suspense
                  fallback={
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Spaces
                    </>
                  }
                >
                  <Await
                    promise={getCollectionCount({
                      collection: "spaces",
                    })()}
                  >
                    {(properties) => <>{properties.totalDocs || 0} Spaces</>}
                  </Await>
                </Suspense>
              </Paragraph>
            </div>
          </div>
          <div className="hidden lg:block col-span-12 mt-10 lg:mt-0 lg:col-span-6 aspect-[16/13] overflow-hidden relative">
            <Image
              src="/images/search-hero.webp"
              alt="search image with 3 different images"
              fill
              className="lg:object-contain object-cover"
            />
          </div>
          <div className="col-span-12 z-10 flex flex-col gap-10 mt-12 lg:-mt-56">
            <TypeFilters spacesTypes={spacesTypes.docs ?? []} />
            <div className="w-full flex items-center p-2 h-24 bg-background rounded-full shadow z-10">
              <div className="w-1/3 pl-6 h-full flex items-center gap-4">
                <MapPinIcon size={24} className="text-muted-foreground/60" />
                <div className="flex w-full flex-col">
                  <MultiSelect
                    placeholder="Location"
                    className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate"
                    options={towns.docs.map((town) => ({
                      label: town.name,
                      value: town.id,
                    }))}
                  />
                  <span className="text-muted-foreground/70 text-sm">
                    Where are you going?
                  </span>
                </div>
              </div>

              <div className="grow pl-6 h-full flex items-center gap-4"></div>
              <div className="grow pl-6 h-full flex items-center gap-4"></div>
              <Button className="h-full aspect-square rounded-full">
                <SearchIcon size={24} className="text-white" />
              </Button>
            </div>
          </div>
        </Section>

        <ResizablePanelGroup
          direction="horizontal"
          className="max-h-[calc(100vh-3.7rem)] top-[3.75rem] h-[calc(100vh-3.7rem)] w-screen"
        >
          <ResizablePanel defaultSize={60}>
            <SearchMap />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40}>
            <div className="w-full max-h-[calc(100vh-3.7rem)] overflow-y-scroll h-[calc(100vh-3.7rem)] px-4 pb-10">
              <Suspense
                fallback="Loading spaces..."
                key={JSON.stringify(parsedParams)}
              >
                <Await
                  promise={getCollection({
                    collection: "spaces",
                    depth: 1,
                    skipCache: true,
                    where: {
                      and: [
                        {
                          _status: {
                            equals: "published",
                          },
                        },
                        ...(entries && entries?.length
                          ? entries.map(([key, value]) => {
                              if (key === "name") {
                                return {
                                  [key]: {
                                    like: value,
                                  },
                                }
                              }
                              if (key === "floorG" || key === "capacityG") {
                                return {
                                  [key.slice(0, -1)]: {
                                    greater_than_equal: value,
                                  },
                                }
                              }
                              if (key === "floorL" || key === "capacityL") {
                                return {
                                  [key.slice(0, -1)]: {
                                    less_than_equal: value,
                                  },
                                }
                              }
                              if (
                                key === "categories" ||
                                key === "town" ||
                                key === "type"
                              ) {
                                return {
                                  [key]: {
                                    in: value,
                                  },
                                }
                              }
                              return {
                                [key]: {
                                  equals: value,
                                },
                              }
                            })
                          : []),
                      ],
                    },
                  })()}
                >
                  {(spaces) => (
                    <>
                      {spaces.docs.length ? (
                        <Grid gap={"xs"} className="w-full">
                          {spaces?.docs?.map((space: Space) => (
                            <SpaceCard
                              className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12"
                              key={space.id}
                              space={space}
                            />
                          ))}
                        </Grid>
                      ) : (
                        <p>No spaces</p>
                      )}
                    </>
                  )}
                </Await>
              </Suspense>
            </div>
            {/* <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content</span>
            </div> */}
          </ResizablePanel>
        </ResizablePanelGroup>
      </>
    )
  },
})
export default Page
