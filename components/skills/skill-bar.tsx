"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import type { Skill } from "@/lib/types"

interface SkillBarProps {
  skill: Skill
  index: number
  showDescription?: boolean
}

export function SkillBar({ skill, index, showDescription = false }: SkillBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {skill.color && (
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: skill.color }}
            />
          )}
          <span className="font-medium text-foreground">{skill.name}</span>
        </div>
        <span className="text-sm text-muted-foreground font-mono">
          {skill.level}%
        </span>
      </div>
      
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ 
            backgroundColor: skill.color || "hsl(var(--accent))",
            opacity: 0.8
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: index * 0.1 + 0.3,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ 
            backgroundColor: skill.color || "hsl(var(--accent))",
            opacity: 0.3
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ 
            duration: 1.5, 
            delay: index * 0.1 + 0.2,
            ease: "easeOut"
          }}
        />
      </div>

      {showDescription && skill.description && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={isInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
          className="text-sm text-muted-foreground mt-1"
        >
          {skill.description}
        </motion.p>
      )}

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>{skill.yearsOfExperience} años de experiencia</span>
        {skill.projects && skill.projects.length > 0 && (
          <span>{skill.projects.length} proyectos</span>
        )}
      </div>
    </motion.div>
  )
}