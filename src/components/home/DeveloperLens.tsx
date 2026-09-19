import { LensChoice } from '@/components/home/LensChoice'
import type { HomeLens } from '@/components/home/types'

export function DeveloperLens({
  lens,
  onEnter,
  onLeave,
  onFocus,
  onBlur,
  onChoose,
}: {
  lens: HomeLens
  onEnter?: () => void
  onLeave?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onChoose: () => void
}) {
  const { active, reduced } = lens

  return (
    <div className="relative flex h-full min-h-0 flex-col items-center justify-center">
      <LensChoice
        id="developer"
        title="Developer"
        kicker="The system"
        line="See how I design,"
        support="trace and build."
        active={active}
        reduced={reduced}
        onEnter={onEnter}
        onLeave={onLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onChoose={onChoose}
      />
    </div>
  )
}
