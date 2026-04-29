/* Button Component primitives - A component that displays a button - from shadcn/ui (exposes Button, buttonVariants) */
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] text-[16px] font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-[#00B4D8] text-white hover:shadow-medium hover:scale-105',
        destructive:
          'bg-[#E53E3E] text-white hover:bg-[#E53E3E]/90 hover:shadow-medium hover:scale-105',
        outline:
          'border-2 border-[#1A3A52] bg-transparent text-[#1A3A52] hover:bg-[#1A3A52]/5 hover:scale-105',
        secondary:
          'bg-[#1A3A52] text-white hover:bg-[#1A3A52]/90 hover:shadow-medium hover:scale-105',
        ghost: 'text-[#1A3A52] hover:bg-[#1A3A52]/10',
        link: 'text-[#00B4D8] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-[48px] px-[32px]',
        sm: 'h-[44px] px-[24px]',
        lg: 'h-[56px] px-[40px]',
        icon: 'h-[48px] w-[48px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
