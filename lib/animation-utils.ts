import { Variants, Transition } from "framer-motion"
import { DURATION, EASING } from "./animations"

// Utility to create staggered animations with custom delays
export function createStaggeredAnimation(
  baseAnimation: Variants,
  staggerDelay: number = 0.1
): Variants {
  return {
    initial: baseAnimation.initial,
    animate: {
      ...baseAnimation.animate,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: staggerDelay
      }
    },
    exit: {
      ...baseAnimation.exit,
      transition: {
        staggerChildren: staggerDelay / 2,
        staggerDirection: -1
      }
    }
  }
}

// Utility to create hover animations with consistent timing
export function createHoverAnimation(
  hoverState: Record<string, any>,
  tapState?: Record<string, any>
) {
  return {
    whileHover: {
      ...hoverState,
      transition: {
        duration: DURATION.fast,
        ease: EASING
      }
    },
    whileTap: tapState ? {
      ...tapState,
      transition: {
        duration: DURATION.fast / 2,
        ease: EASING
      }
    } : undefined
  }
}

// Utility to create loading animations
export function createLoadingAnimation(type: "pulse" | "spin" | "bounce" = "pulse") {
  const animations = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    },
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return {
    animate: animations[type]
  }
}

// Utility to create scroll-triggered animations
export function createScrollAnimation(
  animation: Variants,
  threshold: number = 0.1,
  once: boolean = true
) {
  return {
    ...animation,
    viewport: {
      once,
      amount: threshold,
      margin: "-100px"
    }
  }
}

// Utility to create modal/overlay animations
export function createModalAnimation() {
  return {
    backdrop: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: { duration: DURATION.normal }
      },
      exit: { 
        opacity: 0,
        transition: { duration: DURATION.normal }
      }
    },
    content: {
      initial: { 
        opacity: 0,
        scale: 0.95,
        y: 20
      },
      animate: { 
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { 
          duration: DURATION.normal,
          ease: EASING
        }
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: { 
          duration: DURATION.fast,
          ease: EASING
        }
      }
    }
  }
}