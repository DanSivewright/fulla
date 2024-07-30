import { CollectionArchive } from '@/components/collection-archive'
import { CollectionPagination } from '@/components/collection-pagination'
import { PageRange } from '@/components/page-range'
import { createPage } from '@/lib/create-page'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Metadata } from 'next'

const { Page } = createPage({
  loader: async () => {
    const payload = await getPayloadHMR({ config })
    const posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
    })
    return posts
  },
  component: ({ data: posts }) => {
    return (
      <div className="pt-24 pb-24">
        <div className="container mb-16">
          <div className="prose dark:prose-invert max-w-none">
            <h1>Posts</h1>
          </div>
        </div>

        <div className="container mb-8">
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>

        <CollectionArchive posts={posts.docs} />

        <div className="container">
          {posts.totalPages > 1 && (
            <CollectionPagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </div>
    )
  },
})

export function generateMetadata(): Metadata {
  return {
    title: `Fulla Blog`,
  }
}

export default Page
