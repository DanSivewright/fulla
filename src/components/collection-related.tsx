import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/rich-text'
import { Post } from '@/payload-types'
import { CollectionCard } from './collection-card'

export type CollectionRelatedProps = {
  className?: string
  docs?: Post[]
  introContent?: any
}

export const CollectionRelated: React.FC<CollectionRelatedProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('container', className)}>
      {introContent && <RichText content={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <CollectionCard key={index} doc={doc} relationTo="posts" showCategories />
        })}
      </div>
    </div>
  )
}
