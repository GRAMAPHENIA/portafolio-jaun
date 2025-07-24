"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { fadeInUp, scaleIn } from "@/lib/animations"

interface LoadingScreenProps {
  isLoading: boolean
  progress?: number
  message?: string
  className?: string
}

export function LoadingScreen({ 
  isLoading, 
  progress = 0, 
  message = "Cargando...",
  className 
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-6 p-8 rounded-lg bg-card border border-border shadow-lg"
            variants={scaleIn}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Logo or Brand */}
            <motion.div
              className="text-4xl font-bold text-foreground"
              variants={fadeInUp}
            >
              Jaun Rojo
            </motion.div>

            {/* Loading Animation */}
            <motion.div
              className="relative"
              variants={fadeInUp}
            >
              <motion.div
                className="w-16 h-16 border-4 border-muted rounded-full border-t-accent"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>

            {/* Progress Bar */}
            {progress > 0 && (
              <motion.div
                className="w-64 space-y-2"
                variants={fadeInUp}
              >
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{message}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </motion.div>
            )}

            {/* Simple message without progress */}
            {progress === 0 && (
              <motion.p
                className="text-muted-foreground text-center"
                variants={fadeInUp}
              >
                {message}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Simplified loading spinner for inline use
export function LoadingSpinner({ 
  size = "md", 
  className 
}: { 
  size?: "sm" | "md" | "lg"
  className?: string 
}) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  }

  return (
    <motion.div
      className={cn(
        "border-muted rounded-full border-t-accent",
        sizeClasses[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}