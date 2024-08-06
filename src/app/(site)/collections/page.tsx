import { headers } from "next/headers"
import config from "@payload-config"
import configPromise from "@payload-config"
import { getPayloadHMR } from "@payloadcms/next/utilities"

import { createPage } from "@/lib/create-page"
import { getCachedCollection } from "@/lib/get-cached-collection"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

const { Page } = createPage({
  loader: async () => {
    const collections = await getCachedCollection({
      collection: "collections",
      overrideAccess: false,
    })()
    return collections
  },
  component: ({ data }) => (
    <Section className="gutter">
      <Title>Collections</Title>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Section>
  ),
})

export default Page
