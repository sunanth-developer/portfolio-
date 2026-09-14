import { RevealText } from '@/components/RevealText'
import { cn } from '@/lib/cn'

export function SectionHeading({
  index,
  eyebrow,
  title,
  className,
}: {
  index?: string
  eyebrow?: string
  title: string
  className?: string
}) {
  return (
    <header className={cn('max-w-6xl', className)}>
      <p className="eyebrow mb-6">
        {index ? <span className="mr-4 text-accent">{index}</span> : null}
        {eyebrow}
      </p>
      <RevealText as="h2" text={title} className="display text-[12vw] md:text-[6.2rem]" />
    </header>
  )
}
