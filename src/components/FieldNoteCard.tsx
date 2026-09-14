import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'
import type { FieldNote } from '@/data/fieldNotes'

export function FieldNoteCard({ note, featured = false }: { note: FieldNote; featured?: boolean }) {
  const { setCursor, goTo } = useApp()

  return (
    <button
      type="button"
      className={cn(
        'group relative block w-full overflow-hidden border border-line p-6 text-left md:p-10',
        featured && 'md:p-14',
      )}
      onMouseEnter={() => setCursor('view')}
      onMouseLeave={() => setCursor('default')}
      onClick={() => goTo(`/notes/${note.slug}`, '06', 'Field Notes')}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 80% 20%, rgba(122,140,255,0.16), transparent 42%)',
        }}
      />
      <p className="eyebrow relative text-accent">{note.category}</p>
      <h3
        className={cn(
          'display-title relative mt-6',
          featured ? 'text-4xl md:text-7xl' : 'text-3xl md:text-4xl',
        )}
      >
        {note.title}
      </h3>
      <p className="relative mt-6 max-w-2xl text-muted">{note.excerpt}</p>
      <p className="relative mt-8 text-[11px] tracking-[0.2em] text-muted uppercase">{note.readTime}</p>
    </button>
  )
}
