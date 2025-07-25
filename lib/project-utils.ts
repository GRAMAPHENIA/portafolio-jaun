import type { Project, ProjectFilter, ProjectSort } from "@/lib/types"

/**
 * Filtra proyectos basado en los criterios especificados
 */
export function filterProjects(projects: Project[], filters: ProjectFilter): Project[] {
  return projects.filter(project => {
    // Filtro por búsqueda de texto
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const searchableText = [
        project.title,
        project.description,
        project.longDescription || "",
        ...project.tags,
        ...project.technologies.map(tech => tech.name),
        project.category,
        project.client || "",
        project.role || ""
      ].join(" ").toLowerCase()
      
      if (!searchableText.includes(searchTerm)) {
        return false
      }
    }

    // Filtro por categorías
    if (filters.categories.length > 0) {
      if (!filters.categories.includes(project.category)) {
        return false
      }
    }

    // Filtro por tecnologías
    if (filters.technologies.length > 0) {
      const projectTechNames = project.technologies.map(tech => tech.name)
      const hasMatchingTech = filters.technologies.some(tech => 
        projectTechNames.includes(tech)
      )
      if (!hasMatchingTech) {
        return false
      }
    }

    // Filtro por estado
    if (filters.status.length > 0) {
      if (!filters.status.includes(project.status)) {
        return false
      }
    }

    // Filtro por proyectos destacados
    if (filters.featured === true) {
      if (!project.featured) {
        return false
      }
    }

    return true
  })
}

/**
 * Ordena proyectos basado en los criterios especificados
 */
export function sortProjects(projects: Project[], sort: ProjectSort): Project[] {
  return [...projects].sort((a, b) => {
    let comparison = 0

    switch (sort.field) {
      case "title":
        comparison = a.title.localeCompare(b.title, 'es', { sensitivity: 'base' })
        break
      
      case "startDate":
        comparison = a.startDate.getTime() - b.startDate.getTime()
        break
      
      case "endDate":
        const aEndDate = a.endDate || new Date()
        const bEndDate = b.endDate || new Date()
        comparison = aEndDate.getTime() - bEndDate.getTime()
        break
      
      case "featured":
        // Proyectos destacados primero
        const aFeatured = a.featured ? 1 : 0
        const bFeatured = b.featured ? 1 : 0
        comparison = bFeatured - aFeatured
        // Si ambos tienen el mismo estado de destacado, ordenar por fecha
        if (comparison === 0) {
          comparison = b.startDate.getTime() - a.startDate.getTime()
        }
        break
      
      default:
        comparison = 0
    }

    return sort.direction === "desc" ? -comparison : comparison
  })
}

/**
 * Busca proyectos por término de búsqueda con scoring
 */
export function searchProjects(projects: Project[], searchTerm: string): Project[] {
  if (!searchTerm.trim()) {
    return projects
  }

  const term = searchTerm.toLowerCase()
  
  return projects
    .map(project => ({
      project,
      score: calculateSearchScore(project, term)
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ project }) => project)
}

/**
 * Calcula un score de relevancia para la búsqueda
 */
function calculateSearchScore(project: Project, searchTerm: string): number {
  let score = 0

  // Coincidencia exacta en título (peso alto)
  if (project.title.toLowerCase().includes(searchTerm)) {
    score += 10
  }

  // Coincidencia en descripción
  if (project.description.toLowerCase().includes(searchTerm)) {
    score += 5
  }

  // Coincidencia en descripción larga
  if (project.longDescription?.toLowerCase().includes(searchTerm)) {
    score += 3
  }

  // Coincidencia en tecnologías
  const techMatches = project.technologies.filter(tech => 
    tech.name.toLowerCase().includes(searchTerm)
  ).length
  score += techMatches * 4

  // Coincidencia en tags
  const tagMatches = project.tags.filter(tag => 
    tag.toLowerCase().includes(searchTerm)
  ).length
  score += tagMatches * 2

  // Coincidencia en categoría
  if (project.category.toLowerCase().includes(searchTerm)) {
    score += 3
  }

  // Coincidencia en cliente o rol
  if (project.client?.toLowerCase().includes(searchTerm)) {
    score += 2
  }
  if (project.role?.toLowerCase().includes(searchTerm)) {
    score += 2
  }

  // Bonus para proyectos destacados
  if (project.featured && score > 0) {
    score += 1
  }

  return score
}

/**
 * Obtiene estadísticas de los proyectos filtrados
 */
export function getProjectStats(projects: Project[]) {
  const stats = {
    total: projects.length,
    byCategory: {} as Record<string, number>,
    byStatus: {} as Record<string, number>,
    byTechnology: {} as Record<string, number>,
    featured: projects.filter(p => p.featured).length,
    completed: projects.filter(p => p.status === "completed").length,
    inProgress: projects.filter(p => p.status === "in-progress").length
  }

  projects.forEach(project => {
    // Contar por categoría
    stats.byCategory[project.category] = (stats.byCategory[project.category] || 0) + 1
    
    // Contar por estado
    stats.byStatus[project.status] = (stats.byStatus[project.status] || 0) + 1
    
    // Contar por tecnología
    project.technologies.forEach(tech => {
      stats.byTechnology[tech.name] = (stats.byTechnology[tech.name] || 0) + 1
    })
  })

  return stats
}

/**
 * Obtiene sugerencias de búsqueda basadas en los proyectos
 */
export function getSearchSuggestions(projects: Project[], currentSearch: string = ""): string[] {
  const suggestions = new Set<string>()
  const term = currentSearch.toLowerCase()

  projects.forEach(project => {
    // Agregar títulos que coincidan parcialmente
    if (project.title.toLowerCase().includes(term) && project.title.toLowerCase() !== term) {
      suggestions.add(project.title)
    }

    // Agregar tecnologías que coincidan
    project.technologies.forEach(tech => {
      if (tech.name.toLowerCase().includes(term) && tech.name.toLowerCase() !== term) {
        suggestions.add(tech.name)
      }
    })

    // Agregar tags que coincidan
    project.tags.forEach(tag => {
      if (tag.toLowerCase().includes(term) && tag.toLowerCase() !== term) {
        suggestions.add(tag)
      }
    })

    // Agregar categorías que coincidan
    if (project.category.toLowerCase().includes(term) && project.category.toLowerCase() !== term) {
      suggestions.add(project.category)
    }
  })

  return Array.from(suggestions).slice(0, 5) // Limitar a 5 sugerencias
}