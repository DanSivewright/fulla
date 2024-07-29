import { gutterVariants } from '@/components/gutter'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'
import { Title } from '@/components/title'
import { createPage } from '@/lib/create-page'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { HeroText } from './components/hero-text'
import { Double } from '@/components/double'

const MarketingHeader = dynamic(() => import('@/components/navigation/marketing-header'), {
  // ssr: false,
  loading: () => <></>,
})

const { Page } = createPage({
  component: () => (
    <div className="relative">
      <MarketingHeader />
      <Section className={cn(gutterVariants())}>
        <Title className="uppercase">
          Work here, <br /> there and everywhere
        </Title>
        <Paragraph className="text-balance" size={'lg'}>
          Transforming offices, empowering individuals – your workspace revolution.
        </Paragraph>
      </Section>
      <div className="gutter w-full">
        <Double
          titleOne="This is title one"
          titleTwo="This is title two"
          imageOne="/images/marketing-one.jpg"
          imageTwo="/images/marketing-one.jpg"
        />
      </div>
      <HeroText />
    </div>
  ),
})
export default Page
