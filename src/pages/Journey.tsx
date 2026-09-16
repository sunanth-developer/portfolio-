import { DisplayHeadline } from '@/components/DisplayHeadline'
import { SectionMeta } from '@/components/SectionMeta'
import { JourneyTimeline } from '@/components/Timeline'

export default function Journey() {
  return (
    <article className="px-5 pt-page pb-24 md:px-8">
      <SectionMeta index="03" label="Journey" />
      <DisplayHeadline
        lines={['A journey of building.']}
        className="mt-6 text-[12vw] md:text-[7rem]"
      />
      <p className="mt-8 max-w-xl text-muted">
        Not a resume. A sequence of stages already in the work — years only where they are known.
      </p>
      <div className="mt-16">
        <JourneyTimeline />
      </div>
    </article>
  )
}
