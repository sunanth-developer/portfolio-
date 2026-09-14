import { lazy, Suspense } from 'react'
import { DriverSpotStory } from '@/sections/DriverSpotStory'

const ProjectShowcase = lazy(() => import('@/components/ProjectShowcase'))

export default function Work() {
  return (
    <div className="pt-16">
      <div className="px-5 pt-16 md:px-8">
        <p className="eyebrow mb-4">
          <span className="mr-4 text-accent">02</span>
          Work
        </p>
        <h1 className="display text-[16vw] md:text-[8rem]">What I build.</h1>
      </div>
      <DriverSpotStory />
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <ProjectShowcase />
      </Suspense>
    </div>
  )
}
