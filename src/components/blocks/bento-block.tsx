import { Page } from '@/payload-types'
import { Double } from '../double'

type Props = Extract<Page['layout'][0], { blockType: 'bento-block' }>

export const BentoBlock: React.FC<Props> = ({ items }) => {
  return (
    <Double
      // @ts-ignore
      titleOne={items?.[0]?.blocks?.value?.title ?? ' title unset'}
      // @ts-ignore
      titleTwo={items?.[1]?.blocks?.value?.title ?? 'title unset'}
      // @ts-ignore
      imageOne={items?.[0]?.meta?.image?.url ?? '/images/marketing-one.jpg'}
      // @ts-ignore
      imageTwo={items?.[1]?.meta?.image?.url ?? '/images/marketing-two.jpg'}
    />
  )
}
