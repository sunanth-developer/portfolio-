export type TechCategory = {
  id: string
  label: string
  items: string[]
}

export const technologyCategories: TechCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React', 'React Native', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'REST APIs', 'Authentication', 'Databases'],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    items: ['Git', 'GitHub', 'Cloud', 'Deployment', 'CI/CD'],
  },
  {
    id: 'exploring',
    label: 'Exploring',
    items: ['AI', 'LLMs', 'AI Agents', 'Automation', 'Data'],
  },
]

export const technologyCenter = 'Products'
