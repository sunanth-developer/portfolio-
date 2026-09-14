export const discoveryIds = ['access', 'journey', 'command', 'footer', 'status'] as const

export type DiscoveryId = (typeof discoveryIds)[number]

export const discoveries: Record<
  DiscoveryId,
  { index: string; name: string; unlock: string }
> = {
  access: { index: '01', name: 'Access', unlock: 'Identity layer opened.' },
  journey: { index: '02', name: 'Build log', unlock: 'A timeline entry revealed.' },
  command: { index: '03', name: 'Command', unlock: 'Hidden layer accessed.' },
  footer: { index: '04', name: 'Trace', unlock: 'Floor layer received.' },
  status: { index: '05', name: 'Status', unlock: 'Signal locked.' },
}
