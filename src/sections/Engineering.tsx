import { SectionHeading } from '@/components/SectionHeading'
import { TechnologyGraph } from '@/components/TechnologyGraph'

export function Engineering() {
  return (
    <section id="engineering" className="px-5 py-28 md:px-10 md:py-36">
      <SectionHeading index="04" eyebrow="Engineering" title="Under the hood." />
      <p className="mt-8 max-w-xl text-muted">
        Tools arranged around the thing they exist to serve. The center is always the product.
      </p>
      <div className="mt-16">
        <TechnologyGraph />
      </div>
    </section>
  )
}
