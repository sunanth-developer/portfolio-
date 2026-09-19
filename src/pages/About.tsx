import { Portrait } from '@/components/Portrait'
import { MagneticButton } from '@/components/MagneticButton'
import { WaveBuild } from '@/components/WaveBuild'
import { useApp } from '@/context/AppContext'

export default function About() {
  const { goTo, profile } = useApp()
  const home = profile === 'developer' ? '/developer' : '/founder'

  return (
    <article className="pt-page pb-[var(--space-4xl)]">
      <div className="container">
        <p className="type-meta">About</p>
        <WaveBuild
          as="h1"
          text="I'm interested in problems that sit between technology and people."
          mode="words"
          play="mount"
          className="type-l mt-6 display-w"
        />
        <div className="mt-16 grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Portrait priority className="aspect-[4/5] w-full" />
          </div>
          <div className="type-body space-y-6 text-muted lg:col-span-7">
            <p>
              I'm a developer and founder who likes understanding how things work — and figuring out how they could work
              better.
            </p>
            <p>My work sits between software, products and real-world problems.</p>
            <p>I build, experiment, learn and occasionally start something that needs to exist.</p>
            <MagneticButton
              variant="ghost"
              onClick={() => goTo(home, '01', profile === 'developer' ? 'Developer' : 'Founder')}
            >
              Back to profile →
            </MagneticButton>
          </div>
        </div>
      </div>
    </article>
  )
}
