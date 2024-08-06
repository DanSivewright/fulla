import { cookies } from "next/headers"
import { Config } from "@/payload-types"
import { PaginatedDocs, Where } from "payload"
import qs from "qs"

class HTTPError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.status = status
  }
}

type Collection = keyof Config["collections"]

export type CollectionOptions = {
  collection: Collection
  depth?: number
  currentDepth?: number
  limit?: number
  page?: number
  pagination?: boolean
  disableErrors?: boolean
  draft?: boolean
  overrideAccess?: boolean
  showHiddenFields?: boolean
  sort?: string
  where?: Where
}

type GetCollectionReturnType<T extends Collection> = PaginatedDocs<
  Config["collections"][T]
>

export const fetchCollection = async <T extends Collection>(
  options: CollectionOptions
) => {
  const { where, sort } = options ?? {}
  try {
    const query = qs.stringify(
      {
        ...(where ? { where } : {}),
        ...(sort ? { sort } : {}),
      },
      {
        addQueryPrefix: true,
      }
    )

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${options.collection}${query}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies().get("payload-token").value}`,
        },
        next: {
          revalidate: 2400,
          tags: [`collection_${options.collection}`],
        },
      }
    )
    const data = await response.json()
    return data as GetCollectionReturnType<T>
  } catch (error) {
    console.error("error::: ", error)
    if (error instanceof HTTPError) {
      console.error("HTTP Error:", error.status, error.message)
    } else {
      throw new Error("Failed to fetch data")
    }
  }
}

// console.log(
//   "token value::: ",
//   JSON.parse(
//     Buffer.from(
//       cookies().get("payload-token").value.split(".")[1],
//       "base64"
//     ).toString()
//   )
// )
