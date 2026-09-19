import { motion } from 'framer-motion'
import { dsDraw, dsEase, DS_YELLOW } from '@/lib/ds'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

export function RouteLine({
  d,
  drawn,
  delay = 0,
  duration = 0.7,
  width = 1.25,
  className,
  muted = false,
}: {
  d: string
  drawn: boolean
  delay?: number
  duration?: number
  width?: number
  className?: string
  muted?: boolean
}) {
  const reduced = useReducedMotion()

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={muted ? 'rgba(255,193,7,0.22)' : DS_YELLOW}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      className={className}
      initial={false}
      animate={{
        strokeDashoffset: drawn || reduced ? 0 : 1,
        opacity: drawn || reduced ? 1 : 0.2,
      }}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: dsDraw }}
      style={{ strokeDasharray: 1 }}
    />
  )
}

export function RouteNode({
  cx,
  cy,
  active,
  delay = 0,
  r = 3.2,
}: {
  cx: number | string
  cy: number | string
  active: boolean
  delay?: number
  r?: number
}) {
  const reduced = useReducedMotion()

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={active ? DS_YELLOW : 'transparent'}
      stroke={DS_YELLOW}
      strokeWidth={1.2}
      initial={false}
      animate={{
        scale: active ? 1 : 0.55,
        opacity: active ? 1 : 0.35,
      }}
      transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : delay, ease: dsEase }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  )
}

export function RouteLabel({
  children,
  active,
  className,
}: {
  children: string
  active: boolean
  className?: string
}) {
  const reduced = useReducedMotion()

  return (
    <motion.span
      className={cn('ds-kicker', className)}
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        y: reduced || active ? 0 : 6,
        color: active ? '#FFFFFF' : '#666666',
      }}
      transition={{ duration: reduced ? 0 : 0.4, ease: dsEase }}
    >
      {children}
    </motion.span>
  )
}

export function RouteTravel({
  path,
  play,
  duration = 1.35,
}: {
  path: string
  play: boolean
  duration?: number
}) {
  const reduced = useReducedMotion()
  if (reduced || !play) return null

  return (
    <circle r="3" fill={DS_YELLOW}>
      <animateMotion dur={`${duration}s`} fill="freeze" path={path} rotate="auto" />
    </circle>
  )
}

export function RouteBridge({ className }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <div className={cn('flex justify-center py-4 md:py-6', className)} aria-hidden>
      <svg viewBox="0 0 2 72" className="h-16 w-2 overflow-visible md:h-20">
        <RouteLine d="M1 0 V72" drawn={!reduced} duration={0.8} width={1.1} muted />
        <RouteNode cx={1} cy={72} active />
      </svg>
    </div>
  )
}
