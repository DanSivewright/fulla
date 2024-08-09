import { Suspense } from "react"
import { headers } from "next/headers"
import { Space } from "@/payload-types"

import { auth } from "@/lib/auth"
import { getCollection } from "@/lib/get-collection"
import { Await } from "@/components/await"
import { SpaceCard } from "@/components/cards/space-card"
import Empty from "@/components/empty"
import { Grid } from "@/components/grid"
import { SiteHero } from "@/components/hero/site-hero"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

type Props = {}
const Root: React.FC<Props> = async ({}) => {
  return (
    <>
      <SiteHero />
      <div className="container relative z-0">
        <Title level={1} showAs={3}>
          Browse
        </Title>
        <Section side="b">
          {/* <pre>
            <code>{JSON.stringify(me, null, 2)}</code>
          </pre> */}
          <Suspense fallback="loading...">
            <Await
              promise={getCollection({
                collection: "spaces",
                depth: 1,
                where: {
                  _status: {
                    equals: "published",
                  },
                },
              })()}
            >
              {(spaces) => (
                <>
                  {spaces.docs.length ? (
                    <Grid gap={"xs"} className="w-full">
                      {spaces?.docs?.map((space: Space) => (
                        <SpaceCard key={space.id} space={space} />
                      ))}
                    </Grid>
                  ) : (
                    <Empty />
                  )}
                </>
              )}
            </Await>
          </Suspense>
        </Section>
      </div>
    </>
  )
}
export default Root
