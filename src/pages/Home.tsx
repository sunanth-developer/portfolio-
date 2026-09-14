import { lazy, Suspense } from 'react'
import { Hero } from '@/components/Hero'
import { WhatIBuild } from '@/sections/WhatIBuild'
import { MagneticButton } from '@/components/MagneticButton'
import { TractionBlock } from '@/components/ProjectGallery'
import { useApp } from '@/context/AppContext'

const FounderWhoCodes = lazy(() => import('@/sections/FounderWhoCodes'))
const DriverSpotStory = lazy(() => import('@/sections/DriverSpotStory'))
const FounderThinking = lazy(() => import('@/sections/FounderThinking'))
const TechnologyGraph = lazy(() => import('@/components/TechnologyGraph'))
const BuildPipeline = lazy(() => import('@/components/BuildPipeline'))
const ProjectShowcase = lazy(() => import('@/components/ProjectShowcase'))

function Slot() {
  return <div className="min-h-[16vh]" />
}

export default function Home() {
  const { goTo } = useApp()

  return (
    <>
      <Hero />
      <Suspense fallback={<Slot />}>
        <FounderWhoCodes />
      </Suspense>
      <WhatIBuild />
      <Suspense fallback={<Slot />}>
        <FounderThinking />
        <DriverSpotStory />
      </Suspense>
      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <p className="eyebrow mb-4 text-accent">Proof</p>
        <h2 className="display text-[12vw] md:text-[5.6rem]">
          Built.
          <br />
          Shipped.
          <br />
          Used.
        </h2>
        <p className="mt-6 max-w-xl text-muted">
          Verified DriverSpot contact with the city — users, drivers, completed rides and revenue. Nothing padded.
        </p>
        <div className="mt-10">
          <TractionBlock />
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-[0.18em] text-meta uppercase">
          {['Product', 'Mobile', 'Backend', 'Marketplace', 'Operations'].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <p className="eyebrow mb-4 text-accent">Engineering</p>
        <h2 className="display text-[12vw] md:text-[6rem]">Under the hood.</h2>
        <p className="mt-5 max-w-xl text-muted">I build the technology behind the products.</p>
        <div className="mt-10">
          <Suspense fallback={<Slot />}>
            <TechnologyGraph />
          </Suspense>
        </div>
        <div className="mt-8">
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
      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <p className="eyebrow mb-4 text-accent">07 / Next</p>
        <h2 className="display max-w-4xl text-[12vw] md:text-[5.4rem]">
          Have something
          <br />
          worth building?
        </h2>
        <p className="mt-6 max-w-xl text-muted">
          I'm interested in ambitious ideas, interesting technical problems and people who want to build something
          meaningful.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <MagneticButton cursor="open" onClick={() => goTo('/contact', '07', 'Contact')}>
            Start a conversation →
          </MagneticButton>
          <MagneticButton variant="ghost" cursor="view" onClick={() => goTo('/lab', '05', 'Lab')}>
            Enter the lab
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
