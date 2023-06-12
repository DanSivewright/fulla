import Link from "next/link"
import { redirect } from "next/navigation"
import { Home } from "lucide-react"

import type { Listing } from "@/types/payload-types"
import { Button } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { ListingHeader } from "@/components/listings-header"

import { CreateInitialListing } from "./_create-initial-listing"

const getListings = async (): Promise<{ docs: Listing[] }> => {
  const res = await fetch(`http://localhost:8000/api/listings?draft=true`, {
    cache: "no-cache",
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
export default async function ListingCreate() {
  const [{ docs: listings }] = await Promise.all([await getListings()])

  async function createListing() {
    "use server"
    const req = await fetch("http://localhost:8000/api/listings?draft=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: "6475ddb9964ffdb29c6d7d35",
        _status: "draft",
      }),
    })
    const res = await req.json()
    redirect(`/listings/create/${res.doc.id}/category`)
  }

  return (
    <div className="relative">
      <ListingHeader />
      <section className="mx-auto mt-48 w-full max-w-lg">
        <Title className="font-semibold">Welcome back, Dan</Title>
        <CreateInitialListing createListing={createListing} />
        {listings?.length ? (
          <>
            <Title
              level={5}
              style={{ marginTop: "3.5rem" }}
              className="font-semibold"
            >
              Finish your listing
            </Title>
            <ul className="flex flex-col gap-6">
              {listings.map((listing: Listing) => (
                <li>
                  <Link
                    href={`/listings/create/${listing?.id}/category`}
                    className="flex items-center gap-6 rounded-lg border p-6 hover:border-zinc-600 hover:bg-stone-100 dark:hover:bg-gray-800"
                  >
                    <Button variant={"secondary"}>
                      <Home size={16} />
                    </Button>
                    <Paragraph className="font-medium">
                      {listing.title ?? "Untitled Listing"}
                    </Paragraph>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>
    </div>
  )
}
