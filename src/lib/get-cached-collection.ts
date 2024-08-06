import { unstable_cache } from "next/cache"
import { headers } from "next/headers"
import configPromise from "@payload-config"
import { getPayloadHMR } from "@payloadcms/next/utilities"
import { PaginatedDocs, PayloadRequest, RequestContext, Where } from "payload"
import type { Config } from "src/payload-types"

type Collection = keyof Config["collections"]

export type CollectionOptions = {
  collection: Collection
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

type GetCollectionReturnType<T extends Collection> = PaginatedDocs<
  Config["collections"][T]
>

async function getCollection<T extends Collection>(
  options: CollectionOptions & { collection: T },
  headers?: Headers
): Promise<GetCollectionReturnType<T>> {
  const payload = await getPayloadHMR({ config: configPromise })

  let user

  if (!options.overrideAccess) {
    const auth = await payload.auth({ headers })
    user = auth.user
  }

  const collection = await payload.find(options)
  return collection as GetCollectionReturnType<T>
}

export function getCachedCollection<T extends Collection>(
  options: CollectionOptions & { collection: T }
) {
  const h = options.overrideAccess ? headers() : undefined

  return unstable_cache(
    async () => getCollection(options, h),
    [options.collection],
    { tags: [`collection_${options.collection}`] }
  ) as () => Promise<GetCollectionReturnType<T>>
}
