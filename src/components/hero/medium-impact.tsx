import React from 'react'

import { Media } from '../../components/media'
import RichText from '../../components/rich-text'
import { CMSLink } from '../cms-link'
import { Page } from '@/payload-types'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="">
      <div className="container mb-8">
        <RichText className="mb-6" content={richText} enableGutter={false} />
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  {/* @ts-ignore */}
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="container ">
        {typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
            {/* @ts-ignore */}
            {media?.caption && (
              <div className="mt-3">
                {/* @ts-ignore */}
                <RichText content={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
