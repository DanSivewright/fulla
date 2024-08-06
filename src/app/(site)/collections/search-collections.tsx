"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

import { useDebouncedState } from "@/hooks/use-debounced-state"
import { Input } from "@/components/ui/input"

type Props = {}

export const SearchCollections: React.FC<Props> = ({}) => {
  const sp = useSearchParams()
  const [value, setValue] = useDebouncedState(sp.get("q") || "", 1000)
  const [hasChanged, setHasChanged] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(sp.toString())
      params.set(name, value)

      return params.toString()
    },
    [sp]
  )

  useEffect(() => {
    if (hasChanged && value === "") {
      router.push(pathname)
    }

    if (hasChanged && value !== "") {
      router.push(pathname + "?" + createQueryString("q", value))
    }
  }, [value])

  return (
    <div className="flex items-center w-full gap-2 pl-6 rounded-full grow bg-accent sm:w-fit">
      <Search className="w-4 h-4 text-accent-foreground/50" />
      <Input
        defaultValue={value}
        onChange={(event) => {
          setValue(event.currentTarget.value)
          if (!hasChanged) {
            setHasChanged(true)
          }
        }}
        variant={"ghost"}
        placeholder="Find Collections"
        rounded={"full"}
      ></Input>
    </div>
  )
}
