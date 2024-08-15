import { Archive } from "@/paylaod/blocks/archive-block"
import { BentoBlock } from "@/paylaod/blocks/bento-block"
import { CallToAction } from "@/paylaod/blocks/call-to-action"
import { Carousel } from "@/paylaod/blocks/carousel"
import { Content } from "@/paylaod/blocks/content"
import { FormBlock } from "@/paylaod/blocks/form"
import { MediaBlock } from "@/paylaod/blocks/media-block"
import { TextHero } from "@/paylaod/blocks/text-hero"
import { hero } from "@/paylaod/fields/hero"
import { slugField } from "@/paylaod/fields/slug-field"
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields"
import { CollectionConfig } from "payload"

import { populateCompany } from "./hooks/populate-company"
import { revalidateSpaces } from "./hooks/revalidate-spaces"

export const Spaces: CollectionConfig = {
  slug: "spaces",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "updatedAt"],
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      index: true,
    },
    {
      name: "town",
      label: "Town",
      type: "relationship",
      relationTo: "towns",
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            hero,
            {
              name: "description",
              label: "Description",
              type: "richText",
            },
            {
              name: "featureImages",
              label: "Feature Images",
              type: "relationship",
              relationTo: "media",
              hasMany: true,
            },
            {
              index: true,
              name: "type",
              type: "relationship",
              relationTo: "spacesTypes",
            },
            {
              name: "floor",
              label: "Floor",
              admin: {
                description:
                  'The floor number of the space. Use "1" for ground floor.',
              },
              type: "text",
              index: true,
            },
            {
              name: "capacity",
              label: "Capacity",
              type: "text",
              index: true,
            },
          ],
          label: "Display",
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
      index: true,
      name: "categories",
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      relationTo: "categories",
    },
    slugField("name", {
      admin: {
        hidden: true,
      },
    }),
    {
      index: true,
      name: "property",
      label: "Property",
      type: "relationship",
      relationTo: "properties",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "manager",
      label: "Manager",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
      },
    },
    {
      index: true,
      name: "company",
      label: "Company",
      type: "relationship",
      relationTo: "companies",

      access: {
        read: ({ req: { user } }) => {
          if (user?.role?.includes("admin")) return true
          return false
        },
      },
      admin: {
        position: "sidebar",
        hidden: true,
      },
    },
    {
      name: "featured",
      label: "Featured",
      type: "checkbox",
      defaultValue: false,
      access: {
        read: ({ req: { user } }) => {
          if (user?.role?.includes("admin")) return true
          return false
        },
      },
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSpaces],
    beforeChange: [populateCompany],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1000 * 60, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 5,
  },
}
