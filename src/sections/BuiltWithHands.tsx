import { SectionHeading } from '@/components/SectionHeading'
import { BuildPipeline } from '@/components/BuildPipeline'

export function BuiltWithHands() {
  return (
    <section className="px-5 py-28 md:px-10 md:py-36">
      <SectionHeading index="05" eyebrow="Ownership" title="From idea to production." />
      <p className="mt-8 max-w-xl text-muted">
        The point is not a title. It is the ability to hold a product from the first sketch to the people who use it.
      </p>
      <div className="mt-16">
        <BuildPipeline />
      </div>
    </section>
  )
}
