export const site = {
  name: 'Sunanth Samala',
  shortName: 'Sunanth',
  monogram: 'S',
  title: 'Founder × Developer',
  location: 'Hyderabad, India',
  locationShort: 'Hyderabad · India',
  email: 'sunanth.samala7@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sunanth-samala-818b2b169',
  github: 'https://github.com/sunanth-developer',
  year: 2026,
}

export const navItems = [
  { id: 'about', index: '01', label: 'About', href: '/about', short: 'About' },
  { id: 'ventures', index: '02', label: 'Ventures', href: '/ventures', short: 'Work' },
  { id: 'engineering', index: '03', label: 'Engineering', href: '/engineering', short: 'Engineering' },
  { id: 'journey', index: '04', label: 'Journey', href: '/journey', short: 'Journey' },
  { id: 'lab', index: '05', label: 'Lab', href: '/lab', short: 'Lab' },
  { id: 'notes', index: '06', label: 'Field Notes', href: '/notes', short: 'Notes' },
  { id: 'contact', index: '07', label: 'Contact', href: '/contact', short: 'Contact' },
] as const

export const desktopNav = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/ventures' },
  { label: 'Engineering', href: '/engineering' },
  { label: 'Lab', href: '/lab' },
  { label: 'Notes', href: '/notes' },
] as const

export const pageMeta: Record<string, { number: string; label: string }> = {
  '/': { number: '00', label: 'Index' },
  '/about': { number: '01', label: 'About' },
  '/ventures': { number: '02', label: 'Ventures' },
  '/engineering': { number: '03', label: 'Engineering' },
  '/journey': { number: '04', label: 'Journey' },
  '/lab': { number: '05', label: 'Lab' },
  '/notes': { number: '06', label: 'Field Notes' },
  '/contact': { number: '07', label: 'Contact' },
}

export const hero = {
  headline: ['I BUILD', 'THINGS', 'THAT MOVE.'],
  secondary: 'Founder × Developer',
  supporting:
    'Turning ideas into products, products into businesses, and problems into systems.',
  location: 'Hyderabad, India',
  primaryCta: 'Explore the work',
  secondaryCta: 'Enter the lab',
}

export const accessLayer = {
  lines: [
    'Most people see the product.',
    'I’m interested in the system behind it.',
  ],
  identities: [
    {
      id: 'founder',
      index: '01',
      label: 'Founder',
      description:
        'I start from a real problem, not a feature list. If the demand is not there, the code does not matter.',
    },
    {
      id: 'engineer',
      index: '02',
      label: 'Engineer',
      description:
        'I care about the architecture that lets a product survive contact with users — APIs, data, interfaces, deployment.',
    },
    {
      id: 'experimenter',
      index: '03',
      label: 'Experimenter',
      description:
        'Not every idea should become a company. Some exist to test a question I cannot answer any other way.',
    },
    {
      id: 'solver',
      index: '04',
      label: 'Problem Solver',
      description:
        'I stay with a problem long enough to see the system: the users, the constraints, the next smallest useful move.',
    },
  ],
}

export const whatIBuild = [
  {
    index: '01',
    title: 'Products',
    body: 'I design and build digital products from the ground up — from the first idea to architecture, interface, deployment and iteration.',
  },
  {
    index: '02',
    title: 'Businesses',
    body: 'I approach technology from a business perspective: identify a real problem, validate demand, build the smallest useful solution and scale what works.',
  },
  {
    index: '03',
    title: 'Systems',
    body: 'I enjoy the engineering underneath the product — APIs, mobile applications, databases, cloud infrastructure, automation and AI.',
  },
]

export const founder = {
  heading: 'I don’t want to build another app.',
  supporting: 'I want to build systems that solve problems people repeatedly experience.',
  stages: ['Observe', 'Question', 'Build', 'Test', 'Learn', 'Repeat'] as const,
  closing: 'As a founder, I think in problems, users, systems and outcomes.',
}

export const ownership = {
  heading: 'From idea to production.',
  pipeline: ['Idea', 'Wireframe', 'Architecture', 'Code', 'Deployment', 'Users', 'Iteration'] as const,
  layers: [
    'Product',
    'UX',
    'Architecture',
    'Frontend',
    'Mobile',
    'Backend',
    'Deployment',
    'Operations',
  ] as const,
}

export const about = {
  heading: 'The person behind the products.',
  intro: [
    "I'm Sunanth Samala, a founder and developer focused on turning real-world problems into technology-driven products.",
    'I like being involved across the entire journey — understanding the problem, shaping the product, writing the software, launching it and learning from what happens next.',
  ],
  sections: [
    {
      title: 'As a founder',
      body: 'I think in problems, users, systems and outcomes.',
    },
    {
      title: 'As a developer',
      body: 'I think in architecture, interfaces, APIs, data and performance.',
    },
    {
      title: 'The combination',
      body: "The advantage is simple: I don't have to throw an idea over the wall to someone else before I can build it.",
    },
  ],
}

export const contact = {
  heading: 'Have something worth building?',
  supporting:
    "I'm always interested in ambitious ideas, interesting technical problems and people who want to build something meaningful.",
}

export const labIntro = {
  heading: 'Not everything I build becomes a company.',
  supporting: 'Some ideas exist simply because I wanted to know if I could build them.',
}
