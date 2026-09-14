import { motion } from 'framer-motion'
import { whatIBuild } from '@/data/site'
import { SectionHeading } from '@/components/SectionHeading'
import { useApp } from '@/context/AppContext'

export function WhatIBuild() {
  const { setCursor } = useApp()

  return (
    <section className="px-5 py-28 md:px-10 md:py-36" id="build">
      <SectionHeading
        index="01"
        eyebrow="Practice"
        title="I don't just build software."
      />
      <p className="mt-8 max-w-2xl text-xl text-muted md:text-3xl">
        I build systems around problems worth solving.
      </p>
      <div className="mt-16 grid gap-4 md:grid-cols-3" style={{ perspective: 1200 }}>
        {whatIBuild.map((card, index) => (
          <motion.article
            key={card.index}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="group h-full border border-line p-8 transition-colors duration-500 hover:border-accent/50 md:min-h-[28rem]"
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={(event) => {
                setCursor('default')
                event.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)'
              }}
              onMouseMove={(event) => {
                if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                  const rect = event.currentTarget.getBoundingClientRect()
                  const x = (event.clientX - rect.left) / rect.width - 0.5
                  const y = (event.clientY - rect.top) / rect.height - 0.5
                  event.currentTarget.style.transform = `rotateX(${y * -7}deg) rotateY(${x * 7}deg)`
                }
              }}
            >
              <p className="eyebrow text-accent">{card.index}</p>
              <h3 className="display-title mt-10 text-5xl md:text-6xl">{card.title}</h3>
              <p className="mt-8 text-sm leading-relaxed text-muted md:text-base">{card.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
