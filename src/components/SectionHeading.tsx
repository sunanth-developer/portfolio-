import { RevealText } from '@/components/RevealText'
import { cn } from '@/lib/cn'

type Props = {
  index?: string
  eyebrow?: string
  title: string
  className?: string
}

export function SectionHeading({ index, eyebrow, title, className }: Props) {
  return (
    <header className={cn('max-w-5xl', className)}>
      <p className="eyebrow mb-6">
        {index ? <span className="mr-4 text-accent">{index}</span> : null}
        {eyebrow}
      </p>
      <RevealText
        as="h2"
        text={title}
        className="display-title text-[12vw] text-fg md:text-[5.5rem] lg:text-[6.5rem]"
      />
    </header>
  )
}
