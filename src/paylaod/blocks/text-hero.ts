import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { linkGroup } from '../fields/link-group'

export const TextHero: Block = {
  slug: 'text-hero',
  fields: [
    {
      name: 'visible',
      label: 'Visible',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
