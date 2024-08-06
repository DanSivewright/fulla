import { createPage } from "@/lib/create-page"
import { getCachedCollection } from "@/lib/get-cached-collection"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

export const dynamic = "force-dynamic"
export const revalidate = 2400

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
