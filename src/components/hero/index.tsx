import React from 'react'

import { HighImpactHero } from './high-impact'
import { LowImpactHero } from './low-impact'
import { MediumImpactHero } from './medium-impact'
import { Page } from '@/payload-types'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const Hero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
