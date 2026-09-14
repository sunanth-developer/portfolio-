export type FieldNote = {
  slug: string
  title: string
  category: string
  excerpt: string
  readTime: string
  body: string[]
}

export const noteCategories = [
  'BUILDING',
  'STARTUPS',
  'ENGINEERING',
  'PRODUCT',
  'AI',
  'LESSONS',
  'EXPERIMENTS',
] as const

export const fieldNotes: FieldNote[] = [
  {
    slug: 'founders-should-understand-their-technology',
    title: 'Why founders should understand their own technology',
    category: 'STARTUPS',
    excerpt:
      'If you cannot see the system, you cannot decide what to build next — you can only hope someone else will.',
    readTime: '6 min',
    body: [
      'A founder does not need to write every line. They do need to understand the machine they are asking the world to trust.',
      'When you understand the architecture, you stop treating engineering as a black box that “just ships.” You can tell the difference between a shortcut and a foundation. You can feel when a feature is actually a new system in disguise.',
      'The cost of not knowing is quiet. You make product promises the stack cannot keep. You sequence work in the wrong order. You hire for the wrong gaps.',
      'Understanding your technology is not about control. It is about judgment. The best calls usually happen at the seam between a user problem and a technical constraint — and that seam is invisible if you only stand on one side of it.',
    ],
  },
  {
    slug: 'what-building-driverspot-taught-me',
    title: 'What building DriverSpot taught me about marketplaces',
    category: 'PRODUCT',
    excerpt:
      'A two-sided product is not two apps. It is one matching problem with two kinds of trust.',
    readTime: '7 min',
    body: [
      'DriverSpot looks like a chauffeur product. Underneath, it is a matching problem: vehicle, time, place, language, safety, and a human being who has to show up.',
      'Marketplaces fail when they pretend both sides want the same thing. Owners want reliability. Drivers want clarity. The product has to hold both without flattening either into a generic “user.”',
      'The unglamorous work is the work: verification, scheduling, the after-party hour, the outstation edge case. Those are not features you add later. They are the shape of the market.',
      'Building it taught me to distrust generic marketplace templates. If the matching logic is wrong, the interface cannot save you.',
    ],
  },
  {
    slug: 'building-before-everything-is-perfect',
    title: 'Building before everything is perfect',
    category: 'BUILDING',
    excerpt:
      'Waiting for the complete picture is a way of not starting. The picture only completes in motion.',
    readTime: '5 min',
    body: [
      'There is a version of craft that hides fear. It looks like polish. It sounds like “almost ready.” It never ships.',
      'I still care about quality. I do not confuse quality with completeness. A product that is in the world can be corrected. A product that is only in your head can only be imagined.',
      'The smallest useful version is not a compromise. It is an instrument. It tells you which assumptions were expensive and which constraints were real.',
      'Build the thing that can learn. Then let what you learn change the thing.',
    ],
  },
  {
    slug: 'product-decisions-start-outside-the-code',
    title: 'Why the best product decisions usually start outside the code',
    category: 'LESSONS',
    excerpt:
      'The important question is rarely “can we build it?” It is “should this exist, and for whom?”',
    readTime: '6 min',
    body: [
      'Code is a powerful way to answer the wrong question quickly.',
      'The decisions that matter usually start in a conversation, a repeated inconvenience, a market that does not have a clean sentence for what it needs. By the time you open an editor, a lot of the product should already be true.',
      'Engineering is how you respect that truth. It is not how you invent it. When I skip the outside — the user, the constraint, the actual job to be done — I build something elegant that nobody needed.',
      'The discipline is to keep going outside. Even after the system exists. Especially then.',
    ],
  },
]
