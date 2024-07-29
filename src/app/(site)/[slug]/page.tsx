import { Blocks } from '@/components/blocks'
import { Hero } from '@/components/hero'
import { createPage } from '@/lib/create-page'
import { generateMeta } from '@/lib/generate-meta'

import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { notFound } from 'next/navigation'

const { Page } = createPage({
  loader: async ({ params: { slug } }) => {
    const payload = await getPayloadHMR({ config })
    const result = await payload.find({
      collection: 'pages',
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    return result?.docs?.[0] || null
  },
  component: ({ params: { slug }, data }) => {
    if (!data) {
      notFound()
    }

    const { hero, layout } = data
    return (
      <article>
        <Hero {...hero} />
        <Blocks blocks={layout} />

        {/* <section className="container">
          <h1>Layout</h1>
          <pre>
            <code>{JSON.stringify(layout, null, 2)}</code>
          </pre>
        </section> */}
      </article>
    )
  },
})

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => slug)
}

export default Page
