import { useParams } from 'react-router-dom'
import { fieldNotes } from '@/data/fieldNotes'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'

export default function FieldNoteDetail() {
  const { slug } = useParams()
  const { goTo } = useApp()
  const note = fieldNotes.find((item) => item.slug === slug)

  if (!note) {
    return (
      <article className="px-5 pt-36 pb-28 md:px-10">
        <h1 className="display-title text-5xl">Note not found</h1>
        <div className="mt-8">
          <MagneticButton variant="ghost" onClick={() => goTo('/notes', '06', 'Field Notes')}>
            Back to field notes
          </MagneticButton>
        </div>
      </article>
    )
  }

  return (
    <article className="px-5 pt-36 pb-28 md:px-10 md:pt-44">
      <p className="eyebrow text-accent">{note.category}</p>
      <h1 className="display-title mt-8 max-w-5xl text-[11vw] md:text-7xl">{note.title}</h1>
      <p className="mt-6 text-xs tracking-[0.2em] text-muted uppercase">{note.readTime}</p>
      <div className="mt-16 max-w-2xl space-y-8 text-lg leading-relaxed text-muted">
        {note.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-16">
        <MagneticButton variant="line" onClick={() => goTo('/notes', '06', 'Field Notes')}>
          ← Field notes
        </MagneticButton>
      </div>
    </article>
  )
}
