'use client'

import { motion } from 'framer-motion'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { SearchIcon } from 'lucide-react'
import { Input } from '../ui/input'

type Props = {}

const nav = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Collections',
    href: '/collections',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
]

export const Header: React.FC<Props> = ({}) => {
  const path = usePathname()

  const [activeTab, setActiveTab] = useState(path ?? nav[0].href)
  const [hoveredTab, setHoveredTab] = useState<string | null>(path ?? nav[0].href)

  const [hidden, setHidden] = useLocalStorage({
    key: 'nav-hidden',
    defaultValue: false,
  })
  const [background, setBackground] = useLocalStorage({
    key: 'nav-background',
    defaultValue: true,
  })
  const [blur, setBlur] = useLocalStorage({
    key: 'nav-blur',
    defaultValue: false,
  })

  return (
    <header
      className={cn(
        'gutter sticky top-0 z-50 grid grid-cols-3 items-center gap-3 py-2 transition duration-300 ease-in-out',
        {
          hidden: hidden,
          'bg-background': background,
          'bg-background/10 backdrop-blur': blur,
        },
      )}
    >
      <div className="flex items-center gap-3">
        <span className="w-6 h-6 bg-black rounded-full"></span>
        <motion.div
          onHoverEnd={() => setHoveredTab(activeTab)}
          // @ts-ignore
          className="hidden space-x-1 lg:flex"
        >
          {nav.map(({ href, title }) => (
            <Link
              href={href}
              key={href}
              onClick={() => setActiveTab(href)}
              className={cn(
                'relative rounded-full px-3 py-1.5 text-sm text-white transition hover:text-white/50 focus-visible:outline-2',
              )}
            >
              <motion.div onHoverStart={() => setHoveredTab(href)}>
                {activeTab === href && (
                  <motion.div
                    layoutId="pill"
                    // @ts-ignore
                    className="absolute inset-0 bg-foreground"
                    style={{
                      borderRadius: 9999,
                    }}
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                {hoveredTab === href && (
                  <motion.div
                    layoutId="hover"
                    // @ts-ignore
                    className="absolute inset-0 bg-stone-600/10"
                    style={{
                      borderRadius: 9998,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                <span
                  className={cn('relative z-10 mix-blend-exclusion', {
                    'text-white': activeTab === href,
                  })}
                >
                  {title}
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      <div
        className={cn(
          'flex items-center justify-between gap-3 rounded-full border border-input bg-background px-4 transition duration-300 ease-in-out',
          {
            'bg-muted-foreground/10': background,
          },
        )}
      >
        <SearchIcon size={14} className="text-muted-foreground/50" />
        <Input
          //   onFocus={() => setOpen(true)}
          className="grow"
          placeholder="Discover the ideal space to grow your business..."
          variant={'ghost'}
          rounded={'full'}
        />
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <div className="flex items-center justify-end gap-3">
        <Avatar size="sm">
          <AvatarFallback>DS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
