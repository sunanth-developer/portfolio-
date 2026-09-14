export type TimelineEntry = {
  id: string
  stage: string
  title: string
  body: string
}

export const timeline: TimelineEntry[] = [
  {
    id: 'early',
    stage: 'Early years',
    title: 'Before the product had a name',
    body: 'Curiosity first. Taking things apart, putting them back together, and learning that building is a way of thinking — not a job title.',
  },
  {
    id: 'first-projects',
    stage: 'First projects',
    title: 'Small systems, real constraints',
    body: 'Early builds taught the unglamorous parts: structure, edge cases, and the difference between something that runs and something that holds.',
  },
  {
    id: 'first-products',
    stage: 'First products',
    title: 'When code met a user',
    body: 'The work shifted from projects to products — interfaces people had to understand, decisions that had to survive contact with reality.',
  },
  {
    id: 'driverspot',
    stage: 'DriverSpot',
    title: 'A problem worth a system',
    body: 'DriverSpot became the place where founder work and engineering work stopped being separate: a chauffeur-on-demand platform built around a real matching problem.',
  },
  {
    id: 'experiments',
    stage: 'New experiments',
    title: 'Questions that do not need a company yet',
    body: 'Some builds stay in the lab. AI, mobile, automation, interface studies — run to find out what is true, not to announce a launch.',
  },
  {
    id: 'next',
    stage: "What's next",
    title: 'Keep building the next layer',
    body: 'The next move is the same as the first: find a problem that repeats, build the smallest honest system, and iterate until it is real.',
  },
]
