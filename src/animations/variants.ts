export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export const stagger = {
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

export const clipReveal = {
  hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0.6 },
  visible: { clipPath: 'inset(0% 0 0 0)', opacity: 1 },
}
