import { useApp } from '@/context/AppContext'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'

export function DeveloperBackground() {
  const { profile } = useApp()
  const mobile = useIsMobile()
  const reduced = useReducedMotion()

  if (profile !== 'developer') return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#080909]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_12%_-8%,rgba(99,245,194,0.05),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_36%_at_92%_108%,rgba(114,185,255,0.04),transparent_60%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M 80 120 L 420 120" stroke="rgb(243 244 239)" strokeOpacity="0.05" />
        <path d="M 80 120 L 80 340" stroke="rgb(243 244 239)" strokeOpacity="0.05" />
        <path d="M 1020 80 L 1020 260 L 1280 260" stroke="rgb(243 244 239)" strokeOpacity="0.05" />
        <path d="M 1080 720 L 1360 720 L 1360 520" stroke="rgb(243 244 239)" strokeOpacity="0.045" />
        <circle cx="80" cy="120" r="2.2" fill="#63F5C2" fillOpacity="0.35" />
        <circle cx="420" cy="120" r="2.2" fill="rgb(243 244 239)" fillOpacity="0.18" />
        <circle cx="1020" cy="80" r="2.2" fill="#63F5C2" fillOpacity="0.28" />
        <circle cx="1280" cy="260" r="2.2" fill="#72B9FF" fillOpacity="0.28" />
        <circle cx="1360" cy="520" r="2.2" fill="rgb(243 244 239)" fillOpacity="0.16" />
        {!mobile && !reduced && (
          <>
            <path d="M 80 340 L 80 520 L 240 640" stroke="#63F5C2" strokeOpacity="0.12" />
            <circle cx="240" cy="640" r="2.2" fill="#63F5C2" fillOpacity="0.28" />
            <text x="96" y="114" fill="rgb(243 244 239)" fillOpacity="0.16" fontSize="10" fontFamily="ui-monospace, monospace">
              SYS
            </text>
          </>
        )}
      </svg>
    </div>
  )
}
