import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { unstable_cache } from 'next/cache'
import { PayloadRequest, RequestContext, Where } from 'payload'

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

async function getCollection(options: CollectionOptions) {
  const payload = await getPayloadHMR({ config: configPromise })

  const collection = await payload.find(options)
  return collection
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedCollection = (options: CollectionOptions) =>
  unstable_cache(async () => getCollection(options), [options.collection], {
    tags: [`collection_${options.collection}`],
  })
