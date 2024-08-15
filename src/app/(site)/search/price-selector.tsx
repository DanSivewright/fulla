"use client"

import { useEffect, useMemo, useState } from "react"
import { CurrencyIcon } from "lucide-react"
import { useQueryStates } from "nuqs"

import { searchPageParamsParsers } from "@/lib/search-params"
import { cn } from "@/lib/utils"
import { useElementSize } from "@/hooks/use-element-size"
import { Button } from "@/components/ui/button"
import { Input, inputVariants } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"

type Props = {}
export const PriceSelector: React.FC<Props> = ({}) => {
  const [open, setOpen] = useState(false)
  const { ref, width } = useElementSize()
  const [hasChanged, setHasChanged] = useState(false)
  const [range, setRange] = useState([500, 2000])
  const [params, setParams] = useQueryStates(searchPageParamsParsers, {
    throttleMs: 1000,
    shallow: false,
  })

  const truthyParams = useMemo(() => {
    return Object.entries(params)
      .filter(([_, value]) => value)
      ?.map(([key, value]) => ({
        [key]: value,
      }))
  }, [params])

  useEffect(() => {
    if (!open && hasChanged) {
      setParams({ ...truthyParams, price: range })
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          ref={ref}
          className={cn(
            "w-1/3 text-left rounded-full pl-6 h-full flex items-center gap-4",
            {
              "border border-input/30 bg-accent/50": open,
            }
          )}
        >
          <CurrencyIcon size={24} className="text-muted-foreground/60" />
          <div className="flex w-full flex-col">
            <span className="text-lg font-semibold">
              R{new Intl.NumberFormat().format(range[0] ?? 0)} ~ R
              {new Intl.NumberFormat().format(range[1] ?? 0)}
            </span>
            <span className="text-muted-foreground/70 text-sm">
              Choose price range
            </span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        style={{
          width: width + "px",
        }}
        className="mt-3 flex flex-col gap-3"
      >
        <div className="flex items-center gap-4 justify-between">
          <div className="w-1/2 flex flex-col gap-2">
            <Label size="sm" className="text-muted-foreground/70">
              Min Price
            </Label>
            <Input
              value={range[0]}
              onChange={(e) => {
                setHasChanged(true)
                setRange([parseInt(e.target.value), range[1]])
              }}
              className="grow"
              type="number"
              placeholder="Min Price"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <Label size="sm" className="text-muted-foreground/70">
              Max Price
            </Label>
            <Input
              value={range[1]}
              onChange={(e) => {
                setHasChanged(true)
                setRange([range[0], parseInt(e.target.value)])
              }}
              className="grow"
              type="number"
              placeholder="Max Price"
            />
          </div>
        </div>

        <Button
          className="w-full bg-destructive/30"
          size="sm"
          variant="destructive"
          onClick={() => {
            setHasChanged(false)
            setRange([500, 2000])
            setOpen(false)
            setParams({ ...truthyParams, price: null })
          }}
        >
          Clear
        </Button>
      </PopoverContent>
    </Popover>
  )
}
