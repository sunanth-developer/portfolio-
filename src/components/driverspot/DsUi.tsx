import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLenis } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'
import { dsEase, dsTiming } from '@/lib/ds'
import { driverspot } from '@/data/driverspot'
import iconWhite from '@/assets/driverspot/icon-white.svg'
import iconBlack from '@/assets/driverspot/icon-black.svg'
import logoWhite from '@/assets/driverspot/logo-white.svg'
import logoBlack from '@/assets/driverspot/logo-black.svg'

export function DsMark({
  tone = 'white',
  className,
}: {
  tone?: 'white' | 'black'
  className?: string
}) {
  return (
    <img
      src={tone === 'black' ? iconBlack : iconWhite}
      alt=""
      width={88}
      height={76}
      className={cn('h-8 w-auto shrink-0', className)}
      decoding="async"
    />
  )
}

export function DsLockup({
  tone = 'white',
  className,
}: {
  tone?: 'white' | 'black'
  className?: string
}) {
  return (
    <img
      src={tone === 'black' ? logoBlack : logoWhite}
      alt="DriverSpot"
      width={320}
      height={198}
      className={cn('h-auto w-[min(100%,16rem)]', className)}
      decoding="async"
    />
  )
}

export function DsLogo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <DsMark className={compact ? 'h-8' : 'h-10'} />
      <span className="sr-only">DriverSpot</span>
    </span>
  )
}

export function DsButton({
  href,
  children,
  className,
  onClick,
  mark = false,
}: {
  href?: string
  children: ReactNode
  className?: string
  onClick?: () => void
  mark?: boolean
}) {
  const classes = cn(
    'group inline-flex min-h-11 w-full items-center justify-center gap-3 bg-ds-yellow px-6 py-3 font-display text-[13px] font-semibold tracking-[0.04em] text-ds-bg transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:bg-ds-yellow-hover hover:shadow-[0_0_28px_rgba(255,193,7,0.18)] focus-visible:shadow-[0_0_28px_rgba(255,193,7,0.18)] sm:w-auto',
    className,
  )

  const content = (
    <>
      {mark && <DsMark tone="black" className="h-5" />}
      {children}
      <span className="ds-btn-arrow" aria-hidden>
        →
      </span>
    </>
  )

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  )
}

export function DsGhostButton({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={cn(
        'group inline-flex min-h-11 w-full items-center justify-center gap-3 border border-ds-border px-6 py-3 font-display text-[13px] tracking-[0.04em] text-ds-text transition-[transform,border-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:border-ds-yellow hover:text-ds-yellow sm:w-auto',
        className,
      )}
    >
      {children}
      <span className="ds-btn-arrow" aria-hidden>
        →
      </span>
    </a>
  )
}

export function DsReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: reduced ? 0 : dsTiming.reveal, delay: reduced ? 0 : delay, ease: dsEase }}
    >
      {children}
    </motion.div>
  )
}

export function DsCount({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(reduced)
  const [display, setDisplay] = useState(reduced ? value : formatMetric(splitMetric(value), 0))

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) {
      setDisplay(value)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setStarted(true)
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced, value])

  useEffect(() => {
    if (reduced || !started) return
    const parts = splitMetric(value)
    const start = performance.now()
    const duration = 1500
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setDisplay(t === 1 ? value : formatMetric(parts, parts.target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduced, started, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

function splitMetric(value: string) {
  const match = value.match(/^(₹)?([\d,.]+)(.*)$/)
  if (!match) return { prefix: '', target: 0, decimals: 0, suffix: '', raw: value }
  const numeric = match[2] ?? '0'
  const decimals = numeric.includes('.') ? (numeric.split('.')[1]?.length ?? 0) : 0
  return {
    prefix: match[1] ?? '',
    target: Number(numeric.replace(/,/g, '')),
    decimals,
    suffix: match[3] ?? '',
    raw: value,
  }
}

function formatMetric(parts: ReturnType<typeof splitMetric>, current: number) {
  if (!parts.target) return parts.raw
  const rounded =
    parts.decimals > 0 ? current.toFixed(parts.decimals) : Math.round(current).toLocaleString('en-IN')
  return `${parts.prefix}${rounded}${parts.suffix}`
}

export function DsScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? window.scrollY / height : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="pointer-events-none fixed top-1/2 right-3 z-40 hidden h-36 -translate-y-1/2 md:block lg:right-5"
      aria-hidden
    >
      <div className="relative h-full w-px bg-white/8">
        <div
          className="absolute top-0 left-0 w-full origin-top bg-ds-yellow"
          style={{ height: `${Math.max(6, progress * 100)}%` }}
        />
        <span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-ds-yellow"
          style={{ top: `calc(${progress * 100}% - 3px)` }}
        />
      </div>
    </div>
  )
}

export function DsShell({ children }: { children: ReactNode }) {
  useLenis(false)

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('data-brand', 'driverspot')
    document.title = 'DriverSpot — On-demand professional drivers for your own car'
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    const previous = icon?.getAttribute('href')
    icon?.setAttribute('href', `${import.meta.env.BASE_URL}driverspot-icon.svg`)
    return () => {
      html.removeAttribute('data-brand')
      if (icon && previous) icon.setAttribute('href', previous)
    }
  }, [])

  return (
    <div className="ds-page min-h-svh">
      <a className="skip-link" href="#driverspot-main">
        Skip to content
      </a>
      <DsScrollProgress />
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-ds-border/80 bg-ds-bg/80 pt-[max(0.7rem,env(safe-area-inset-top))] backdrop-blur-sm">
        <div className="ds-shell flex items-center justify-between gap-4 border-b border-transparent py-3">
          <a href="#top" className="min-h-11" aria-label="DriverSpot">
            <DsLogo />
          </a>
          <nav className="flex items-center gap-3" aria-label="DriverSpot">
            <a
              href="#download"
              className="inline-flex min-h-11 items-center font-mono text-[10px] tracking-[0.2em] text-ds-secondary uppercase hover:text-ds-yellow"
            >
              Download
            </a>
            <div className="hidden sm:block">
              <DsGhostButton href={driverspot.contact.mailHref}>Talk to the Founders</DsGhostButton>
            </div>
          </nav>
        </div>
      </header>
      <main id="driverspot-main">{children}</main>
    </div>
  )
}

export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative mx-auto h-[420px] w-[220px] overflow-hidden border border-ds-border bg-[#0E0E0E] md:h-[480px] md:w-[248px]',
        className,
      )}
    >
      <div className="absolute top-3 left-1/2 z-10 h-4 w-[72px] -translate-x-1/2 bg-black/80" />
      <div className="absolute inset-x-2.5 top-9 bottom-2.5 overflow-hidden border border-ds-border bg-[#101010]">
        {children}
      </div>
    </div>
  )
}
