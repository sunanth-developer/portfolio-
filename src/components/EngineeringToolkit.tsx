import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TraceLine } from '@/components/TraceLine'
import { useApp } from '@/context/AppContext'
import type { CursorKind } from '@/context/AppContext'
import {
  techById,
  toolkitCategories,
  toolkitLayouts,
  toolkitTech,
} from '@/data/toolkit'
import type { ToolkitCategoryId, ToolkitTech } from '@/data/toolkit'
import { useIsFinePointer, useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'
import { traceEase, traceStroke } from '@/lib/trace'
import { cn } from '@/lib/cn'

export function EngineeringToolkit() {
  const { setCursor, goTo } = useApp()
  const mobile = useIsMobile()
  const fine = useIsFinePointer()
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const [entered, setEntered] = useState(reduced)
  const [category, setCategory] = useState<ToolkitCategoryId>('core')
  const [hover, setHover] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>(null)
  const focus = open ?? hover
  const inspected = (open ? techById(open) : null) ?? null
  const layout = toolkitLayouts[category]
  const visibleIds = useMemo(() => new Set(layout.map((node) => node.id)), [layout])

  useEffect(() => {
    if (reduced) {
      setEntered(true)
      return
    }
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  const traces = useMemo(() => {
    const pairs: { key: string; from: string; to: string; hot: boolean }[] = []
    const seen = new Set<string>()
    layout.forEach((node) => {
      const tech = techById(node.id)
      tech?.connected.forEach((target) => {
        if (!visibleIds.has(target)) return
        const key = [node.id, target].sort().join('-')
        if (seen.has(key)) return
        seen.add(key)
        const hot = Boolean(focus && (focus === node.id || focus === target))
        pairs.push({ key, from: node.id, to: target, hot })
      })
    })
    return pairs
  }, [focus, layout, visibleIds])

  const selectCategory = (id: ToolkitCategoryId) => {
    setCategory(id)
    setHover(null)
    setOpen(null)
  }

  const inspect = (id: string) => {
    setOpen((current) => (current === id ? null : id))
  }

  return (
    <section ref={rootRef} id="toolkit" className="band" aria-labelledby="toolkit-title">
      <div className="container">
        <motion.p
          className="type-meta"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: entered ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: traceEase }}
        >
          LANGUAGES · INTERFACE · SYSTEMS · MOBILE · INTEGRATIONS · INFRASTRUCTURE
        </motion.p>
        <motion.h2
          id="toolkit-title"
          className="type-l mt-5"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: entered ? 1 : 0, y: entered || reduced ? 0 : 14 }}
          transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.08, ease: traceEase }}
        >
          Engineering toolkit
        </motion.h2>
        <motion.p
          className="type-body mt-6 text-muted"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: entered ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.18, ease: traceEase }}
        >
          Tools I use to turn problems into products.
        </motion.p>

        <motion.div
          className="mt-6 h-px w-24 origin-left bg-developer/70"
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: entered ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.28, ease: traceEase }}
          aria-hidden
        />

        {mobile ? (
          <MobileToolkit
            category={category}
            open={open}
            entered={entered}
            onCategory={selectCategory}
            onInspect={inspect}
            onProject={(href) => goTo(href, '02', 'DriverSpot')}
            setCursor={setCursor}
          />
        ) : (
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <nav className="lg:col-span-3" aria-label="Toolkit categories">
              <ul>
                {toolkitCategories.map((item, index) => {
                  const active = category === item.id
                  return (
                    <li key={item.id}>
                      <motion.button
                        type="button"
                        className={cn(
                          'flex min-h-11 w-full items-center justify-between border-b border-line py-3 text-left',
                          active ? 'text-fg' : 'text-muted hover:text-fg',
                        )}
                        initial={reduced ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: entered ? 1 : 0, x: entered || reduced ? 0 : -8 }}
                        transition={{
                          duration: reduced ? 0 : 0.4,
                          delay: reduced ? 0 : 0.32 + index * 0.04,
                          ease: traceEase,
                        }}
                        onClick={() => selectCategory(item.id)}
                        onMouseEnter={() => setCursor('trace')}
                        onMouseLeave={() => setCursor('default')}
                        aria-pressed={active}
                      >
                        <span className="font-mono text-[11px] tracking-[0.22em] uppercase">{item.label}</span>
                        {active && <span className="h-px w-8 bg-developer/70" aria-hidden />}
                      </motion.button>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="lg:col-span-9">
              <div className="relative min-h-[32rem] overflow-hidden border-t border-line pt-8 lg:min-h-[38rem]">
                <span className="pointer-events-none absolute top-3 left-0 font-mono text-[9px] tracking-[0.2em] text-meta uppercase">
                  00,00
                </span>
                <span className="pointer-events-none absolute top-3 right-0 font-mono text-[9px] tracking-[0.2em] text-meta uppercase">
                  field
                </span>
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                  aria-hidden
                >
                  {traces.map((link) => {
                    const from = layout.find((item) => item.id === link.from)
                    const to = layout.find((item) => item.id === link.to)
                    if (!from || !to) return null
                    return (
                      <TraceLine
                        key={`${category}-${link.key}`}
                        d={`M ${from.x + 6} ${from.y + 5} L ${to.x + 6} ${to.y + 5}`}
                        drawn={entered}
                        duration={reduced ? 0 : 0.65}
                        className="[vector-effect:non-scaling-stroke]"
                        stroke={link.hot ? traceStroke : 'rgba(243,244,239,0.14)'}
                        width={link.hot ? 1.15 : 1}
                      />
                    )
                  })}
                </svg>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={category}
                    className="absolute inset-0"
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: entered ? 1 : 0 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.55, ease: traceEase }}
                  >
                    {layout.map((node, index) => {
                      const tech = techById(node.id)
                      if (!tech) return null
                      const active = focus === tech.id
                      const related = Boolean(focus && (focus === tech.id || tech.connected.includes(focus)))
                      const quiet = Boolean(focus) && !related
                      return (
                        <motion.button
                          key={tech.id}
                          type="button"
                          className="absolute max-w-[38%] text-left outline-offset-4"
                          style={{ left: `${node.x}%`, top: `${node.y}%` }}
                          initial={reduced ? false : { opacity: 0, y: 8 }}
                          animate={{
                            opacity: quiet ? 0.28 : related || active ? 1 : 0.55,
                            y: 0,
                          }}
                          transition={{
                            duration: reduced ? 0 : 0.38,
                            delay: reduced ? 0 : 0.08 + index * 0.035,
                            ease: traceEase,
                          }}
                          onMouseEnter={() => {
                            if (fine) setHover(tech.id)
                            setCursor('inspect')
                          }}
                          onMouseLeave={() => {
                            setHover(null)
                            setCursor('default')
                          }}
                          onFocus={() => setHover(tech.id)}
                          onBlur={() => setHover(null)}
                          onClick={() => inspect(tech.id)}
                          aria-pressed={open === tech.id}
                          aria-expanded={open === tech.id}
                        >
                          <span
                            className={cn(
                              'display block leading-[1.05] transition-colors duration-300',
                              tech.scale === 'lg' && 'text-3xl lg:text-4xl',
                              tech.scale === 'md' && 'text-xl lg:text-2xl',
                              tech.scale === 'sm' && 'text-base lg:text-lg',
                              active ? 'text-fg' : related ? 'text-fg' : 'text-muted',
                            )}
                          >
                            {tech.name}
                          </span>
                          <span
                            className={cn(
                              'mt-1 block font-mono text-[9px] tracking-[0.18em] uppercase transition-colors duration-300',
                              active ? 'text-developer' : 'text-meta',
                            )}
                          >
                            {tech.categories.length > 1
                              ? tech.categories.map((id) => id.toUpperCase()).join(' · ')
                              : tech.role}
                          </span>
                        </motion.button>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              <InspectPanel
                tech={inspected}
                onProject={() => goTo('/work/driverspot', '02', 'DriverSpot')}
                setCursor={setCursor}
              />
            </div>
          </div>
        )}

        <div className="mt-20">
          <p className="display text-2xl md:text-4xl">Tools change.</p>
          <p className="display mt-2 text-2xl text-muted md:text-4xl">Problem solving doesn't.</p>
          <span className="mt-10 block h-16 w-px bg-developer/70" aria-hidden />
        </div>
      </div>
    </section>
  )
}

function MobileToolkit({
  category,
  open,
  entered,
  onCategory,
  onInspect,
  onProject,
  setCursor,
}: {
  category: ToolkitCategoryId
  open: string | null
  entered: boolean
  onCategory: (id: ToolkitCategoryId) => void
  onInspect: (id: string) => void
  onProject: (href: string) => void
  setCursor: (cursor: CursorKind) => void
}) {
  const reduced = useReducedMotion()
  const items = toolkitTech.filter((item) => item.categories.includes(category))
  const selected = (open ? techById(open) : null) ?? null

  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Toolkit categories">
        {toolkitCategories.map((item) => {
          const active = category === item.id
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={cn(
                'min-h-11 border px-3 py-2 font-mono text-[10px] tracking-[0.18em] uppercase',
                active ? 'border-developer/70 text-fg' : 'border-line text-muted',
              )}
              onClick={() => onCategory(item.id)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <ul className="mt-8">
        {items.map((item, index) => {
          const active = open === item.id
          return (
            <motion.li
              key={item.id}
              className="border-b border-line"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: entered ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : index * 0.03 }}
            >
              <button
                type="button"
                className="flex min-h-11 w-full items-baseline justify-between gap-4 py-4 text-left"
                onClick={() => onInspect(item.id)}
                aria-expanded={active}
                aria-pressed={active}
              >
                <span className={cn('display text-2xl', active ? 'text-fg' : 'text-muted')}>{item.name}</span>
                <span className="font-mono text-[9px] tracking-[0.16em] text-meta uppercase">{item.role}</span>
              </button>
            </motion.li>
          )
        })}
      </ul>
      <InspectPanel
        tech={selected}
        onProject={() => onProject('/work/driverspot')}
        setCursor={setCursor}
      />
    </div>
  )
}

function InspectPanel({
  tech,
  onProject,
  setCursor,
}: {
  tech: ToolkitTech | null
  onProject: () => void
  setCursor: (cursor: CursorKind) => void
}) {
  const reduced = useReducedMotion()

  return (
    <div className="mt-10 min-h-[8.5rem] border-t border-line pt-6" aria-live="polite">
      <AnimatePresence mode="wait">
        {tech ? (
          <motion.div
            key={tech.id}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: traceEase }}
          >
            <p className="font-mono text-[10px] tracking-[0.22em] text-developer uppercase">Inspect</p>
            <h3 className="display mt-3 text-2xl md:text-4xl">{tech.name}</h3>
            <p className="mt-2 font-mono text-[10px] tracking-[0.18em] text-dev-blue uppercase">{tech.role}</p>
            <ol className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] tracking-[0.18em] uppercase">
              <li>{tech.name}</li>
              <li className="text-developer/70" aria-hidden>
                →
              </li>
              <li className="text-meta">{tech.role}</li>
              {tech.connected[0] && (
                <>
                  <li className="text-developer/70" aria-hidden>
                    →
                  </li>
                  <li>{techById(tech.connected[0])?.name ?? tech.connected[0]}</li>
                </>
              )}
              {tech.usedIn?.[0] && (
                <>
                  <li className="text-developer/70" aria-hidden>
                    →
                  </li>
                  <li className="text-developer">{tech.usedIn[0].title}</li>
                </>
              )}
            </ol>
            <p className="mt-5 max-w-xl text-muted">{tech.note}</p>
            {tech.connected.length > 0 && (
              <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-meta uppercase">
                Connected · {tech.connected.map((id) => techById(id)?.name ?? id).join(' · ')}
              </p>
            )}
            {tech.usedIn?.map((project) => (
              <button
                key={project.id}
                type="button"
                className="group mt-5 flex min-h-11 w-full flex-col items-start gap-1 font-mono text-[11px] tracking-[0.2em] text-developer uppercase sm:inline-flex sm:w-auto sm:flex-row sm:items-center sm:gap-2"
                onMouseEnter={() => setCursor('case')}
                onMouseLeave={() => setCursor('default')}
                onClick={onProject}
              >
                Used in {project.title}
                <span className="text-meta normal-case tracking-[0.12em]">{project.line}</span>
                <span className="btn-arrow" aria-hidden>
                  →
                </span>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.p
            key="empty"
            className="max-w-xl text-sm text-muted"
            initial={false}
            animate={{ opacity: 1 }}
          >
            Select a technology to inspect what it is, what it connects to, and where it is used.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
