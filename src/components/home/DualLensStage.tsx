import { FounderLens } from '@/components/home/FounderLens'
import { DeveloperLens } from '@/components/home/DeveloperLens'
import { OriginTrace } from '@/components/home/OriginTrace'
import { LensChoice } from '@/components/home/LensChoice'
import type { HomeLens } from '@/components/home/types'
import type { ProfileId } from '@/context/AppContext'

export function DualLensStage({
  lens,
  mobile,
  onActivate,
  onClear,
  onChoose,
}: {
  lens: HomeLens
  mobile: boolean
  onActivate: (id: ProfileId) => void
  onClear: () => void
  onChoose: (id: ProfileId) => void
}) {
  const { selected, reduced } = lens

  if (mobile) {
    return (
      <div className="relative flex min-h-0 flex-1 flex-col justify-center">
        <OriginTrace {...lens} />
        <LensChoice
          id="founder"
          title="Founder"
          kicker="The problem"
          line="See how I think,"
          support="question and solve."
          active={selected}
          stacked
          reduced={reduced}
          onChoose={() => onChoose('founder')}
        />
        <LensChoice
          id="developer"
          title="Developer"
          kicker="The system"
          line="See how I design,"
          support="trace and build."
          active={selected}
          stacked
          reduced={reduced}
          onChoose={() => onChoose('developer')}
        />
      </div>
    )
  }

  return (
    <div className="relative min-h-0 flex-1">
      <OriginTrace {...lens} />
      <div className="relative z-10 grid h-full grid-cols-2 items-stretch gap-8 xl:gap-16">
        <FounderLens
          lens={lens}
          onEnter={() => onActivate('founder')}
          onLeave={onClear}
          onFocus={() => onActivate('founder')}
          onBlur={onClear}
          onChoose={() => onChoose('founder')}
        />
        <DeveloperLens
          lens={lens}
          onEnter={() => onActivate('developer')}
          onLeave={onClear}
          onFocus={() => onActivate('developer')}
          onBlur={onClear}
          onChoose={() => onChoose('developer')}
        />
      </div>
    </div>
  )
}
