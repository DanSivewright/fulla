import { Suspense } from "react"
import Link from "next/link"
import { Collection } from "@/payload-types"
import { Bookmark, Plus } from "lucide-react"

import { auth } from "@/lib/auth"
import { fetchCollection } from "@/lib/fetch-collection"
import { getCollection } from "@/lib/get-collection"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Await } from "@/components/await"
import { Paragraph } from "@/components/paragraph"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

import { SearchCollections } from "./search-collections"

type Props = {
  searchParams: SearchParams
}
const CollectionsPage: React.FC<Props> = async ({ searchParams }) => {
  const session = await auth()
  return (
    <Section>
      <Title className="gutter">Collections</Title>
      <div className="flex flex-col items-center gap-4 gutter sm:flex-row">
        <SearchCollections />
        <Link
          href={"/collections/create"}
          className={buttonVariants({
            rounded: "full",
            className: "w-full sm:w-fit",
          })}
        >
          New Collection
        </Link>
      </div>
      <Suspense
        key={(searchParams["q"]?.toString() as string) ?? ""}
        fallback={
          <ul className="w-full mt-4 lg:mt-8">
            <li className="mb-1 gutter">
              <Skeleton className="w-full h-12 rounded-xl" />
            </li>
            <li className="mb-1 gutter">
              <Skeleton className="w-full h-12 rounded-xl" />
            </li>
            <li className="mb-1 gutter">
              <Skeleton className="w-full h-12 rounded-xl" />
            </li>
          </ul>
        }
      >
        <Await
          promise={getCollection(
            {
              collection: "collections",
              overrideAccess: false,
              user: session.user,
              ...(searchParams.q
                ? {
                    where: {
                      name: {
                        contains: searchParams.q,
                      },
                    },
                  }
                : {}),
            },
            3600
          )()}
          // promise={fetchCollection({
          //   collection: "collections",
          //   ...(searchParams.q
          //     ? {
          //         where: {
          //           name: {
          //             contains: searchParams.q,
          //           },
          //         },
          //       }
          //     : {}),
          // })}
        >
          {({ docs }) => (
            <>
              {docs.length ? (
                <ul className="w-full mt-4 lg:mt-8">
                  <li className="flex items-center w-full gutter">
                    <span className="w-3/4 text-xs text-accent-foreground/50">
                      Title
                    </span>
                    <span className="w-1/4 text-xs text-accent-foreground/50">
                      Spaces
                    </span>
                    <span className="w-1/4 text-xs text-accent-foreground/50">
                      Last Updated
                    </span>
                  </li>
                  {docs?.map((collection: Collection) => (
                    <li
                      key={collection.id}
                      className="flex items-center w-full"
                    >
                      <Link
                        className="flex items-center w-full py-3 cursor-pointer group gutter grow hover:bg-accent"
                        href={`/collections/${collection?.id}`}
                      >
                        <span className="w-3/4 font-semibold group-hover:underline">
                          {collection.name}
                        </span>
                        <span className="w-1/4 font-semibold">
                          {collection?.spaces?.length ?? 0}
                        </span>
                        <span className="w-1/4 font-semibold">
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }).format(new Date(collection?.updatedAt!))}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="gutter">
                  <div className="relative flex flex-col w-full gap-2 py-16 mt-4 overflow-hidden gutter rounded-xl bg-accent">
                    <Title level={2} showAs={4} style={{ margin: 0 }}>
                      Get started with Collections
                    </Title>
                    <Paragraph size={"sm"}>
                      Manage your favourite spaces by creating collections.
                    </Paragraph>
                    <Link
                      scroll={false}
                      href={"/collections/create"}
                      className={buttonVariants({
                        size: "xs",
                        className: "w-fit",
                      })}
                    >
                      <Plus className="w-3 h-3 mr-2" />
                      Create a Collection
                    </Link>
                    <Bookmark
                      className="absolute right-[25%] top-0 rotate-[-20deg] text-muted-foreground/25"
                      size={300}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </Await>
      </Suspense>
    </Section>
  )
}
export default CollectionsPage
