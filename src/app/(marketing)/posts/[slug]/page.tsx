import { redirect } from "next/navigation"
import config from "@payload-config"
import { getPayloadHMR } from "@payloadcms/next/utilities"

import { createPage } from "@/lib/create-page"
import { CollectionRelated } from "@/components/collection-related"
import { PostHero } from "@/components/hero/post-hero"
import RichText from "@/components/rich-text"

const { Page } = createPage({
  loader: async ({ params: { slug } }) => {
    const post = await queryPostBySlug({ slug })
    return post
  },
  component: ({ data: post }) => {
    if (!post) {
      redirect("/posts")
    }
    return (
      <article className="pt-16 pb-16">
        <PostHero post={post} />

        <div className="flex flex-col gap-4 pt-8">
          <div className="container lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
            <RichText
              className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
              content={post.content}
              enableGutter={false}
            />
          </div>

          <CollectionRelated
            className="mt-12"
            // @ts-ignore
            docs={post?.relatedPosts?.filter(
              (post) => typeof post !== "string"
            )}
          />
        </div>
      </article>
    )
  },
})
export default Page

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return []
  }
  const payload = await getPayloadHMR({ config })
  const posts = await payload.find({
    collection: "posts",
    draft: false,
    limit: 1000,
  })

  return posts.docs?.map(({ slug }) => slug)
}

const queryPostBySlug = async ({ slug }: { slug: string }) => {
  const payload = await getPayloadHMR({ config })

  const result = await payload.find({
    collection: "posts",
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}
