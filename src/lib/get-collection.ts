import { unstable_cache } from "next/cache"
import { headers } from "next/headers"
import configPromise from "@payload-config"
import { getPayloadHMR } from "@payloadcms/next/utilities"
import { PaginatedDocs, PayloadRequest, RequestContext, Where } from "payload"
import type { Config } from "src/payload-types"

type CollectionMap = Omit<
  Config["collections"],
  "payload-preferences" | "payload-migrations"
>
type Collection = keyof CollectionMap

export type CollectionOptions = {
  collection: Collection
  id?: string
  context?: RequestContext
  depth?: number
  currentDepth?: number
  limit?: number
  page?: number
  req?: PayloadRequest
  pagination?: boolean
  disableErrors?: boolean
  draft?: boolean
  overrideAccess?: boolean
  showHiddenFields?: boolean
  sort?: string
  where?: Where
  user?: any
}

async function fetchCollectionById<T extends Collection>(
  options: CollectionOptions & { collection: T; id: string }
): Promise<CollectionMap[T]> {
  const payload = await getPayloadHMR({ config: configPromise })

  const collection = await payload.findByID(options)
  return collection as CollectionMap[T]
}

async function fetchCollection<T extends Collection>(
  options: Omit<CollectionOptions, "id"> & { collection: T }
): Promise<PaginatedDocs<CollectionMap[T]>> {
  const payload = await getPayloadHMR({ config: configPromise })

  const collection = await payload.find({
    ...options,
  })
  return collection as PaginatedDocs<CollectionMap[T]>
}

export function getCollection<T extends Collection>(
  options: CollectionOptions & { collection: T },
  revalidate?: number
) {
  return unstable_cache(
    async () => fetchCollection(options),
    [options.collection],
    {
      ...(revalidate ? { revalidate } : {}),
      tags: [
        `collection_${options.collection}${
          options.user ? `_${options.user?.id}` : ""
        }`,
      ],
    }
  )
}

export function getCollectionById<T extends Collection>(
  options: CollectionOptions & { collection: T; id: string },
  revalidate?: number
) {
  return unstable_cache(
    async () => fetchCollectionById(options),
    [options.collection, options.id],
    {
      ...(revalidate ? { revalidate } : {}),
      tags: [
        `collection_${options.collection}_${options.id}${
          options.user ? `_${options.user?.id}` : ""
        }`,
      ],
    }
  )
}
