"use client"

import { useMemo } from "react"
import { BarChart3, Star, CheckCircle, Clock, Archive } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProjectStats } from "@/lib/project-utils"
import type { Project } from "@/lib/types"

interface ProjectStatsProps {
  projects: Project[]
  className?: string
}

export function ProjectStats({ projects, className = "" }: ProjectStatsProps) {
  const stats = useMemo(() => getProjectStats(projects), [projects])

  const statusIcons = {
    completed: CheckCircle,
    "in-progress": Clock,
    maintenance: BarChart3,
    archived: Archive
  }

  const statusColors = {
    completed: "bg-green-500/10 text-green-700 dark:text-green-400",
    "in-progress": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    maintenance: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    archived: "bg-gray-500/10 text-gray-700 dark:text-gray-400"
  }

  const topTechnologies = Object.entries(stats.byTechnology)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const topCategories = Object.entries(stats.byCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {/* Total de proyectos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Proyectos</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="flex items-center gap-2 mt-2">
            <Star className="h-3 w-3 text-yellow-500" />
            <span className="text-xs text-muted-foreground">
              {stats.featured} destacados
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Estado de proyectos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Por Estado</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(stats.byStatus).map(([status, count]) => {
              const Icon = statusIcons[status as keyof typeof statusIcons]
              const colorClass = statusColors[status as keyof typeof statusColors]
              
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3 w-3" />
                    <span className="text-xs capitalize">{status}</span>
                  </div>
                  <Badge variant="secondary" className={`text-xs ${colorClass}`}>
                    {count}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top tecnologías */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Tecnologías</CardTitle>
          <div className="h-4 w-4 rounded bg-gradient-to-r from-blue-500 to-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topTechnologies.map(([tech, count]) => (
              <div key={tech} className="flex items-center justify-between">
                <span className="text-xs truncate">{tech}</span>
                <Badge variant="outline" className="text-xs">
                  {count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top categorías */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Categorías</CardTitle>
          <div className="h-4 w-4 rounded bg-gradient-to-r from-green-500 to-teal-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topCategories.map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-xs truncate">{category}</span>
                <Badge variant="outline" className="text-xs">
                  {count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}