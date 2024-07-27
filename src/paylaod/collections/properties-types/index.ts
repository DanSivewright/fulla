import { slugField } from '@/paylaod/fields/slug-field'
import type { CollectionConfig } from 'payload'

export const PropertiesTypes: CollectionConfig = {
  slug: 'propertiesTypes',
  labels: {
    singular: 'Property Type',
    plural: 'Property Types',
  },
  admin: {
    hidden: true,
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
      type: 'text',
    },
    slugField('name'),
  ],
}
