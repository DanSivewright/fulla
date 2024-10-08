"use client"

import * as React from "react"
import { Town } from "@/payload-types"
import { Command as CommandPrimitive } from "cmdk"
import { MapIcon, X } from "lucide-react"
import { useQueryStates } from "nuqs"

import { searchPageParamsParsers } from "@/lib/search-params"
import { cn } from "@/lib/utils"
import { useElementSize } from "@/hooks/use-element-size"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type Options = Town

export function MultiSelect({
  options,
  className,
  placeholder = "Select options...",
}: {
  options: Options[]
  className?: string
  placeholder?: string
}) {
  const [params, setParams] = useQueryStates(searchPageParamsParsers, {
    throttleMs: 1000,
    shallow: false,
  })
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Options[]>(
    options.filter((option) => params?.town?.includes(option.id)) ?? []
  )
  const [inputValue, setInputValue] = React.useState("")
  const [hasChanged, setHasChanged] = React.useState(false)
  const { ref, width } = useElementSize()

  const truthyParams = React.useMemo(() => {
    return Object.entries(params)
      .filter(([_, value]) => value)
      ?.map(([key, value]) => ({
        [key]: value,
      }))
  }, [params])

  const handleUnselect = React.useCallback((framework: Options) => {
    const filtered = selected.filter((s) => s.id !== framework.id)
    setSelected(filtered)
    const mapFilteredWithIdsOnly = filtered.map((s) => s.id)
    setParams({
      ...truthyParams,
      town: mapFilteredWithIdsOnly?.length ? mapFilteredWithIdsOnly : null,
    })
  }, [])

  const handleKeyDown = React.useCallback(
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

  const selectables = options.filter(
    (framework) => !selected.includes(framework)
  )

  React.useEffect(() => {
    if (!open && hasChanged) {
      if (selected.length) {
        setParams({ ...truthyParams, town: selected.map((s) => s.id) })
      } else {
        setParams({ ...truthyParams, town: null })
      }
    }
  }, [open])

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
                      onClick={() => setSelected([])}
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
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full max-h-[40vh] overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.id}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={(value) => {
                        setInputValue("")
                        setSelected((prev) => [...prev, framework])
                        setHasChanged(true)
                      }}
                      className={"cursor-pointer"}
                    >
                      {framework.name}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
      {/* <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full max-h-[40vh] overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={(value) => {
                        setInputValue("")
                        setSelected((prev) => [...prev, framework])
                        setHasChanged(true)
                      }}
                      className={"cursor-pointer"}
                    >
                      {framework.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div> */}
    </Command>
  )
}
