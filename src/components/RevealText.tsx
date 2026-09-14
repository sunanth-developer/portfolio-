import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/hooks/useMediaQuery'

type Props = {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  delay?: number
}

export function RevealText({ text, className, as = 'p', delay = 0 }: Props) {
  const words = text.split(' ')
  const Tag = as
  const reduced = useReducedMotion()

  return (
    <Tag className={cn(className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="clip-text">
          <motion.span
            className="inline-block"
            initial={reduced ? false : { y: '115%', clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ y: '0%', clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: reduced ? 0 : 0.85,
              delay: reduced ? 0 : delay + index * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
