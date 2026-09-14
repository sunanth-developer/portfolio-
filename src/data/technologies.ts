export type TechCategory = {
  id: string
  label: string
  items: string[]
}

export const technologyCategories: TechCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React', 'React Native', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Databases', 'MongoDB'],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    items: ['Git', 'GitHub', 'Cloud', 'Deployment', 'CI/CD'],
  },
  {
    id: 'exploring',
    label: 'Exploring',
    items: ['AI', 'LLMs', 'AI Agents', 'Automation'],
  },
]

export const architectureStages = [
  { id: 'product', label: 'Product', detail: 'The centre. Everything exists to serve a working product, not a stack preference.' },
  { id: 'mobile', label: 'Mobile', detail: 'React Native surfaces for owners and drivers — booking, matching, tracking, safety.' },
  { id: 'api', label: 'API', detail: 'REST boundaries: bookings, auth, preferences, operational events.' },
  { id: 'backend', label: 'Backend', detail: 'Node.js and Express — business logic, matching rules, scheduling.' },
  { id: 'database', label: 'Database', detail: 'MongoDB for operational data: users, drivers, rides, cars, addresses.' },
] as const

export const graphNodes = [
  {
    id: 'react',
    label: 'React',
    stage: 1,
    panel: ['Product surfaces', 'Owner web', 'Operational UI'],
  },
  {
    id: 'rn',
    label: 'React Native',
    stage: 1,
    panel: ['Customer app', 'Driver app', 'Booking and tracking'],
  },
  {
    id: 'node',
    label: 'Node.js',
    stage: 3,
    panel: ['API', 'Bookings', 'Auth', 'Business logic', 'Real-time events'],
  },
  {
    id: 'express',
    label: 'Express',
    stage: 3,
    panel: ['HTTP layer', 'Route contracts', 'Middleware'],
  },
  {
    id: 'mongo',
    label: 'MongoDB',
    stage: 4,
    panel: ['Users', 'Drivers', 'Rides', 'Vehicles'],
  },
  {
    id: 'api',
    label: 'REST APIs',
    stage: 2,
    panel: ['Bookings', 'Auth', 'Preferences', 'Safety'],
  },
  {
    id: 'realtime',
    label: 'Real-time',
    stage: 4,
    panel: ['Assignment', 'Status', 'Live ride state'],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    stage: 5,
    panel: ['Hosting', 'Deployment', 'Uptime'],
  },
  {
    id: 'ai',
    label: 'AI',
    stage: 5,
    panel: ['Intent routing', 'Exploration', 'Not the core marketplace yet'],
  },
] as const

export const ecosystem = [
  { id: 'react', label: 'React', ring: 'product' },
  { id: 'rn', label: 'React Native', ring: 'product' },
  { id: 'js', label: 'JavaScript', ring: 'product' },
  { id: 'node', label: 'Node.js', ring: 'system' },
  { id: 'express', label: 'Express', ring: 'system' },
  { id: 'mongo', label: 'MongoDB', ring: 'system' },
  { id: 'api', label: 'REST APIs', ring: 'system' },
  { id: 'git', label: 'Git', ring: 'ops' },
  { id: 'cloud', label: 'Cloud', ring: 'ops' },
  { id: 'deploy', label: 'Deployment', ring: 'ops' },
  { id: 'ai', label: 'AI', ring: 'explore' },
] as const
