import founderEditorial from '@/assets/founder.png'
import developerEditorial from '@/assets/developer.png'

export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export const editorial = {
  founder: {
    src: founderEditorial,
    alt: 'Editorial desk looking over a dusk city: notebook, laptop and notes on ideas, products, people and impact.',
  },
  developer: {
    src: developerEditorial,
    alt: 'Engineering desk with system diagrams, code and a city night view. Conceptual workspace, not a portrait.',
  },
} as const

export const visuals = {
  gateFounder: {
    src: 'images/shared/gate-founder.webp',
    alt: '',
    width: 1330,
    height: 1182,
  },
  gateDeveloper: {
    src: 'images/shared/gate-developer.webp',
    alt: '',
    width: 1330,
    height: 1182,
  },
  founderWorkspace: {
    src: 'images/founder/founder-workspace.webp',
    alt: 'A dark editorial workspace: laptop, notebook and car keys under warm light. Conceptual, not a portrait.',
    width: 864,
    height: 1152,
  },
  driverspotHandover: {
    src: 'images/driverspot/driverspot-handover.webp',
    alt: 'Editorial night scene of a car owner handing keys to a professional chauffeur. Conceptual, not a product screenshot.',
    width: 1280,
    height: 720,
  },
  driverspotKeys: {
    src: 'images/driverspot/driverspot-keys.webp',
    alt: 'Close-up of a car key being handed over at night. Conceptual.',
    width: 1152,
    height: 864,
  },
  journeyDesk: {
    src: 'images/journey/journey-desk.webp',
    alt: 'A dark desk with notebooks, a laptop and unreadable sketches. Conceptual build atmosphere.',
    width: 1280,
    height: 720,
  },
  developerWorkspace: {
    src: 'images/developer/developer-workspace.webp',
    alt: 'A product engineer workspace with monitors showing abstract system diagrams. Conceptual.',
    width: 1280,
    height: 720,
  },
  engineeringNodes: {
    src: 'images/developer/engineering-nodes.webp',
    alt: 'Abstract physical model of connected system nodes. Conceptual.',
    width: 1280,
    height: 720,
  },
  labPrototype: {
    src: 'images/developer/lab-prototype.webp',
    alt: 'Abstract prototype bench with unnamed hardware. Conceptual, not a real lab photograph.',
    width: 1152,
    height: 864,
  },
} as const

export const projectCovers: Record<
  string,
  { src: string; alt: string; width: number; height: number }
> = {
  driverspot: {
    src: 'images/projects/driverspot-cover.webp',
    alt: 'Editorial still of a car key handover. Conceptual cover, not a DriverSpot screenshot.',
    width: 1152,
    height: 864,
  },
  urbanscrap: {
    src: 'images/projects/urbanscrap-cover.webp',
    alt: 'Wet city street at dusk with a collection truck and a phone on the ground. Conceptual cover for an indexed project.',
    width: 1152,
    height: 864,
  },
  notrack: {
    src: 'images/projects/notrack-cover.webp',
    alt: 'Indian meal and a face-down phone on a dark table. Conceptual cover, not an app screenshot.',
    width: 1152,
    height: 864,
  },
  samudraastra: {
    src: 'images/projects/samudraastra-cover.webp',
    alt: 'Underwater view of a small unnamed submersible. Conceptual cover, not a product photograph.',
    width: 1152,
    height: 864,
  },
  shramo: {
    src: 'images/projects/shramo-cover.webp',
    alt: 'Night venue with chairs, cables and lighting. Conceptual cover for an indexed project.',
    width: 1152,
    height: 864,
  },
}
