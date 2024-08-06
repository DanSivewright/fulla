import { unstable_cache } from "next/cache"
import { headers } from "next/headers"
import configPromise from "@payload-config"
import { getPayloadHMR } from "@payloadcms/next/utilities"
import { PaginatedDocs, PayloadRequest, RequestContext, Where } from "payload"
import type { Config } from "src/payload-types"

type Collection = keyof Config["collections"]

export type CollectionOptions<T extends Collection> = {
  collection: T
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

type GetCollectionReturnType<
  T extends Collection,
  O extends CollectionOptions<T>
> = O["id"] extends string
  ? Config["collections"][T]
  : PaginatedDocs<Config["collections"][T]>

async function fetchCollection<
  T extends Collection,
  O extends CollectionOptions<T>
>(options: O, headers?: Headers): Promise<GetCollectionReturnType<T, O>> {
  const payload = await getPayloadHMR({ config: configPromise })

  let user

  if (!options.overrideAccess) {
    const auth = await payload.auth({ headers })
    user = auth.user
  }

  const collection = options.id
    ? await payload.findByID({
        ...options,
        id: options.id,
      })
    : await payload.find(options)

  return collection as GetCollectionReturnType<T, O>
}

export function getCollection<
  T extends Collection,
  O extends CollectionOptions<T>
>(options: O) {
  const h = options.overrideAccess ? headers() : undefined

  return unstable_cache(
    async () => fetchCollection(options, h),
    [options.collection],
    {
      tags: [`collection_${options.collection}${options.id ? options.id : ""}`],
    }
  ) as () => Promise<GetCollectionReturnType<T, O>>
}

// export function getCollection<
//   T extends Collection,
//   O extends CollectionOptions & { collection: T }
// >(options: O) {
//   const h = options.overrideAccess ? headers() : undefined

//   return unstable_cache(
//     async () => fetchCollection(options, h),
//     [options.collection],
//     {
//       tags: [`collection_${options.collection}${options.id ? options.id : ""}`],
//     }
//   ) as () => Promise<GetCollectionReturnType<T, O>>
// }
