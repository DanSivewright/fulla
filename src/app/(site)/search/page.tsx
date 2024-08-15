import { Suspense } from "react"
import Image from "next/image"
import { Space } from "@/payload-types"
import {
  CurrencyIcon,
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
import { Skeleton } from "@/components/ui/skeleton"
import { Await } from "@/components/await"
import { SpaceCard } from "@/components/cards/space-card"
import { Grid, gridVariants } from "@/components/grid"
import { Paragraph } from "@/components/paragraph"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

import { LocationSelector } from "./location-selector"
import { MultiSelect } from "./multi-select"
import { PriceSelector } from "./price-selector"
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
              <LocationSelector towns={towns.docs ?? []} />

              <PriceSelector />
              <div className="grow pl-6 h-full flex items-center gap-4"></div>
              {/* <Button className="h-full aspect-square rounded-full">
                <SearchIcon size={24} className="text-background" />
              </Button> */}
            </div>
          </div>
        </Section>
        <Section className="container relative flex min-h-screen pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
          <div className="min-h-screen w-full max-w-[1184px] flex-shrink-0 xl:w-[60%] xl:px-8 2xl:w-[60%]">
            <Title style={{ margin: 0 }} level={2}>
              Properties
            </Title>
            <Paragraph className="mt-4 text-muted-foreground/60">
              233 Spaces • Rest of filters here
            </Paragraph>
            <div className="flex mt-6 items-center gap-4">
              <Button size="lg" rounded="full" variant="outline">
                Type
              </Button>
              <Button size="lg" rounded="full" variant="outline">
                Rooms of Beds
              </Button>
              <Button size="lg" rounded="full" variant="outline">
                $0 - $1000
              </Button>
              <Button size="lg" rounded="full" variant="outline">
                On Special
              </Button>
            </div>
            <Suspense
              fallback={
                <Grid gap="xs" className="w-full mt-4">
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
                            if (key === "price") {
                              return {
                                [key]: {
                                  greater_than_equal: value?.[0],
                                },
                                or: [
                                  {
                                    [key]: {
                                      less_than_equal: value?.[1],
                                    },
                                  },
                                ],
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
                      <Grid gap={"xs"} className="w-full mt-4">
                        {spaces?.docs?.map((space: Space) => (
                          <SpaceCard
                            className="col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6"
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
          <div className="xl:static xl:block xl:flex-1 hidden">
            <div className="fixed left-0 top-0 h-full w-full overflow-hidden rounded-md xl:sticky xl:top-[3.75rem] xl:h-[calc(100vh-3.75rem)]">
              <SearchMap />
            </div>
          </div>
        </Section>

        {/* <ResizablePanelGroup
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
          </ResizablePanel>
        </ResizablePanelGroup> */}
      </>
    )
  },
})
export default Page
