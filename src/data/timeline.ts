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
    stage: 'The start',
    title: 'Building before it had a name',
    body: 'The work began as curiosity — taking systems apart, putting them back together, and learning that building is a way of thinking.',
  },
  {
    id: 'first',
    year: '',
    stage: 'First projects',
    title: 'Small systems, real constraints',
    body: 'Early builds taught structure, edge cases, and the difference between something that runs and something that holds.',
  },
  {
    id: 'development',
    year: '',
    stage: 'Development',
    title: 'Learning the stack by shipping',
    body: 'Interfaces, APIs, data and deployment stopped being separate subjects. They became one path from an idea to something a person could use.',
  },
  {
    id: 'products',
    year: '',
    stage: 'Product building',
    title: 'When code met a user',
    body: 'The work shifted from projects to products — decisions that had to survive contact with reality, not just a local environment.',
  },
  {
    id: 'driverspot',
    year: '2024',
    stage: 'DriverSpot',
    title: 'A problem worth a system',
    body: 'DriverSpot is where founder work and engineering work stopped being separate: a chauffeur-on-demand marketplace built around a real matching problem in Hyderabad.',
  },
  {
    id: 'experiments',
    year: '',
    stage: 'New experiments',
    title: 'Questions that do not need a company yet',
    body: 'Some builds stay in the lab. AI, mobile, automation, interface studies — run to find out what is true.',
  },
  {
    id: 'next',
    year: 'Now',
    stage: "What's next",
    title: 'Keep building the next layer',
    body: 'Find a problem that repeats. Build the smallest honest system. Iterate until it is real.',
  },
]
