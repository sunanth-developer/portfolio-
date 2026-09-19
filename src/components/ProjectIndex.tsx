import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { asset, projectCovers } from '@/data/visuals'
import { useApp } from '@/context/AppContext'
import { useIsFinePointer, useReducedMotion } from '@/hooks/useMediaQuery'
import { traceEase } from '@/lib/trace'
import { cn } from '@/lib/cn'

export function ProjectIndex() {
  const { goTo, setCursor } = useApp()
  const fine = useIsFinePointer()
  const reduced = useReducedMotion()
  const [hover, setHover] = useState<string | null>(null)
  const [focus, setFocus] = useState<string | null>(null)
  const active = fine ? (hover ?? focus) : null

  return (
    <ul>
      {projects.map((project) => {
        const cover = projectCovers[project.id]
        const lit = !active || active === project.id
        const on = active === project.id
        const meta = [project.status === 'Live' ? 'PRODUCTION' : project.status, ...(project.technology ?? []).slice(0, 3)]
          .filter(Boolean)
          .join(' · ')
        const nodes = (project.technology ?? []).slice(0, 4)

        return (
          <li key={project.id} className="relative">
            <button
              type="button"
              className="group relative w-full py-7 text-left md:py-9"
              aria-label={`Inspect ${project.title}`}
              onMouseEnter={() => {
                setHover(project.id)
                setCursor('case')
              }}
              onMouseLeave={() => {
                setHover(null)
                setCursor('default')
              }}
              onFocus={() => setFocus(project.id)}
              onBlur={() => setFocus(null)}
              onClick={() => goTo(`/work/${project.id}`, project.index, project.title)}
            >
              <motion.span
                aria-hidden
                className="absolute top-0 left-0 h-px origin-left bg-developer/70"
                initial={false}
                animate={{ scaleX: on ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 0.45, ease: traceEase }}
              />
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <motion.h3
                    className="display mt-2 text-[clamp(2rem,11vw,6.4rem)] leading-[0.92]"
                    animate={{ opacity: lit ? 1 : 0.22 }}
                    transition={{ duration: reduced ? 0 : 0.35 }}
                  >
                    {project.title}
                  </motion.h3>
                  <p
                    className={cn(
                      'mt-3 text-base text-muted md:text-lg',
                      !project.line && !project.description && 'italic',
                    )}
                  >
                    {project.line ||
                      project.description ||
                      'Indexed. Detail stays thin until it can be verified.'}
                  </p>
                  <div
                    className={cn(
                      'mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity',
                      fine && !on ? 'md:opacity-0' : 'opacity-100',
                    )}
                  >
                    {meta && <span className="text-meta">{meta}</span>}
                    <span className="text-developer">Inspect →</span>
                  </div>
                </div>
                <motion.div
                  className="relative hidden w-[15rem] shrink-0 overflow-hidden lg:block"
                  initial={false}
                  animate={{
                    opacity: on ? 1 : 0,
                    y: on ? 0 : 10,
                    x: on ? 0 : 12,
                  }}
                  transition={{ duration: reduced ? 0 : 0.4, ease: traceEase }}
                  aria-hidden={!on}
                >
                  {cover ? (
                    <img
                      src={asset(cover.src)}
                      alt=""
                      width={cover.width}
                      height={cover.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] h-auto w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-[4/3] border border-line bg-elevated" />
                  )}
                  {nodes.length > 0 && (
                    <p className="mt-3 font-mono text-[9px] tracking-[0.18em] text-developer uppercase">
                      {nodes.join(' → ')}
                    </p>
                  )}
                </motion.div>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
