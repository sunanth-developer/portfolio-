export const discoveryIds = [
  'access',
  'command',
  'hidden-project',
  'footer',
  'signal',
] as const

export type DiscoveryId = (typeof discoveryIds)[number]

export const discoveries: Record<
  DiscoveryId,
  { index: string; name: string; hint: string; unlock: string }
> = {
  access: {
    index: '01',
    name: 'Access layer',
    hint: 'ACCESS 01',
    unlock: 'Identity layer opened.',
  },
  command: {
    index: '02',
    name: 'Command',
    hint: 'Press K',
    unlock: 'Terminal session started.',
  },
  'hidden-project': {
    index: '03',
    name: 'Quiet project',
    hint: 'Stay with the work',
    unlock: 'Unreleased index visible.',
  },
  footer: {
    index: '04',
    name: 'Trace',
    hint: 'Look at the floor',
    unlock: 'Footer trace received.',
  },
  signal: {
    index: '05',
    name: 'Signal',
    hint: 'FREQ',
    unlock: 'Frequency locked.',
  },
}

export const commandResponses: Record<string, string[]> = {
  whoami: ['Founder', 'Developer', 'Builder'],
  current_status: ['BUILDING'],
  next: ['ACCESS DENIED'],
  help: ['whoami', 'current_status', 'next', 'clear'],
}
