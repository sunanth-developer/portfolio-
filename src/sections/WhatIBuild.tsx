import { whatIBuild } from '@/data/site'
import { useApp } from '@/context/AppContext'
import { useState } from 'react'
import { cn } from '@/lib/cn'

export function WhatIBuild() {
  const { setCursor } = useApp()
  const [active, setActive] = useState('01')

  return (
    <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
      <p className="eyebrow mb-6">
        <span className="mr-4 text-accent">01</span>
        Practice
      </p>
      <h2 className="display max-w-5xl text-[12vw] md:text-[5.6rem]">I don’t just build software.</h2>
      <p className="mt-8 max-w-xl text-xl text-muted">I build systems around problems worth solving.</p>
      <div className="mt-16 divide-y divide-line border-y border-line">
        {whatIBuild.map((panel) => {
          const open = active === panel.index
          return (
            <article key={panel.index}>
              <button
                type="button"
                className="flex w-full items-baseline justify-between gap-6 py-8 text-left md:py-12"
                onClick={() => setActive(panel.index)}
                onMouseEnter={() => setCursor('open')}
                onMouseLeave={() => setCursor('default')}
                aria-expanded={open}
              >
                <span className="flex items-baseline gap-5 md:gap-10">
                  <span className="text-xs tracking-[0.2em] text-accent">{panel.index}</span>
                  <span className={cn('display text-[2.35rem] leading-[0.9] md:text-7xl', open ? 'text-fg' : 'text-muted')}>
                    {panel.title}
                  </span>
                </span>
              </button>
              <div
                className={cn(
                  'grid transition-[grid-template-rows] duration-500',
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-10 text-muted md:text-lg">{panel.body}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
