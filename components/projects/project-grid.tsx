"use client"

import { useState } from "react"
import { ProjectCard } from "./project-card"
import { ProjectModal } from "./project-modal"
import { ProjectFilters } from "./project-filters"
import { ProjectStats } from "./project-stats"
import { projects } from "@/data/projects"
import { useProjectFilters } from "@/hooks/use-project-filters"
import type { Project, ProjectFilter, ProjectSort } from "@/lib/types"

export function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showStats] = useState(false)

  const {
    filteredProjects,
    stats,
    updateFilters,
    updateSort
  } = useProjectFilters({ projects })

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const handleFilterChange = (newFilters: Partial<ProjectFilter>) => {
    updateFilters(newFilters)
  }

  const handleSortChange = (newSort: ProjectSort) => {
    updateSort(newSort)
  }

  return (
    <section id="proyectos" className="pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-muted-foreground/30"></div>
            <span className="font-body text-sm text-muted-foreground uppercase tracking-wider">
              Estados
            </span>
          </div>
          <h2 className="font-heading text-4xl font-light mb-8">Proyectos</h2>
          
          {/* Componente de filtros */}
          <ProjectFilters
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            totalProjects={stats.total}
            filteredCount={stats.filtered}
          />
          
          {/* Estadísticas opcionales */}
          {showStats && (
            <div className="mt-6">
              <ProjectStats projects={filteredProjects} />
            </div>
          )}
        </div>

        {/* Grid de proyectos */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                className={getGridItemClass(index)}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          // Estado vacío cuando no hay resultados
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-medium mb-2">
                No se encontraron proyectos
              </h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar los filtros o términos de búsqueda para encontrar proyectos.
              </p>
            </div>
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}

function getGridItemClass(index: number): string {
  const patterns = [
    "md:col-span-2 md:row-span-2", // Grande
    "md:col-span-2 md:row-span-1", // Ancho
    "md:col-span-2 md:row-span-1", // Ancho
    "md:col-span-2 md:row-span-2", // Grande
    "md:col-span-2 md:row-span-1", // Ancho
    "md:col-span-2 md:row-span-1", // Ancho
  ]

  return patterns[index % patterns.length]
}
