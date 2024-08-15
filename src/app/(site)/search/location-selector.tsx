"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Town } from "@/payload-types"
import { CommandList, Command as CommandPrimitive } from "cmdk"
import { MapIcon, X } from "lucide-react"
import { useQueryStates } from "nuqs"
import { set } from "zod"

import { searchPageParamsParsers } from "@/lib/search-params"
import { cn } from "@/lib/utils"
import { useElementSize } from "@/hooks/use-element-size"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type Props = {
  towns: Town[]
}
export const LocationSelector: React.FC<Props> = ({ towns }) => {
  const [open, setOpen] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [params, setParams] = useQueryStates(searchPageParamsParsers, {
    throttleMs: 1000,
    shallow: false,
  })
  const [selected, setSelected] = useState<Town[]>(
    towns.filter((option) => params?.town?.includes(option.id)) ?? []
  )

  const { ref, width } = useElementSize()
  const inputRef = useRef<HTMLInputElement>(null)

  const truthyParams = useMemo(() => {
    return Object.entries(params)
      .filter(([_, value]) => value)
      ?.map(([key, value]) => ({
        [key]: value,
      }))
  }, [params])

  const selectables: Town[] = towns.filter(
    (town) => !selected.some((s) => s.id === town.id)
  )

  useEffect(() => {
    if (!open && hasChanged) {
      if (selected.length) {
        setParams({ ...truthyParams, town: selected.map((s) => s.id) })
      } else {
        setParams({ ...truthyParams, town: null })
      }
    }
  }, [open])

  const handleUnselect = useCallback((t: Town) => {
    setSelected((prevSelected) => {
      const filteredTowns = prevSelected.filter((s) => s.id !== t.id)

      setParams(() => ({
        ...truthyParams,
        town: filteredTowns.length ? filteredTowns.map((x) => x.id) : null,
      }))

      return filteredTowns
    })
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev]
              newSelected.pop()
              return newSelected
            })
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur()
        }
      }
    },
    []
  )

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible relative w-1/3 rounded-full bg-transparent"
    >
      <div
        ref={ref}
        className={cn(
          "w-full text-left rounded-full pl-6 h-full flex items-center gap-4",
          {
            "border border-input/30 bg-accent/50": open,
          }
        )}
      >
        <MapIcon size={24} className="text-muted-foreground/60" />
        <div className="flex w-full flex-col">
          <div className="flex items-center gap-1">
            {selected.slice(0, 2).map((town) => {
              return (
                <Badge size="sm" key={town.id} variant="secondary">
                  {town.name}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(town)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={() => handleUnselect(town)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              )
            })}
            {selected.length > 2 ? (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Badge
                    className="cursor-pointer"
                    size="sm"
                    variant="secondary"
                  >
                    + {selected?.length - 2}
                    <button
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setSelected([])
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={() => {
                        setSelected([])
                        setParams({ ...truthyParams, town: null })
                      }}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent className="flex gap-2 flex-wrap">
                  {selected.slice(2).map((town) => (
                    <Badge
                      key={town.id}
                      className="cursor-pointer"
                      size="sm"
                      variant="secondary"
                    >
                      {town.name}
                      <button
                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUnselect(town)
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onClick={() => handleUnselect(town)}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  ))}
                </HoverCardContent>
              </HoverCard>
            ) : null}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={selected?.length ? "" : "Location"}
              style={{
                padding: 0,
                margin: 0,
              }}
              className="text-lg bg-transparent outline-none font-semibold placeholder:text-primary"
            />
          </div>
          <span className="text-muted-foreground/70 text-sm">
            Where are you going?
          </span>
        </div>
      </div>
      <div
        style={{
          width: width + "px",
        }}
        className="mx-auto relative"
      >
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute overflow-auto top-3 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="max-h-[30vh] overflow-auto">
                {selectables.map((town) => {
                  return (
                    <CommandItem
                      key={town.id}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={(value) => {
                        setInputValue("")
                        setSelected((prev) => [...prev, town])
                        setHasChanged(true)
                      }}
                      className={"cursor-pointer"}
                    >
                      {town.name}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
    // <Command
    //   onKeyDown={handleKeyDown}
    //   className="w-1/3 bg-transparent rounded-full"
    // >
    //   <Popover open={open} onOpenChange={setOpen}>
    //     <PopoverTrigger asChild>
    //       <button
    //         ref={ref}
    //         //   onClick={() => setOpen(true)}
    //         className={cn(
    //           "w-full rounded-full pl-6 h-full flex items-center gap-4",
    //           {
    //             "border border-input/30 bg-accent/50": open,
    //           }
    //         )}
    //       >
    //         <MapIcon size={24} className="text-muted-foreground/60" />
    //         <div className="text-left flex w-full flex-col">
    //           <CommandPrimitive.Input
    //             ref={inputRef}
    //             value={inputValue}
    //             onValueChange={setInputValue}
    //             onBlur={() => setOpen(false)}
    //             onFocus={() => setOpen(true)}
    //             placeholder="Search framework..."
    //           />
    //           <span className="text-muted-foreground/70 text-sm">
    //             Where are you going?
    //           </span>
    //         </div>
    //       </button>
    //     </PopoverTrigger>

    //     <div
    //       style={{
    //         width: width + "px",
    //       }}
    //       className="mt-3 p-0 max-h-[30vh] overflow-auto"
    //     >
    //       <CommandList>
    //         <CommandGroup>
    //           {towns.map((town) => {
    //             return (
    //               <CommandItem key={town.id} value={town.id}>
    //                 <span>{town.name}</span>
    //               </CommandItem>
    //             )
    //           })}
    //         </CommandGroup>
    //       </CommandList>
    //     </div>
    //   </Popover>
    // </Command>
  )
}
