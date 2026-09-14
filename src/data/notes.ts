export type FieldNote = {
  slug: string
  title: string
  category: string
  excerpt: string
  body: string[]
  published: boolean
}

export const noteCategories = [
  'BUILDING',
  'PRODUCT',
  'ENGINEERING',
  'STARTUPS',
  'AI',
  'LESSONS',
  'EXPERIMENTS',
] as const

export const notes: FieldNote[] = [
  {
    slug: 'founders-should-understand-their-technology',
    title: 'Why founders should understand their own technology',
    category: 'STARTUPS',
    excerpt: 'If you cannot see the system, you cannot decide what to build next.',
    published: false,
    body: [
      'Draft. Thinking in public — not a published essay.',
      'If you cannot see the system, you cannot decide what to build next. You can only hope someone else will.',
    ],
  },
  {
    slug: 'what-building-driverspot-taught-me',
    title: 'What building DriverSpot taught me about marketplaces',
    category: 'PRODUCT',
    excerpt: 'A two-sided product is one matching problem with two kinds of trust.',
    published: false,
    body: [
      'Draft from the DriverSpot build.',
      'Owners want reliability. Drivers want clarity. The product has to hold both, or the marketplace does not repeat.',
    ],
  },
  {
    slug: 'building-before-everything-is-perfect',
    title: 'Building before everything is perfect',
    category: 'BUILDING',
    excerpt: 'A product in the world can be corrected. A product that lives only in your head cannot.',
    published: false,
    body: [
      'Draft.',
      'A product in the world can be corrected. A product that is only in your head can only be imagined.',
    ],
  },
  {
    slug: 'product-decisions-start-outside-the-code',
    title: 'Why the best product decisions usually start outside the code',
    category: 'LESSONS',
    excerpt: 'The important question is rarely “can we build it?”',
    published: false,
    body: [
      'Draft.',
      'The important question is rarely “can we build it?” It is “should this exist, and for whom?”',
    ],
  },
]

export const fieldNotes = notes
