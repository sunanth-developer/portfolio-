export type Experiment = {
  id: string
  code: string
  title: string
  category: 'AI' | 'MOBILE' | 'UI' | 'AUTOMATION' | 'PRODUCT' | 'EXPERIMENTS'
  status: 'PROTOTYPE' | 'CONCEPT' | 'IN PROGRESS'
  stack: string[]
  summary: string
  body: string
}

export const experimentCategories = ['AI', 'MOBILE', 'UI', 'AUTOMATION', 'PRODUCT', 'EXPERIMENTS'] as const

export const experiments: Experiment[] = [
  {
    id: 'intent-routing',
    code: 'EXPERIMENT 004',
    title: 'Intent routing sketches',
    category: 'AI',
    status: 'PROTOTYPE',
    stack: ['React Native', 'AI', 'Node.js'],
    summary: 'Exploring how a product might classify intent before it becomes a screen.',
    body: 'A sandbox for routing messy human requests into structured product actions. Not a shipped feature — a way to feel the edge cases before they live in production.',
  },
  {
    id: 'driver-flow',
    code: 'EXPERIMENT 011',
    title: 'Driver-side flow studies',
    category: 'MOBILE',
    status: 'IN PROGRESS',
    stack: ['React Native', 'TypeScript'],
    summary: 'Interaction studies for how a chauffeur product should feel in the hand.',
    body: 'Mobile experiments around availability, assignment and the quiet moments between jobs. Built to learn, not to announce.',
  },
  {
    id: 'density',
    code: 'EXPERIMENT 018',
    title: 'Interface density',
    category: 'UI',
    status: 'PROTOTYPE',
    stack: ['React', 'TypeScript'],
    summary: 'How much information an operational product can carry without becoming noise.',
    body: 'Layout studies for dense product surfaces — tables, statuses, actions — with the constraint that it still has to feel calm.',
  },
  {
    id: 'ops-scripts',
    code: 'EXPERIMENT 021',
    title: 'Internal ops rituals',
    category: 'AUTOMATION',
    status: 'CONCEPT',
    stack: ['Node.js', 'Automation'],
    summary: 'Small automations that remove repeated operational friction.',
    body: 'Not a platform. Scripts and checks that ask: what should a human never have to do twice?',
  },
  {
    id: 'marketplace-mechanic',
    code: 'EXPERIMENT 027',
    title: 'Marketplace mechanic',
    category: 'PRODUCT',
    status: 'CONCEPT',
    stack: ['Product', 'Systems'],
    summary: 'A matching mechanic that is not a generic two-sided clone.',
    body: 'A concept file for vehicle-aware matching and preference logic.',
  },
  {
    id: 'lab-index',
    code: 'EXPERIMENT 033',
    title: 'Unreleased system sketches',
    category: 'EXPERIMENTS',
    status: 'PROTOTYPE',
    stack: ['React', 'Node.js'],
    summary: 'Quiet builds that are not ready to be named as products.',
    body: 'A drawer for work that exists to answer a question. The file stays thin until the system can stand on it.',
  },
]
