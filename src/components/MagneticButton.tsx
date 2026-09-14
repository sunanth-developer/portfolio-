import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useApp } from '@/context/AppContext'
import type { CursorKind } from '@/context/AppContext'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  cursor?: CursorKind
  variant?: 'solid' | 'ghost' | 'line'
}

export function MagneticButton({
  children,
  className,
  cursor = 'open',
  variant = 'solid',
  onMouseEnter,
  onMouseLeave,
  ...props
}: Props) {
  const ref = useMagnetic<HTMLButtonElement>(0.22)
  const { setCursor } = useApp()

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-6 py-3 font-display text-xs tracking-[0.22em] uppercase transition-colors duration-300',
        variant === 'solid' && 'bg-fg text-bg hover:bg-accent',
        variant === 'ghost' && 'border border-line text-fg hover:border-accent hover:text-accent',
        variant === 'line' && 'rounded-none border-b border-line px-0 py-2 hover:border-accent',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
      onMouseEnter={(event) => {
        setCursor(cursor)
        onMouseEnter?.(event)
      }}
      onMouseLeave={(event) => {
        setCursor('default')
        onMouseLeave?.(event)
      }}
      {...props}
    >
      <motion.span className="inline-block">{children}</motion.span>
    </button>
  )
}
