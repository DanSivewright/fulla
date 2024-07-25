import { slugField } from '@/paylaod/fields/slug-field'
import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
    },
    slugField('name'),
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'relationship',
      relationTo: 'propertiesTypes',
      required: true,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
    },
    {
      name: 'managers',
      label: 'Managers',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
  ],
}
