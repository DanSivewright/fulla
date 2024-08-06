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
}

async function getCollectionById<T extends Collection>(
  options: CollectionOptions & { collection: T; id: string },
  headers?: Headers
): Promise<CollectionMap[T]> {
  const payload = await getPayloadHMR({ config: configPromise })

  let user

  if (!options.overrideAccess) {
    const auth = await payload.auth({ headers })
    user = auth.user
  }

  const collection = await payload.findByID(options)
  return collection as CollectionMap[T]
}

async function getCollection<T extends Collection>(
  options: Omit<CollectionOptions, "id"> & { collection: T },
  headers?: Headers
): Promise<PaginatedDocs<CollectionMap[T]>> {
  const payload = await getPayloadHMR({ config: configPromise })

  let user

  if (!options.overrideAccess) {
    const auth = await payload.auth({ headers })
    user = auth.user
  }

  const collection = await payload.find(options)
  return collection as PaginatedDocs<CollectionMap[T]>
}

export { getCollectionById, getCollection }
