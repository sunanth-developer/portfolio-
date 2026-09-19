import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { waveEase, waveSettle, type WaveMode } from '@/lib/wave'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

export function WaveBuild({
  text,
  lines,
  mode = 'words',
  as: Tag = 'p',
  className,
  delay = 0,
  once = true,
  play = 'view',
}: {
  text?: string
  lines?: string[]
  mode?: WaveMode
  as?: Tag
  className?: string
  delay?: number
  once?: boolean
  play?: 'view' | 'mount'
}) {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const items = lines ?? (text ? [text] : [])
  const words = (text ?? items.join(' ')).split(' ')
  const travel = mobile ? 10 : 18
  const slide = mobile ? 16 : 28
  const trigger =
    play === 'mount'
      ? { animate: 'visible' as const }
      : { whileInView: 'visible' as const }

  if (reduced) {
    return <Tag className={className}>{text ?? items.join(' ')}</Tag>
  }

  if (mode === 'lines' || (mode === 'text' && items.length > 1)) {
    return (
      <Tag className={className}>
        <motion.span
          className="block"
          initial="hidden"
          {...trigger}
          viewport={{ once, margin: '0px 0px -8% 0px' }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.14, delayChildren: delay },
            },
          }}
        >
          {items.map((line) => (
            <span key={line} className="clip-text block">
              <motion.span
                className="block"
                variants={{
                  hidden: { y: `${travel + 8}%`, opacity: 0.2 },
                  visible: {
                    y: '0%',
                    opacity: 1,
                    transition: { duration: 0.95, ease: waveSettle },
                  },
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </Tag>
    )
  }

  return (
    <Tag className={cn(className)}>
      <motion.span
        className="block"
        initial="hidden"
        {...trigger}
        viewport={{ once, margin: '0px 0px -8% 0px' }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: mode === 'flow' ? 0.07 : 0.045,
              delayChildren: delay,
            },
          },
        }}
      >
        {words.map((word, index) => {
          const mid = (words.length - 1) / 2
          const offset = index - mid
          const waveY = travel + Math.sin(index * 0.9) * 6
          const assembleX = mode === 'assemble' || mode === 'merge' ? offset * (mobile ? 6 : 10) : 0
          const flowX = mode === 'flow' ? slide : assembleX

          return (
            <span key={`${word}-${index}`}>
              <motion.span
                className="inline-block will-change-transform"
                variants={{
                  hidden: {
                    y: mode === 'flow' ? 0 : waveY,
                    x: flowX,
                    opacity: 0,
                    rotate: mode === 'assemble' ? offset * 1.4 : 0,
                  },
                  visible: {
                    y: 0,
                    x: 0,
                    opacity: 1,
                    rotate: 0,
                    transition: {
                      duration: mode === 'assemble' ? 0.82 : 0.88,
                      ease: mode === 'assemble' ? waveEase : waveSettle,
                    },
                  },
                }}
              >
                {word}
                {index < words.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          )
        })}
      </motion.span>
    </Tag>
  )
}
