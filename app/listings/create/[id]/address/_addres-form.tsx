"use client"

import React, { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Listing } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { compareObjects } from "@/lib/compareObjects"
import { addressFormSchema as formSchema } from "@/lib/validations/address"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ListingFooter } from "@/components/listing-footer"
import { Spin } from "@/components/spin"

const provinces: string[] = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
]

export const AddressForm = ({
  update,
  listing,
}: {
  update: (payload: z.infer<typeof formSchema>) => Promise<void>
  listing: Listing
}) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: listing.city ?? "",
      postalCode: listing.postalCode ?? "",
      suburb: listing.suburb ?? "",
      unitNumber: listing.unitNumber ?? "",
      street: listing.street ?? "",
      province: listing.province ?? "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    router.prefetch(`/listings/create/${listing.id}/basics`)
    if (
      listing.city === values.city &&
      listing.postalCode === values.postalCode &&
      listing.suburb === values.suburb &&
      listing.unitNumber === values.unitNumber &&
      listing.street === values.street &&
      listing.province === values.province
    ) {
      router.push(`/listings/create/${listing.id}/basics`)
    } else {
      startTransition(async () => await update(values))
    }
    // compareObjects(listing, values)
    //   ?
    //   :
  }

  return (
    <Form {...form}>
      <form
        className="mt-8 flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province/ Region</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger sizing={"xl"}>
                    <SelectValue placeholder="Province" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {provinces.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    sizing={"xl"}
                    className="rounded-b-none"
                    placeholder="Street Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unitNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    sizing={"xl"}
                    className="rounded-none border-t-0"
                    placeholder="Apt, suite, bldg, etc. (if applicable)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="suburb"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    sizing={"xl"}
                    className="rounded-none border-t-0"
                    placeholder="Suburb (if applicable)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    sizing={"xl"}
                    className="rounded-none border-t-0"
                    placeholder="City/village"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    sizing={"xl"}
                    className="rounded-t-none border-t-0"
                    placeholder="Postal Code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <ListingFooter progress={22}>
          <Link
            href={`/listings/create/${listing.id}/type`}
            className={buttonVariants({ variant: "link" })}
          >
            Back
          </Link>
          <Button
            disabled={
              listing?.province &&
              listing?.street &&
              listing?.city &&
              listing?.postalCode
                ? false
                : !form.formState.isDirty || !form.formState.isValid
                ? true
                : false
            }
            type="submit"
          >
            {pending ? <Spin /> : "Next"}
          </Button>
        </ListingFooter>
      </form>
    </Form>
  )
}
