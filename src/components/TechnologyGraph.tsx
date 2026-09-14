import { useMemo, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { ecosystem, technologyCategories } from '@/data/technologies'
import { useIsMobile } from '@/hooks/useMediaQuery'

const W = 900
const H = 640
const CX = W / 2
const CY = H / 2

export function TechnologyGraph() {
  const mobile = useIsMobile()
  const svgRef = useRef<SVGSVGElement>(null)

  const nodes = useMemo(
    () =>
      ecosystem.map((item, index) => {
        const angle = -90 + (360 / ecosystem.length) * index
        const radius = item.ring === 'product' ? 210 : item.ring === 'system' ? 250 : 290
        const rad = (angle * Math.PI) / 180
        return {
          ...item,
          x: CX + Math.cos(rad) * radius,
          y: CY + Math.sin(rad) * radius,
        }
      }),
    [],
  )

  const onMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (mobile) return
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const px = ((event.clientX - rect.left) / rect.width - 0.5) * 16
    const py = ((event.clientY - rect.top) / rect.height - 0.5) * 16
    svg.style.transform = `translate(${px}px, ${py}px)`
  }

  if (mobile) {
    return (
      <div className="space-y-10">
        <div className="border border-accent/50 px-5 py-4">
          <p className="eyebrow text-accent">Center</p>
          <p className="mt-2 font-display text-4xl">Product</p>
        </div>
        {technologyCategories.map((category) => (
          <div key={category.id}>
            <p className="eyebrow mb-3 text-accent">{category.label}</p>
            <ul>
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
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full transition-transform duration-500"
      onPointerMove={onMove}
      onPointerLeave={() => {
        if (svgRef.current) svgRef.current.style.transform = 'translate(0,0)'
      }}
      role="img"
      aria-label="Technology ecosystem centered on product"
    >
      {nodes.map((node) => (
        <line
          key={`l-${node.id}`}
          x1={CX}
          y1={CY}
          x2={node.x}
          y2={node.y}
          stroke="rgba(78,124,255,0.35)"
          strokeWidth="1"
        />
      ))}
      <circle cx={CX} cy={CY} r="58" fill="#050505" stroke="#4E7CFF" />
      <text x={CX} y={CY + 5} textAnchor="middle" fill="#F5F5F5" fontSize="14" fontFamily="Space Grotesk">
        PRODUCT
      </text>
      {nodes.map((node) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r="4" fill="#4E7CFF" />
          <text x={node.x} y={node.y - 12} textAnchor="middle" fill="#8A8A8A" fontSize="11" fontFamily="Inter">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default TechnologyGraph
