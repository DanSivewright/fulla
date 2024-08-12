import { slugField } from "@/paylaod/fields/slug-field"
import { CollectionConfig } from "payload"

export const Towns: CollectionConfig = {
  slug: "towns",
  admin: {
    hidden: true,
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
      name: "province",
      label: "Province",
      type: "text",
    },
    slugField("name", {
      admin: {
        hidden: true,
      },
      access: {
        read: () => true,
        update: ({ req }) => req.user?.role.includes("admin"),
      },
      name: "normalizedName",
      label: "Normalized Name",
    }),
    slugField("province", {
      admin: {
        hidden: true,
      },
      access: {
        read: () => true,
        update: ({ req }) => req.user?.role.includes("admin"),
      },
      name: "normalizedProvinceName",
      label: "Normalized Province Name",
    }),
  ],
}
