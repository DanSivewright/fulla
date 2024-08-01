import Image from 'next/image'
import { Section } from '../section'
import { Title } from '../title'
import Link from 'next/link'
import imageOne from '../../../public/images/title1.png'
import imageTwo from '../../../public/images/title2.png'
import imageThree from '../../../public/images/title3.png'

type Props = {}
export const TextHero: React.FC<Props> = ({}) => {
  return (
    <Section className="container">
      <Title style={{ margin: 0 }} className="flex font-thin flex-wrap items-center">
        Fulla
        <span className="relative h-[4vw] min-h-[40px] bg-accent mx-2 aspect-[4/2] rounded-full overflow-hidden">
          <Image className="object-cover" fill src={imageOne} placeholder="blur" alt="" />
        </span>
        is the
      </Title>
      <Title style={{ margin: 0 }} className="flex font-thin flex-wrap items-center">
        super simple, smartly customizable,
        <span className="relative min-h-[40px] h-[4vw] bg-accent mx-2 aspect-[4/2] rounded-full overflow-hidden">
          <Image className="object-cover" fill src={imageTwo} placeholder="blur" alt="" />
        </span>
        all-new
      </Title>
      <Title style={{ margin: 0 }} className="flex font-thin flex-wrap items-center">
        property tool
        <span className="relative min-h-[40px] h-[4vw] bg-accent mx-2 aspect-[4/2] rounded-full overflow-hidden">
          <Image className="object-cover" fill src={imageThree} placeholder="blur" alt="" />
        </span>
        from Wixels.
      </Title>

      <Section size="sm" side="t">
        <Title level={3} showAs={4} className="font-thin" style={{ margin: 0 }}>
          We handle everything, from painting to payments.
        </Title>
        <Title
          level={3}
          showAs={4}
          className="font-thin text-muted-foreground/60"
          style={{ marginTop: 0, marginBottom: '1rem' }}
        >
          Available now in Johannesburg.
        </Title>
        <Link href="#" className="text-muted-foreground/60 text-xs font-thin">
          Tell us where to build next {'>'}
        </Link>
      </Section>
    </Section>
  )
}
