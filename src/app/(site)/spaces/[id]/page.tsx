import { redirect } from "next/navigation"

import { createPage } from "@/lib/create-page"
import { getCollectionById } from "@/lib/get-collection"
import { Section } from "@/components/section"

const { Page } = createPage({
  loader: async ({ params: { id } }) => {
    const space = await getCollectionById({
      collection: "spaces",
      id,
      depth: 3,
      where: {
        public: {
          equals: true,
        },
      },
    })()
    return space
  },
  component: ({ params: { id }, data }) => {
    if (!data) {
      redirect("/")
    }
    return (
      <Section className="gutter">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Section>
    )
  },
})

export default Page
