import { slugField } from "@/paylaod/fields/slug-field"
import { CollectionConfig } from "payload"

export const SpacesTypes: CollectionConfig = {
  slug: "spacesTypes",
  admin: {
    // hidden: true,
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    slugField("name", {
      admin: {
        hidden: true,
      },
      access: {
        read: () => true,
        update: ({ req }) => req.user?.role.includes("admin"),
      },
    }),
  ],
}
