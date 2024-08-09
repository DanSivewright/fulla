import { Archive } from "@/paylaod/blocks/archive-block"
import { BentoBlock } from "@/paylaod/blocks/bento-block"
import { CallToAction } from "@/paylaod/blocks/call-to-action"
import { Carousel } from "@/paylaod/blocks/carousel"
import { Content } from "@/paylaod/blocks/content"
import { FormBlock } from "@/paylaod/blocks/form"
import { MediaBlock } from "@/paylaod/blocks/media-block"
import { TextHero } from "@/paylaod/blocks/text-hero"
import { slugField } from "@/paylaod/fields/slug-field"
import { populatePublishedAt } from "@/paylaod/utils/populate-published-at"
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields"
import type { CollectionConfig } from "payload"

import { hero } from "../../fields/hero"
import { revalidatePage } from "./hooks/revalidate-page"

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    // livePreview: {
    //   url: ({ data }) => {
    //     const path = generatePreviewPath({
    //       path: `/${typeof data?.slug === 'string' ? data.slug : ''}`,
    //     })
    //     return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
    //   },
    // },
    // preview: (doc) =>
    //   generatePreviewPath({ path: `/${typeof doc?.slug === 'string' ? doc.slug : ''}` }),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [hero],
          label: "Hero",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [
                CallToAction,
                Carousel,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                BentoBlock,
                TextHero,
              ],
              required: true,
            },
          ],
          label: "Content",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,
              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    slugField("title"),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval:
          process.env.NODE_ENV === "development"
            ? 1000 * 60 * 5
            : 1000 * 60 * 0.5, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 5,
  },
}
