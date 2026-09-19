import { motion } from 'framer-motion'
import { traceDraw, traceEase, traceStroke } from '@/lib/trace'
import { useReducedMotion } from '@/hooks/useMediaQuery'

export function TraceLine({
  d,
  drawn,
  delay = 0,
  duration = 0.7,
  className,
  stroke = traceStroke,
  width = 1,
}: {
  d: string
  drawn: boolean
  delay?: number
  duration?: number
  className?: string
  stroke?: string
  width?: number
}) {
  const reduced = useReducedMotion()

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      className={className}
      initial={reduced ? false : { strokeDashoffset: 1 }}
      animate={{ strokeDashoffset: drawn || reduced ? 0 : 1 }}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: traceDraw }}
      style={{ strokeDasharray: 1 }}
    />
  )
}

export function TraceDot({
  cx,
  cy,
  active,
  delay = 0,
}: {
  cx: number | string
  cy: number | string
  active: boolean
  delay?: number
}) {
  const reduced = useReducedMotion()

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={2.2}
      fill={active ? '#63F5C2' : 'transparent'}
      stroke={active ? '#63F5C2' : 'rgba(243,244,239,0.22)'}
      strokeWidth={1}
      initial={false}
      animate={{ scale: active ? 1 : 0.6, opacity: active ? 1 : 0.35 }}
      transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : delay, ease: traceEase }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  )
}
