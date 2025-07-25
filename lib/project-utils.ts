import type { Project, ProjectFilter, ProjectSort, ProjectCategory, TechnologyCategory } from "./types"

export function filterProjects(projects: Project[], filter: Partial<ProjectFilter>): Project[] {
  return projects.filter(project => {
    // Filter by categories
    if (filter.categories && filter.categories.length > 0) {
      if (!filter.categories.includes(project.category)) {
        return false
      }
    }

    // Filter by technologies
    if (filter.technologies && filter.technologies.length > 0) {
      const projectTechNames = project.technologies.map(tech => tech.name)
      const hasMatchingTech = filter.technologies.some(tech => 
        projectTechNames.includes(tech)
      )
      if (!hasMatchingTech) {
        return false
      }
    }

    // Filter by status
    if (filter.status && filter.status.length > 0) {
      if (!filter.status.includes(project.status)) {
        return false
      }
    }

    // Filter by featured
    if (filter.featured !== undefined) {
      if (project.featured !== filter.featured) {
        return false
      }
    }

    // Filter by search term
    if (filter.search && filter.search.trim()) {
      const searchTerm = filter.search.toLowerCase()
      const searchableText = [
        project.title,
        project.description,
        project.longDescription || "",
        ...project.tags,
        ...project.technologies.map(tech => tech.name),
        project.category
      ].join(" ").toLowerCase()

      if (!searchableText.includes(searchTerm)) {
        return false
      }
    }

    return true
  })
}

export function sortProjects(projects: Project[], sort: ProjectSort): Project[] {
  return [...projects].sort((a, b) => {
    let comparison = 0

    switch (sort.field) {
      case "title":
        comparison = a.title.localeCompare(b.title)
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
        comparison = (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        break
      default:
        return 0
    }

    return sort.direction === "desc" ? -comparison : comparison
  })
}

export function getProjectsByCategory(projects: Project[]): Record<ProjectCategory, Project[]> {
  const categories: Record<ProjectCategory, Project[]> = {
    "Aplicación Web": [],
    "Aplicación Móvil": [],
    "Documentación": [],
    "Educativo": [],
    "E-commerce": [],
    "Dashboard": [],
    "API": [],
    "Herramienta": [],
    "Otro": []
  }

  projects.forEach(project => {
    categories[project.category].push(project)
  })

  return categories
}

export function getTechnologiesByCategory(projects: Project[]): Record<TechnologyCategory, string[]> {
  const techCategories: Record<TechnologyCategory, Set<string>> = {
    frontend: new Set(),
    backend: new Set(),
    database: new Set(),
    tool: new Set(),
    design: new Set(),
    testing: new Set(),
    deployment: new Set()
  }

  projects.forEach(project => {
    project.technologies.forEach(tech => {
      techCategories[tech.category].add(tech.name)
    })
  })

  // Convert Sets to arrays
  const result: Record<TechnologyCategory, string[]> = {} as Record<TechnologyCategory, string[]>
  Object.entries(techCategories).forEach(([category, techSet]) => {
    result[category as TechnologyCategory] = Array.from(techSet)
  })

  return result
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter(project => project.featured)
}

export function getRecentProjects(projects: Project[], limit: number = 3): Project[] {
  return [...projects]
    .sort((a, b) => {
      const aDate = a.endDate || a.startDate
      const bDate = b.endDate || b.startDate
      return bDate.getTime() - aDate.getTime()
    })
    .slice(0, limit)
}

export function getProjectById(projects: Project[], id: string): Project | undefined {
  return projects.find(project => project.id === id)
}

export function getRelatedProjects(projects: Project[], currentProject: Project, limit: number = 3): Project[] {
  const currentTechNames = currentProject.technologies.map(tech => tech.name)
  
  return projects
    .filter(project => project.id !== currentProject.id)
    .map(project => {
      const projectTechNames = project.technologies.map(tech => tech.name)
      const commonTechs = currentTechNames.filter(tech => projectTechNames.includes(tech))
      const categoryMatch = project.category === currentProject.category
      
      return {
        project,
        score: commonTechs.length + (categoryMatch ? 2 : 0)
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.project)
}

export function getProjectStats(projects: Project[]) {
  const totalProjects = projects.length
  const completedProjects = projects.filter(p => p.status === "completed").length
  const inProgressProjects = projects.filter(p => p.status === "in-progress").length
  const featuredProjects = projects.filter(p => p.featured).length
  
  const avgPerformance = projects
    .filter(p => p.metrics?.performance)
    .reduce((sum, p) => sum + (p.metrics?.performance || 0), 0) / 
    projects.filter(p => p.metrics?.performance).length

  const allTechnologies = new Set<string>()
  projects.forEach(project => {
    project.technologies.forEach(tech => allTechnologies.add(tech.name))
  })

  return {
    totalProjects,
    completedProjects,
    inProgressProjects,
    featuredProjects,
    avgPerformance: Math.round(avgPerformance || 0),
    totalTechnologies: allTechnologies.size,
    categories: Object.keys(getProjectsByCategory(projects)).length
  }
}