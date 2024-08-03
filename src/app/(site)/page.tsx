import { Await } from '@/components/await'
import { SiteHero } from '@/components/hero/site-hero'
import { Title } from '@/components/title'
import { getCachedCollection } from '@/lib/get-cached-collection'
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
            {(spaces) => <pre>{JSON.stringify(spaces, null, 2)}</pre>}
          </Await>
        </Suspense>
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
