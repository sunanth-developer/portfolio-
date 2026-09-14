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
    items: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Databases', 'MongoDB'],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    items: ['Git', 'GitHub', 'Cloud', 'Deployment', 'CI/CD'],
  },
  {
    id: 'exploring',
    label: 'Exploring',
    items: ['AI', 'LLMs', 'AI Agents', 'Automation'],
  },
]

export const ecosystem = [
  { id: 'react', label: 'React', ring: 'product' },
  { id: 'rn', label: 'React Native', ring: 'product' },
  { id: 'js', label: 'JavaScript', ring: 'product' },
  { id: 'node', label: 'Node.js', ring: 'system' },
  { id: 'express', label: 'Express', ring: 'system' },
  { id: 'mongo', label: 'MongoDB', ring: 'system' },
  { id: 'api', label: 'REST APIs', ring: 'system' },
  { id: 'git', label: 'Git', ring: 'ops' },
  { id: 'cloud', label: 'Cloud', ring: 'ops' },
  { id: 'deploy', label: 'Deployment', ring: 'ops' },
  { id: 'ai', label: 'AI', ring: 'explore' },
] as const
