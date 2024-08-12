"use client"

import { useMemo, useState } from "react"
import { SpacesType } from "@/payload-types"
import { useQueryStates } from "nuqs"

import { searchPageParamsParsers } from "@/lib/search-params"
import { cn } from "@/lib/utils"

type Props = {
  spacesTypes: SpacesType[]
}

const customOrder = ["Space", "Apartment", "House", "Commercial Property"]

export const TypeFilters: React.FC<Props> = ({ spacesTypes }) => {
  const [{ type }, setParams] = useQueryStates(searchPageParamsParsers, {
    throttleMs: 1000,
    shallow: false,
  })

  function groupByParent(data) {
    const map = new Map()

    data.forEach((item) => {
      map.set(item.id, { ...item, children: [] })
    })

    data.forEach((item) => {
      const { parent, id } = item
      if (parent && map.has(parent)) {
        map.get(parent).children.push(map.get(id).id)
      }
    })

    const result = []
    map.forEach((value) => {
      if (!data.some((item) => item.id === value.parent)) {
        result.push(value)
      }
    })

    return result
  }

  const groupedTypes = useMemo(() => {
    return groupByParent(spacesTypes)
  }, [spacesTypes])

  return (
    <div className="w-full px-10 flex items-center gap-10">
      <button
        onClick={() => {
          setParams({ type: null })
        }}
        className={cn(
          "flex transition-colors cursor-pointer items-center gap-3",
          {
            "text-muted-foreground/70 hover:text-primary": type,
            "text-primary": !type,
          }
        )}
      >
        {!type && <span className="w-2 h-2 bg-foreground rounded-full"></span>}
        <span className="mt-0.5 font-semibold">All</span>
      </button>
      {groupedTypes
        ?.sort(
          (a, b) => customOrder.indexOf(a.name) - customOrder.indexOf(b.name)
        )
        ?.map(({ id, name, children }) => (
          <button
            key={id}
            onClick={() => {
              if (children && children?.length) {
                setParams({ type: children })
              }
            }}
            className={cn(
              "flex transition-colors cursor-pointer items-center gap-3",
              {
                "text-primary": type?.some((t) => children?.includes(t)),
                "text-muted-foreground/70 hover:text-primary": !type?.some(
                  (t) => children?.includes(t)
                ),
              }
            )}
          >
            {type?.some((t) => children?.includes(t)) && (
              <span className="w-2 h-2 bg-foreground rounded-full"></span>
            )}
            <span className="mt-0.5 font-semibold">{name}</span>
          </button>
        ))}
    </div>
  )
}
