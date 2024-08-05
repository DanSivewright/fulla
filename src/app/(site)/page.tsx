import { Await } from '@/components/await'
import { SpaceCard } from '@/components/cards/space-card'
import Empty from '@/components/empty'
import { Grid } from '@/components/grid'
import { SiteHero } from '@/components/hero/site-hero'
import { Section } from '@/components/section'
import { Title } from '@/components/title'
import { getCachedCollection } from '@/lib/get-cached-collection'
import { Space } from '@/payload-types'
import { Suspense } from 'react'

type Props = {}
const Root: React.FC<Props> = async ({}) => {
  return (
    <>
      <SiteHero />
      <div className="container relative z-0">
        <Title className="font-mono font-semibold" level={1} showAs={2}>
          Browse
        </Title>
        <Section side="b">
          <Suspense fallback="loading...">
            <Await
              promise={getCachedCollection({
                collection: 'spaces',
                depth: 1,
                where: {
                  public: {
                    equals: true,
                  },
                },
              })()}
            >
              {(spaces) => (
                <>
                  {spaces.docs.length ? (
                    <Grid gap={'xs'} className="w-full">
                      {spaces?.docs?.map((space) => (
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
        {/* <ul className="flex flex-col gap-2">
          {Array(100)
            .fill(null)
            .map((_, i) => (
              <li className="w-full p-4 bg-accent rounded-lg" key={i}>
                {i + 1}
              </li>
            ))}
        </ul> */}
      </div>
    </>
  )
}
export default Root
