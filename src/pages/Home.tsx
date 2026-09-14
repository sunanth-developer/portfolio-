import { lazy, Suspense } from 'react'
import { Hero } from '@/components/Hero'
import { WhatIBuild } from '@/sections/WhatIBuild'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'

const FounderWhoCodes = lazy(() => import('@/sections/FounderWhoCodes'))
const WordMorph = lazy(() => import('@/sections/WordMorph'))
const DriverSpotStory = lazy(() => import('@/sections/DriverSpotStory'))
const FounderThinking = lazy(() => import('@/sections/FounderThinking'))
const TechnologyGraph = lazy(() => import('@/components/TechnologyGraph'))
const BuildPipeline = lazy(() => import('@/components/BuildPipeline'))
const ProjectShowcase = lazy(() => import('@/components/ProjectShowcase'))

function Slot() {
  return <div className="min-h-[40vh]" />
}

export default function Home() {
  const { goTo } = useApp()

  return (
    <>
      <Hero />
      <Suspense fallback={<Slot />}>
        <FounderWhoCodes />
        <WordMorph />
      </Suspense>
      <WhatIBuild />
      <Suspense fallback={<Slot />}>
        <DriverSpotStory />
        <FounderThinking />
      </Suspense>
      <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
        <p className="eyebrow mb-6 text-accent">Engineering</p>
        <h2 className="display text-[14vw] md:text-[7rem]">Under the hood.</h2>
        <p className="mt-6 max-w-xl text-muted">I build the technology behind the products.</p>
        <div className="mt-14">
          <Suspense fallback={<Slot />}>
            <TechnologyGraph />
          </Suspense>
        </div>
        <div className="mt-10">
          <MagneticButton variant="ghost" onClick={() => goTo('/engineering', '03', 'Engineering')}>
            Open engineering →
          </MagneticButton>
        </div>
      </section>
      <Suspense fallback={<Slot />}>
        <BuildPipeline />
      </Suspense>
      <Suspense fallback={<Slot />}>
        <ProjectShowcase />
      </Suspense>
      <section className="px-5 py-24 md:px-8">
        <p className="eyebrow mb-6 text-accent">Next</p>
        <h2 className="display max-w-4xl text-4xl md:text-6xl">The dossier has more layers.</h2>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <MagneticButton cursor="view" onClick={() => goTo('/lab', '05', 'Lab')}>
            Enter the lab →
          </MagneticButton>
          <MagneticButton variant="ghost" cursor="open" onClick={() => goTo('/contact', '07', 'Contact')}>
            Start a conversation
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
