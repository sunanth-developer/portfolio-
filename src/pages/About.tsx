import { Portrait } from '@/components/Portrait'
import { RevealText } from '@/components/RevealText'

export default function About() {
  return (
    <article className="px-5 pt-page pb-20 md:px-8">
      <p className="eyebrow mb-5">
        <span className="mr-4 text-accent">01</span>
        About
      </p>
      <RevealText
        as="h1"
        text="The person behind the products."
        className="display max-w-5xl text-[12vw] md:text-[5.2rem]"
      />
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Portrait priority />
        <div className="space-y-6 text-lg text-muted md:text-xl">
          <p>
            I'm Sunanth Samala, a founder and developer focused on turning real-world problems into
            technology-driven products.
          </p>
          <p>
            I like being involved across the entire journey — understanding the problem, shaping the product, writing
            the software, launching it and learning from what happens next.
          </p>
          <p>I don't have to choose between understanding the business and understanding the technology.</p>
        </div>
      </div>

      <section className="mt-16 border-t border-line pt-10">
        <p className="eyebrow text-accent">Intersection</p>
        <div className="mt-8 overflow-x-auto font-display text-sm tracking-[0.12em] uppercase md:text-base">
          <div className="mx-auto grid min-w-[20rem] max-w-xl grid-cols-3 items-center gap-y-3 text-center">
            <span />
            <span>Founder</span>
            <span />
            <span />
            <span className="text-accent">↓</span>
            <span />
            <span />
            <span className="text-muted">Product thinking</span>
            <span />
            <span className="text-left text-muted">User</span>
            <span className="text-accent">← Sunanth →</span>
            <span className="text-right text-muted">Code</span>
            <span />
            <span className="text-accent">↑</span>
            <span />
            <span />
            <span className="text-muted">Engineering</span>
            <span />
            <span />
            <span className="text-accent">↓</span>
            <span />
            <span />
            <span>Systems</span>
            <span />
          </div>
        </div>
      </section>
    </article>
  )
}
