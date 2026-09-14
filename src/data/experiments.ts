export type ExperimentStatus = 'PROTOTYPE' | 'CONCEPT' | 'IN PROGRESS'

export type Experiment = {
  id: string
  code: string
  title: string
  category: string
  status: ExperimentStatus
  stack: string[]
  summary: string
  body: string
}

export const experimentCategories = [
  'AI EXPERIMENTS',
  'MOBILE EXPERIMENTS',
  'UI EXPERIMENTS',
  'AUTOMATION',
  'PRODUCT CONCEPTS',
  'DEVELOPER TOOLS',
] as const

export const experiments: Experiment[] = [
  {
    id: 'intent-routing',
    code: 'EXPERIMENT 004',
    title: 'Intent routing sketches',
    category: 'AI EXPERIMENTS',
    status: 'PROTOTYPE',
    stack: ['React Native', 'AI', 'Node.js'],
    summary: 'Exploring how a product might classify intent before it becomes a screen.',
    body: 'A sandbox for routing messy human requests into structured product actions. Not a shipped feature — a way to feel the edge cases before they live in production.',
  },
  {
    id: 'driver-flow',
    code: 'EXPERIMENT 011',
    title: 'Driver-side flow studies',
    category: 'MOBILE EXPERIMENTS',
    status: 'IN PROGRESS',
    stack: ['React Native', 'TypeScript'],
    summary: 'Interaction studies for how a chauffeur product should feel in the hand.',
    body: 'Mobile experiments around availability, assignment and the quiet moments between jobs. Built to learn, not to announce.',
  },
  {
    id: 'density',
    code: 'EXPERIMENT 018',
    title: 'Interface density',
    category: 'UI EXPERIMENTS',
    status: 'PROTOTYPE',
    stack: ['React', 'TypeScript'],
    summary: 'How much information an operational product can carry without becoming noise.',
    body: 'A set of layout studies for dense product surfaces — tables, statuses, and actions — with the constraint that it still has to feel calm.',
  },
  {
    id: 'ops-scripts',
    code: 'EXPERIMENT 021',
    title: 'Internal ops rituals',
    category: 'AUTOMATION',
    status: 'CONCEPT',
    stack: ['Node.js', 'Automation'],
    summary: 'Small automations that remove repeated operational friction.',
    body: 'Not a platform. A collection of scripts and checks that ask: what should a human never have to do twice?',
  },
  {
    id: 'marketplace-mechanic',
    code: 'EXPERIMENT 027',
    title: 'Marketplace mechanic',
    category: 'PRODUCT CONCEPTS',
    status: 'CONCEPT',
    stack: ['Product', 'Systems'],
    summary: 'A matching mechanic that is not a generic two-sided marketplace clone.',
    body: 'A concept file for vehicle-aware matching and preference logic. The kind of idea that stays on paper until the system can stand on it.',
  },
  {
    id: 'deploy-ritual',
    code: 'EXPERIMENT 033',
    title: 'Local deploy ritual',
    category: 'DEVELOPER TOOLS',
    status: 'PROTOTYPE',
    stack: ['Node.js', 'Git'],
    summary: 'A personal deployment checklist turned into a repeatable command.',
    body: 'A developer-side experiment: fewer forgotten steps between “it works here” and “it is live.” Built for my own workflow first.',
  },
]
