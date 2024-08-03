import React, { Fragment } from 'react'

import { toKebabCase } from '@/lib/to-kebab-case'
import { Page } from '@/payload-types'
import { BentoBlock } from './bento-block'
import { CallToActionBlock } from './call-to-action'
import { ContentBlock } from './content'
import { FormBlock } from './form'
import { MediaBlock } from './media-block'
import { TextHero } from './text-hero'
import { CarouselBlock } from './carousel'
import { Section } from '../section'

const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  'bento-block': BentoBlock,
  'text-hero': TextHero,
  carousel: CarouselBlock,
}

export const Blocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16 lg:my-32" key={index}>
                  <Block id={toKebabCase(blockName)} {...block} />
                </div>
              )
            } else {
              return null
            }
          }
        })}
      </Fragment>
    )
  } else {
    return null
  }
}
