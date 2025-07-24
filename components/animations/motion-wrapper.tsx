"use client"

import { motion, MotionProps } from "framer-motion"
import { ReactNode, forwardRef, ElementType } from "react"
import { useMotionPreferences } from "@/hooks/use-motion-preferences"

interface MotionWrapperProps extends MotionProps {
  children: ReactNode
  fallback?: ReactNode
  as?: ElementType
}

export const MotionWrapper = forwardRef<HTMLDivElement, MotionWrapperProps>(
  ({ children, fallback, as: Component = "div", ...motionProps }, ref) => {
    const { shouldAnimate } = useMotionPreferences()

    if (!shouldAnimate) {
      // Return static version without animations
      if (fallback) {
        return <>{fallback}</>
      }
      
      // Return the component without motion props
      const { 
        initial, 
        animate, 
        exit, 
        variants, 
        transition, 
        whileHover, 
        whileTap,
        ...staticProps 
      } = motionProps
      
      const StaticComponent = Component as any
      return (
        <StaticComponent ref={ref} {...staticProps}>
          {children}
        </StaticComponent>
      )
    }

    // Return animated version
    const MotionComponent = motion(Component)
    return (
      <MotionComponent
        ref={ref}
        {...motionProps}
      >
        {children}
      </MotionComponent>
    )
  }
)

MotionWrapper.displayName = "MotionWrapper"