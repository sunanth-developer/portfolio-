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

function withArrow(children: ReactNode) {
  if (typeof children !== 'string' || !children.includes('→')) return children
  const [label] = children.split('→')
  return (
    <>
      {label.trim()}
      <span className="btn-arrow" aria-hidden>
        →
      </span>
    </>
  )
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
        'group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 sm:w-auto',
        variant === 'solid' && 'bg-fg text-bg hover:bg-accent hover:text-bg',
        variant === 'ghost' && 'border border-line text-fg hover:border-accent hover:text-accent',
        variant === 'text' && 'rounded-none px-0 py-2 text-muted hover:text-fg',
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
      {withArrow(children)}
    </button>
  )
}
