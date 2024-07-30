import React from 'react'
import RichText from '@/components/rich-text'

import { CMSLink } from '../cms-link'
import { Page } from '@/payload-types'
import { cn } from '@/lib/utils'

type Props = Extract<Page['layout'][0], { blockType: 'content' }>

export const ContentBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container w-full my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn('col-span-4', {
                  'md:col-span-2': size !== 'full',
                  'lg:col-span-12': size === 'full',
                  'lg:col-span-6': size === 'half',
                  'lg:col-span-4': size === 'oneThird',
                  'lg:col-span-8': size === 'twoThirds',
                })}
                key={index}
              >
                {colsSpanClasses[size]}
                <RichText content={richText} enableGutter={false} />
                {/* @ts-ignore */}
                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
