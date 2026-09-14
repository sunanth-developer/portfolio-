import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useApp } from '@/context/AppContext'
import type { CursorKind } from '@/context/AppContext'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  cursor?: CursorKind
  variant?: 'solid' | 'ghost' | 'text'
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
  const ref = useMagnetic<HTMLButtonElement>(0.18)
  const { setCursor } = useApp()

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center px-5 py-3 font-display text-[11px] tracking-[0.22em] uppercase transition-colors duration-300',
        variant === 'solid' && 'bg-fg text-bg hover:bg-accent',
        variant === 'ghost' && 'border border-line text-fg hover:border-accent hover:text-accent',
        variant === 'text' && 'px-0 py-2 text-muted hover:text-fg',
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
      {children}
    </button>
  )
}
