export type ProjectMetric = {
  value: string
  label: string
}

export type ProjectStory = {
  id: string
  label: string
  title: string
  body: string
  points?: string[]
}

export type Project = {
  id: string
  index: string
  title: string
  category: string
  role: string
  description: string
  problem?: string
  solution?: string
  product?: string
  technology?: string[]
  built?: string[]
  lessons?: string
  status: string
  links?: { label: string; href: string }[]
  metrics?: ProjectMetric[]
  images: string[]
  story?: ProjectStory[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'driverspot',
    index: '01',
    title: 'DriverSpot',
    category: 'Venture',
    role: 'Founder · Product · Engineering',
    description:
      'A chauffeur-on-demand platform connecting vehicle owners with verified, trained and professional drivers.',
    problem:
      'People often need a professional driver for their own vehicle, but finding a reliable driver can be fragmented, inconsistent and inconvenient.',
    solution:
      'A marketplace that matches vehicle owners with verified chauffeurs in context — time, city, language, distance and safety — instead of treating “a driver” as a generic listing.',
    product:
      'DriverSpot is built around the owner’s car: chauffeur booking, scheduled rides, vehicle-based matching, language preferences, verified and trained drivers, after-party coverage, in-city and outstation movement, ride sharing and safety, emergency SOS, saved cars and saved addresses.',
    technology: ['React', 'React Native', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    built: [
      'Product definition and marketplace matching logic',
      'Owner and driver mobile flows',
      'Scheduling, preferences and safety requirements',
      'Backend APIs and operational surfaces',
      'Launch and ongoing iteration',
    ],
    lessons:
      'A two-sided product is one matching problem with two kinds of trust. If the matching logic is wrong, the interface cannot save it.',
    status: 'Live',
    links: [{ label: 'driverspot.in', href: 'https://driverspot.in/' }],
    metrics: [
      { value: '2,387+', label: 'Registered users' },
      { value: '170+', label: 'Registered drivers' },
      { value: '600+', label: 'Completed rides' },
      { value: '₹5.5L+', label: 'Revenue' },
    ],
    images: [],
    featured: true,
    story: [
      {
        id: 'problem',
        label: '01 Problem',
        title: 'The gap is not a ride. It is a driver for a car you already own.',
        body: 'People often need a professional driver for their own vehicle, but finding a reliable driver can be fragmented, inconsistent and inconvenient — especially when the need is immediate, scheduled, after hours, or outside the city.',
      },
      {
        id: 'insight',
        label: '02 Insight',
        title: 'The marketplace has to understand context, not just availability.',
        body: 'The matching problem is not “find any driver.” It is vehicle, city, hour, language, distance and a safety bar. Those constraints are the product. A generic two-sided template cannot hold them.',
      },
      {
        id: 'product',
        label: '03 Product',
        title: 'Chauffeur-on-demand, built around the owner’s vehicle.',
        body: 'DriverSpot connects vehicle owners with verified, trained and professional drivers.',
        points: [
          'Chauffeur booking',
          'Scheduled rides',
          'Vehicle-based matching',
          'Language preferences',
          'Verified drivers',
          'Trained / professional drivers',
          'After-party rides',
          'In-city rides',
          'Outstation rides',
          'Ride sharing / safety',
          'Emergency SOS',
          'Saved cars',
          'Saved addresses',
        ],
      },
      {
        id: 'engineering',
        label: '04 Engineering',
        title: 'The interface is the surface. The system is the work.',
        body: 'The stack sits under the matching problem: React and React Native for product surfaces, Node.js and Express for APIs, MongoDB for operational data, authentication, scheduling and the safety flows a chauffeur network actually needs.',
      },
      {
        id: 'business',
        label: '05 Business',
        title: 'Founder work is supply, demand, operations and trust.',
        body: 'DriverSpot is a marketplace. Driver supply has to be real. Owner demand has to be timed. Operations have to hold the after-party hour and the outstation edge case. Monetization only works if the match is reliable enough to repeat.',
      },
      {
        id: 'next',
        label: '06 Next',
        title: 'Tighten matching, trust and the operational details.',
        body: 'The next move is iteration: matching quality, owner trust, driver reliability, and the unglamorous operations that make a chauffeur network usable. The work is not a launch. It is the system after contact with the city.',
      },
    ],
  },
  {
    id: 'urbanscrap',
    index: '02',
    title: 'UrbanScrap',
    category: 'Product',
    role: '',
    description: '',
    status: 'Indexed',
    images: [],
  },
  {
    id: 'notrack',
    index: '03',
    title: 'Notrack',
    category: 'Product',
    role: '',
    description: '',
    status: 'Indexed',
    images: [],
  },
  {
    id: 'samudraastra',
    index: '04',
    title: 'SamudraAstra',
    category: 'Product',
    role: '',
    description: '',
    status: 'Indexed',
    images: [],
  },
  {
    id: 'shramo',
    index: '05',
    title: 'Shramo',
    category: 'Product',
    role: '',
    description: '',
    status: 'Indexed',
    images: [],
  },
]

export function projectById(id: string) {
  return projects.find((item) => item.id === id)
}
