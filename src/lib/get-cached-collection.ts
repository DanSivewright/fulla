import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { unstable_cache } from 'next/cache'
import { PaginatedDocs, PayloadRequest, RequestContext, Where } from 'payload'

type Collection = keyof Config['collections']

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
  Config['collections'][T]
>

async function getCollection<T extends Collection>(
  options: CollectionOptions & { collection: T },
): Promise<GetCollectionReturnType<T>> {
  const payload = await getPayloadHMR({ config: configPromise })

  const collection = await payload.find(options)
  return collection as GetCollectionReturnType<T>
}

export function getCachedCollection<T extends Collection>(
  options: CollectionOptions & { collection: T },
) {
  return unstable_cache(
    async () => getCollection(options),
    [options.collection],
    { tags: [`collection_${options.collection}`] },
  ) as () => Promise<GetCollectionReturnType<T>>
}
