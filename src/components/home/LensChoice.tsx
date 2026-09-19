import { motion } from 'framer-motion'
import type { ProfileId } from '@/context/AppContext'
import { cn } from '@/lib/cn'
import { waveEase } from '@/lib/wave'

export function LensChoice({
  id,
  title,
  kicker,
  line,
  support,
  active,
  stacked = false,
  reduced,
  onEnter,
  onLeave,
  onFocus,
  onBlur,
  onChoose,
}: {
  id: ProfileId
  title: string
  kicker: string
  line: string
  support: string
  active: ProfileId | null
  stacked?: boolean
  reduced: boolean
  onEnter?: () => void
  onLeave?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onChoose: () => void
}) {
  const quiet = Boolean(active) && active !== id
  const selected = active === id
  const founder = id === 'founder'
  const accent = founder
    ? active === 'founder'
      ? '#6B1200'
      : '#E8330A'
    : active === 'developer'
      ? '#7EF0C0'
      : '#148A5C'
  const copy = founder
    ? active === 'founder'
      ? 'text-[#1A120F]'
      : 'text-[var(--home-text)]'
    : active === 'developer'
      ? 'text-[#F5F4EF]'
      : 'text-[var(--home-text)]'

  return (
    <button
      type="button"
      data-portal={id}
      aria-label={`Enter ${title} profile. ${kicker}. ${line} ${support}`}
      className={cn(
        'group relative z-10 min-h-11 py-2 text-left',
        stacked ? 'w-full max-w-none py-3' : 'w-full max-w-[18rem]',
      )}
      onPointerDown={onEnter}
      onMouseEnter={onEnter}
      onMouseLeave={(event) => {
        const next = event.relatedTarget
        if (next instanceof HTMLElement && next.closest('[data-portal]')) return
        onLeave?.()
      }}
      onFocus={onFocus}
      onBlur={(event) => {
        const next = event.relatedTarget
        if (next instanceof HTMLElement && next.closest('[data-portal]')) return
        onBlur?.()
      }}
      onClick={onChoose}
    >
      <motion.p
        className="font-display tracking-[-0.04em] uppercase"
        initial={false}
        animate={{
          opacity: quiet ? 0.28 : 1,
          scale: selected ? 1.06 : 1,
        }}
        transition={{ duration: reduced ? 0 : 0.58, ease: waveEase }}
        style={{
          color: accent,
          fontSize: stacked
            ? selected
              ? 'clamp(2rem, 8.5vw, 3.2rem)'
              : 'clamp(1.85rem, 8vw, 2.8rem)'
            : selected
              ? 'clamp(2rem, 3.6vw, 3.1rem)'
              : 'clamp(1.7rem, 3vw, 2.6rem)',
          transformOrigin: 'left bottom',
        }}
      >
        {title}
      </motion.p>
      <p
        className={cn(
          'mt-2 font-mono text-[10px] tracking-[0.22em] uppercase',
          quiet ? 'opacity-30' : 'opacity-80',
        )}
        style={{ color: accent }}
      >
        {kicker}
      </p>
      <p className={cn('mt-3 max-w-[20rem] text-left text-[0.95rem] leading-6', copy, quiet ? 'opacity-30' : 'opacity-80')}>
        {line}
        <br />
        {support}
      </p>
      <p
        className={cn(
          'mt-4 inline-flex min-h-11 items-center font-mono text-[11px] tracking-[0.22em] uppercase',
          quiet && 'opacity-30',
        )}
        style={{ color: accent }}
      >
        Enter
        <span className="btn-arrow ml-2">→</span>
      </p>
    </button>
  )
}
