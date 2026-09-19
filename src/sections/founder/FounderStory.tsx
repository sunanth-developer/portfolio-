import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EditorialImage } from '@/components/EditorialImage'
import { FounderConvergence } from '@/components/FounderConvergence'
import { FounderPinnedChapters } from '@/components/FounderPinnedChapters'
import { MagneticButton } from '@/components/MagneticButton'
import { useApp } from '@/context/AppContext'
import { founderIdentity, founderStages } from '@/data/founder'
import { asset } from '@/data/visuals'
import { waveEase, waveSettle } from '@/lib/wave'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/hooks/useMediaQuery'

export function FounderStory() {
  const { goTo } = useApp()
  const curious = founderStages[0]
  const building = founderStages[4]
  const solver = founderStages[7]

  return (
    <div>
      <Band background={curious.image}>
        <h2 className="type-l line-fit text-[#F5F4EF]">{curious.headline}</h2>
        <div className="type-body mx-auto mt-8 space-y-3 text-[#F5F4EF]/80">
          {curious.body.map((line) => (
            <p key={line} className="line-fit">
              {line}
            </p>
          ))}
        </div>
      </Band>

      <FounderPinnedChapters />

      <Band>
        <p className="type-body text-muted line-fit">{building.headline}</p>
        <h2 className="type-l mt-6">{building.subhead}</h2>
        <div className="type-body mx-auto mt-8 text-muted">
          {building.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        {building.image && (
          <EditorialImage
            src={building.image.src}
            alt={building.image.alt}
            width={building.image.width}
            height={building.image.height}
            className="mx-auto mt-16 aspect-[2.1/1] w-full"
            imgClassName="object-[center_42%]"
            sizes="95vw"
          />
        )}
        <FlowLine stages={building.journey ?? []} />
        <div className="mt-12 flex justify-center">
          <MagneticButton cursor="explore" onClick={() => goTo('/work/driverspot', '02', 'DriverSpot')}>
            Open the DriverSpot file →
          </MagneticButton>
        </div>
      </Band>

      <Band className="pb-[var(--space-4xl)]">
        <p className="type-meta">Identity · Problem Solver</p>
        <span className="mx-auto mt-6 block h-px w-20 bg-founder" aria-hidden />
        <h2 className="type-xl mt-8 line-fit">Problem Solver</h2>
        <div className="mx-auto mt-16">
          <FounderConvergence />
        </div>
        <motion.div
          className="mt-20"
          initial={{ y: 12, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-18%' }}
          transition={{ duration: 1, delay: 0.12, ease: waveEase }}
        >
          <p className="type-l line-fit">{founderIdentity.close[0]}</p>
          <p className="type-m mt-4 text-founder line-fit">{founderIdentity.close[1]}</p>
        </motion.div>
        <div className="type-body mx-auto mt-12 space-y-4 text-muted">
          {solver.body.map((line) => (
            <p key={line} className="line-fit">
              {line}
            </p>
          ))}
        </div>
        <p className="type-h mt-12 line-fit">{solver.supporting}</p>
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton cursor="open" onClick={() => goTo('/contact', '06', 'Contact')}>
            Start a conversation →
          </MagneticButton>
          <MagneticButton variant="ghost" cursor="view" onClick={() => goTo('/about', '05', 'About')}>
            About
          </MagneticButton>
        </div>
      </Band>
    </div>
  )
}

function Band({
  children,
  className,
  background,
}: {
  children: ReactNode
  className?: string
  background?: { src: string; alt: string }
}) {
  return (
    <section
      aria-label={background?.alt}
      className={cn(
        'relative overflow-x-clip band',
        background && 'flex min-h-[85svh] items-center',
        className,
      )}
    >
      {background && (
        <div className="absolute inset-0" aria-hidden>
          <img
            src={asset(background.src)}
            alt=""
            className="h-full w-full object-cover object-[center_22%] md:object-[center_28%] lg:object-[center_32%]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(8_9_9/0.28),rgb(8_9_9/0.18)_50%,rgb(8_9_9/0.42))]" />
        </div>
      )}
      <div className="founder-story relative z-10">{children}</div>
    </section>
  )
}

function FlowLine({ stages }: { stages: readonly string[] }) {
  const reduced = useReducedMotion()

  return (
    <ol className="mt-16 flex flex-col items-center gap-3 md:flex-row md:flex-wrap md:justify-center md:gap-x-6">
      {stages.map((stage, index) => (
        <motion.li
          key={stage}
          className="flex flex-col items-center gap-3 md:flex-row md:gap-6"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : index * 0.05, ease: waveSettle }}
        >
          <span className="type-meta">{stage}</span>
          {index < stages.length - 1 && (
            <>
              <span className="h-6 w-px bg-founder/70 md:hidden" aria-hidden />
              <span className="hidden h-px w-8 bg-founder/70 md:block" aria-hidden />
            </>
          )}
        </motion.li>
      ))}
    </ol>
  )
}
