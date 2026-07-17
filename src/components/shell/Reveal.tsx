import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface Props {
  children: ReactNode
  /** stagger offset in seconds */
  delay?: number
  className?: string
  /** distance of the rise, px */
  y?: number
}

/**
 * Scroll-into-view rise. Content is fully visible without JS-triggered
 * classes — the motion library only *adds* the entrance; reduced motion
 * gets a plain crossfade-free render.
 */
export function Reveal({ children, delay = 0, className, y = 28 }: Props) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
