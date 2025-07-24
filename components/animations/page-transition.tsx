"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode } from "react"
import { pageTransition } from "@/lib/animations"

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

interface AnimatedPageProps {
  children: ReactNode
  className?: string
}

export function AnimatedPage({ children, className }: AnimatedPageProps) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition className={className}>
        {children}
      </PageTransition>
    </AnimatePresence>
  )
}