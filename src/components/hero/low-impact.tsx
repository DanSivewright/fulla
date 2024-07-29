import React from 'react'

import RichText from '../../components/rich-text'
import { Page } from '@/payload-types'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {children || <RichText content={richText} enableGutter={false} />}
      </div>
    </div>
  )
}