import { Portrait } from '@/components/Portrait'
import { DisplayHeadline } from '@/components/DisplayHeadline'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'

export default function About() {
  const { goTo, profile } = useApp()
  const home = profile === 'developer' ? '/developer' : '/founder'

  return (
    <article className="px-5 pt-page pb-20 md:px-8">
      <DisplayHeadline
        lines={['More than just code.']}
        className="max-w-5xl text-[12vw] md:text-[5.2rem]"
      />
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="flex justify-center lg:col-span-5 lg:justify-start">
          <Portrait priority className="w-full max-w-[19rem] sm:max-w-[22rem] lg:max-w-[24rem]" />
        </div>
        <div className="space-y-6 text-lg text-muted md:text-xl lg:col-span-7">
          <p>
            I'm Sunanth Samala — founder, builder, technologist, product thinker. I turn real-world problems into
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
        <p className="max-w-xl text-muted">
          Technology, products, business, curiosity and execution — the same mind, looking through two lenses.
        </p>
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
        <div className="mt-12">
          <MagneticButton
            variant="ghost"
            onClick={() => goTo(home, '01', profile === 'developer' ? 'Developer' : 'Founder')}
          >
            Back to profile →
          </MagneticButton>
        </div>
      </section>
    </article>
  )
}
