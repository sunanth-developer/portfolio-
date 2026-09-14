import type { FieldNote } from '@/data/notes'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'

export function FieldNoteCard({ note, featured = false }: { note: FieldNote; featured?: boolean }) {
  const { setCursor, goTo } = useApp()

  return (
    <button
      type="button"
      className={cn('w-full border border-line p-6 text-left md:p-10', featured && 'md:p-14')}
      onMouseEnter={() => setCursor('view')}
      onMouseLeave={() => setCursor('default')}
      onClick={() => goTo(`/notes/${note.slug}`, '06', 'Thinking')}
    >
      <p className="eyebrow text-accent">{note.category}</p>
      {!note.published && (
        <p className="mt-3 text-[10px] tracking-[0.18em] text-accent uppercase">Draft</p>
      )}
      <h3 className={cn('display mt-5', featured ? 'text-4xl md:text-6xl' : 'text-3xl')}>{note.title}</h3>
      <p className="mt-5 max-w-2xl text-muted">{note.excerpt}</p>
    </button>
  )
}
