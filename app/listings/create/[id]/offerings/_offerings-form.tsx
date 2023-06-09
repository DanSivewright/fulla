"use client"

import React, { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Amenity, Listing, Offering, Prisma } from "@prisma/client"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { compareObjects } from "@/lib/compareObjects"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Icons } from "@/components/icons"
import { ListingFooter } from "@/components/listing-footer"
import { Spin } from "@/components/spin"

const formSchema = z.object({
  offerings: z.array(z.string()).nullable(),
  amenities: z.array(z.string()).nullable(),
})

// type ExtendedListing = Listing & { offerings: Offering[]; amenities: Amenity[] }

export const OfferingsForm = ({
  update,
  listing,
  offerings,
  amenities,
}: {
  update: (payload: {
    offerings: Offering["id"][] | null
    amenities: Amenity["id"][] | null
  }) => Promise<void>
  listing: Prisma.ListingGetPayload<{
    include: { offerings: true; amenities: true }
  }>
  offerings: Offering[]
  amenities: Amenity[]
}) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      offerings: listing.offerings.map((x) => x.id) || null,
      amenities: listing.amenities.map((x) => x.id) || null,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    router.prefetch(`/listings/create/${listing.id}/media`)
    if (
      compareObjects(
        {
          offerings: listing.offerings.flatMap((x) => x.id),
          amenities: listing.amenities.flatMap((x) => x.id),
        },
        data
      )
    ) {
      router.push(`/listings/create/${listing.id}/media`)
    } else {
      startTransition(async () => await update(data))
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mb-10 mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {offerings.map(({ id, label }, i) => (
          <motion.label
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: Number(`0.${i + 1}`),
              duration: 0.95,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            key={id}
          >
            <input
              {...form.register("offerings")}
              value={id}
              type="checkbox"
              className="peer hidden"
              id={id}
            />
            <div className="flex cursor-pointer flex-col gap-2 rounded-lg border bg-background p-4 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
              {/* @ts-ignore */}
              {Icons?.[label]}
              <Paragraph size={"sm"}>{label}</Paragraph>
            </div>
          </motion.label>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.95,
          ease: [0.165, 0.84, 0.44, 1],
        }}
      >
        <Title className="font-semibold" level={6}>
          Do you have any standout amenities?
        </Title>
      </motion.div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {amenities.map(({ id, label }, i) => (
          <motion.label
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: Number(`1.${i + 1}`),
              duration: 0.95,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            key={id}
          >
            <input
              {...form.register("amenities")}
              value={id}
              type="checkbox"
              className="peer hidden"
              id={id}
            />
            <div className="flex cursor-pointer flex-col gap-2 rounded-lg border bg-background p-4 transition-all hover:border-zinc-600 hover:shadow peer-checked:border-blue-600 peer-checked:text-blue-600">
              {/* @ts-ignore */}
              {Icons?.[label]}
              <Paragraph size={"sm"}>{label}</Paragraph>
            </div>
          </motion.label>
        ))}
      </div>
      <ListingFooter progress={22}>
        <Link
          href={`/listings/create/${listing.id}/basics`}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <Button type="submit">{pending ? <Spin /> : "Next"}</Button>
      </ListingFooter>
    </form>
  )
}
