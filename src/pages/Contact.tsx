import { site } from '@/data/site'
import { MagneticButton } from '@/components/MagneticButton'
import { Portrait } from '@/components/Portrait'

export default function Contact() {
  const mail = `mailto:${site.email}?subject=${encodeURIComponent('Something worth building')}`

  return (
    <article className="px-5 pt-32 pb-24 md:px-8 md:pt-40">
      <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="eyebrow mb-6">
            <span className="mr-4 text-accent">07</span>
            Contact
          </p>
          <h1 className="display text-[14vw] md:text-[6.4rem]">
            Have something
            <br />
            worth building?
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            I'm interested in ambitious ideas, interesting technical problems and people who want to build something
            meaningful.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MagneticButton cursor="open" onClick={() => {
              window.location.href = mail
            }}>
              Start a conversation →
            </MagneticButton>
            <MagneticButton variant="ghost" cursor="view" onClick={() => window.open(site.linkedin, '_blank', 'noreferrer')}>
              LinkedIn →
            </MagneticButton>
            <MagneticButton variant="ghost" cursor="view" onClick={() => window.open(site.github, '_blank', 'noreferrer')}>
              GitHub →
            </MagneticButton>
          </div>
          <a href={mail} className="mt-8 inline-block text-sm text-muted hover:text-fg">
            {site.email}
          </a>
        </div>
        <div className="w-full max-w-sm lg:justify-self-end">
          <Portrait caption={false} />
        </div>
      </div>
    </article>
  )
}
