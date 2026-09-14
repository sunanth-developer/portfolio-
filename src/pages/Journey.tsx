import { Timeline } from '@/components/Timeline'

export default function Journey() {
  return (
    <article className="px-5 pt-36 pb-28 md:px-10 md:pt-44">
      <p className="eyebrow mb-6">
        <span className="mr-4 text-accent">04</span>
        Journey
      </p>
      <h1 className="display-title text-[14vw] md:text-[7rem]">The build log</h1>
      <p className="mt-8 max-w-xl text-lg text-muted">
        Not a resume. A sequence of stages — some still partly in shadow until you ask to see them.
      </p>
      <div className="mt-20">
        <Timeline />
      </div>
    </article>
  )
}
