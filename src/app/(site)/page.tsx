import { Suspense } from "react"
import { Space } from "@/payload-types"

import { getCollection } from "@/lib/get-collection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Await } from "@/components/await"
import { BackgroundGradientAnimation } from "@/components/background-gradient-animation"
import { SpaceCard } from "@/components/cards/space-card"
import Empty from "@/components/empty"
import { Grid } from "@/components/grid"
import { SiteHero } from "@/components/hero/site-hero"
import { Paragraph } from "@/components/paragraph"
import { Section } from "@/components/section"
import { SpaceFilters } from "@/components/space-filters"
import { Title } from "@/components/title"

type Props = {}
const Root: React.FC<Props> = async ({}) => {
  return (
    <>
      <SiteHero />

      <div className="gutter relative z-0">
        <Title level={1} showAs={3}>
          Browse
        </Title>
        <Suspense>
          <Await
            promise={getCollection({
              collection: "spaces",
              depth: 2,
              where: {
                and: [
                  {
                    _status: {
                      equals: "published",
                    },
                  },
                  {
                    featured: {
                      equals: true,
                    },
                  },
                ],
              },
            })()}
          >
            {(spaces) => (
              <>
                <SpaceFilters spaces={spaces.docs} />
                {/* <pre>{JSON.stringify(spaces, null, 2)}</pre> */}
              </>
            )}
          </Await>
        </Suspense>

        <Section side="b">
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
