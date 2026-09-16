import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/hooks/useMediaQuery'

export function DisplayHeadline({
  lines,
  className,
  as: Tag = 'h1',
  delay = 0,
}: {
  lines: string[]
  className?: string
  as?: 'h1' | 'h2'
  delay?: number
}) {
  const reduced = useReducedMotion()

  return (
    <Tag className={cn('display', className)}>
      {lines.map((line, index) => (
        <span key={line} className="clip-text block">
          <motion.span
            className="block"
            initial={reduced ? false : { y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{
              duration: reduced ? 0 : 0.9,
              delay: reduced ? 0 : delay + index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
