import { useEffect, useState } from 'react'
import { DualLensStage } from '@/components/home/DualLensStage'
import { HomeEnvironment } from '@/components/home/HomeEnvironment'
import { IdentityHero } from '@/components/home/IdentityHero'
import type { HomeLens } from '@/components/home/types'
import { useApp } from '@/context/AppContext'
import type { ProfileId } from '@/context/AppContext'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'

export default function Home() {
  const { enterProfile, setCursor } = useApp()
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const [phase, setPhase] = useState(reduced ? 5 : 0)
  const [hover, setHover] = useState<ProfileId | null>(null)
  const [selected, setSelected] = useState<ProfileId | null>(null)

  useEffect(() => {
    if (reduced) return
    const timers = [120, 280, 520, 780].map((ms, index) =>
      window.setTimeout(() => setPhase(index + 1), ms),
    )
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [reduced])

  useEffect(() => {
    const lens = selected ?? hover
    if (lens) document.documentElement.dataset.lens = lens
    else delete document.documentElement.dataset.lens
    return () => {
      delete document.documentElement.dataset.lens
    }
  }, [hover, selected])

  const choose = (id: ProfileId) => {
    setSelected(id)
    setHover(id)
    setCursor('default')
    window.setTimeout(() => enterProfile(id), reduced ? 0 : 180)
  }

  const activate = (id: ProfileId) => {
    if (selected) return
    setHover(id)
    setCursor(id)
  }

  const clear = () => {
    if (selected) return
    setHover(null)
    setCursor('default')
  }

  const lens: HomeLens = {
    hover,
    selected,
    active: selected ?? hover,
    phase: reduced ? 5 : phase,
    reduced,
  }

  return (
    <section className="home relative h-svh overflow-hidden">
      <HomeEnvironment active={lens.active} ready={reduced || phase >= 1} reduced={reduced} />
      <div className="home-shell">
        <IdentityHero {...lens} />
        <DualLensStage
          lens={lens}
          mobile={mobile}
          onActivate={activate}
          onClear={clear}
          onChoose={choose}
        />
      </div>
    </section>
  )
}
