"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import type { Skill } from "@/lib/types"

interface SkillRadarProps {
  skills: Skill[]
  interactive?: boolean
  size?: number
}

interface RadarPoint {
  x: number
  y: number
  skill: Skill
  angle: number
}

export function SkillRadar({ skills, interactive = true, size = 300 }: SkillRadarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
  
  const center = size / 2
  const maxRadius = center - 40
  
  // Calcular puntos del radar
  const radarPoints: RadarPoint[] = skills.map((skill, index) => {
    const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2
    const radius = (skill.level / 100) * maxRadius
    const x = center + Math.cos(angle) * radius
    const y = center + Math.sin(angle) * radius
    
    return { x, y, skill, angle }
  })
  
  // Crear path para el polígono
  const pathData = radarPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ') + ' Z'
  
  // Líneas de referencia (círculos concéntricos)
  const referenceCircles = [20, 40, 60, 80, 100].map(percentage => ({
    radius: (percentage / 100) * maxRadius,
    percentage
  }))
  
  // Líneas radiales
  const radialLines = skills.map((_, index) => {
    const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2
    const endX = center + Math.cos(angle) * maxRadius
    const endY = center + Math.sin(angle) * maxRadius
    return { endX, endY, angle }
  })

  return (
    <div className="relative" ref={ref}>
      <motion.svg
        width={size}
        height={size}
        className="overflow-visible"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Círculos de referencia */}
        {referenceCircles.map((circle, index) => (
          <motion.circle
            key={circle.percentage}
            cx={center}
            cy={center}
            r={circle.radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={1}
            strokeOpacity={0.3}
            initial={{ r: 0 }}
            animate={isInView ? { r: circle.radius } : { r: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          />
        ))}
        
        {/* Líneas radiales */}
        {radialLines.map((line, index) => (
          <motion.line
            key={index}
            x1={center}
            y1={center}
            x2={line.endX}
            y2={line.endY}
            stroke="hsl(var(--border))"
            strokeWidth={1}
            strokeOpacity={0.3}
            initial={{ x2: center, y2: center }}
            animate={isInView ? { x2: line.endX, y2: line.endY } : { x2: center, y2: center }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          />
        ))}
        
        {/* Polígono principal */}
        <motion.path
          d={pathData}
          fill="hsl(var(--accent))"
          fillOpacity={0.2}
          stroke="hsl(var(--accent))"
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />
        
        {/* Puntos de habilidades */}
        {radarPoints.map((point, index) => (
          <motion.g key={point.skill.id}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={interactive ? 6 : 4}
              fill={point.skill.color || "hsl(var(--accent))"}
              stroke="hsl(var(--background))"
              strokeWidth={2}
              className={interactive ? "cursor-pointer" : ""}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              whileHover={interactive ? { scale: 1.3 } : {}}
              onHoverStart={() => interactive && setHoveredSkill(point.skill)}
              onHoverEnd={() => interactive && setHoveredSkill(null)}
            />
            
            {/* Etiquetas de habilidades */}
            <motion.text
              x={center + Math.cos(point.angle) * (maxRadius + 20)}
              y={center + Math.sin(point.angle) * (maxRadius + 20)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
            >
              {point.skill.name}
            </motion.text>
          </motion.g>
        ))}
        
        {/* Etiquetas de porcentaje */}
        {referenceCircles.map((circle) => (
          <motion.text
            key={circle.percentage}
            x={center + circle.radius + 5}
            y={center}
            textAnchor="start"
            dominantBaseline="middle"
            className="text-xs fill-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            {circle.percentage}%
          </motion.text>
        ))}
      </motion.svg>
      
      {/* Tooltip para habilidad seleccionada */}
      {interactive && hoveredSkill && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg max-w-xs z-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: hoveredSkill.color }}
            />
            <h4 className="font-semibold text-sm">{hoveredSkill.name}</h4>
            <span className="text-xs text-muted-foreground ml-auto">
              {hoveredSkill.level}%
            </span>
          </div>
          {hoveredSkill.description && (
            <p className="text-xs text-muted-foreground mb-2">
              {hoveredSkill.description}
            </p>
          )}
          <div className="text-xs text-muted-foreground">
            {hoveredSkill.yearsOfExperience} años de experiencia
          </div>
        </motion.div>
      )}
    </div>
  )
}