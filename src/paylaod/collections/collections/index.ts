import { CollectionConfig } from 'payload'
export const Collections: CollectionConfig = {
  slug: 'collections',
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
    {
      name: 'spaces',
      label: 'Spaces',
      type: 'relationship',
      relationTo: 'spaces',
      hasMany: true,
    },
    {
      name: 'user',
      label: 'User',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
