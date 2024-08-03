import { SiteHero } from '@/components/hero/site-hero'
import { Title } from '@/components/title'
import { redirect } from 'next/navigation'

type Props = {}
const Root: React.FC<Props> = ({}) => {
  return (
    <>
      <SiteHero />
      <div className="container relative z-0">
        <Title className="font-mono font-semibold" level={1} showAs={2}>
          Browse
        </Title>
        <ul className="flex flex-col gap-2">
          {Array(100)
            .fill(null)
            .map((_, i) => (
              <li className="w-full p-4 bg-accent rounded-lg" key={i}>
                {i + 1}
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}
export default Root
