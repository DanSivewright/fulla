import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  fields: [
    {
      name: 'reason',
      label: 'Reason for booking',
      type: 'text',
      required: true,
    },
    {
      name: 'additionalInfo',
      label: 'Additional Information',
      type: 'text',
    },
    {
      name: 'startTime',
      label: 'Start Time',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endTime',
      label: 'End Time',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'space',
      label: 'Space',
      type: 'relationship',
      relationTo: 'spaces',
      required: true,
    },
    {
      name: 'tenants',
      label: 'Tenants',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      required: true,
    },
  ],
}
