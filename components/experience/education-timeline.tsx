"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, GraduationCap, ChevronDown, ChevronUp, Award } from "lucide-react"
import type { Education } from "@/lib/types"

interface EducationTimelineProps {
  education: Education[]
}

interface EducationItemProps {
  education: Education
  index: number
  isLast: boolean
}

function EducationItem({ education, index, isLast }: EducationItemProps) {
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
    const start = education.startDate
    const end = education.endDate || new Date()
    const years = end.getFullYear() - start.getFullYear()
    
    if (years === 0) {
      const months = end.getMonth() - start.getMonth()
      return `${months} mes${months !== 1 ? 'es' : ''}`
    }
    
    return `${years} año${years !== 1 ? 's' : ''}`
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
          className="w-4 h-4 rounded-full border-4 border-background bg-blue-500 z-10"
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
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                  {education.degree}
                </CardTitle>
                <CardDescription className="text-base font-medium text-foreground">
                  {education.institution}
                </CardDescription>
                <CardDescription className="text-sm">
                  {education.field}
                </CardDescription>
              </div>
              
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Educación
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(education.startDate)} - {
                    education.endDate ? formatDate(education.endDate) : 'Presente'
                  }
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>{getDuration()}</span>
              </div>
              {education.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{education.location}</span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {education.description && (
              <p className="text-muted-foreground mb-4">
                {education.description}
              </p>
            )}

            {/* Expandable achievements */}
            {education.achievements && education.achievements.length > 0 && (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 p-0 h-auto font-medium text-sm mb-2"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  <Award className="w-4 h-4" />
                  Logros destacados ({education.achievements.length})
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
                        {education.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-blue-500 mt-1">•</span>
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

export function EducationTimeline({ education }: EducationTimelineProps) {
  const sortedEducation = [...education].sort((a, b) => 
    b.startDate.getTime() - a.startDate.getTime()
  )

  return (
    <div className="space-y-0">
      {sortedEducation.map((edu, index) => (
        <EducationItem
          key={edu.id}
          education={edu}
          index={index}
          isLast={index === sortedEducation.length - 1}
        />
      ))}
    </div>
  )
}