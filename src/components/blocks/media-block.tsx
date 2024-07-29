import type { StaticImageData } from 'next/image'

import React from 'react'
import RichText from '@/components/rich-text'

import { Media } from '../media'
import { Page } from '@/payload-types'
import { cn } from '@/lib/utils'

type Props = Extract<Page['layout'][0], { blockType: 'mediaBlock' }> & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  id?: string
  imgClassName?: string
  staticImage?: StaticImageData
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    position = 'default',
    staticImage,
  } = props

  let caption
  // @ts-ignore
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        '',
        {
          container: position === 'default' && enableGutter,
        },
        className,
      )}
    >
      {position === 'fullscreen' && (
        <div className="relative">
          {/* @ts-ignore */}
          <Media resource={media} src={staticImage} />
        </div>
      )}
      {position === 'default' && (
        // @ts-ignore
        <Media imgClassName={cn('rounded', imgClassName)} resource={media} src={staticImage} />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: position === 'fullscreen',
            },
            captionClassName,
          )}
        >
          <RichText content={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
