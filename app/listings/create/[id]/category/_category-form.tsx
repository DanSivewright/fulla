"use client"

import React, { useEffect, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import type { Category, Listing } from "@/types/payload-types"
import { toast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Icons } from "@/components/icons"
import { ListingFooter } from "@/components/listing-footer"
import { Spin } from "@/components/spin"

const formSchema = z.object({
  categoryId: z.string(),
})

export const CategoryForm = ({
  update,
  listing,
  categories,
}: {
  update: (categoryId: string) => Promise<void>
  listing: Listing & { category: Category }
  categories: Category[]
}) => {
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: listing?.category?.id || "",
    },
  })
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = form

  async function onSubmit({ categoryId }: z.infer<typeof formSchema>) {
    if (categoryId) {
      categoryId === listing.category?.id
        ? router.push(`/listings/create/${listing.id}/type`)
        : startTransition(async () => await update(categoryId))
    } else {
      toast({ description: "Please select a category" })
    }
  }

  return (
    <form
      className="grid grid-cols-2 gap-4 lg:grid-cols-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {categories.map(({ label, id }) => (
        <div key={label}>
          <input
            type="radio"
            className="peer hidden"
            id={label}
            value={id}
            {...register("categoryId")}
          />
          <label
            id="grid-item"
            className="flex cursor-pointer flex-col gap-2 rounded-lg border bg-background p-4 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600"
            htmlFor={label}
          >
            {/* @ts-ignore */}
            {Icons?.[label]}
            <Paragraph size={"sm"}>{label}</Paragraph>
          </label>
        </div>
      ))}
      <ListingFooter progress={11}>
        <Link
          href={"/listings/create"}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <Button
          disabled={
            listing.category ? false : !isDirty || !isValid ? true : false
          }
          type="submit"
        >
          {pending ? <Spin /> : "Next"}
        </Button>
      </ListingFooter>
    </form>
  )
}