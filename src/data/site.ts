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
  status: 'BUILDING',
}

export const navItems = [
  {
    id: 'about',
    index: '01',
    label: 'About',
    href: '/about',
    short: 'About',
    description: 'The person behind the products.',
  },
  {
    id: 'work',
    index: '02',
    label: 'Work',
    href: '/work',
    short: 'Work',
    description: 'Products, ventures and systems I’ve built.',
  },
  {
    id: 'engineering',
    index: '03',
    label: 'Engineering',
    href: '/engineering',
    short: 'Engineering',
    description: 'The technology underneath the work.',
  },
  {
    id: 'journey',
    index: '04',
    label: 'Journey',
    href: '/journey',
    short: 'Journey',
    description: 'The build log — not a resume.',
  },
  {
    id: 'lab',
    index: '05',
    label: 'Lab',
    href: '/lab',
    short: 'Lab',
    description: 'Experiments that may never become companies.',
  },
  {
    id: 'notes',
    index: '06',
    label: 'Field Notes',
    href: '/notes',
    short: 'Notes',
    description: 'Thinking from the work, still in motion.',
  },
  {
    id: 'contact',
    index: '07',
    label: 'Contact',
    href: '/contact',
    short: 'Contact',
    description: 'If there is something worth building.',
  },
] as const

export const desktopNav = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Engineering', href: '/engineering' },
  { label: 'Lab', href: '/lab' },
  { label: 'Notes', href: '/notes' },
] as const

export const pageMeta: Record<string, { number: string; label: string }> = {
  '/': { number: '00', label: 'Index' },
  '/about': { number: '01', label: 'About' },
  '/work': { number: '02', label: 'Work' },
  '/engineering': { number: '03', label: 'Engineering' },
  '/journey': { number: '04', label: 'Journey' },
  '/lab': { number: '05', label: 'Lab' },
  '/notes': { number: '06', label: 'Field Notes' },
  '/contact': { number: '07', label: 'Contact' },
}

export const accessLayer = {
  lines: ['Most people see the product.', "I'm interested in the system behind it."],
  identities: [
    {
      id: 'founder',
      index: '01',
      label: 'Founder',
      description: 'I think in problems, users, systems and outcomes.',
    },
    {
      id: 'engineer',
      index: '02',
      label: 'Engineer',
      description: 'I turn product ideas into working software.',
    },
    {
      id: 'experimenter',
      index: '03',
      label: 'Experimenter',
      description: 'I build to understand what is possible.',
    },
    {
      id: 'solver',
      index: '04',
      label: 'Problem Solver',
      description: 'The best products usually start with an uncomfortable problem.',
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

export const thinkingLoop = [
  'Problem',
  'User',
  'Insight',
  'Product',
  'Code',
  'Launch',
  'Learn',
] as const

export const ownership = {
  pipeline: ['Idea', 'Wireframe', 'Architecture', 'Code', 'Deployment', 'Users', 'Iteration'] as const,
  layers: ['Product', 'UX', 'Architecture', 'Frontend', 'Mobile', 'Backend', 'Deployment', 'Operations'] as const,
}

export const morphWords = ['FOUNDER', 'BUILDER', 'ENGINEER', 'PRODUCT', 'SYSTEM'] as const
