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
        blur: 'border-none bg-background/60 backdrop-blur text-background',
      },
      size: {
        xs: 'text-[10px] px-1.5 py-0.5',
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
