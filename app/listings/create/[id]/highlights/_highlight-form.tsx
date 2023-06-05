"use client"

import React, { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trees } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Highlight, Listing } from "@/types/payload-types"
import { compareObjects } from "@/lib/compareObjects"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Icons } from "@/components/icons"
import { ListingFooter } from "@/components/listing-footer"
import { Spin } from "@/components/spin"

type Props = {
  listing: Listing & { highlights: Highlight[] }
  update: (payload: { highlight: Highlight["id"][] }) => Promise<void>
  highlights: Highlight[]
}

const formSchema = z.object({
  highlights: z.array(z.string()),
})

export const HighlightForm: React.FC<Props> = ({
  listing,
  update,
  highlights,
}) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      highlights: listing.highlights?.map((x) => x?.id) || null,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (
      compareObjects({ highlights: listing.highlights.map((x) => x.id) }, data)
    ) {
      router.push(`/listings/create/${listing.id}/description`)
    } else {
      startTransition(async () => await update(data))
    }
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mt-8 flex flex-wrap gap-3">
        {highlights.map(({ id, label, icon }) => (
          <label id={id}>
            <input
              {...form.register("highlights")}
              value={id}
              type="checkbox"
              className="peer hidden"
              id={id}
            />
            <li className="flex cursor-pointer gap-3 rounded-full border bg-background px-4 py-3 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
              {/* @ts-ignore */}
              {Icons?.[icon]}
              <Paragraph size={"sm"}>{label}</Paragraph>
            </li>
          </label>
        ))}
      </div>
      <ListingFooter progress={22}>
        <Link
          href={`/listings/create/${listing.id}/title`}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <Button type="submit">{pending ? <Spin /> : "Next"}</Button>
      </ListingFooter>
    </form>
  )
}