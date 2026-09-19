import { ProjectIndex } from '@/components/ProjectIndex'
import { DriverSpotStory } from '@/sections/DriverSpotStory'
import { useApp } from '@/context/AppContext'
import { lazy, Suspense } from 'react'

const ProjectShowcase = lazy(() => import('@/components/ProjectShowcase'))

export default function Work() {
  const { profile } = useApp()
  const developer = profile === 'developer'

  if (developer) {
    return (
      <article className="pt-page pb-[var(--space-4xl)]">
        <div className="container">
          <p className="type-meta">Projects</p>
          <h1 className="type-xl mt-6 display-w">Things I've built.</h1>
          <p className="type-body mt-6 text-muted">
            Real products. Indexed work stays thin until verified detail exists.
          </p>
          <div className="mt-16">
            <ProjectIndex />
          </div>
        </div>
      </article>
    )
  }

  return (
    <div className="pt-page">
      <div className="container">
        <p className="type-meta">Work</p>
        <h1 className="type-xl mt-6">What I build.</h1>
        <p className="type-body mt-6 text-muted">
          DriverSpot is the flagship. Other builds are indexed without invented case studies.
        </p>
      </div>
      <DriverSpotStory />
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <ProjectShowcase />
      </Suspense>
    </div>
  )
}
