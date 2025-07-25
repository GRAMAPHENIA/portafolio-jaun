"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExperienceTimeline } from "./experience-timeline"
import { EducationTimeline } from "./education-timeline"
import { experiences, education, getCurrentExperience, getTotalExperienceYears } from "@/data/experience"
import { Briefcase, GraduationCap, Calendar, TrendingUp } from "lucide-react"

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState("experience")
  const currentExperience = getCurrentExperience()
  const totalYears = getTotalExperienceYears()

  // Estadísticas
  const stats = [
    {
      icon: Calendar,
      label: "Años de experiencia",
      value: `${totalYears}+`,
      color: "text-blue-500"
    },
    {
      icon: Briefcase,
      label: "Posiciones",
      value: experiences.length.toString(),
      color: "text-green-500"
    },
    {
      icon: GraduationCap,
      label: "Formación",
      value: education.length.toString(),
      color: "text-purple-500"
    },
    {
      icon: TrendingUp,
      label: "Proyectos completados",
      value: "15+",
      color: "text-orange-500"
    }
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Experiencia Profesional
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mi trayectoria profesional en el desarrollo de software, desde mis inicios 
              hasta mi posición actual como desarrollador full stack freelance.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Current Position Highlight */}
          {currentExperience && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-accent" />
                        Posición Actual
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {currentExperience.position} en {currentExperience.company}
                      </CardDescription>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">
                      Activo
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {currentExperience.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Timeline Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Experiencia Laboral
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Formación
                </TabsTrigger>
              </TabsList>

              {/* Experience Timeline */}
              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trayectoria Profesional</CardTitle>
                    <CardDescription>
                      Mi evolución profesional desde prácticas hasta desarrollador freelance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ExperienceTimeline experiences={experiences} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education Timeline */}
              <TabsContent value="education" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Formación Académica y Certificaciones</CardTitle>
                    <CardDescription>
                      Mi formación académica y certificaciones profesionales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EducationTimeline education={education} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  )
}