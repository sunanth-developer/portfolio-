import { site } from '@/data/site'
import { MagneticButton } from '@/components/MagneticButton'
import { WaveBuild } from '@/components/WaveBuild'

export default function Contact() {
  const mail = `mailto:${site.email}?subject=${encodeURIComponent('A problem worth solving')}`

  return (
    <article className="pt-page pb-[var(--space-4xl)]">
      <div className="container">
        <p className="type-meta">Contact</p>
        <WaveBuild
          as="h1"
          text="Have a problem worth solving?"
          mode="words"
          play="mount"
          className="type-xl mt-6 display-w"
        />
        <p className="type-body mt-8 text-muted">
          I'm always interested in thoughtful conversations, interesting products and difficult problems.
        </p>
        <div className="mt-14 flex flex-col gap-2">
          <MagneticButton
            cursor="open"
            onClick={() => {
              window.location.href = mail
            }}
          >
            Email →
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            cursor="view"
            onClick={() => window.open(site.linkedin, '_blank', 'noreferrer')}
          >
            LinkedIn →
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            cursor="view"
            onClick={() => window.open(site.github, '_blank', 'noreferrer')}
          >
            GitHub →
          </MagneticButton>
        </div>
        <a href={mail} className="type-meta mt-10 inline-block hover:text-fg">
          {site.email}
        </a>
      </div>
    </article>
  )
}
