"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SkillBar } from "./skill-bar"
import { SkillRadar } from "./skill-radar"
import { SkillFilter } from "./skill-filter"
import { skills, skillCategories, getSkillsByCategory, getTopSkills } from "@/data/skills"
import type { SkillFilter as SkillFilterType } from "@/lib/types"
import { BarChart3, Radar, Grid3X3 } from "lucide-react"

export function SkillsSection() {
  const [filter, setFilter] = useState<SkillFilterType>({
    categories: [],
    minLevel: 0,
    search: ""
  })
  const [viewMode, setViewMode] = useState<"bars" | "radar" | "grid">("bars")

  // Filtrar habilidades
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      // Filtro por categorías
      if (filter.categories.length > 0 && !filter.categories.includes(skill.category)) {
        return false
      }
      
      // Filtro por nivel mínimo
      if (filter.minLevel && skill.level < filter.minLevel) {
        return false
      }
      
      // Filtro por búsqueda
      if (filter.search) {
        const searchLower = filter.search.toLowerCase()
        return skill.name.toLowerCase().includes(searchLower) ||
               skill.description?.toLowerCase().includes(searchLower)
      }
      
      return true
    })
  }, [filter])

  // Habilidades por categoría para el radar
  const topSkillsForRadar = useMemo(() => {
    return getTopSkills(8)
  }, [])

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
              Habilidades Técnicas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un vistazo completo a mis competencias técnicas, desde desarrollo frontend 
              hasta herramientas de backend y habilidades complementarias.
            </p>
          </motion.div>

          {/* Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <SkillFilter onFilter={setFilter} />
          </motion.div>

          {/* Tabs para diferentes vistas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="bars" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Barras
                </TabsTrigger>
                <TabsTrigger value="radar" className="flex items-center gap-2">
                  <Radar className="w-4 h-4" />
                  Radar
                </TabsTrigger>
                <TabsTrigger value="grid" className="flex items-center gap-2">
                  <Grid3X3 className="w-4 h-4" />
                  Categorías
                </TabsTrigger>
              </TabsList>

              {/* Vista de barras */}
              <TabsContent value="bars" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nivel de Competencia</CardTitle>
                    <CardDescription>
                      Visualización detallada del nivel de cada habilidad
                      {filteredSkills.length !== skills.length && 
                        ` (${filteredSkills.length} de ${skills.length} habilidades)`
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      {filteredSkills.map((skill, index) => (
                        <SkillBar
                          key={skill.id}
                          skill={skill}
                          index={index}
                          showDescription={true}
                        />
                      ))}
                    </div>
                    
                    {filteredSkills.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <p>No se encontraron habilidades que coincidan con los filtros.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Vista de radar */}
              <TabsContent value="radar" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Radar de Habilidades Principales</CardTitle>
                    <CardDescription>
                      Visualización interactiva de las habilidades más destacadas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <SkillRadar 
                      skills={topSkillsForRadar} 
                      interactive={true}
                      size={400}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Vista por categorías */}
              <TabsContent value="grid" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {skillCategories.map((category) => {
                    const categorySkills = filteredSkills.filter(
                      skill => skill.category === category.id
                    )
                    
                    if (categorySkills.length === 0) return null

                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <Card className="h-full">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              {category.name}
                            </CardTitle>
                            <CardDescription>
                              {categorySkills.length} habilidad{categorySkills.length !== 1 ? 'es' : ''}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {categorySkills.map((skill, index) => (
                              <SkillBar
                                key={skill.id}
                                skill={skill}
                                index={index}
                                showDescription={false}
                              />
                            ))}
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  )
}