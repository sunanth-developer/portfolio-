import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'

export function PageTransition() {
  const { transition } = useApp()

  return (
    <AnimatePresence>
      {transition.active && (
        <motion.div
          className="fixed inset-0 z-[75] flex items-center justify-center bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          aria-hidden
        >
          <motion.p
            className="font-display text-sm tracking-[0.4em] text-muted uppercase md:text-base"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
          >
            {transition.number} / {transition.label}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
