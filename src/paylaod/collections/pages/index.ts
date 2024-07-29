import type { CollectionConfig } from 'payload'

import { Archive } from '../../blocks/archive-block'
import { CallToAction } from '../../blocks/call-to-action'
import { Content } from '../../blocks/content'
import { MediaBlock } from '../../blocks/media-block'
import { hero } from '../../fields/hero'

import { revalidatePage } from './hooks/revalidate-page'
import { FormBlock } from '@/paylaod/blocks/form'
import { slugField } from '@/paylaod/fields/slug-field'
import { populatePublishedAt } from '@/paylaod/utils/populate-published-at'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,
              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 5,
  },
}
