import { Variants } from "framer-motion"

// Standard easing function for consistent animations
export const EASING = [0.25, 0.1, 0.25, 1] as const

// Animation durations
export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
} as const

// Common animation variants
export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 60 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: DURATION.slow, 
      ease: EASING 
    }
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: { 
      duration: DURATION.normal, 
      ease: EASING 
    }
  }
}

export const fadeInDown: Variants = {
  initial: { 
    opacity: 0, 
    y: -60 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: DURATION.slow, 
      ease: EASING 
    }
  },
  exit: {
    opacity: 0,
    y: 60,
    transition: { 
      duration: DURATION.normal, 
      ease: EASING 
    }
  }
}

export const fadeInLeft: Variants = {
  initial: { 
    opacity: 0, 
    x: -60 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: DURATION.slow, 
      ease: EASING 
    }
  },
  exit: {
    opacity: 0,
    x: 60,
    transition: { 
      duration: DURATION.normal, 
      ease: EASING 
    }
  }
}

export const fadeInRight: Variants = {
  initial: { 
    opacity: 0, 
    x: 60 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: DURATION.slow, 
      ease: EASING 
    }
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: { 
      duration: DURATION.normal, 
      ease: EASING 
    }
  }
}

export const scaleIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.8 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: DURATION.slow, 
      ease: EASING 
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { 
      duration: DURATION.normal, 
      ease: EASING 
    }
  }
}

export const slideInUp: Variants = {
  initial: { 
    y: "100%" 
  },
  animate: { 
    y: 0,
    transition: { 
      duration: DURATION.slow, 
      ease: EASING 
    }
  },
  exit: {
    y: "100%",
    transition: { 
      duration: DURATION.normal, 
      ease: EASING 
    }
  }
}

// Stagger container for animating children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
}

// Stagger item for use with staggerContainer
export const staggerItem: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: DURATION.normal, 
      ease: EASING 
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { 
      duration: DURATION.fast, 
      ease: EASING 
    }
  }
}

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { 
    duration: DURATION.fast, 
    ease: EASING 
  }
}

export const hoverLift = {
  y: -8,
  transition: { 
    duration: DURATION.fast, 
    ease: EASING 
  }
}

// Loading animations
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const spin: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// Page transition animations
export const pageTransition: Variants = {
  initial: { 
    opacity: 0,
    y: 20
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: DURATION.slow, 
      ease: EASING,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { 
      duration: DURATION.normal, 
      ease: EASING 
    }
  }
}

// Modal animations
export const modalBackdrop: Variants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: { 
      duration: DURATION.normal 
    }
  },
  exit: {
    opacity: 0,
    transition: { 
      duration: DURATION.normal 
    }
  }
}

export const modalContent: Variants = {
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