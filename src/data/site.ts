export const site = {
  name: 'Sunanth Samala',
  shortName: 'Sunanth',
  monogram: 'S',
  title: 'Founder × Developer × Problem Solver',
  statement: 'Two perspectives. One problem-solving mindset.',
  location: 'Hyderabad, India',
  locationShort: 'Hyderabad · India',
  email: 'sunanth.samala7@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sunanth-samala-818b2b169',
  github: 'https://github.com/sunanth-developer',
  year: 2026,
  status: 'BUILDING',
}

export type NavItem = {
  id: string
  index: string
  label: string
  href: string
  short: string
  description: string
}

export const founderNav: NavItem[] = [
  {
    id: 'home',
    index: '01',
    label: 'Home',
    href: '/founder',
    short: 'Home',
    description: 'The founder perspective.',
  },
  {
    id: 'driverspot',
    index: '02',
    label: 'DriverSpot',
    href: '/work/driverspot',
    short: 'DriverSpot',
    description: 'The flagship venture.',
  },
  {
    id: 'journey',
    index: '03',
    label: 'Journey',
    href: '/journey',
    short: 'Journey',
    description: 'A journey of building.',
  },
  {
    id: 'thinking',
    index: '04',
    label: 'Thinking',
    href: '/notes',
    short: 'Thinking',
    description: 'Ideas, observations, lessons — drafts.',
  },
  {
    id: 'about',
    index: '05',
    label: 'About',
    href: '/about',
    short: 'About',
    description: 'More than just code.',
  },
  {
    id: 'contact',
    index: '06',
    label: 'Contact',
    href: '/contact',
    short: 'Contact',
    description: "Let's build something great.",
  },
]

export const developerNav: NavItem[] = [
  {
    id: 'home',
    index: '01',
    label: 'Home',
    href: '/developer',
    short: 'Home',
    description: 'How systems become products.',
  },
  {
    id: 'projects',
    index: '02',
    label: 'Projects',
    href: '/work',
    short: 'Projects',
    description: "Things I've built.",
  },
  {
    id: 'engineering',
    index: '03',
    label: 'Engineering',
    href: '/engineering',
    short: 'Engineering',
    description: 'How it works.',
  },
  {
    id: 'lab',
    index: '04',
    label: 'Lab',
    href: '/lab',
    short: 'Lab',
    description: "Things I'm still figuring out.",
  },
  {
    id: 'about',
    index: '05',
    label: 'About',
    href: '/about',
    short: 'About',
    description: 'More than just code.',
  },
  {
    id: 'contact',
    index: '06',
    label: 'Contact',
    href: '/contact',
    short: 'Contact',
    description: 'A problem worth solving.',
  },
]

export const navItems = founderNav

export const desktopNav = founderNav
  .filter((item) => item.id !== 'home' && item.id !== 'contact')
  .map((item) => ({ label: item.label, href: item.href }))

export const pageMeta: Record<string, { number: string; label: string }> = {
  '/': { number: '00', label: 'Perspectives' },
  '/founder': { number: '01', label: 'Founder' },
  '/developer': { number: '01', label: 'Developer' },
  '/about': { number: '05', label: 'About' },
  '/work': { number: '02', label: 'Work' },
  '/engineering': { number: '03', label: 'Engineering' },
  '/journey': { number: '03', label: 'Journey' },
  '/lab': { number: '04', label: 'Lab' },
  '/notes': { number: '04', label: 'Thinking' },
  '/contact': { number: '06', label: 'Contact' },
  '/driverspot': { number: '00', label: 'DriverSpot' },
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
      label: 'Developer',
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
    body: 'I take products from the first problem definition through architecture, interface, deployment and iteration.',
  },
  {
    index: '02',
    title: 'Businesses',
    body: 'I approach technology from a business perspective: identify a real problem, validate demand, build the smallest useful solution and scale what works.',
  },
  {
    index: '03',
    title: 'Systems',
    body: 'I build production interfaces and mobile experiences with React and React Native, and the APIs, data and deployment underneath them.',
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

export const identitySignals = [
  { kicker: 'Founder', line: 'DriverSpot' },
  { kicker: 'Developer', line: 'Products · Mobile · Systems' },
  { kicker: 'Builder', line: 'Ideas → Users → Business' },
] as const

export const founderFocus = ['Products', 'Strategy', 'Leadership', 'Impact'] as const
export const developerFocus = ['Code', 'Systems', 'Architecture', 'Experiments'] as const
