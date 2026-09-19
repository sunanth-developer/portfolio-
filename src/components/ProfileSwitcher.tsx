import { motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import type { ProfileId } from '@/context/AppContext'
import { cn } from '@/lib/cn'

export function ProfileSwitcher({ className, layout = 'nav' }: { className?: string; layout?: string }) {
  const { profile, switchProfile, setCursor } = useApp()
  const active: ProfileId = profile === 'developer' ? 'developer' : 'founder'

  return (
    <div
      role="group"
      aria-label="Profile"
      className={cn('inline-flex items-center rounded-full border border-line bg-surface p-1', className)}
    >
      {(['founder', 'developer'] as const).map((id) => {
        const selected = active === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={selected}
            className={cn(
              'relative min-h-9 rounded-full px-3 py-1.5 font-mono text-[9px] tracking-[0.22em] uppercase md:px-4',
              selected ? 'text-bg' : 'text-muted hover:text-fg',
            )}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('default')}
            onClick={() => switchProfile(id)}
          >
            {selected && (
              <motion.span
                layoutId={`profile-active-pill-${layout}`}
                className={cn(
                  'absolute inset-0 rounded-full',
                  id === 'founder' ? 'bg-founder' : 'bg-developer',
                )}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10">{id}</span>
          </button>
        )
      })}
    </div>
  )
}
