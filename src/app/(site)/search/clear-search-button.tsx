"use client"

import { SearchIcon } from "lucide-react"
import { useQueryStates } from "nuqs"

import { searchPageParamsParsers } from "@/lib/search-params"
import { Button } from "@/components/ui/button"

type Props = {}
export const ClearSearchButton: React.FC<Props> = ({}) => {
  const [params, setParams] = useQueryStates(searchPageParamsParsers, {
    throttleMs: 1000,
    shallow: false,
  })
  return (
    <Button
      onClick={() => {
        setParams(
          Object.fromEntries(Object.entries(params).map(([k, _]) => [k, null]))
        )
      }}
      className="h-full aspect-square rounded-full"
    >
      <SearchIcon size={24} className="text-background" />
    </Button>
  )
}
