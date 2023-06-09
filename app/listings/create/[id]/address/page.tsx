import Link from "next/link"
import { redirect } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Listing } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { addressFormSchema } from "@/lib/validations/address"
import { toast } from "@/hooks/use-toast"
import { buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"
import { ListingFooter } from "@/components/listing-footer"
import { ListingHeader } from "@/components/listings-header"

import { AddressForm } from "./_addres-form"

// import { AddressForm } from "./_addres-form"

type ListingOffering = Pick<
  Listing,
  "province" | "street" | "unitNumber" | "suburb" | "city" | "postalCode"
>

async function getListing(id: string) {
  const res = await fetch(
    `http://localhost:8000/api/listings/${id}?draft=true`,
    {
      cache: "no-cache",
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function TypePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await getCurrentUser()

  const listing = await db.listing.findFirstOrThrow({
    where: {
      id: {
        equals: id,
      },
      authorId: {
        equals: user?.id,
      },
    },
  })
  async function update(payload: z.infer<typeof addressFormSchema>) {
    "use server"

    await db.listing.update({
      data: payload,
      where: {
        id,
      },
    })
    redirect(`listings/create/${id}/basics`)
  }

  const grad =
    "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start">
      <ListingHeader />
      <section className="mx-auto mt-28 w-full max-w-xl pb-32">
        <Title showAs={2} className="font-semibold">
          Confirm your address
        </Title>
        <Paragraph className="text-muted-foreground">
          Your address is only shared with guests after they’ve made a
          reservation.
        </Paragraph>
        <AddressForm update={update} listing={listing} />
        <Separator className="my-8" />
        <Title className="font-semibold" level={6}>
          Show your specific location
        </Title>
        <Paragraph size={"sm"} className="text-muted-foreground">
          {
            "Make it clear to guests where your place is located. We'll only share your address after they've made a reservation."
          }
          <u>Learn more</u>
        </Paragraph>
        <div
          className={cn([
            grad,
            "mt-8 aspect-video w-full rounded-lg opacity-30",
          ])}
        />
      </section>
    </div>
  )
}
