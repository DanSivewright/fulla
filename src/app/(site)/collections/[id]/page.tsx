import { cache, Suspense } from "react"
import Link from "next/link"
import { Collection, Space } from "@/payload-types"
import { Bookmark, Loader2, MoreVertical, Search } from "lucide-react"
import { PaginatedDocs } from "payload"

import { fetchCollection } from "@/lib/fetch-collection"
import { getCollection, getCollectionById } from "@/lib/get-collection"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Await } from "@/components/await"
import { SpaceCard } from "@/components/cards/space-card"
import { Grid } from "@/components/grid"
import { Gutter } from "@/components/gutter"
import { Paragraph } from "@/components/paragraph"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

type Props = {
  params: { id: string }
  searchParams: SearchParams
}

const cacheCollection = cache((id) =>
  getCollectionById({
    collection: "collections",
    id,
  })
)

const SingleCollectionPage: React.FC<Props> = async ({
  params: { id },
  searchParams,
}) => {
  return (
    <Section>
      <div className="gutter">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <Suspense
              fallback={
                <BreadcrumbItem>
                  <BreadcrumbPage className="flex items-center gap-2">
                    Collections <Loader2 size={12} className="animate-spin" />
                  </BreadcrumbPage>
                </BreadcrumbItem>
              }
            >
              <Await promise={fetchCollection({ collection: "collections" })}>
                {(collections: PaginatedDocs<Collection>) => (
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        Collections
                        <MoreVertical size={12} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {collections.totalDocs > 0
                          ? collections.docs.map((collection) => (
                              <DropdownMenuItem key={collection.id}>
                                {collection.name}
                              </DropdownMenuItem>
                            ))
                          : null}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                )}
              </Await>
            </Suspense>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Suspense
          fallback={
            <Skeleton className="my-6 h-10 w-1/2 lg:my-7 lg:h-11 xl:my-8 xl:h-14" />
          }
        >
          <Await promise={cacheCollection(id)}>
            {(col) => <Title showAs={2}>{col.name}</Title>}
          </Await>
        </Suspense>
      </div>
      <Gutter>
        <Suspense>
          <Await promise={cacheCollection(id)}>
            {(col) => (
              <>
                {col.spaces?.length ? (
                  <Grid gap={"xs"} className="w-full">
                    {col.spaces?.map((space: Space) => (
                      <SpaceCard key={space.id} space={space} />
                    ))}
                  </Grid>
                ) : (
                  <div className="relative gutter my-6 flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-accent py-16 lg:my-7 xl:my-8">
                    <Title level={2} showAs={4} style={{ margin: 0 }}>
                      Get started with Collections
                    </Title>
                    <Paragraph size={"sm"}>
                      Add any space to this collection by clicking the bookmark
                      icon.
                    </Paragraph>
                    <Link
                      scroll={false}
                      href={"/browse/desks/agile"}
                      className={buttonVariants({
                        size: "xs",
                        className: "w-fit",
                      })}
                    >
                      <Search className="mr-2 h-3 w-3" />
                      Browse spaces
                    </Link>
                    <Bookmark
                      className="absolute right-[25%] top-0 rotate-[-20deg] text-muted-foreground/25"
                      size={300}
                    />
                  </div>
                )}
              </>
            )}
          </Await>
        </Suspense>
      </Gutter>
    </Section>
  )
}
export default SingleCollectionPage
