import { lazy, Suspense } from 'react'
import { DriverSpotStory } from '@/sections/DriverSpotStory'
import { DisplayHeadline } from '@/components/DisplayHeadline'
import { ProjectFiles } from '@/components/ProjectFiles'
import { SectionMeta } from '@/components/SectionMeta'
import { useApp } from '@/context/AppContext'

const ProjectShowcase = lazy(() => import('@/components/ProjectShowcase'))

export default function Work() {
  const { profile } = useApp()
  const developer = profile === 'developer'

  return (
    <div className="pt-page">
      <div className="px-5 md:px-8">
        <SectionMeta index="02" label={developer ? 'Projects' : 'Work'} />
        <DisplayHeadline
          lines={developer ? ["Things I've built."] : ['What I build.']}
          className="mt-4 text-[12vw] md:text-[7rem]"
        />
        <p className="mt-6 max-w-xl text-muted">
          {developer
            ? 'Technical case files. Indexed work stays thin until verified detail is added.'
            : 'DriverSpot is the flagship. Other builds are indexed without invented case studies.'}
        </p>
      </div>
      {developer ? (
        <div className="px-5 py-12 md:px-8">
          <ProjectFiles />
        </div>
      ) : (
        <>
          <DriverSpotStory eyebrow="02 / Venture" />
          <Suspense fallback={<div className="min-h-[40vh]" />}>
            <ProjectShowcase />
          </Suspense>
        </>
      )}
    </div>
  )
}
