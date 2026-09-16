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

export const technologyDetails = [
  {
    id: 'react',
    name: 'React',
    layer: 'Frontend',
    what: 'Frontend interfaces and application UI.',
    why: 'Component model for product surfaces that have to iterate quickly.',
    where: 'Owner-facing and operational web surfaces around DriverSpot.',
  },
  {
    id: 'rn',
    name: 'React Native',
    layer: 'Mobile',
    what: 'Mobile applications for owners and drivers.',
    why: 'Shared product logic across the two sides of the marketplace.',
    where: 'DriverSpot customer and driver mobile flows — booking, matching, tracking, safety.',
  },
  {
    id: 'js',
    name: 'JavaScript',
    layer: 'Language',
    what: 'Application logic across web, mobile and API surfaces.',
    why: 'The language already in the product stack — web, React Native and Node.js.',
    where: 'Product interfaces and backend services.',
  },
  {
    id: 'ts',
    name: 'TypeScript',
    layer: 'Language',
    what: 'Typed application code where the surface needs stricter contracts.',
    why: 'Catch interface and data mistakes before they ship.',
    where: 'Interfaces and experiments that benefit from typed contracts.',
  },
  {
    id: 'node',
    name: 'Node.js',
    layer: 'Backend',
    what: 'Backend and API services.',
    why: 'One runtime from product logic to HTTP — bookings, auth, matching rules.',
    where: 'DriverSpot API and business logic.',
  },
  {
    id: 'express',
    name: 'Express',
    layer: 'API',
    what: 'HTTP layer, route contracts and middleware.',
    why: 'A thin, explicit API surface over the marketplace logic.',
    where: 'REST boundaries for bookings, auth, preferences and operational events.',
  },
  {
    id: 'mongo',
    name: 'MongoDB',
    layer: 'Database',
    what: 'Application data for users, drivers, rides, vehicles and addresses.',
    why: 'Document model fits operational marketplace records that change shape as the product learns.',
    where: 'DriverSpot operational data.',
  },
  {
    id: 'api',
    name: 'REST APIs',
    layer: 'API',
    what: 'Contracts between mobile, web and backend.',
    why: 'Clear boundaries for bookings, auth, preferences and safety flows.',
    where: 'Between DriverSpot clients and the Node.js service.',
  },
  {
    id: 'realtime',
    name: 'Real-time',
    layer: 'System',
    what: 'Assignment, status and live ride state.',
    why: 'A chauffeur marketplace has to move with the city, not only with a form submit.',
    where: 'Live ride state in DriverSpot — without claiming a specific transport library.',
  },
  {
    id: 'cloud',
    name: 'Cloud',
    layer: 'Infrastructure',
    what: 'Hosting, deployment and uptime.',
    why: 'The product has to stay reachable after it leaves a local machine.',
    where: 'Deployment of the live DriverSpot service.',
  },
  {
    id: 'ai',
    name: 'AI',
    layer: 'Exploring',
    what: 'Intent routing and exploration — not the core marketplace yet.',
    why: 'To feel edge cases before they live in production.',
    where: 'Lab experiments and intent-routing sketches.',
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
