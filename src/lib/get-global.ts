import { unstable_cache } from "next/cache"
import configPromise from "@payload-config"
import { getPayloadHMR } from "@payloadcms/next/utilities"
import type { Config } from "src/payload-types"

type Global = keyof Config["globals"]

async function fetchGlobal(slug: Global, depth = 0) {
  const payload = await getPayloadHMR({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => fetchGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })
