"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef, ReactNode, ElementType } from "react"
import { cn } from "@/lib/utils"
import { 
  fadeInUp, 
  fadeInDown, 
  fadeInLeft, 
  fadeInRight, 
  scaleIn,
  staggerContainer 
} from "@/lib/animations"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "stagger"
  delay?: number
  once?: boolean
  threshold?: number
  as?: ElementType
}

const animationVariants: Record<string, Variants> = {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  stagger: staggerContainer
}

export function AnimatedSection({
  children,
  className,
  animation = "fadeInUp",
  delay = 0,
  once = true,
  threshold = 0.1,
  as: Component = "div"
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once, 
    margin: "-100px",
    amount: threshold
  })

  const variants = animationVariants[animation]

  const MotionComponent = motion(Component)

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      variants={variants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={{
        delay
      }}
    >
      {children}
    </MotionComponent>
  )
}