import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useMediaQuery'

function splitMetric(value: string) {
  const match = value.match(/^(₹)?([\d,.]+)(.*)$/)
  if (!match) {
    return { prefix: '', target: 0, decimals: 0, suffix: '', raw: value }
  }
  const numeric = match[2]
  const decimals = numeric.includes('.') ? (numeric.split('.')[1]?.length ?? 0) : 0
  return {
    prefix: match[1] ?? '',
    target: Number(numeric.replace(/,/g, '')),
    decimals,
    suffix: match[3] ?? '',
    raw: value,
  }
}

function formatMetric(parts: ReturnType<typeof splitMetric>, current: number) {
  if (!parts.target) return parts.raw
  const rounded = parts.decimals > 0 ? current.toFixed(parts.decimals) : Math.round(current).toLocaleString('en-US')
  return `${parts.prefix}${rounded}${parts.suffix}`
}

export function MetricCount({
  value,
  label,
  className,
}: {
  value: string
  label: string
  className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const parts = splitMetric(value)
  const [display, setDisplay] = useState(reduced ? value : formatMetric(parts, 0))

  useEffect(() => {
    if (reduced || !inView) return
    const start = performance.now()
    const duration = 900
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      const next = parts.target * eased
      setDisplay(t === 1 ? value : formatMetric(parts, next))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, parts.target, reduced, value])

  return (
    <div ref={ref} className={className}>
      <p className="display text-3xl text-accent md:text-5xl" aria-label={`${value} ${label}`}>
        {display}
      </p>
      <p className="mt-2 font-mono text-[10px] tracking-[0.18em] text-meta uppercase">{label}</p>
    </div>
  )
}
