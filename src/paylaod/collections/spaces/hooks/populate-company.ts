import { Company } from "@/payload-types"
import type { CollectionBeforeChangeHook } from "payload"

export const populateCompany: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation === "create" || operation === "update") {
    if (req.data?.company) return data

    if (req.user?.role?.includes("admin")) {
      const property = await req.payload.findByID({
        id: req.data.property as string,
        collection: "properties",
        depth: 0,
      })
      return {
        ...data,
        company: property?.company,
      }
    }

    return {
      ...data,
      company: (req.user?.company as Company)?.id,
    }
  }

  return data
}
