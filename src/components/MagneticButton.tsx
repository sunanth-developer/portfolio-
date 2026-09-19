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
        'group inline-flex min-h-11 items-center gap-3 px-0 py-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors duration-300',
        variant === 'solid' && 'text-fg hover:text-accent',
        variant === 'ghost' && 'text-muted hover:text-fg',
        variant === 'text' && 'text-muted hover:text-fg',
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
