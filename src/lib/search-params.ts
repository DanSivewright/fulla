import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server"

export const searchPageParamsParsers = {
  company: parseAsString.withDefault(""),
  name: parseAsString.withDefault(""),
  property: parseAsString.withDefault(""),
  floorG: parseAsInteger.withDefault(0),
  floorL: parseAsInteger.withDefault(0),
  capacityG: parseAsInteger.withDefault(0),
  capacityL: parseAsInteger.withDefault(0),
  type: parseAsArrayOf(parseAsString).withDefault(null),
  categories: parseAsArrayOf(parseAsString),
  price: parseAsArrayOf(parseAsInteger),
  town: parseAsArrayOf(parseAsString),
}
export const searchPageParamsCache = createSearchParamsCache(
  searchPageParamsParsers
)
