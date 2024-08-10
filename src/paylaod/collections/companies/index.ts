import { slugField } from "@/paylaod/fields/slug-field"
import type { CollectionConfig } from "payload"

export const Companies: CollectionConfig = {
  slug: "companies",
  admin: {
    useAsTitle: "name",
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
      type: "richText",
    },
    {
      name: "logo",
      label: "Logo",
      type: "relationship",
      relationTo: "media",
    },
    slugField("name"),
  ],
}
