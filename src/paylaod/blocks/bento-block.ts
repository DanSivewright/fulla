import type { Block } from 'payload'

export const BentoBlock: Block = {
  slug: 'bento-block',
  labels: {
    singular: 'Bento Block',
    plural: 'Bento Blocks',
  },
  imageURL: 'https://utfs.io/f/f623426f-eb56-4493-9e5f-f04a731e5b44-1jqo92.jpeg',
  fields: [
    {
      type: 'array',
      name: 'items',
      maxRows: 3,
      minRows: 3,
      fields: [
        {
          name: 'blocks',
          label: 'Blocks',
          type: 'relationship',
          relationTo: ['pages', 'posts', 'spaces'],
          unique: true,
        },
      ],
    },
  ],
}
