import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { rounded } from '@/lib/constants'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center border text-xs transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      rounded,
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        blur: 'border-transparent bg-background/70 backdrop-blur',
        blue: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        red: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400/60 border-red-400/40',
        green:
          'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400/60 border-green-400/50',
        yellow:
          'bg-yellow-100 border-transparent  text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-400',
        indigo:
          'bg-indigo-100 border-transparent  text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 border-indigo-400',
        purple:
          'bg-purple-100 border-transparent  text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-400',
        pink: 'bg-pink-100 border-transparent  text-pink-800 dark:bg-pink-900 dark:text-pink-300 border-pink-400',
      },
      size: {
        xs: 'text-[10px] px-1.5 h-[18px]',
        sm: 'text-xs px-2 py-0.5',
        md: 'text-xs px-2.5 py-0.5',
        lg: 'text-sm px-3 py-1',
        humungous: 'text-base px-5 py-3.5',
      },
    },
    defaultVariants: {
      size: 'md',
      rounded: 'full',
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, size, variant, rounded, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, rounded, size }), className)} {...props} />
}

export { Badge, badgeVariants }
