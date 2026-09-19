export const developerIdentity = {
  headline: 'I build systems that become products.',
  supporting: 'I like understanding how things work — then figuring out how to make them work better.',
  stackLine: 'REACT · REACT NATIVE · NODE.JS · MONGODB',
  secondary: 'FOUNDER × DEVELOPER × PROBLEM SOLVER',
}

export type SystemNode = {
  id: string
  label: string
  role: string
  connects: string
  tech?: string
  detail: string
}

export const driverSpotSystem: SystemNode[] = [
  {
    id: 'customer',
    label: 'CUSTOMER',
    role: 'Vehicle owner requesting a chauffeur.',
    connects: 'Mobile app',
    detail:
      'The request starts with a car that already exists. Time, city, language and the vehicle itself are part of the ask — not extras around a generic listing.',
  },
  {
    id: 'mobile',
    label: 'MOBILE APP',
    role: 'Owner and driver product surfaces.',
    connects: 'Customer, driver, API',
    tech: 'REACT NATIVE',
    detail:
      'Booking, scheduling, matching, tracking and safety live in the hand. Owner and driver flows share a product layer because both sides of the marketplace have to move together.',
  },
  {
    id: 'api',
    label: 'API',
    role: 'The contract between clients and the marketplace.',
    connects: 'Mobile app, database, services',
    tech: 'NODE.JS · EXPRESS',
    detail:
      'REST boundaries for bookings, authentication, preferences and operational events. The matching logic sits here — not in the interface.',
  },
  {
    id: 'database',
    label: 'DATABASE',
    role: 'Operational records for a live marketplace.',
    connects: 'API',
    tech: 'MONGODB',
    detail:
      'Users, drivers, rides, vehicles and saved addresses. The document model holds records that change shape as the product learns.',
  },
  {
    id: 'driver',
    label: 'DRIVER',
    role: 'Verified chauffeur on the other side of the match.',
    connects: 'Mobile app',
    detail:
      'Availability, assignment and the job in the hand. If this side is unclear, the owner side cannot be reliable.',
  },
  {
    id: 'services',
    label: 'SERVICES',
    role: 'Matching, scheduling and safety.',
    connects: 'API',
    detail:
      'Vehicle-based matching, scheduled rides, language preferences, after-party coverage, in-city and outstation movement, ride sharing and emergency SOS. The constraints are the product.',
  },
]

export const systemLinks = [
  { from: 'customer', to: 'mobile' },
  { from: 'mobile', to: 'api' },
  { from: 'api', to: 'database' },
  { from: 'api', to: 'services' },
  { from: 'mobile', to: 'driver' },
] as const

export const deconstructLayers = [
  {
    id: 'interface',
    label: 'INTERFACE',
    body: 'What the owner and the driver actually touch — booking, assignment, status, safety.',
  },
  {
    id: 'logic',
    label: 'LOGIC',
    body: 'Matching rules, scheduling, preferences. A feature is rarely just a screen.',
  },
  {
    id: 'data',
    label: 'DATA',
    body: 'Users, drivers, rides, vehicles, addresses — the records the marketplace has to remember.',
  },
  {
    id: 'services',
    label: 'SERVICES',
    body: 'Auth, APIs, operational events. The work underneath the product surface.',
  },
] as const

export const tradeOffs = [
  {
    id: 'simplicity',
    left: 'SIMPLICITY',
    right: 'SCALABILITY',
    position: 0.72,
    body: 'A generic two-sided listing would have been simpler. DriverSpot matching has to hold vehicle, city, hour, language, distance and a safety bar. Those constraints are the product. A generic template cannot hold them.',
  },
  {
    id: 'speed',
    left: 'SPEED',
    right: 'MAINTAINABILITY',
    position: 0.42,
    body: 'Owner and driver surfaces share a React Native product layer. That is faster than two separate native codebases. It also means every interface decision has to hold for both sides of the marketplace.',
  },
  {
    id: 'clarity',
    left: 'ABSTRACTION',
    right: 'CLARITY',
    position: 0.68,
    body: 'REST keeps the contract visible: bookings, auth, preferences, safety. The matching logic stays in the service, not hidden behind a generic client. Clarity over cleverness — especially when two kinds of trust are on the line.',
  },
] as const

export type DeveloperTool = {
  id: string
  name: string
  layer: string
  context: string[]
  note: string
}

export const developerTools: DeveloperTool[] = [
  {
    id: 'react',
    name: 'REACT',
    layer: 'INTERFACE',
    context: ['USER', 'INTERFACE', 'REACT', 'PRODUCT'],
    note: 'Product surfaces and operational UI. A component model for interfaces that have to iterate while the marketplace is live.',
  },
  {
    id: 'rn',
    name: 'REACT NATIVE',
    layer: 'MOBILE',
    context: ['USER', 'MOBILE', 'REACT NATIVE', 'PRODUCT'],
    note: 'Owner and driver flows in the hand — booking, matching, tracking, safety. Shared product logic across both sides of the marketplace.',
  },
  {
    id: 'expo',
    name: 'EXPO',
    layer: 'MOBILE',
    context: ['IDEA', 'MOBILE', 'EXPO', 'DEVICE'],
    note: 'The path from a React Native surface onto a device. Useful while the product is still being felt in the hand.',
  },
  {
    id: 'node',
    name: 'NODE.JS',
    layer: 'API',
    context: ['PRODUCT', 'API', 'NODE.JS', 'DATA'],
    note: 'Backend runtime for the marketplace — bookings, auth, matching rules, operational events.',
  },
  {
    id: 'express',
    name: 'EXPRESS',
    layer: 'HTTP',
    context: ['CLIENT', 'HTTP', 'EXPRESS', 'LOGIC'],
    note: 'A thin, explicit HTTP layer over the marketplace logic. Route contracts and middleware, not a hidden framework.',
  },
  {
    id: 'mongo',
    name: 'MONGODB',
    layer: 'DATA',
    context: ['PRODUCT', 'DATA', 'MONGODB'],
    note: 'Operational data: users, drivers, rides, vehicles, addresses. A document model for records that change as the product learns.',
  },
  {
    id: 'redux',
    name: 'REDUX TOOLKIT',
    layer: 'STATE',
    context: ['INTERFACE', 'STATE', 'REDUX', 'PRODUCT'],
    note: 'Application state across product surfaces. Useful when booking, matching and live status have to stay coherent.',
  },
]

export const mindsetTrace = ['IDEA', 'SYSTEM', 'EDGE CASE', 'SOLUTION'] as const

export const resolveTrace = ['FOUNDER', 'DEVELOPER', 'PROBLEM SOLVER'] as const
