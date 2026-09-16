import { cn } from '@/lib/cn'

export function SectionMeta({
  index,
  label,
  className,
}: {
  index: string
  label: string
  className?: string
}) {
  return (
    <p className={cn('font-mono text-[11px] tracking-[0.28em] text-accent uppercase', className)}>
      <span>{index}</span>
      <span className="mx-2 text-meta" aria-hidden>
        /
      </span>
      <span>{label}</span>
    </p>
  )
}
