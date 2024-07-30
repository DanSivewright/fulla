import { Page } from '@/payload-types'
import React, { useEffect } from 'react'
import RichText from '../rich-text'
import { CMSLink } from '../cms-link'
import { Media } from '../media'

// import type { Page } from '../../../payload-types'

// import { CMSLink } from '../../components/cms-link'
// import { Media } from '../../components/media'
// import RichText from '../../components/rich-text'
// import { useHeaderTheme } from '../providers/header-theme'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  // const { setHeaderTheme } = useHeaderTheme()

  return (
    <div className="relative -mt-[10.4rem] flex items-end text-white" data-theme="dark">
      <div className="container mb-8 z-10 relative">
        <div className="max-w-[34rem]">
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
      </div>
      <div className="min-h-[80vh] select-none">
        {typeof media === 'object' && (
          <React.Fragment>
            <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
            <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
