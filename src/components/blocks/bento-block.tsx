import { Page } from '@/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'bento-block' }>

export const BentoBlock: React.FC<Props> = ({ items }) => {
  return (
    <div>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  )
}
