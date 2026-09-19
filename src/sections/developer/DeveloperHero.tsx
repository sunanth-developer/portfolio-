import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { developerIdentity } from '@/data/developer'
import { useApp } from '@/context/AppContext'
import { traceEase } from '@/lib/trace'
import { useIsCompact, useReducedMotion } from '@/hooks/useMediaQuery'

type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6

export function DeveloperHero() {
  const { profileSwitch } = useApp()
  const reduced = useReducedMotion()
  const compact = useIsCompact()
  const root = useRef<HTMLElement>(null)
  const [armed, setArmed] = useState(reduced)
  const [phase, setPhase] = useState<Phase>(reduced ? 6 : 0)
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end start'],
  })
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.5])

  useEffect(() => {
    if (reduced) return
    if (profileSwitch.active) {
      setArmed(false)
      return
    }
    const id = window.setTimeout(() => setArmed(true), 80)
    return () => window.clearTimeout(id)
  }, [profileSwitch.active, reduced])

  useEffect(() => {
    if (!armed || reduced) return
    const scale = compact ? 0.55 : 1
    const timers = [140, 320, 520, 740, 960, 1180].map((ms, index) =>
      window.setTimeout(() => setPhase((index + 1) as Phase), ms * scale),
    )
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [armed, reduced, compact])

  return (
    <section ref={root} className="relative min-h-svh overflow-x-clip pt-page">
      <motion.div className="relative min-h-[calc(100svh-5rem)]" style={{ opacity: fade }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <SystemTrace phase={phase} compact={compact} />
        </div>
        <div className="container relative z-10 flex min-h-[calc(100svh-5rem)] flex-col justify-end py-[var(--space-3xl)]">
          <motion.p
            className="type-meta text-developer"
            initial={false}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: traceEase }}
          >
            Trace
          </motion.p>
          <motion.h1
            className="developer-hero-title type-xl mt-6"
            initial={false}
            animate={{ opacity: phase >= 5 ? 1 : 0, y: phase >= 5 ? 0 : 12 }}
            transition={{ duration: reduced ? 0 : 0.75, ease: traceEase }}
          >
            I build systems that become products.
          </motion.h1>
          <motion.div
            className="type-body mt-8 space-y-1 text-muted"
            initial={false}
            animate={{ opacity: phase >= 6 ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: traceEase }}
          >
            <p>Understand the problem.</p>
            <p>Design the system.</p>
            <p>Build the solution.</p>
          </motion.div>
          <motion.p
            className="type-meta mt-10 text-developer"
            initial={false}
            animate={{ opacity: phase >= 6 ? 1 : 0 }}
          >
            {developerIdentity.stackLine}
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}

function SystemTrace({ phase, compact }: { phase: number; compact: boolean }) {
  const reduced = useReducedMotion()

  if (compact) {
    const nodes = [
      { y: 90, on: 1, label: 'IDEA' },
      { y: 230, on: 2, label: 'SYSTEM' },
      { y: 370, on: 3, label: 'LOGIC' },
      { y: 510, on: 4, label: 'DATA' },
      { y: 650, on: 5, label: 'PRODUCT' },
    ]

    return (
      <svg className="h-full w-full" viewBox="0 0 390 760" fill="none" preserveAspectRatio="xMaxYMid meet" aria-hidden>
        <motion.path
          d="M 354 90 L 354 650"
          stroke="#63F5C2"
          strokeWidth="1.15"
          initial={false}
          animate={{ pathLength: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 0.5 : 0 }}
          transition={{ duration: reduced ? 0 : 1.1, ease: traceEase }}
        />
        {nodes.map((node) => (
          <g key={node.label}>
            <motion.circle
              cx="354"
              cy={node.y}
              r="3.5"
              fill="#63F5C2"
              initial={false}
              animate={{ opacity: phase >= node.on ? 0.9 : 0 }}
            />
            <motion.text
              x="338"
              y={node.y + 4}
              fill="rgb(243 244 239)"
              fillOpacity="0.38"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              letterSpacing="2"
              textAnchor="end"
              initial={false}
              animate={{ opacity: phase >= node.on ? 1 : 0 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}
      </svg>
    )
  }

  return (
    <svg className="h-full w-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <motion.path
        d="M 180 140 L 180 420 L 620 420 L 620 620 L 1080 620 L 1080 780"
        stroke="#63F5C2"
        strokeWidth="1.15"
        initial={false}
        animate={{ pathLength: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 0.55 : 0 }}
        transition={{ duration: reduced ? 0 : 1.4, ease: traceEase }}
      />
      <motion.path
        d="M 180 420 L 360 260 L 820 260 L 820 140"
        stroke="#72B9FF"
        strokeWidth="0.9"
        initial={false}
        animate={{ pathLength: phase >= 3 ? 1 : 0, opacity: phase >= 3 ? 0.28 : 0 }}
        transition={{ duration: reduced ? 0 : 1, ease: traceEase }}
      />
      {[
        { x: 180, y: 140, on: 1, label: 'IDEA' },
        { x: 180, y: 420, on: 2, label: 'SYSTEM' },
        { x: 620, y: 420, on: 3, label: 'LOGIC' },
        { x: 620, y: 620, on: 4, label: 'DATA' },
        { x: 1080, y: 620, on: 5, label: 'PRODUCT' },
      ].map((node) => (
        <g key={node.label}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="3.5"
            fill="#63F5C2"
            initial={false}
            animate={{ opacity: phase >= node.on ? 0.9 : 0 }}
          />
          <motion.text
            x={node.x + 14}
            y={node.y - 10}
            fill="rgb(243 244 239)"
            fillOpacity="0.38"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="2"
            initial={false}
            animate={{ opacity: phase >= node.on ? 1 : 0 }}
          >
            {node.label}
          </motion.text>
        </g>
      ))}
    </svg>
  )
}
