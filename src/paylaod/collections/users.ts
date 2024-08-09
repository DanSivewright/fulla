import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "company",
      label: "Company",
      type: "relationship",
      relationTo: "companies",
      saveToJWT: true,
    },
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      hasMany: true,
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Tenant",
          value: "tenant",
        },
        {
          label: "Manager",
          value: "manager",
        },
      ],
      defaultValue: ["tenant"],
    },
    // Email added by default
    // Add more fields as needed
  ],
}
