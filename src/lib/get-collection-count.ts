import { unstable_cache } from "next/cache"
import configPromise from "@payload-config"
import { getPayloadHMR } from "@payloadcms/next/utilities"
import { PaginatedDocs, PayloadRequest, RequestContext, Where } from "payload"
import qs from "qs"
import type { Config } from "src/payload-types"

type CollectionMap = Omit<
  Config["collections"],
  "payload-preferences" | "payload-migrations"
>
type Collection = keyof CollectionMap

export type CollectionOptions = {
  collection: Collection
  draft?: boolean
  where?: Where
  skipCache?: boolean
}

async function fetchCollectionCount<T extends Collection>(
  options: CollectionOptions & { collection: T }
): Promise<{
  totalDocs: number
}> {
  const payload = await getPayloadHMR({ config: configPromise })

  const collection = await payload.count({
    ...options,
  })
  return collection as {
    totalDocs: number
  }
}

export function getCollectionCount<T extends Collection>(
  options: CollectionOptions & { collection: T },
  revalidate?: number
) {
  const { where } = options ?? {}
  const query = qs.stringify({
    ...(where ? { where } : {}),
  })
  if (options?.skipCache) return async () => fetchCollectionCount(options)
  return unstable_cache(
    async () => fetchCollectionCount(options),
    [`collection_count_${options.collection}${query ? `_${query}` : ""}`],
    {
      ...(revalidate ? { revalidate } : {}),
      tags: [
        `collection_count_${options.collection}${query ? `_${query}` : ""}`,
      ],
    }
  )
}
