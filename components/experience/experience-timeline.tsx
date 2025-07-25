"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ExternalLink, ChevronDown, ChevronUp, Building } from "lucide-react"
import type { Experience } from "@/lib/types"
import { getTechnologiesByCategory } from "@/data/technologies"

interface ExperienceTimelineProps {
  experiences: Experience[]
  showEducation?: boolean
}

interface TimelineItemProps {
  experience: Experience
  index: number
  isLast: boolean
}

function TimelineItem({ experience, index, isLast }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  const getDuration = () => {
    const start = experience.startDate
    const end = experience.endDate || new Date()
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth())
    
    if (months < 12) {
      return `${months} mes${months !== 1 ? 'es' : ''}`
    }
    
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    
    if (remainingMonths === 0) {
      return `${years} año${years !== 1 ? 's' : ''}`
    }
    
    return `${years} año${years !== 1 ? 's' : ''} y ${remainingMonths} mes${remainingMonths !== 1 ? 'es' : ''}`
  }

  const getTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-green-500',
      'part-time': 'bg-blue-500',
      'freelance': 'bg-purple-500',
      'contract': 'bg-orange-500',
      'internship': 'bg-gray-500'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-500'
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      'full-time': 'Tiempo Completo',
      'part-time': 'Tiempo Parcial',
      'freelance': 'Freelance',
      'contract': 'Contrato',
      'internship': 'Prácticas'
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex gap-6"
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
          className={`w-4 h-4 rounded-full border-4 border-background z-10 ${
            !experience.endDate ? 'bg-accent' : 'bg-muted-foreground'
          }`}
        />
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
            className="w-0.5 bg-border flex-1 mt-2"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-xl mb-1 flex items-center gap-2">
                  {experience.logo && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Building className="w-4 h-4" />
                    </div>
                  )}
                  {experience.position}
                </CardTitle>
                <CardDescription className="text-base font-medium text-foreground">
                  {experience.company}
                </CardDescription>
              </div>
              
              <div className="text-right">
                <Badge 
                  variant="secondary" 
                  className={`mb-2 ${getTypeColor(experience.type)} text-white`}
                >
                  {getTypeLabel(experience.type)}
                </Badge>
                {!experience.endDate && (
                  <Badge variant="outline" className="block">
                    Actual
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(experience.startDate)} - {
                    experience.endDate ? formatDate(experience.endDate) : 'Presente'
                  }
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>{getDuration()}</span>
              </div>
              {experience.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              )}
              {experience.website && (
                <a 
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-accent transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Sitio web</span>
                </a>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-muted-foreground mb-4">
              {experience.description}
            </p>

            {/* Technologies */}
            {experience.technologies.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-sm">Tecnologías utilizadas:</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Expandable achievements */}
            {experience.achievements.length > 0 && (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 p-0 h-auto font-medium text-sm mb-2"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Logros destacados ({experience.achievements.length})
                </Button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {experience.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-accent mt-1">•</span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

export function ExperienceTimeline({ experiences, showEducation = false }: ExperienceTimelineProps) {
  const sortedExperiences = [...experiences].sort((a, b) => 
    b.startDate.getTime() - a.startDate.getTime()
  )

  return (
    <div className="space-y-0">
      {sortedExperiences.map((experience, index) => (
        <TimelineItem
          key={experience.id}
          experience={experience}
          index={index}
          isLast={index === sortedExperiences.length - 1}
        />
      ))}
    </div>
  )
}