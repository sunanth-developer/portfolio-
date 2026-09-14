export type CaseChapter = {
  id: string
  label: string
  body: string
}

export type Venture = {
  id: string
  name: string
  role: string
  description: string
  capabilities: string[]
  chapters: CaseChapter[]
  visualNote: string
  images: string[]
}

export const ventures: Venture[] = [
  {
    id: 'driverspot',
    name: 'DriverSpot',
    role: 'Founder · Product · Engineering',
    description:
      'A chauffeur-on-demand platform that connects vehicle owners with verified, trained and professional drivers.',
    capabilities: [
      'Chauffeur services',
      'After-party',
      'In-city',
      'Outstation',
      'Scheduled rides',
      'Vehicle-based driver matching',
      'Language preferences',
      'Safety features',
    ],
    chapters: [
      {
        id: 'problem',
        label: 'The problem',
        body: 'Owning a vehicle and needing a professional driver are two different problems that usually get solved through informal networks. Verification, availability and trust stay fragmented — especially when the need is immediate, scheduled, or outside the city.',
      },
      {
        id: 'insight',
        label: 'The insight',
        body: 'The matching problem is not “find any driver.” It is contextual: the vehicle, the city, the hour, the language, the distance, the safety bar. A chauffeur product has to understand those constraints as the product, not as extras.',
      },
      {
        id: 'product',
        label: 'The product',
        body: 'DriverSpot is a chauffeur-on-demand platform connecting vehicle owners with verified, trained and professional drivers — for in-city movement, outstation travel, scheduled rides and after-party coverage.',
      },
      {
        id: 'system',
        label: 'The system',
        body: 'Under the interface is a matching and operations system: vehicle-based pairing, scheduling, language preference, and safety as a product requirement rather than a footnote.',
      },
      {
        id: 'next',
        label: 'The next move',
        body: 'Keep tightening the system — matching quality, owner trust, and the operational details that make a chauffeur network actually usable. The work is not a launch. It is iteration.',
      },
    ],
    visualNote: 'Visual archive — drop product frames in public/ventures/driverspot',
    images: [],
  },
]

export const hiddenProject = {
  code: 'PROJECT 07',
  status: 'UNRELEASED',
  title: 'Quiet system',
  body: 'Not every build is public yet. This one is still in the quiet phase — visible only if you stay with the page long enough.',
}
