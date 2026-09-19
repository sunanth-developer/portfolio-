import { useApp } from '@/context/AppContext'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'

export function FounderBackground() {
  const { profile } = useApp()
  const mobile = useIsMobile()
  const reduced = useReducedMotion()

  if (profile !== 'founder') return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#F5F3ED]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_18%_0%,rgba(255,90,54,0.07),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_88%_108%,rgba(201,154,74,0.08),transparent_62%)]" />
      {!mobile && (
        <>
          <div className="absolute top-[8%] right-[12%] h-[42vw] max-h-[28rem] w-[42vw] max-w-[28rem] rounded-full border border-[rgb(17_17_17/0.05)]" />
          <div className="absolute bottom-[12%] left-[6%] h-64 w-48 rotate-[-8deg] border border-[rgb(17_17_17/0.045)]" />
          <div className="absolute top-[38%] left-[58%] h-3 w-3 rounded-full bg-founder/35" />
          <div className="absolute top-[22%] right-[28%] h-1.5 w-1.5 rounded-full bg-gold/50" />
        </>
      )}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M 120 80 L 1320 80" stroke="rgb(17 17 17)" strokeOpacity="0.045" />
        <path d="M 120 820 L 1320 820" stroke="rgb(17 17 17)" strokeOpacity="0.045" />
        <path d="M 180 40 L 180 860" stroke="rgb(17 17 17)" strokeOpacity="0.04" />
        <path d="M 1260 40 L 1260 860" stroke="rgb(17 17 17)" strokeOpacity="0.04" />
        {!reduced && !mobile && (
          <path
            d="M 980 140 C 1040 280, 920 420, 1080 560"
            stroke="#FF5A36"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        )}
      </svg>
    </div>
  )
}
