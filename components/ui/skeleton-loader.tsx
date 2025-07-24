"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <motion.div
      className={cn(
        "bg-muted rounded-md",
        className
      )}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

interface SkeletonLoaderProps {
  variant: "project" | "blog" | "section" | "hero" | "testimonial"
  count?: number
  className?: string
}

export function SkeletonLoader({ 
  variant, 
  count = 1, 
  className 
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case "project":
        return (
          <div className="space-y-4 p-6 border border-border rounded-lg">
            {/* Project image */}
            <Skeleton className="h-48 w-full" />
            
            {/* Project title */}
            <Skeleton className="h-6 w-3/4" />
            
            {/* Project description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            
            {/* Technology tags */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-14" />
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        )

      case "blog":
        return (
          <div className="space-y-4 p-6 border border-border rounded-lg">
            {/* Blog image */}
            <Skeleton className="h-40 w-full" />
            
            {/* Blog title */}
            <Skeleton className="h-7 w-4/5" />
            
            {/* Blog meta */}
            <div className="flex gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            
            {/* Blog excerpt */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            
            {/* Tags */}
            <div className="flex gap-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-14" />
            </div>
          </div>
        )

      case "section":
        return (
          <div className="space-y-6">
            {/* Section title */}
            <div className="text-center space-y-2">
              <Skeleton className="h-10 w-64 mx-auto" />
              <Skeleton className="h-5 w-96 mx-auto" />
            </div>
            
            {/* Section content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4 p-4 border border-border rounded-lg">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>
        )

      case "hero":
        return (
          <div className="text-center space-y-8 py-16">
            {/* Hero title */}
            <div className="space-y-4">
              <Skeleton className="h-16 w-80 mx-auto" />
              <Skeleton className="h-8 w-96 mx-auto" />
            </div>
            
            {/* Hero description */}
            <div className="space-y-2 max-w-2xl mx-auto">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6 mx-auto" />
              <Skeleton className="h-5 w-4/5 mx-auto" />
            </div>
            
            {/* Hero buttons */}
            <div className="flex gap-4 justify-center">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-28" />
            </div>
          </div>
        )

      case "testimonial":
        return (
          <div className="space-y-4 p-6 border border-border rounded-lg">
            {/* Quote */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            
            {/* Author info */}
            <div className="flex items-center gap-4 pt-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        )

      default:
        return <Skeleton className="h-20 w-full" />
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.1,
            duration: 0.4
          }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </div>
  )
}

// Individual skeleton components for more granular use
export function ProjectSkeleton() {
  return <SkeletonLoader variant="project" count={1} />
}

export function BlogSkeleton() {
  return <SkeletonLoader variant="blog" count={1} />
}

export function HeroSkeleton() {
  return <SkeletonLoader variant="hero" count={1} />
}

export function TestimonialSkeleton() {
  return <SkeletonLoader variant="testimonial" count={1} />
}