import { motion } from 'framer-motion'
import { hiddenProject } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'
import { useApp } from '@/context/AppContext'

export function HiddenProject() {
  const { hiddenProjectVisible } = useApp()
  if (!hiddenProjectVisible) return null

  return (
    <motion.section
      className="px-5 py-24 md:px-10"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <ProjectCard
        name={hiddenProject.title}
        role={`${hiddenProject.code} · ${hiddenProject.status}`}
        description={hiddenProject.body}
      />
    </motion.section>
  )
}
