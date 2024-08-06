import { anyone } from "@/paylaod/access/anyone"
import { CollectionConfig } from "payload"

export const Collections: CollectionConfig = {
  slug: "collections",
  access: {
    read: ({ req: { user } }) => {
      if (user) {
        // // If user has role of 'admin'
        // if (user.role?.includes("admin")) {
        //   return true
        // }

        // If any other type of user, only provide access to themselves
        return {
          user: {
            equals: user.id,
          },
        }
      }

      // Reject everyone else
      return false
    },
    create: anyone,
    update: anyone,
    delete: anyone,
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
    },
    {
      name: "spaces",
      label: "Spaces",
      type: "relationship",
      relationTo: "spaces",
      hasMany: true,
    },
    {
      name: "user",
      label: "User",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
  ],
}
