export type TimelineEntry = {
  id: string
  year: string
  stage: string
  title: string
  body: string
}

export const timeline: TimelineEntry[] = [
  {
    id: 'start',
    year: '2018',
    stage: 'Learning',
    title: 'Learning to code.',
    body: 'The work began as curiosity — taking systems apart, putting them back together, and learning that building is a way of thinking.',
  },
  {
    id: 'first',
    year: '',
    stage: 'Experiments',
    title: 'Building and experimenting.',
    body: 'Early builds taught structure, edge cases, and the difference between something that runs and something that holds.',
  },
  {
    id: 'development',
    year: '',
    stage: 'Development',
    title: 'Working as a developer.',
    body: 'Interfaces, APIs, data and deployment stopped being separate subjects. They became one path from an idea to something a person could use.',
  },
  {
    id: 'products',
    year: '',
    stage: 'Products',
    title: 'Understanding products beyond code.',
    body: 'The work shifted from projects to products — decisions that had to survive contact with reality, not just a local environment.',
  },
  {
    id: 'driverspot',
    year: '2024',
    stage: 'DriverSpot',
    title: 'Starting DriverSpot.',
    body: 'DriverSpot is where founder work and engineering work stopped being separate: a chauffeur-on-demand marketplace built around a real matching problem in Hyderabad.',
  },
  {
    id: 'people',
    year: '',
    stage: 'Systems',
    title: 'Learning to build around real people and real problems.',
    body: 'A product has a life outside the interface. People use it, operate it, depend on it — and the hard parts rarely fit a specification.',
  },
  {
    id: 'next',
    year: 'Now',
    stage: 'Continuing',
    title: 'Continuing to build.',
    body: 'Find a problem that repeats. Understand it. Build the smallest honest system. Iterate until it is real.',
  },
]
