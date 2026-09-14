import { useApp } from '@/context/AppContext'

export function ProjectCard({
  name,
  role,
  description,
  onOpen,
}: {
  name: string
  role: string
  description: string
  onOpen?: () => void
}) {
  const { setCursor } = useApp()

  return (
    <button
      type="button"
      className="w-full border border-line p-8 text-left transition-colors hover:border-accent/50"
      onClick={onOpen}
      onMouseEnter={() => setCursor('explore')}
      onMouseLeave={() => setCursor('default')}
    >
      <p className="eyebrow text-accent">{role}</p>
      <h3 className="display-title mt-6 text-5xl">{name}</h3>
      <p className="mt-6 max-w-xl text-muted">{description}</p>
    </button>
  )
}
