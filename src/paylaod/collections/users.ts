import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'company',
      label: 'Company',
      type: 'relationship',
      relationTo: 'companies',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Tenant',
          value: 'tenant',
        },
        {
          label: 'Manager',
          value: 'manager',
        },
      ],
      defaultValue: 'manager',
    },
    // Email added by default
    // Add more fields as needed
  ],
}
