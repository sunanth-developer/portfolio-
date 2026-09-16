import { RevealText } from '@/components/RevealText'
import { cn } from '@/lib/cn'

export function SectionHeading({
  title,
  className,
}: {
  title: string
  className?: string
}) {
  return (
    <header className={cn('max-w-6xl', className)}>
      <RevealText as="h2" text={title} className="display text-[12vw] md:text-[6.2rem]" />
    </header>
  )
}
