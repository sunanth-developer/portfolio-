import { JourneyTimeline } from '@/components/Timeline'

export default function Journey() {
  return (
    <article className="px-5 pt-32 pb-24 md:px-8 md:pt-40">
      <p className="eyebrow mb-6">
        <span className="mr-4 text-accent">04</span>
        The build log
      </p>
      <h1 className="display text-[16vw] md:text-[8rem]">2018 → Now</h1>
      <p className="mt-8 max-w-xl text-muted">
        Not a resume. A sequence of stages — some still in shadow until you ask to see them.
      </p>
      <div className="mt-16">
        <JourneyTimeline />
      </div>
    </article>
  )
}
