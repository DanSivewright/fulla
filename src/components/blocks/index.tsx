import React, { Fragment } from 'react'

import { CallToActionBlock } from './call-to-action'
import { ContentBlock } from './content'
import { FormBlock } from './form'
import { MediaBlock } from './media-block'
import { toKebabCase } from '@/lib/to-kebab-case'
import { Page } from '@/payload-types'
import { BentoBlock } from './bento-block'

const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  'bento-block': BentoBlock,
}

export const Blocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  console.log('blocks stuff::: ', {
    blocks,
    hasBlocks,
  })

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
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
