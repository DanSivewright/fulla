"use client"

import React, { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Listing, Type } from "@prisma/client"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { toast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Icons } from "@/components/icons"
import { ListingFooter } from "@/components/listing-footer"
import { Spin } from "@/components/spin"

const formSchema = z.object({
  typeId: z.string(),
})
export const TypeForm = ({
  update,
  listing,
  types,
  id,
}: {
  update: (typeId: string) => Promise<void>
  listing: Listing
  types: Type[]
  id: string
}) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeId: listing.typeId ?? "",
    },
  })
  async function onSubmit({ typeId }: z.infer<typeof formSchema>) {
    router.prefetch(`/listings/create/${listing.id}/address`)
    if (typeId) {
      if (listing.typeId && typeId === listing.typeId) {
        router.push(`/listings/create/${listing.id}/address`)
      } else {
        startTransition(async () => await update(typeId))
      }
    } else {
      toast({
        title: "Validation Error",
        variant: "destructive",
        description: "Please select a type",
      })
    }
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
    >
      {types.map((type, i) => (
        <motion.label
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: Number(`0.${i + 1}`),
            duration: 0.95,
            ease: [0.165, 0.84, 0.44, 1],
          }}
          key={type.label}
        >
          <input
            type="radio"
            className="peer hidden"
            id={type.label}
            value={type.id}
            {...form.register("typeId")}
          />
          <div className="flex cursor-pointer gap-2 rounded-lg border bg-background p-6 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
            <div className="grow">
              <Paragraph>{type.label}</Paragraph>
              <Paragraph className="text-muted-foreground" size={"sm"}>
                {type.description}
              </Paragraph>
            </div>
            {/* @ts-ignore */}
            {Icons?.[type.icon]}
          </div>
        </motion.label>
      ))}
      <ListingFooter progress={22}>
        <Link
          href={`/listings/create/${id}/category`}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <Button type="submit">{pending ? <Spin /> : "Next"}</Button>
      </ListingFooter>
    </form>
  )
}
