import { cn } from '@/lib/cn'

const rows = [
  { key: 'mobile', label: 'mobile', value: 'React Native' },
  { key: 'web', label: 'web', value: 'React' },
  { key: 'api', label: 'api', value: 'Node.js + Express' },
  { key: 'data', label: 'database', value: 'MongoDB' },
  { key: 'live', label: 'realtime', value: 'assignment / status' },
] as const

export function CodePanel({ className }: { className?: string }) {
  return (
    <div className={cn('overflow-hidden border border-line bg-bg', className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="font-mono text-[10px] tracking-[0.22em] text-developer uppercase">driverspot.system</p>
        <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-meta uppercase">
          <span className="status-dot" aria-hidden />
          Live
        </p>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-7 text-muted md:p-5 md:text-xs">
        <code>
          {rows.map((row, index) => (
            <span key={row.key} className="block">
              <span className="text-meta">{String(index + 1).padStart(2, '0')}</span>
              {'  '}
              <span className="text-dev-blue">{row.label}</span>
              <span className="text-meta">: </span>
              <span className="text-fg">{row.value}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
