import type { FieldNote } from '@/data/notes'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'

export function FieldNoteCard({ note, featured = false }: { note: FieldNote; featured?: boolean }) {
  const { setCursor, goTo } = useApp()

  return (
    <button
      type="button"
      className="file-hover w-full border-t border-line py-10 text-left md:py-14"
      onMouseEnter={() => setCursor('view')}
      onMouseLeave={() => setCursor('default')}
      onClick={() => goTo(`/notes/${note.slug}`, '04', 'Thinking')}
    >
      <p className="type-meta">{note.category}</p>
      {!note.published && (
        <p className="mt-3 font-mono text-[10px] tracking-[0.18em] text-gold uppercase">Draft</p>
      )}
      <h3 className={cn('mt-5', featured ? 'type-l' : 'type-m')}>{note.title}</h3>
      <p className="type-body mt-5 text-muted">{note.excerpt}</p>
    </button>
  )
}
