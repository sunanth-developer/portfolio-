import { motion } from 'framer-motion'
import { ventures } from '@/data/projects'
import { ProjectCaseStudy } from '@/components/ProjectCaseStudy'
import { useApp } from '@/context/AppContext'

export function Ventures() {
  const venture = ventures[0]
  const { setCursor } = useApp()

  if (!venture) return null

  return (
    <section id="ventures" className="px-5 py-28 md:px-10 md:py-36">
      <p className="eyebrow mb-6">
        <span className="mr-4 text-accent">02</span>
        Ventures
      </p>
      <h2 className="display-title text-[14vw] md:text-[7rem]">{venture.name}</h2>
      <p className="mt-4 text-sm tracking-[0.18em] text-muted uppercase">{venture.role}</p>
      <p className="mt-8 max-w-2xl text-lg text-muted md:text-xl">{venture.description}</p>

      <div className="mt-12 flex flex-wrap gap-2">
        {venture.capabilities.map((tag, index) => (
          <motion.span
            key={tag}
            className="border border-line px-3 py-2 font-display text-[10px] tracking-[0.18em] uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.45 }}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('default')}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <div className="mt-16">
        <ProjectCaseStudy venture={venture} />
      </div>
    </section>
  )
}
