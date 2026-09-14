import { useMemo, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { technologyCategories, technologyCenter } from '@/data/technologies'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

const WIDTH = 960
const HEIGHT = 700
const CX = WIDTH / 2
const CY = HEIGHT / 2

const clusterAngles = [-90, 0, 90, 180]

function polar(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180
  return { x: CX + Math.cos(rad) * radius, y: CY + Math.sin(rad) * radius }
}

export function TechnologyGraph() {
  const mobile = useIsMobile()
  const reduced = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)

  const layout = useMemo(
    () =>
      technologyCategories.map((category, index) => {
        const cluster = polar(clusterAngles[index] ?? 0, 210)
        const items = category.items.map((item, itemIndex) => {
          const spread = (itemIndex - (category.items.length - 1) / 2) * 26
          const point = polar((clusterAngles[index] ?? 0) + spread * 0.18, 300)
          return { item, ...point }
        })
        return { category, cluster, items }
      }),
    [],
  )

  const onMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (reduced || mobile) return
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const px = ((event.clientX - rect.left) / rect.width - 0.5) * 18
    const py = ((event.clientY - rect.top) / rect.height - 0.5) * 18
    svg.style.transform = `translate(${px}px, ${py}px)`
  }

  const onLeave = () => {
    if (svgRef.current) svgRef.current.style.transform = 'translate(0, 0)'
  }

  if (mobile) {
    return (
      <div className="space-y-10">
        <div className="border border-accent/40 px-6 py-5">
          <p className="eyebrow text-accent">Center</p>
          <p className="mt-2 font-display text-4xl">{technologyCenter}</p>
        </div>
        {technologyCategories.map((category) => (
          <div key={category.id}>
            <p className="eyebrow mb-4 text-accent">{category.label}</p>
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li key={item} className="border-b border-line py-3 font-display text-xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full transition-transform duration-500 ease-out"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        role="img"
        aria-label="Technology ecosystem centered on products"
      >
        {layout.map(({ category, cluster, items }) => (
          <g key={category.id}>
            <line
              x1={CX}
              y1={CY}
              x2={cluster.x}
              y2={cluster.y}
              stroke="rgba(122,140,255,0.35)"
              strokeWidth="1"
            />
            {items.map((node) => (
              <line
                key={node.item}
                x1={cluster.x}
                y1={cluster.y}
                x2={node.x}
                y2={node.y}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
            ))}
          </g>
        ))}
        <circle cx={CX} cy={CY} r="62" fill="#050505" stroke="#7A8CFF" />
        <text
          x={CX}
          y={CY + 5}
          textAnchor="middle"
          fill="#F5F5F5"
          fontSize="16"
          fontFamily="Space Grotesk"
        >
          {technologyCenter.toUpperCase()}
        </text>
        {layout.map(({ category, cluster, items }) => (
          <g key={`${category.id}-nodes`}>
            <circle cx={cluster.x} cy={cluster.y} r="36" fill="#0a0a0a" stroke="rgba(255,255,255,0.2)" />
            <text
              x={cluster.x}
              y={cluster.y + 4}
              textAnchor="middle"
              fill="#7A8CFF"
              fontSize="9"
              letterSpacing="1.6"
            >
              {category.label.toUpperCase()}
            </text>
            {items.map((node) => (
              <g key={node.item}>
                <circle cx={node.x} cy={node.y} r="3" fill="#7A8CFF" />
                <text
                  x={node.x}
                  y={node.y - 10}
                  textAnchor="middle"
                  fill="#8A8A8A"
                  fontSize="11"
                  fontFamily="Inter"
                >
                  {node.item}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>
      <p className={cn('mt-4 text-center text-xs tracking-[0.18em] text-muted uppercase')}>
        An ecosystem, not a scoreboard
      </p>
    </div>
  )
}
