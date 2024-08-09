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
import { Paragraph } from "@/components/paragraph"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

type Props = {}
const Root: React.FC<Props> = async ({}) => {
  return (
    <>
      <BackgroundGradientAnimation containerClassName="mt-[-3.7rem] h-[480px] w-screen">
        <div
          style={{
            pointerEvents: "none",
          }}
          className="flex gutter absolute h-fit w-full gap-2 max-w-screen-lg text-center z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center flex-col"
        >
          <Title
            style={{ margin: 0 }}
            className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 pointer-events-none select-none font-semibold text-pretty"
          >
            Find your next space now
          </Title>
          <Paragraph className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 pointer-events-none select-none text-pretty">
            Transforming offices, empowering individuals – your workspace
            revolution.
          </Paragraph>
          <div
            style={{
              pointerEvents: "auto",
            }}
            className="w-full flex items-center mt-4"
          >
            <div className="flex items-center p-2 bg-white/40  backdrop-blur rounded-l-lg border-r border-white/35">
              <Select>
                <SelectTrigger
                  defaultValue="All"
                  variant="ghost"
                  sizing="xl"
                  className="gap-2 bg-transparent placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 text-white/90"
                >
                  <SelectValue placeholder="Filters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="nearMe">Near Me</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center grow p-2 bg-white/40 w-full  backdrop-blur rounded-r-lg">
              <Input
                className="placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 text-white/90"
                variant="ghost"
                placeholder="Search your next space..."
                sizing="xl"
              />
              <Button size="xl">Search</Button>
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>

      <div className="container relative z-0">
        <Title level={1} showAs={3}>
          Browse
        </Title>
        <Suspense>
          <Await
            promise={getCollection({
              collection: "companies",
              depth: 1,
            })()}
          >
            {(orgs) => (
              <pre>
                <code>{JSON.stringify(orgs, null, 2)}</code>
              </pre>
            )}
          </Await>
        </Suspense>
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
