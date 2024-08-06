import { Suspense } from "react"

import {
  CollectionOptions,
  getCollection,
  getCollectionById,
} from "@/lib/get-collection"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Await } from "@/components/await"
import { Section } from "@/components/section"

type Props = {
  params: { id: string }
  searchParams: SearchParams
}
const SingleCollectionPage: React.FC<Props> = async ({
  params: { id },
  searchParams,
}) => {
  return (
    <Section>
      <Suspense
        fallback={
          <div className="gutter">
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex items-center gap-2">
                  <Skeleton className="w-32 h-6" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Skeleton className="w-32 h-6" />
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Skeleton className="w-1/2 h-10 my-6 lg:my-7 lg:h-11 xl:my-8 xl:h-14" />
            <div className="flex items-center gap-2 p-4 rounded-xl bg-muted">
              <Input
                disabled
                placeholder="Fetching your collection..."
                variant="ghost"
                sizing={"sm"}
              />
            </div>
          </div>
        }
      >
        <Await promise={getCollectionById({ collection: "collections", id })}>
          {(collection) => <pre>{JSON.stringify(collection, null, 2)}</pre>}
        </Await>
      </Suspense>
    </Section>
  )
}
export default SingleCollectionPage
