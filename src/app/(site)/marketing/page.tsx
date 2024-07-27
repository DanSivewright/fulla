import { gutterVariants } from '@/components/gutter'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'
import { Title } from '@/components/title'
import { createPage } from '@/lib/create-page'
import { cn } from '@/lib/utils'

const { Page } = createPage({
  component: () => (
    <div className="relative">
      <Section className={cn(gutterVariants())}>
        <Title>
          Built to accelerate <br /> your workspace
        </Title>
        <Paragraph className="text-balance" size={'lg'}>
          Transforming offices, empowering individuals – your workspace revolution.
        </Paragraph>
      </Section>
    </div>
  ),
})
export default Page
