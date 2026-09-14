import { useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { HiddenProject } from '@/components/HiddenProject'
import { Identity } from '@/sections/Identity'
import { WhatIBuild } from '@/sections/WhatIBuild'
import { Ventures } from '@/sections/Ventures'
import { Founder } from '@/sections/Founder'
import { Engineering } from '@/sections/Engineering'
import { BuiltWithHands } from '@/sections/BuiltWithHands'
import { useApp } from '@/context/AppContext'
import { MagneticButton } from '@/components/MagneticButton'

export default function Home() {
  const { revealHiddenProject, hiddenProjectVisible, goTo } = useApp()

  useEffect(() => {
    if (hiddenProjectVisible) return
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      if (height > 0 && window.scrollY / height > 0.62) {
        revealHiddenProject()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hiddenProjectVisible, revealHiddenProject])

  return (
    <>
      <Hero />
      <Identity />
      <WhatIBuild />
      <Ventures />
      <Founder />
      <Engineering />
      <BuiltWithHands />
      <HiddenProject />
      <section className="px-5 py-24 md:px-10">
        <p className="eyebrow mb-6 text-accent">Continue</p>
        <h2 className="display-title max-w-4xl text-4xl md:text-6xl">
          The dossier has more layers.
        </h2>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <MagneticButton cursor="view" onClick={() => goTo('/journey', '04', 'Journey')}>
            The build log →
          </MagneticButton>
          <MagneticButton variant="ghost" cursor="view" onClick={() => goTo('/contact', '07', 'Contact')}>
            Start a conversation
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
